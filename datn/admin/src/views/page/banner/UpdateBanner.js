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
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BannerStore, BannerUpdate, getSliderById, uploadSingleImage } from '../../../store/actions';

const CreateBanner = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // Lấy ID từ URL

    const { updateBanner } = useSelector((state) => state.sliderReducer);
    const { getBannerById } = useSelector((state) => state.sliderReducer);

    const [name, setName] = useState('');
    const [description, setSummary] = useState('');
    const [link, setLink] = useState('/');
    const [image, setImage] = useState('');
    const [position, setPosition] = useState('');

    useEffect(() => {
        if (!getBannerById) {
            dispatch(getSliderById({ slider_id:id }));
        } else {
            setName(getBannerById.slider_name || '');
            setLink(getBannerById.slider_link || '');
            setSummary(getBannerById.slider_summary || 'slider-main');
            setImage(getBannerById.slider_image || '');
        }
    }, [dispatch,getBannerById]);
    console.log(getBannerById)
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
            formFile.append('folderName', 'website/slider')
            const image = await dispatch(uploadSingleImage(formFile))
            image && dispatch(BannerUpdate({slider_id:id, slider_name: name, slider_summary: description,slider_link: description, slider_image: image?.payload?.metaData?.thumb_url, slider_is_active: true }))
            navigate('/banner/bannerlist')

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Chỉnh sửa Banner</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputName">Tên banner</CFormLabel>
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
                                <CFormLabel htmlFor="inputCity">Mô tả</CFormLabel>
                                <CFormTextarea
                                    id="exampleFormControlTextarea1"
                                    rows={3}
                                    value={description} onChange={(e) => setSummary(e.target.value)}
                                ></CFormTextarea>
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="formFile">Hình ảnh</CFormLabel>
                                <CFormInput type="file" id="image"  />
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

export default CreateBanner;
