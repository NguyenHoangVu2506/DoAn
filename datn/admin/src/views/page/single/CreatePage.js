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
import { PageStore } from '../../../store/actions/page-actions';
import { uploadSingleImage } from '../../../store/actions';
import { toast } from "react-toastify";

const CreatePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { createMenu } = useSelector((state) => state.userReducer);

    const [name, setName] = useState('');
    const [link, setLink] = useState('/');
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [public_image_id, setImageId] = useState('public_image_id');
    const [type, setType] = useState('');

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
            formFile.append('folderName', 'website/page')
            const image = await dispatch(uploadSingleImage(formFile))
            image && dispatch(PageStore({ page_name: name, page_title: title,page_detail: detail,page_link:link,page_type:type,public_image_id:"public_image_id", page_image: image?.payload?.metaData?.thumb_url }))
            toast.success("Thêm trang đơn thành công!");

            navigate('/page/pagelist')

        } catch (error) {
            console.log(error)
        }

    }
    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Thêm Trang Đơn</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputName">Tên</CFormLabel>
                                <CFormInput type="text" id="inputName" value={name} onChange={(e) => setName(e.target.value)} />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputState">Link</CFormLabel>
                                <CFormInput type="text" id="inputName" value={link} onChange={(e) => setLink(e.target.value)} />
                            </CCol>
                            
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputState">Tiêu đề</CFormLabel>
                                <CFormInput type="text" id="inputName" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputState">Type</CFormLabel>
                                <CFormInput type="text" id="inputName" value={type} onChange={(e) => setType(e.target.value)} />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputCity">Chi tiết</CFormLabel>
                                <CFormTextarea
                                    id="exampleFormControlTextarea1"
                                    rows={3}
                                    value={detail} onChange={(e) => setDetail(e.target.value)}
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

export default CreatePage;
