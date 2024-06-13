import React, { useEffect, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormTextarea,
    CRow,
} from '@coreui/react'
import { Link, useParams, useNavigate } from "react-router-dom";
import {  TopicUpdate, getTopicById } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';

const UpdateTopic = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { updateTopic } = useSelector((state) => state.topicReducer);
    const { Topic } = useSelector((state) => state.topicReducer);

    const { id } = useParams(); // Lấy ID từ URL
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (!Topic) {
            dispatch(getTopicById({ topic_id:id }));
        } else {
            setName(Topic.topic_name || '');
            setDescription(Topic.topic_description || '');

        }
    }, [dispatch,Topic]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(TopicUpdate({ topic_id:id,topic_name: name,topic_description:description, parent_id: '0',isPublished:true }))
            navigate('/topic/topiclist')
      
      
          } catch (error) {
            
          }
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Chỉnh sửa chủ đề</strong>
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
export default UpdateTopic
