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
import { BrandStore, uploadSingleImage } from '../../../store/actions';

const CreateBrand = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { createBrand } = useSelector((state) => state.userReducer);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    useEffect(() => {
        if (createBrand) {
            navigate('/post/postlist/news/1/10');
        }
    }, [navigate, createBrand]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formFile = new FormData()

            const images = document.querySelector("#image");
            if (images.files.length === 0) {
                formFile.append("file", "")
            }
            else {
                formFile.append("file", images.files[0]);
            }
            formFile.append('folderName', 'website/brand')
            const image = await dispatch(uploadSingleImage(formFile))
            image && dispatch(BrandStore({ brand_name: name, brand_description: description, brand_image: image?.payload?.metaData?.thumb_url, public_image_id: image?.payload?.metaData?.public_id, isPublished: true }))
            navigate('/brand/brandlist/1/10')

        } catch (error) {
            console.log(error)
        }
    }

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
                                <CFormInput type="file" id="image" />
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
