import axiosInstance from "../axio";

const apiCategory = {
    // lay tat ca danh muc
    getAll: (page, limit) => {
        return axiosInstance.get(`/categories?page=${page}&limit=${limit}`).then((res) => res.data);
    },

    // lay chi tiet danh muc
    getCategoryById: (id) => {
        return axiosInstance.get(`categories/${id}`);
    },

    // lay danh muc theo paret
    getCatByParent: (parent) => {
        return axiosInstance.get(`/categories/getByParent/${parent}`).then((res)=>res.data);
    },

    // them category
    createCategory: (category) => {
        return axiosInstance.post(`/categories/create`, category);
    },

    // cap nhat category
    updateCategory: (category, id) => {
        return axiosInstance.put(`/categories/update/${id}`, category);
    },

    // xoa danh muc vao thung rac
    trashCategory: (id) => {
        return axiosInstance.get(`/categories/trash/${id}`);
    },

    // phuc hoi danh muc tu thung rac
    rescoverTrash: (id) => {
        return axiosInstance.get(`/categories/rescover-trash/${id}`);
    },

    // lay danh sach danh muc trong thung rac
    getListTrash: ()=>{
        return axiosInstance.get(`/categories/list-trash`).then((res)=>res.data);
    },

    // hien thi danh muc
    displayCat: (id) => {
        return axiosInstance.get(`/categories/display/${id}`);
    },

    // xoa vinh vien
    delCatById: (id) => {
        return axiosInstance.delete(`/categories/delete/${id}`);
    }

}

export default apiCategory;