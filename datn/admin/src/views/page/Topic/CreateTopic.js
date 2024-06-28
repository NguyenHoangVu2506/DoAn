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
import { TopicStore } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";

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
            toast.success("Thêm chủ đề thành công!");
            navigate('/topic/topiclist')
      
      
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
                            <CCol md={12}>
                                <CFormLabel htmlFor="inputName">Tên chủ đề</CFormLabel>
                                <CFormInput type="name" id="inputName" value={name} onChange={(e) => setName(e.target.value)} />
                            </CCol>
                            <CCol xs={12}>
                                <CFormLabel htmlFor="inputAddress">Mô tả </CFormLabel>
                                <CFormTextarea id="inputAddress"  rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
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
