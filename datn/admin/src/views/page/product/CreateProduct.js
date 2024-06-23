import React, { useState, useRef, useEffect } from 'react';
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
} from '@coreui/react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { createSpu, getCategory, getListBrand, uploadSingleImage } from '../../../store/actions';
import { getAttribute } from '../../../store/actions/attributes-actions';
import { toast } from "react-toastify";

const CreateProduct = () => {
    const [showClassificationForm, setShowClassificationForm] = useState(false);
    const [classificationGroups, setClassificationGroups] = useState([
        { id: 1, name: '', classifications: [{ id: 1, detail: '' }] }
    ]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [images, setImages] = useState([null, null, null]);
    const fileInputRefs = useRef([]);
    const [formData, setFormData] = useState({
        product_name: '',
        product_short_description: '',
        product_price: '',
        product_quantity: '',
        product_brand: '',
        product_unit: '',
        product_detail: '',
        product_category: [],
        product_attributes: [],
        product_variations: [],
        product_thumb: [],
        sku_list: [],
        isDraft: true,
        isPublished: true,

    });

    const dispatch = useDispatch();

    const { listCategory } = useSelector((state) => state.categoryReducer);
    const { allBrand } = useSelector((state) => state.brandReducer);
    const { attribute } = useSelector((state) => state.attributeReducer);

    useEffect(() => {
        if (!listCategory) {
            dispatch(getCategory({ sort: 'ctime' }));
        }
    }, [dispatch, listCategory]);

    useEffect(() => {
        if (!allBrand) {
            dispatch(getListBrand({ sort: 'ctime' }));
        }
    }, [dispatch, allBrand]);

    useEffect(() => {
        if (!attribute) {
            dispatch(getAttribute({ sort: 'ctime' }));
        }
    }, [dispatch, attribute]);

    const categoryOptions = listCategory
        ? listCategory.map(category => ({
            value: category._id,
            label: category.category_name
        }))
        : [];

    const brandOptions = allBrand
        ? allBrand.map(brand => ({
            value: brand._id,
            label: brand.brand_name
        }))
        : [];

    const attributeOptions = attribute ? attribute.map(attr => ({
        value: attr._id,
        label: attr.attribute_name,
        options: attr.attribute_value.map(option => ({
            value: option._id,
            label: option.attribute_value,
            key: `${attr._id}-${option._id}`
        }))
    })) : [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productData = {
                ...formData,
                product_category: selectedCategories.map(cat => cat.value),
                product_thumb: images.filter(image => image !== null)
            };
            await dispatch(createSpu(productData));
            // Navigate to product list or show success message
            toast.success("Thêm sản phẩm thành công!");
            navigate('/product/productlist')

        } catch (error) {
            console.log(error);
        }
    };

    const handleCategoryChange = (selectedOptions) => {
        setSelectedCategories(selectedOptions);
    };

    const handleInputProductChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (selectedOption) => {
        if (selectedOption) {
            setFormData({ ...formData, product_unit: selectedOption.value });
        } else {
            setFormData({ ...formData, product_unit: '' }); // Xử lý khi không có lựa chọn được chọn
        }
    };

    const handleImageChange = async (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const formFile = new FormData();
            formFile.append("file", file);
            formFile.append("folderName", "website/category");
            const imageResponse = await dispatch(uploadSingleImage(formFile));
            const imageUrl = imageResponse.payload.metaData.thumb_url;
            const updatedImages = [...images];
            updatedImages[index] = imageUrl;
            setImages(updatedImages);
        }
    };

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Thêm sản phẩm</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            <CCol md={6}>
                                <CFormLabel htmlFor="product_name">Tên Sản phẩm</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="product_name"
                                    name="product_name"
                                    value={formData.product_name}
                                    onChange={handleInputProductChange}
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="product_category">Danh mục</CFormLabel>
                                <Select
                                    id="product_category"
                                    isMulti
                                    options={categoryOptions}
                                    value={selectedCategories}
                                    onChange={handleCategoryChange}
                                />
                            </CCol>
                            <CCol xs={3}>
                                <CFormLabel htmlFor="product_price">Giá</CFormLabel>
                                <CFormInput
                                    type="number"
                                    id="product_price"
                                    name="product_price"
                                    value={formData.product_price}
                                    onChange={handleInputProductChange}
                                />
                            </CCol>
                            <CCol xs={3}>
                                <CFormLabel htmlFor="product_quantity">Số lượng</CFormLabel>
                                <CFormInput
                                    type="number"
                                    id="product_quantity"
                                    name="product_quantity"
                                    value={formData.product_quantity}
                                    onChange={handleInputProductChange}
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="product_brand">Thương hiệu</CFormLabel>
                                <CFormSelect
                                    id="product_brand"
                                    name="product_brand"
                                    value={formData.product_brand}
                                    onChange={(e) => setFormData({ ...formData, product_brand: e.target.value })}
                                >
                                    <option value="">Chọn thương hiệu</option>
                                    {brandOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="product_detail">Chi tiết</CFormLabel>
                                <CFormTextarea
                                    id="product_detail"
                                    name="product_detail"
                                    rows={3}
                                    value={formData.product_detail}
                                    onChange={handleInputProductChange}
                                />
                            </CCol>
                            <CCol md={3}>
                                <CFormLabel htmlFor="product_unit">Đơn vị</CFormLabel>
                                <CFormSelect
                                    id="product_unit"
                                    name="product_unit"
                                    value={formData.product_unit}
                                    onChange={handleSelectChange}
                                >
                                    <option value="set">Set</option>
                                    <option value="piece">Piece</option>
                                </CFormSelect>
                            </CCol>

                            <CCol md={3} className='mb-2'>
                                <CFormLabel htmlFor="isDraft">Trạng thái</CFormLabel>
                                <CFormSelect
                                    id="isDraft"
                                    name="isDraft"
                                    value={formData.isDraft}
                                    onChange={(e) => setFormData({ ...formData, isDraft: e.target.value })}
                                >
                                    <option value="false">Lưu trực tiếp</option>
                                    <option value="true">Lưu vào bản nháp</option>
                                </CFormSelect>
                            </CCol>

                            <CCol md={6}>
                                <CFormLabel htmlFor="product_thumb">Hình ảnh</CFormLabel>
                                <div className="d-flex flex-wrap gap-2">
                                    {images.map((image, index) => (
                                        <div key={index} className="d-flex flex-column align-items-center">
                                            <div className="border rounded-4 mb-2" style={{ width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {image ? (
                                                    <img src={image} alt={`Selected ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <span>Chọn ảnh</span>
                                                )}
                                            </div>
                                            <input
                                                type="file"
                                                ref={el => fileInputRefs.current[index] = el}
                                                onChange={(e) => handleImageChange(index, e)}
                                                style={{ display: 'none' }}
                                            />
                                            <CButton size="sm" onClick={() => fileInputRefs.current[index].click()}>Chọn ảnh</CButton>
                                        </div>
                                    ))}
                                </div>
                            </CCol>

                            <CCol xs={12}>
                                <CButton type="submit" color="primary">Thêm Sản phẩm</CButton>
                            </CCol>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default CreateProduct;
