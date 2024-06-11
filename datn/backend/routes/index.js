const UserRouter = require('./UserRouter')
const SpuRouter = require('./SpuRouter')
const GalleryRouter = require('./GalleryRouter')

const DiscountRouter = require('./DiscountRouter')
const CartRouter = require('./CartRouter')
const CheckoutRouter = require('./CheckoutRouter')
const CategoryRouter = require('./CategoryRouter')
const AttributeRouter = require('./AttributeRouter')
const AttributeValueRouter = require('./AttributeValueRouter')
const SpuAttributeRouter = require('./SpuAttributeRouter')
const BrandRouter = require('./BrandRouter')
const UploadRouter = require('./UploadRouter')
const TopicRouter = require('./TopicRouter')
const BlogRouter = require('./BlogRouter')
const CommentRouter=require('./CommentRouter')
const SpecialOfferRouter =require('./SpecialOfferRouter')
const AuthGoogle = require('../routes/AuthGoogle')
const AuthFaceRouter = require('../routes/AuthFaceRouter')
const InfoRouter = require('../routes/InfoRouter')
const WishlistRouter = require('../routes/WishlistRouter')
const SliderRouter = require('../routes/SliderRouter')


const routes = (app) => {

    app.use('/api/spu', SpuRouter)
    app.use('/api/slider',SliderRouter )
    app.use('/api/gallery', CommentRouter)
    app.use('/api/discount', DiscountRouter)
    app.use('/api/user', UserRouter)
    app.use('/api/cart', CartRouter)
    app.use('/api/checkout', CheckoutRouter)
    app.use('/api/inventory', CheckoutRouter)
    app.use('/api/category', CategoryRouter)
    app.use('/api/attribute', AttributeRouter)
    app.use('/api/attributevalue', AttributeValueRouter)
    app.use('/api/spuAttribute', SpuAttributeRouter)
    app.use('/api/brand', BrandRouter)
    app.use('/api/upload', UploadRouter)
    app.use('/api/topic', TopicRouter)
    app.use('/api/blog', BlogRouter)
    app.use('/api/comment', CommentRouter)
    app.use('/api/info', InfoRouter)
    app.use('/api/wish_list', WishlistRouter)

    app.use('/api/specialOffer', SpecialOfferRouter)
    app.use('/api/auth/google', AuthGoogle)
    app.use('/api/auth/facebook', AuthFaceRouter)



    




}
module.exports = routes