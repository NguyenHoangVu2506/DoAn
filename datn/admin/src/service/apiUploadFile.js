import axiosInstance from "../axio";

const apiUploadFile = {

    uploadFile: (file) => {
        return axiosInstance.post(`/upload`, file);
    },
}

export default apiUploadFile;