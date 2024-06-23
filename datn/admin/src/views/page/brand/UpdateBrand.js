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
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { BrandUpdate, getBrandById, uploadSingleImage } from '../../../store/actions';
import { toast } from "react-toastify";

const UpdateBrand = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const { listBrandById } = useSelector((state) => state.brandReducer);


    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    useEffect(() => {
        if (!listBrandById) {
            dispatch(getBrandById({ brand_id: id }));
        } else {
            setName(listBrandById.brand_name || '');
            setDescription(listBrandById.brand_description || 'slider-main');
            setImage(listBrandById.brand_image || '');
        }
    }, [dispatch, listBrandById]);

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
            image && dispatch(BrandUpdate({brand_id:id, brand_name: name, brand_description: description, brand_image: image?.payload?.metaData?.thumb_url, isPublished: true }))
            toast.success("Cập nhật thương hiệu thành công!");
            navigate('/brand/brandlist')

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Chỉnh sửa thương hiệu</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            <CCol md={12}>
                                <CFormLabel htmlFor="inputName">Tên danh thương hiệu</CFormLabel>
                                <CFormInput type="text" id="inputName" value={name} onChange={(e) => setName(e.target.value)} />
                            </CCol>
                            
                            <CCol md={9}>
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

export default UpdateBrand;
