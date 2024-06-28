import axiosInstance from "../axio";

const apiProduct = {
    // lay tat ca du lieu
    getAll: (page, limit) => {
        return axiosInstance.get(`/product?page=${page}&limit=${limit}`).then((res) => res.data);
    },

    // lay chi tiet du lieu
    getProductById: (id) => {
        return axiosInstance.get(`/product/show/${id}`);
    },

    // lay sp theo danh muc
    getProductByCategory: (category_id, tag_id) => {
        return axiosInstance.get(`/product/product-by-category/${category_id}/${tag_id}`);
    },


    // lay sp theo danh muc + phan trang
    getProductByCategorySlug: (slug, page, limit) => {
        return axiosInstance.get(`/product/product-category/${slug}?page=${page}&limit=${limit}`);
    },


    // lay sp theo thuong hieu + phan trang
    getProductByBrandSlug: (slug, page, limit) => {
        return axiosInstance.get(`/product/product-brand/${slug}?page=${page}&limit=${limit}`);
    },

    // chi tiet kem sp lien quan
    getDetailAndProductOther: (slug) => {
        return axiosInstance.get(`/product/detail/${slug}`);
    },
    createProduct: (product) => {
        return axiosInstance.post(`/product/create`, product);
    },
    updateProduct: (product, id) => {
        return axiosInstance.put(`/product/update/${id}`, product);
    },
    // xoa vao thung rac
    trashProduct: (id) => {
        return axiosInstance.put(`/product/trash/${id}`);
    },

    // phuc hoi thung rac
    rescoverTrash: (id) => {
        return axiosInstance.put(`/product/rescover-trash/${id}`);
    },

    // lay ds rac
    getListTrash: (page, limit) => {
        return axiosInstance.get(`/product/list-trash?page=${page}&limit=${limit}`).then(res => res.data);
    },
    deleteProduct: (id) => {
      
        return axiosInstance.delete(`/product/delete/${id}`);
    },


}

export default apiProduct;