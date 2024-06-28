import axiosInstance from "../axio";


const apiBanner = {
    // lay slider theo position
    getSliderByPosition: (position) => {
        return axiosInstance.get(`/banner/${position}`);
    },

    // lay slider trang admin
    getAllBannerBE: () => {
        return axiosInstance.get(`/banners`);
    },

    // lay chi tiet 
    getOne: (id) => {
        return axiosInstance.get(`/banner/show/${id}`);
    },

    // xoa vao thung rac
    trashBanner: (id) => {
        return axiosInstance.put(`banner/trash/${id}`);
    },

    // phuc hoi thung rac
    rescoverTrash: (id) => {
        return axiosInstance.put(`banner/rescover-trash/${id}`);
    },

    // an, hien
    displayBanner: (id) => {
        return axiosInstance.put(`banner/display/${id}`);
    },

    // ds thung rac
    getListTrash: () => {
        return axiosInstance.get(`banner/get-list-trash`);
    },
    createBanner: (banner) => {
        return axiosInstance.post(`/banner/create`, banner);
    },
    updateBanner: (banner, id) => {
        return axiosInstance.put(`/banner/update/${id}`, banner);
    },
    deleteBanner: (id) => {
        return axiosInstance.delete(`/banner/delete/${id}`);
    },
}

export default apiBanner;