import axiosInstance from "../axio";

const apiTopic = {
    // lay tat ca chu de
    getAll: () => {
        return axiosInstance.get("/topics").then((res) => res.data);
    },

    // lay chi tiet chu de
    getTopicById: (id) => {
        return axiosInstance.get(`/topic/${id}`);
    },

    // lay chu de parent
    getTopicByParentId: (id) => {
        return axiosInstance.get(`/topic/getParent/${id}`);
    },


    // them chu de
    createTopic: (topic) => {
        return axiosInstance.post(`/topic/create`, topic);
    },

    // cap nhat topic
    updateTopic: (topic, id) => {
        return axiosInstance.put(`/topic/update/${id}`, topic);
    },

    // xoa chu de vao thung rac
    trashTopic: (id) => {
        return axiosInstance.put(`/topic/trash/${id}`);
    },

    // phuc hoi chu de tu thung rac
    rescoverTrash: (id) => {
        return axiosInstance.put(`/topic/rescover-trash/${id}`);
    },

    // lay danh sach chu de trong thung rac
    getListTrash: ()=>{
        return axiosInstance.get(`/topic/list-trash`).then((res)=>res.data);
    },

    // hien thi chu de
    displayTopic: (id) => {
        return axiosInstance.put(`/topic/display/${id}`);
    },


    delTopicById: (id) => {
        return axiosInstance.delete(`/topic/delete/${id}`);
    },


}

export default apiTopic;