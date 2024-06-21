import React, { useEffect, useState } from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { DiscountStore } from '../../../store/actions/discount-actions';
import 'react-datepicker/dist/react-datepicker.css';
import { onAllProduct } from '../../../store/actions';

const CreateDiscount = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { allProducts } = useSelector((state) => state.productReducer);
    useEffect(() => {
        if (!allProducts) {
            dispatch(onAllProduct({ sort: 'ctime' }));
        }
    }, [dispatch, allProducts]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: '',
        value: 0,
        max_value: 0,
        code: '',
        start_date: new Date(),
        end_date: new Date(),
        max_uses: 0,
        uses_count: 0,
        users_used: [],
        max_uses_per_user: 0,
        min_order_value: 0,
        is_active: false,
        applies_to: 'all',
        product_ids: [],
    });
    const [selectedProducts, setSelectedProducts] = useState([]);
    const handleProductChange = (selectedOptions) => {
        // Xử lý thay đổi danh sách sản phẩm được chọn
        setSelectedProducts(selectedOptions);

        // Lấy ra chỉ các giá trị value từ selectedOptions và gán vào product_ids trong formData
        const selectedProductIds = selectedOptions.map(option => option.value);
        setFormData({ ...formData, product_ids: selectedProductIds });
    };

    console.log(formData.start_date)
    console.log(formData.end_date)

    const handleDateChange = (date, fieldName) => {
        setFormData({ ...formData, [fieldName]: date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const addDiscount = await dispatch(DiscountStore(formData));
            if (addDiscount.payload.status === 200 || addDiscount.payload.status === 201) {
                navigate('/discount/discountlist'); // Điều hướng đến danh sách mã giảm giá sau khi thêm thành công
            } else {
            }
        } catch (error) {
        }
    };

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Thêm Mã giảm giá</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            <CCol md={6}>
                                <CFormLabel htmlFor="name"> Tên mã giảm giá</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="VD: Km1, km2, tenkm,..."
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="code">Mã code</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="code"
                                    value={formData.code}
                                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                    placeholder="VD: XXXXX13, SM4V6D, R4K3RVD,..."
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="type">Chọn loại giảm giá</CFormLabel>
                                <CFormSelect
                                    id="type"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option value="percentage">Phần trăm</option>
                                    <option value="fixed_amount">Giá trị cố định</option>
                                </CFormSelect>
                            </CCol>
                            <CCol xs={6}>
                                <CFormLabel htmlFor="value">Giá trị theo loại giảm giá</CFormLabel>
                                <CFormInput
                                    type="number"
                                    id="value"
                                    value={formData.value}
                                    onChange={(e) => setFormData({ ...formData, value: parseInt(e.target.value) })}
                                    placeholder="Nhập giá trị theo loại giảm giá"
                                />
                            </CCol>
                            <CCol xs={6}>
                                <CFormLabel htmlFor="max_value">Giảm giá tối đa</CFormLabel>
                                <CFormInput
                                    type="number"
                                    id="max_value"
                                    value={formData.max_value}
                                    onChange={(e) => setFormData({ ...formData, max_value: parseInt(e.target.value) })}
                                />
                            </CCol>
                            <CCol xs={6}>
                                <CFormLabel htmlFor="min_order_value">Giá trị đơn hàng tối thiểu</CFormLabel>
                                <CFormInput
                                    type="number"
                                    id="min_order_value"
                                    value={formData.min_order_value}
                                    onChange={(e) => setFormData({ ...formData, min_order_value: parseInt(e.target.value) })}
                                    placeholder="Nhập giá trị đơn hàng tối thiểu"
                                />
                            </CCol>
                            <CCol xs={6}>
                                <CFormLabel htmlFor="max_uses">Số lượng mã giảm giá</CFormLabel>
                                <CFormInput
                                    type="number"
                                    id="max_uses"
                                    value={formData.max_uses}
                                    onChange={(e) => setFormData({ ...formData, max_uses: parseInt(e.target.value) })}
                                    placeholder="Nhập số lượng mã giảm giá"
                                />
                            </CCol>

                            <CCol xs={6}>
                                <CFormLabel htmlFor="max_uses_per_user">Số lần sử dụng mã giảm giá / người dùng</CFormLabel>
                                <CFormInput
                                    type="number"
                                    id="max_uses_per_user"
                                    value={formData.max_uses_per_user}
                                    onChange={(e) => setFormData({ ...formData, max_uses_per_user: parseInt(e.target.value) })}
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="applies_to">Đối tượng áp dụng</CFormLabel>
                                <Select
                                    id="applies_to"
                                    options={[
                                        { value: 'all', label: 'Tất cả sản phẩm' },
                                        { value: 'specific', label: 'Chọn sản phẩm nhất định' }
                                    ]}
                                    value={formData.applies_to}
                                    onChange={(selectedOption) => setFormData({ ...formData, applies_to: selectedOption.value })}
                                />
                            </CCol>


                            {formData.applies_to === 'specific' && (
                                <CCol md={6}>
                                    <CFormLabel htmlFor="product_ids">Chọn sản phẩm</CFormLabel>
                                    <Select
                                        id="product_ids"
                                        isMulti
                                        options={allProducts.map(product => ({ value: product._id, label: product.product_name }))}
                                        value={selectedProducts}
                                        onChange={handleProductChange}
                                    />
                                </CCol>
                            )}

                            <CCol md={3}>
                                <CFormLabel htmlFor="start_date">Ngày bắt đầu</CFormLabel>
                                <DatePicker
                                    selected={formData.start_date}
                                    id="start_date"
                                    onChange={(date) => handleDateChange(date, 'start_date')}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Chọn ngày"
                                    className="form-control"
                                />
                            </CCol>
                            <CCol md={3}>
                                <CFormLabel htmlFor="end_date">Ngày kết thúc</CFormLabel>
                                <DatePicker
                                    selected={formData.end_date}
                                    id="end_date"
                                    onChange={(date) => handleDateChange(date, 'end_date')}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Chọn ngày"
                                    className="form-control"
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="description">Mô tả</CFormLabel>
                                <CFormTextarea
                                    rows={3}
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </CCol>
                            <CCol md={3}>
                                <CFormLabel htmlFor="is_active">Trạng thái mã</CFormLabel>
                                <CFormSelect
                                    id="is_active"
                                    value={formData.is_active}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.value })}
                                >
                                    <option value={true}>Áp dụng ngay</option>
                                    <option value={false}>Chỉ tạo mã</option>
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
};

export default CreateDiscount;