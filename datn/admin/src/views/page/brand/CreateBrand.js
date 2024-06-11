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
import { BrandStore } from '../../../store/actions';

const CreateBrand = () => {
    const dispatch =useDispatch();
    const navigate = useNavigate();
  
    const { createBrand } = useSelector((state) => state.userReducer);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    useEffect(() => {
        if (createBrand) {
            navigate('/post/postlist/news/1/10');
        }
    }, [navigate, createBrand]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {


            
            await dispatch(BrandStore({ brand_name: name,brand_description:description, brand_image: image,isPublished:true }))
            navigate('/brand/brandlist/1/10')
      
          } catch (error) {
            
          }    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Thêm thương hiệu</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            <CCol md={12}>
                                <CFormLabel htmlFor="inputName">Tên thương hiệu</CFormLabel>
                                <CFormInput type="text" id="inputName" value={name} onChange={(e) => setName(e.target.value)} />
                            </CCol>
                           
                            <CCol md={12}>
                                <CFormLabel htmlFor="inputCity">Mô tả</CFormLabel>
                                <CFormTextarea
                                    id="exampleFormControlTextarea1"
                                    rows={3}
                                    value={description} onChange={(e) => setDescription(e.target.value)}
                                ></CFormTextarea>
                            </CCol>
                            <CCol md={3}>
                                <CFormLabel htmlFor="formFile">Hình ảnh</CFormLabel>
                                <CFormInput type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />
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

export default CreateBrand;
