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
import { TopicStore } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';

const CreateTopic = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { createTopic } = useSelector((state) => state.userReducer);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(TopicStore({ name: name,description:description, parent_id: '0',isPublished:true }))
            navigate('/topic/topiclist')
            toast.info('vui long xac nhan email')
      
      
          } catch (error) {
            
          }
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Thêm chủ đề</strong>
                    </CCardHeader>
                    <CCardBody>

                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputName">Tên chủ đề</CFormLabel>
                                <CFormInput type="name" id="inputName" value={name} onChange={(e) => setName(e.target.value)} />
                            </CCol>
                            {/* <CCol md={6}>
                                <CFormLabel htmlFor="inputState">Chủ đề</CFormLabel>
                                <CFormSelect id="inputState" onChange={(e) => setTopic_Id(e.target.value)} value={topic_id}>
                                    {topic.map((item, index) => {
                                        return (
                                            <option value={item.id} key={index}>{item.name}</option>
                                        )
                                    })}
                                </CFormSelect>
                            </CCol> */}
                            <CCol xs={6}>
                                <CFormLabel htmlFor="inputAddress">Mô tả </CFormLabel>
                                <CFormInput id="inputAddress" value={description} onChange={(e) => setDescription(e.target.value)} />
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
