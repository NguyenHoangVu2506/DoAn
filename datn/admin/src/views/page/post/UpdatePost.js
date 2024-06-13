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
import { BlogStore, BlogUpdate, getBlogById, getTopic, uploadSingleImage } from '../../../store/actions';

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
    const [image, setImage] = useState('');

    useEffect(() => {
        if (!listBlogById) {
            dispatch(getBlogById({ blog_id:id }));
        } else {
            setName(listBlogById.blog_name || '');
            setTopic_Id(listBlogById.topic_id || '');
            setDescription(listBlogById.blog_description || '');
            setImage(listBlogById.blog_image || '');
            setTitle(listBlogById.blog_title || '');
            setDetail(listBlogById.blog_detail || '');

        }
    }, [dispatch,listBlogById]);

    useEffect(() => {
        if (!allTopic) {
            dispatch(getTopic({ sort: 'ctime' }));
        }
    }, [dispatch, allTopic]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formFile = new FormData();

            const images = document.querySelector("#image");
            if (images.files.length === 0) {
                formFile.append("file", "");
            } else {
                formFile.append("file", images.files[0]);
            }
            formFile.append('folderName', 'website/blog');
            const image = await dispatch(uploadSingleImage(formFile));
            image && dispatch(BlogUpdate({blog_id:id, blog_name: name, topic_id, blog_description: description, blog_title: title, blog_detail: detail, blog_image: image?.payload?.metaData?.thumb_url, isPublished: true }));
            navigate('/post/postlist/news/1/10');
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
                                <CFormInput type="file" id="image" />
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
