const { ForbiddenRequestError } = require('../core/error.response')
const { product, skincare, bodycare, haircare } = require('../models/ProductModel')
const { insertInventory } = require('../models/repositories/inventory.repo')
const { findAllDraft,
    publishProduct,
    unPublishProduct,
    findAllPublish,
    searchProduct, findAllProducts, findProduct,
    updateProductById } = require('../models/repositories/product.repo')
const { removeUndefindObject, updateNestedObjectParser } = require('../utils')

class ProductFactory {
    static productRegistry = {} //object key-class
 
    static registerProductType(type, classref) { //dk loai sp
        ProductFactory.productRegistry[type] = classref
    }

    static async createProduct(type, payload) {
        const productClass = ProductFactory.productRegistry[type]
        if (!productClass) throw new ForbiddenRequestError(`invalid product type ${type}`)
        return new productClass(payload).createProduct()
        // switch (type){
        //     case 'Skincare':
        //         return new Skincare(payload).createProduct()
        //     case 'Bodycare':
        //             return new Bodycare(payload).createProduct()
        //     default:
        //         throw new ForbiddenRequestError(`invalid product type ${type}`)
        //     }
    }

    //put
    static async publishProduct({ product_id }) {
        console.log(product_id)
        return await publishProduct({ product_id })
    }

    static async unPublishProduct({ product_id }) {
        console.log(product_id)
        return await unPublishProduct({ product_id })
    }

    static async updateProduct(type, productId,payload) {
        console.log(type, payload, productId)
        const productClass = ProductFactory.productRegistry[type]
        if (!productClass) throw new ForbiddenRequestError(`invalid product type ${type}`)
        return new productClass(payload).updateProduct(productId)
    }


    //end put

    //query
    static async findAllDraft(limit = 50, skip = 0) {
        const query = { isDraft: true }
        return await findAllDraft({ query, limit, skip })
    }
    static async findAllPublish(limit = 50, skip = 0) {
        const query = { isPublished: true }
        return await findAllPublish({ query, limit, skip })
    }
    static async searchProduct({ keySearch }) {
        console.log(keySearch)
        return await searchProduct({ keySearch })
    }
    static async findAllProducts({ limit = 50, sort = 'ctime', page = 1, filter = { isPublished: true } }) {
        return await findAllProducts({
            limit, sort, page, filter,
            select: ['product_name', 'product_thumb', 'product_price','product_type']
        })
    }

    static async findProduct({ product_id }) {
        return await findProduct({ product_id, unSelect: ['__v', 'product_thumb', 'product_price'] })
    }



    //query
}

class Product {
    constructor({
        product_name, product_thumb, product_description, product_price, product_quantity,
        product_type, product_attributes
    }) {
        this.product_name = product_name,
            this.product_thumb = product_thumb,
            this.product_description = product_description,
            this.product_price = product_price,
            this.product_quantity = product_quantity,
            this.product_type = product_type,
            this.product_attributes = product_attributes
    }

    //function create NewPro
    async createProduct(product_id) {
        const newProduct = await product.create({ ...this, _id: product_id })

        if (newProduct) {
            //add newProduct in inventory
            await insertInventory({
                productId: newProduct._id,
                stock: this.product_quantity
            })
        }
        return newProduct
    }

    //function update product
    async updateProduct(productId, bodyUpdate) {
        console.log('5')
        console.log(productId, bodyUpdate)
        return await updateProductById({ productId, bodyUpdate, model: product })
    }

}

//
class Skincare extends Product {
    async createProduct() {
        const newSkincare = await skincare.create(this.product_attributes)
        console.log('1')
        if (!newSkincare) throw new ForbiddenRequestError('create New Skincare error')
        const newProduct = await super.createProduct(newSkincare._id)
        if (!newProduct) throw new ForbiddenRequestError('create New Product error')

        return newProduct;

    }
    
    async updateProduct(productId) {
        console.log('1',this)
        const objectParams = removeUndefindObject(this)
        console.log('2',objectParams)
        if (objectParams.product_attributes) {
            //update child
            await updateProductById({ 
                productId,
                 Bodycare: updateNestedObjectParser(objectParams.product_attributes),
                 model: skincare })
        }
        const updateProduct = await super.updateProduct(productId,updateNestedObjectParser(objectParams) )
        return updateProduct

    }
}

class Bodycare extends Product {
    async createProduct() {
        const newBodycare = await bodycare.create(this.product_attributes)
        if (!newBodycare) throw new ForbiddenRequestError('create New Bodycare error')

        const newProduct = await super.createProduct(newBodycare._id)
        if (!newProduct) throw new ForbiddenRequestError('create New Product error')

        return newProduct;

    }
}

class Haircare extends Product {
    async createProduct() {
        console.log('2')
        const newHaircare = await haircare.create(this.product_attributes)
        if (!newHaircare) throw new ForbiddenRequestError('create New Haircare error')

        const newProduct = await super.createProduct(newHaircare._id)
        if (!newProduct) throw new ForbiddenRequestError('create New Product error')

        return newProduct;

    }
}

//register product type
ProductFactory.registerProductType('Skincare', Skincare)
ProductFactory.registerProductType('Bodycare', Bodycare)
ProductFactory.registerProductType('Haircare', Haircare)

module.exports = ProductFactory;