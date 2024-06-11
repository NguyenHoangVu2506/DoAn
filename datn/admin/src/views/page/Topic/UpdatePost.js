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
import apiPost from '../../../service/apiPost';
import apiTopic from '../../../service/apiTopic';
import axiosInstance from '../../../axio';
import apiUploadFile from '../../../service/apiUploadFile';

const UpdatePost = () => {
    const navigate = useNavigate(); // chuyen trang
    const { id } = useParams();

    const [topic, setTopic] = useState([]);
    const [title, setTitle] = useState('');
    const [topic_id, setTopic_id] = useState(0);
    const [detail, setDetail] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [metakey, setMetakey] = useState('');
    const [status, setStatus] = useState(2);
    const [slug, setSlug] = useState('a');
    const [metadesc, setMetadesc] = useState('a');
    const [image, setImage] = useState('a');
    const [created_at, setCreated_at] = useState(1714805879000);
    const [updated_at, setUpdated_at] = useState(1714805879000);
    const [created_by, setCreated_by] = useState(0);
    const [updated_by, setUpdated_by] = useState(0);

    useEffect(() => {
        apiPost.getById(id).then((res) => {
            try {
                console.log(res.data)
                const data = res.data; // hoặc res.response.data
               
                setTitle(data.title);
                setTopic_id(data.topic_id);
                setType(data.type);
                setDetail(data.detail);

                setStatus(data.status);
                setMetakey(data.metakey);
                setDescription(data.description);
                console.log(res);
            } catch (e) {
                console.log(e);
            }
        })

    }, [])
    useEffect(() => {
        apiTopic.getAll().then((res) => {
            try {
                const data = res.data;
                const brandData = data.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                    }
                });
                setTopic(brandData);
                console.log(brandData)
                
            } catch (e) {
                console.log(e);
            }
        })
    }, [])

    const handleSubmit = async (e) => {
        if (title !== '') {
            e.preventDefault();
            const post = {
                title: title,
                topic_id: topic_id,
                type: type,
                detail: detail,
                description: description,
                metakey: metakey,
                status: status,
                slug: slug,
                metadesc: metadesc,
                created_at: created_at,
                updated_at: updated_at,
                created_by: created_by,
                updated_by: updated_by,
                image: ""
            };
            if (image) {
                let file = new FormData();
                file.append("files", image);
                axiosInstance.enableUploadFile();
                try {
                    const res = await apiUploadFile.uploadFile(file);
                    let filename = res.data.filename;
                    post.image = filename;
                } catch (e) {
                    console.log(e);
                    alert("File upload failed!");
                    return;
                }
                axiosInstance.enableJson();
            }
            await apiPost.updatePost(post, id).then((res) => {
                if (res.data != null) {
                    alert("Cập nhật dữ liệu thành công !")
                    navigate('/post/postlist/news/1/10', { replace: true });
                }
                else {
                    alert("Không thành công !")
                }
            })
        }
        else {
            e.preventDefault();
            alert('Vui lòng nhập đầu đủ thông tin !')
        }
    }

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
                                <CFormLabel htmlFor="inputName">Tiêu đề</CFormLabel>
                                <CFormInput type="name" id="inputName" value={title ? title : ''} onChange={(e) => setTitle(e.target.value)} />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputState">Chủ đề</CFormLabel>
                                <CFormSelect id="inputState" onChange={(e) => setTopic_id(e.target.value)} value={topic_id}>
                                    {topic.map((item, index) => {
                                        return (
                                            <option value={item.id} key={index}>{item.name}</option>
                                        )
                                    })}
                                </CFormSelect>
                            </CCol>
                            <CCol xs={6}>
                                <CFormLabel htmlFor="inputAddress">Mô tả ngắn</CFormLabel>
                                <CFormInput id="inputAddress" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </CCol>
                            <CCol xs={6}>
                                <CFormLabel htmlFor="inputAddress">type</CFormLabel>
                                <CFormInput id="inputAddress" value={type} onChange={(e) => setType(e.target.value)} />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputCity">Chi tiết</CFormLabel>
                                <CFormTextarea
                                    id="exampleFormControlTextarea1"
                                    rows={3}
                                    value={detail} onChange={(e) => setDetail(e.target.value)}
                                ></CFormTextarea>
                            </CCol>
                            <CCol md={3}>
                                <CFormLabel htmlFor="formFile">Hình ảnh</CFormLabel>
                                <CFormInput type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />
                            </CCol>
                            <CCol md={3}>
                                <CFormLabel htmlFor="inputState">Trang thái</CFormLabel>
                                <CFormSelect id="inputState" value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="1">Xuất bản</option>
                                    <option value="2">Chưa xuất bản</option>
                                </CFormSelect>
                            </CCol>
                            <CCol xs={12}>
                                <CButton color="primary" type="submit">
                                    Lưu
                                </CButton>
                            </CCol>
                        </CForm>

                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default UpdatePost
