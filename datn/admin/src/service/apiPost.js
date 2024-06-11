import axiosInstance from "../axio";

const apiPost = {

    // ds bai viet moi nhat
    getPostNew: (page, limit) => {
        return axiosInstance.get(`/post/new?page=${page}&limit=${limit}`).then(res => res.data);
    },

    // tat ca bai viet voi type va phan trang
    getAllPostByType: (type, page, limit) => {
        return axiosInstance.get(`/post/get-by-type/${type}?page=${page}&limit=${limit}`).then(res => res.data);
    },

    // lay chi tiet
    getById: (id) => {
        return axiosInstance.get(`/post/show/${id}`);
    },


    // xoa vao thung rac
    trashPost: (id) => {
        return axiosInstance.put(`/post/trash/${id}`);
    },


    // phuc hoi thung rac
    rescoverTrash: (id) => {
        return axiosInstance.put(`/post/rescover-trash/${id}`);
    },


    // ds thung rac
    getListTrash: (type, page, limit) => {
        return axiosInstance.get(`/post/trash/get-list-trash/${type}?page=${page}&limit=${limit}`).then(res => res.data);
    },


    // an, hien
    displayPost: (id) => {
        return axiosInstance.put(`/post/display/${id}`);
    },


    // xoa vinh vien
    deletePost: (id) => {
        return axiosInstance.delete(`/post/delete-post/${id}`);
    },


    // bai viet theo slug topic
    getPostBySlugTopic: (slug, page, limit) => {
        return axiosInstance.get(`/post/get-by-slug-topic/${slug}?page=${page}&limit=${limit}`).then(res => res.data);
    },


    // chi tiet bai viet voi bai viet lien quan
    getDetailPostAndOther: (slug) => {
        return axiosInstance.get(`/post/detail/${slug}`).then(res => res.data);
    },
    createPost: (post) => {
        return axiosInstance.post(`/post/create`, post);
    },
    updatePost: (post, id) => {
        return axiosInstance.put(`/post/update/${id}`, post);
    },



}

export default apiPost;