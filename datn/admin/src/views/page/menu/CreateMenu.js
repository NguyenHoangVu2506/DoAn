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
    CFormSelect,
    CFormTextarea,
    CRow,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MenuStore } from '../../../store/actions/menu-actions';

const CreateMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { createMenu } = useSelector((state) => state.userReducer);

    const [name, setName] = useState('');
    const [link, setLink] = useState('/');
    const [position, setPosition] = useState('slider-main');
    const [type, setType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(MenuStore({ menu_name: name,menu_link:link,menu_type:type, parent_id: null,menu_position:position}))
            navigate('/menu/menulist')      
          } catch (error) {
            
          }
    }
    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Thêm Menu</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputName">Tên menu</CFormLabel>
                                <CFormInput type="text" id="inputName" value={name} onChange={(e) => setName(e.target.value)} />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputState">Link</CFormLabel>
                                <CFormInput type="text" id="inputName" value={link} onChange={(e) => setLink(e.target.value)} />
                            </CCol>
                            
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputState">Vị trí</CFormLabel>
                                <CFormSelect id="inputState" onChange={(e) => setPosition(e.target.value)} value={position}>
                                    
                                        <option value='slider-main'>Banner home</option>
                                        <option value='slider-contact'>Banner contact</option>
                                        <option value='slider-post'>Banner post</option>
                                        <option value='slider-other'>Banner other</option>

                                </CFormSelect>
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputCity">Kiểu</CFormLabel>
                                <CFormTextarea
                                    id="exampleFormControlTextarea1"
                                    rows={3}
                                    value={type} onChange={(e) => setType(e.target.value)}
                                ></CFormTextarea>
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
    );
}

export default CreateMenu;
