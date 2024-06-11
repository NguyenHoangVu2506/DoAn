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
import { useParams, useNavigate } from "react-router-dom";
import apiProduct from '../../../service/apiProduct';
import apiBrand from '../../../service/apiBrand';
import axiosInstance from '../../../axio';
import apiUploadFile from '../../../service/apiUploadFile';

const UpdateProduct = () => {
    const navigate = useNavigate(); // chuyen trang
    const { id } = useParams();
    const [data, setData] = useState([]);

    const [categorys, setCategorys] = useState([]);
    const [brands, setBrand] = useState([]);

    const [name, setName] = useState('');
    const [category_id, setCategory_id] = useState(1);
    const [brand_id, setBrand_id] = useState(1);
    const [qty, setQty] = useState('');
    const [price, setPrice] = useState('');
    const [detail, setDetail] = useState('');

    const [description, setDescription] = useState('');
    const [metakey, setMetakey] = useState('');
    const [status, setStatus] = useState(2);
    const [slug, setSlug] = useState('a');
    const [metadesc, setMetadesc] = useState('a');
    const [image, setImage] = useState(null);
    const [created_at, setCreated_at] = useState(1714805879000);
    const [updated_at, setUpdated_at] = useState(1714805879000);
    const [created_by, setCreated_by] = useState(0);
    const [updated_by, setUpdated_by] = useState(0);

    useEffect(() => {       
        apiCategory.getAll().then((res) => {
            try {
                console.log(res);
                const categoryData = res.data.map((item) => {

                    return {
                        id: item.id,
                        name: item.name,
                    }
                });
                setCategorys(categoryData);
            } catch (e) {
                console.log(e);
            }
        })
    }, [])
    useEffect(() => {
        apiBrand.getAll().then((res) => {
            try {
                const data = res.data;
                const brandData = data.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                    }
                });
                setBrand(brandData);
                console.log(brandData)
            } catch (e) {
                console.log(e);
            }
        })
    }, [])
    useEffect(() => {
        apiProduct.getProductById(id).then((res) => {
            try {
                if (res.data) { // Kiểm tra nếu res.data tồn tại
                    console.log(res.data)
                    const productData = res.data;
                    setName(productData.name);
                    setQty(productData.qty);
                    setPrice(productData.price);
                    setDetail(productData.detail);
                    setBrand_id(productData.brand_id);
                    setCategory_id(productData.category_id);
                    setStatus(productData.status);
                    // Đặt các biến trạng thái khác cần thiết
                }
            } catch (e) {
                console.log(e);
            }
        });
    }, [id]); // Bao gồm id trong mảng phụ thuộc để kích hoạt useEffect khi id thay đổi
        const handleSubmit = async (e) => {
        e.preventDefault();

        if (name !== '') {
            const product = {
                name: name,
                category_id: category_id,
                brand_id: brand_id,
                detail: detail,
                qty: qty,
                price: price,
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
                    product.image = filename;
                } catch (e) {
                    console.log(e);
                    alert("File upload failed!");
                    return;
                }
                axiosInstance.enableJson();
            }

            try {
                const res = await apiProduct.updateProduct(product, id);
                console.log(res.data);

                if (res.data) {
                    alert("Chỉnh sửa liệu thành công !");
                    navigate('/product/productlist/1/10', { replace: true });
                } else {
                    alert("Không thành công !");
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            alert('Vui lòng nhập đầy đủ thông tin !');
        }
    }
    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Chỉnh sửa sản phẩm</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputName">Tên sản phẩm</CFormLabel>
                                <CFormInput type="text" id="inputName" value={name} onChange={(e) => setName(e.target.value)} />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputState">Danh mục </CFormLabel>
                                <CFormSelect id="inputState" value={category_id} onChange={(e) => setCategory_id(e.target.value)} >
                                    {categorys.map((item, index) => (
                                        <option value={item.id} key={index}>{item.name}</option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                            <CCol xs={3}>
                                <CFormLabel htmlFor="inputAddress">Giá</CFormLabel>
                                <CFormInput id="inputAddress" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </CCol>
                            <CCol xs={3}>
                                <CFormLabel htmlFor="inputAddress">Số lượng</CFormLabel>
                                <CFormInput id="inputAddress" value={qty} onChange={(e) => setQty(e.target.value)} />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputState">Thương hiệu</CFormLabel>
                                <CFormSelect id="inputState" value={brand_id} onChange={(e) => setBrand_id(e.target.value)} >
                                    {brands.map((item1, index) => (
                                        <option value={item1.id} key={index}>{item1.name}</option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputCity">Chi tiết</CFormLabel>
                                <CFormTextarea
                                    id="exampleFormControlTextarea1"
                                    rows={3}
                                    value={detail} onChange={(e) => setDetail(e.target.value)}
                                ></CFormTextarea>
                            </CCol>
                            <CCol md={3}>
                                <CFormLabel htmlFor="formFile">Hình ảnh</CFormLabel>
                                <CFormInput type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />
                            </CCol>
                            <CCol md={3}>
                                <CFormLabel htmlFor="inputState">Trạng thái</CFormLabel>
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
    )
}

export default UpdateProduct
