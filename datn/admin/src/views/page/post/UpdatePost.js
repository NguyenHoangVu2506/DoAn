import React, { useEffect, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormCheck,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CFormTextarea,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { BlogStore, BlogUpdate, getBlogById, getTopic, uploadSingleImage, uploadSingleImageArray } from '../../../store/actions';

const UpdatePost = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { allTopic } = useSelector((state) => state.topicReducer);
    const { listBlogById } = useSelector((state) => state.blogReducer);

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [topic_id, setTopic_Id] = useState('');
    const [description, setDescription] = useState('');
    const [detail, setDetail] = useState('');
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };
    useEffect(() => {
        if (!listBlogById) {
            dispatch(getBlogById({ blog_id: id }));
        } else {
            setName(listBlogById.blog_name || '');
            setTopic_Id(listBlogById.topic_id || '');
            setDescription(listBlogById.blog_description || '');
            setImages(listBlogById.blog_image || '');
            setTitle(listBlogById.blog_title || '');
            setDetail(listBlogById.blog_detail || '');

        }
    }, [dispatch, listBlogById]);

    useEffect(() => {
        if (!allTopic) {
            dispatch(getTopic({ sort: 'ctime' }));
        }
    }, [dispatch, allTopic]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formFile = new FormData();
            images.forEach((image) => {
                formFile.append('files', image);
            });
            formFile.append('folderName', 'website/post');
            const response = await dispatch(uploadSingleImageArray(formFile));
            const uploadedImages = response?.payload?.metaData.map((data) => data.thumb_url) || [];
            const postData = {
                blog_id: id,
                blog_name: name,
                topic_id:topic_id,
                blog_description: description,
                blog_title: title,
                blog_detail: detail,
                blog_image: uploadedImages,
                isPublished: true
            };
            console.log('Post Data:', postData);

            await dispatch(BlogUpdate(postData));
            navigate('/post/postlist');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Chỉnh sửa bài viết</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputName">Tiêu bài viết</CFormLabel>
                                <CFormInput type="name" id="inputName" value={name} onChange={(e) => setName(e.target.value)} />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputTitle">Tiêu đề</CFormLabel>
                                <CFormInput type="text" id="inputTitle" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputState">Chủ đề</CFormLabel>
                                <CFormSelect id="inputState" onChange={(e) => setTopic_Id(e.target.value)} value={topic_id}>
                                    <option value={topic_id}>Chọn chủ đề</option>
                                    {allTopic && allTopic.map((topic, index) => (
                                        <option value={topic._id} key={index}>{topic.topic_name}</option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                            <CCol xs={6}>
                                <CFormLabel htmlFor="inputDescription">Mô tả ngắn</CFormLabel>
                                <CFormInput id="inputDescription" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputDetail">Chi tiết</CFormLabel>
                                <CFormTextarea id="inputDetail" rows={3} value={detail} onChange={(e) => setDetail(e.target.value)} />
                            </CCol>
                            <CCol md={3}>
                                <CFormLabel htmlFor="formFile">Hình ảnh</CFormLabel>
                                <CFormInput type="file" id="image" multiple onChange={handleImageChange} />
                            </CCol>
                            <CCol xs={12}>
                                <CButton color="primary" type="submit">Lưu</CButton>
                            </CCol>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};
export default UpdatePost
