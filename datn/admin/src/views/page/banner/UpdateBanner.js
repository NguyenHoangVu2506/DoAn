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
import apiUploadFile from '../../../service/apiUploadFile';
import axiosInstance from '../../../axio';
import { data } from 'autoprefixer';
import apiBanner from '../../../service/apiBanner';

const UpdateBanner = () => {
    const navigate = useNavigate(); // chuyen trang
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('/');
    const [position, setPosition] = useState('slider-main');
    const [status, setStatus] = useState(2);
    const [image, setImage] = useState('');
    const [created_at, setCreated_at] = useState();
    const [updated_at, setUpdated_at] = useState();
    const [created_by, setCreated_by] = useState(0);
    const [updated_by, setUpdated_by] = useState(0);

    useEffect(() => {
        apiBanner.getOne(id).then((res) => {
            try {
                const dataCate = res.data; // hoặc res.response.data
                console.log(dataCate);
                setName(dataCate.name);
                setLink(dataCate.link);
                setPosition(dataCate.position);
                setStatus(dataCate.status);
                setDescription(dataCate.description);
    
            } catch (e) {
                console.log(e);
            }
        });
    }, [id]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name !== '') {
            const banner = {
                
                    name: name,
                    description: description,
                    status: status,
                    link: link,
                    position: position,
                    created_by: created_by,
                    updated_by: updated_by,
                    image: "",
            };

            if (image) {
                let file = new FormData();
                file.append("files", image);
                axiosInstance.enableUploadFile();
                try {
                    const res = await apiUploadFile.uploadFile(file);
                    let filename = res.data.filename;
                    banner.image = filename;
                } catch (e) {
                    console.log(e);
                    alert("File upload failed!");
                    return;
                }
                axiosInstance.enableJson();
            }

            await apiBanner.updateBanner(banner, id).then((res) => {
                if (res.data != null) {
                    alert("Cập nhật dữ liệu thành công !");
                    navigate('/banner/bannerlist', { replace: true });
                } else {
                    alert("Không thành công !");
                }
            });
        } else {
            alert('Vui lòng nhập đầy đủ thông tin!');
        }
    }
console.log(name)
    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Chỉnh sửa banner</strong>
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
                                <CFormLabel htmlFor="inputCity">Mô tả</CFormLabel>
                                <CFormTextarea
                                    id="exampleFormControlTextarea1"
                                    rows={3}
                                    value={description} onChange={(e) => setDescription(e.target.value)}
                                ></CFormTextarea>
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
                                <CFormLabel htmlFor="formFile">Hình ảnh</CFormLabel>
                                <CFormInput type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />
                            </CCol>
                            <CCol md={6}>
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
    );
}

export default UpdateBanner;
