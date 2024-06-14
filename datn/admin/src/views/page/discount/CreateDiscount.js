import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
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
    CRow,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import apiProduct from '../../../service/apiProduct';
import apiSale from '../../../service/apiSale';

const CreateProductSale = () => {
    const [products, setProducts] = useState([]);
    const [product_id, setProduct_id] = useState(1);
    const [qty_sale, setQty_sale] = useState('');
    const [pricesale, setPriceSale] = useState('');
    const [status, setStatus] = useState(2);
    const [date_begin, setDate_begin] = useState(null);
    const [date_end, setDate_end] = useState(null);

    const navigate = useNavigate();



    useEffect(() => {
        apiProduct.getAll(1, 20).then((res) => {
            try {
                const data = res.data;
                const productData = res.data.map((item) => {
                    return {
                        id: item.id,
                        name: item.attributes.product_name,
                    }
                });
                setProducts(productData);
            } catch (e) {
                console.log(e);
            }
        })
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (product_id && qty_sale && pricesale && date_begin && date_end) {
            const sale = {
                product_id: product_id,
                qty_sale: qty_sale,
                pricesale: pricesale,
                date_begin: date_begin.getTime(), // Convert Date object to timestamp
                date_end: date_end.getTime(), // Convert Date object to timestamp
                status: status,
            };
            console.log(sale); // Debugging output
            console.log(date_end.toISOString()); // Debugging output

            await apiSale.createSale(sale).then((res) => {
                if (res.data != null) {
                    alert("Thêm sản phẩm thành công!");
                    navigate('/productsale/productsalelist', { replace: true });
                } else {
                    alert("Không thành công!");
                }
            });
        } else {
            alert('Vui lòng nhập đầy đủ thông tin!');
        }
    };

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Thêm Sản phẩm giảm giá</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputState">Sản phẩm</CFormLabel>
                                <CFormSelect id="inputState" onChange={(e) => setProduct_id(e.target.value)} value={product_id}>
                                    {products.map((item, index) => (
                                        <option value={item.id} key={index}>{item.name}</option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputName">Giá sale</CFormLabel>
                                <CFormInput type="text" id="inputNumber" value={pricesale} onChange={(e) => setPriceSale(e.target.value)} />
                            </CCol>
                            <CCol xs={6}>
                                <CFormLabel htmlFor="inputAddress">Số lượng</CFormLabel>
                                <CFormInput id="inputName" value={qty_sale} onChange={(e) => setQty_sale(e.target.value)} />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputState">Trang thái</CFormLabel>
                                <CFormSelect id="inputState" value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="1">Xuất bản</option>
                                    <option value="2">Chưa xuất bản</option>
                                </CFormSelect>
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputState">Thời gian bắt đầu</CFormLabel>
                                <DatePicker
                                    selected={date_begin}
                                    onChange={(date) => setDate_begin(date)}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Chọn ngày"
                                    className="form-control"
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputCity">Thời gian kết thúc</CFormLabel>
                                <DatePicker
                                    selected={date_end}
                                    onChange={(date) => setDate_end(date)}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Chọn ngày"
                                    className="form-control"
                                />
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

export default CreateProductSale;
