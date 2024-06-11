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
import apiCategory from '../../../service/categoryservice';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axio';
import apiUploadFile from '../../../service/apiUploadFile';

const CreateCategory = () => {
    const navigate = useNavigate(); // Sử dụng useNavigate để chuyển trang
    const [categorys, setCategorys] = useState([]);

    const [name, setName] = useState('');
    const [parent_id, setParent_Id] = useState(0);
    const [sortOrder, setSortOrder] = useState(0);
    const [description, setDescription] = useState('');
    const [metakey, setMetakey] = useState('');
    const [status, setStatus] = useState(2);
    const [slug, setSlug] = useState('a');
    const [metadesc, setMetadesc] = useState('a');
    const [image, setImage] = useState('');
    const [created_at, setCreated_at] = useState(1714805879000);
    const [updated_at, setUpdated_at] = useState(1714805879000);
    const [created_by, setCreated_by] = useState(0);
    const [updated_by, setUpdated_by] = useState(0);
    const [tamp, setTamp] = useState();

    useEffect(() => {
        apiCategory.getAll().then((res) => {
            try {
                const data = res.data;
                const categoryData = data.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        slug: item.slug,
                        parent: item.parent_id,
                        sort_order: item.sort_order,
                        status: item.status,
                    }
                });
                setCategorys(categoryData);
                setTamp();
            } catch (e) {
                console.log(e);
            }
        });
    }, [tamp]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name !== '') {
            const category = {
                name: name,
                parent_id: parent_id,
                sort_order: sortOrder,
                description: description,
                metakey: metakey,
                status: status,
                slug: slug,
                metadesc: metadesc,
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
                    category.image = filename;
                } catch (e) {
                    console.log(e);
                    alert("Tải lên tệp thất bại!");
                    return;
                }
                axiosInstance.enableJson();
            }

            await apiCategory.createCategory(category).then((res) => {
                if (res.data != null) {
                    alert("Thêm dữ liệu thành công !");
                    navigate('/category/categorylist/1/10', { replace: true }); // Chuyển trang khi thêm thành công
                } else {
                    alert("Không thành công !");
                }
            });
        } else {
            alert('Vui lòng nhập đầu đủ thông tin !');
        }
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Thêm danh mục</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputName">Tên danh mục</CFormLabel>
                                <CFormInput type="text" id="inputName" value={name} onChange={(e) => setName(e.target.value)} />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputState">Danh mục cha</CFormLabel>
                                <CFormSelect id="inputState" onChange={(e) => setParent_Id(e.target.value)} value={parent_id}>
                                    {categorys.map((item, index) => (
                                        <option value={item.id} key={index}>{item.name}</option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                            <CCol xs={6}>
                                <CFormLabel htmlFor="inputAddress">Từ khóa</CFormLabel>
                                <CFormInput id="inputAddress" value={metakey} onChange={(e) => setMetakey(e.target.value)} />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputState">Sắp xếp</CFormLabel>
                                <CFormSelect id="inputState" onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
                                    {categorys.map((item, index) => (
                                        <option value={item.sort_order + 1} key={index}>Sau: {item.name}</option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                            <CCol md={6}>
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
                            <CCol md={3}>
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

export default CreateCategory;
