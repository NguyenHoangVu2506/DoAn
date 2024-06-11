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
import { useNavigate } from 'react-router-dom'; // Chỉnh sửa từ đây
import axiosInstance from '../../../axio';
import apiUploadFile from '../../../service/apiUploadFile';
import apiPost from '../../../service/apiPost';
import apiTopic from '../../../service/apiTopic';

const CreateTopic = () => {
    const navigate = useNavigate(); // Sử dụng useNavigate

    const [posts, setPosts] = useState([]);
    const [topic, SetTopic] = useState([]);
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');

    const [topic_id, setTopic_Id] = useState(0);
    const [description, setDescription] = useState('');
    const [detail, setDetail] = useState('');
    const [metakey, setMetakey] = useState('');
    const [status, setStatus] = useState(2);
    const [slug, setSlug] = useState('a');
    const [metadesc, setMetadesc] = useState('a');
    const [image, setImage] = useState('');
    const [created_at, setCreated_at] = useState(1714805879000);
    const [updated_at, setUpdated_at] = useState(1714805879000);
    const [created_by, setCreated_by] = useState(0);
    const [updated_by, setUpdated_by] = useState(0);
    const [tamp, setTamp] = useState();


    const handleSubmit = async (e) => {
        e.preventDefault();
        
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Thêm bài viết</strong>
                    </CCardHeader>
                    <CCardBody>

                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputName">Tiêu đề</CFormLabel>
                                <CFormInput type="name" id="inputName" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputName">Type</CFormLabel>
                                <CFormInput type="name" id="inputName" value={type} onChange={(e) => setType(e.target.value)} />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputState">Chủ đề</CFormLabel>
                                <CFormSelect id="inputState" onChange={(e) => setTopic_Id(e.target.value)} value={topic_id}>
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

export default CreateTopic
