import axiosInstance from "../axio";

const apiBrand = {
    // lay tat ca thuong hieu
    getAll: () => {
        return axiosInstance.get("/brands").then((res) => res.data);
    },

    // lay chi tiet thuong hieu
    getBrandById: (id) => {
        return axiosInstance.get(`/brand/${id}`);
    },
    createBrand: (brand) => {
        return axiosInstance.post(`/brand/create`, brand);
    },
    // lay danh thuong hieu trang nguoi dung
    getBrandFE: () => {
        return axiosInstance.get(`/brand/list-brand-fe`).then((res)=>res.data);
    },

    // xoa thuong hieu vao thung rac
    trashBrand: (id) => {
        return axiosInstance.get(`/brand/trash/${id}`);
    },

    // phuc hoi thuong hieu tu thung rac
    rescoverTrash: (id) => {
        return axiosInstance.get(`/brand/rescover-trash/${id}`);
    },

    // lay danh sach thuong hieu trong thung rac
    getListTrash: ()=>{
        return axiosInstance.get(`/brand/list-trash`).then((res)=>res.data);
    },

    // hien thi thuong hieu 
    displayBrand: (id) => {
        return axiosInstance.get(`/brand/display/${id}`);
    },
    // xoa vinh vien
    delBrandById: (id) => {
        return axiosInstance.delete(`/brand/delete/${id}`);
    },
    // cap nhat brand
    updateBrand: (brand, id) => {
        return axiosInstance.put(`/brand/update/${id}`, brand);
    },
}

export default apiBrand;