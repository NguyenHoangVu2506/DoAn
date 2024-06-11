import axiosInstance from "../axio";

const apiSale = {
    // lay tat ca
    getAll: () => {
        return axiosInstance.get("/sale");
    },

    // lay chi tiet 
    getSaleById: (id) => {
        return axiosInstance.get(`/sale/${id}`);
    },

    // lay chu de theo paret
    // getCatByParent: (parent) => {
        // return axiosInstance.get(`/categories/getByParent/${parent}`).then((res)=>res.data);
    // },

    // them sale
    createSale: (sale) => {
        return axiosInstance.post(`/sale/create`, sale);
    },

    // cap nhat 
    updateSale: (sale, id) => {
        return axiosInstance.put(`/sale/update/${id}`, sale);
    },

    // xoa vao thung rac
    trashSale: (id) => {
        return axiosInstance.put(`/sale/trash/${id}`);
    },

    // phuc hoi chu de tu thung rac
    rescoverTrash: (id) => {
        return axiosInstance.put(`/sale/rescover-trash/${id}`);
    },

    // lay danh sach chu de trong thung rac
    getListTrash: ()=>{
        return axiosInstance.get(`/sale/list-trash`).then((res)=>res.data);
    },

    // hien thi chu de
    displaySale: (id) => {
        return axiosInstance.put(`/sale/display/${id}`);
    },

    delSaleByID: (id) => {
        return axiosInstance.delete(`/sale/delete/${id}`);
    },
    

}

export default apiSale;