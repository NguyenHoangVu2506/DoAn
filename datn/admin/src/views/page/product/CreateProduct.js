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
import { createSpu, getCategory, getListBrand } from '../../../store/actions';
import { getAttribute } from '../../../store/actions/attributes-actions';

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
        sku_list: [],
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

            };
            await dispatch(createSpu(productData));
            // Navigate to product list or show success message
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

    // const handleSelectChange = (e) => {
    //     const { name, value } = e.target;
    //     console.log(name, value); // Để kiểm tra giá trị name và value khi thay đổi
    //     setFormData({ ...formData, [name]: value });
    // };
    const handleSelectChange = (selectedOption) => {
        if (selectedOption) {
            setFormData({ ...formData, product_unit: selectedOption.value });
        } else {
            setFormData({ ...formData, product_unit: '' }); // Xử lý khi không có lựa chọn được chọn
        }
    };

    const toggleClassificationForm = () => {
        setShowClassificationForm(!showClassificationForm);
    };

    const addClassificationGroup = () => {
        setClassificationGroups([...classificationGroups,
        { id: classificationGroups.length + 1, name: '', classifications: [{ id: 1, detail: '' }] }]);
    };

    const removeClassificationGroup = (groupId) => {
        setClassificationGroups(classificationGroups.filter(group => group.id !== groupId));
    };

    const addClassification = (groupId) => {
        setClassificationGroups(classificationGroups.map(group =>
            group.id === groupId ? { ...group, classifications: [...group.classifications, { id: group.classifications.length + 1, detail: '' }] } : group
        ));
    };

    const removeClassification = (groupId, classificationId) => {
        setClassificationGroups(classificationGroups.map(group =>
            group.id === groupId ? { ...group, classifications: group.classifications.filter(classification => classification.id !== classificationId) } : group
        ));
    };

    const handleInputChange = (groupId, classificationId, field, value) => {
        setClassificationGroups(classificationGroups.map(group =>
            group.id === groupId ? {
                ...group, classifications: group.classifications.map(classification =>
                    classification.id === classificationId ? { ...classification, [field]: value } : classification
                )
            } : group
        ));
    };

    const handleGroupNameChange = (groupId, value) => {
        setClassificationGroups(classificationGroups.map(group =>
            group.id === groupId ? { ...group, name: value } : group
        ));
    };

    const handleImageChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const newImages = [...images];
            newImages[index] = URL.createObjectURL(file);
            setImages(newImages);
        }
    };

    const handleSKUPriceChange = (skuTierIdx, value) => {
        // handle SKU price change
    };

    const handleSKUStockChange = (skuTierIdx, value) => {
        // handle SKU stock change
    };

    const defaultVariationTables = [
        {
            id: -1,
            title: (
                <div className="flex items-center justify-center">
                    <i className="icon-image-regular text-[26px]" />
                </div>
            ),
            dataIndex: "image",
            width: 50,
            render: (image, record) => (
                <div className="md:w-full xl:h-[140px] md:h-[80px] h-[50px] w-[50px] flex items-center justify-center pr-2">
                    <input
                        type="file"
                        onChange={(e) => handleImageChange(record.sku_tier_idx, e)}
                    />
                </div>
            ),
        },
        {
            id: 10,
            title: "Tên loại",
            dataIndex: "group_name",
            width: 200,
            render: (group_name, record) => (
                <div>{group_name}</div>
            ),
        },
        {
            id: 15,
            title: "Phân loại",
            dataIndex: "classification_detail",
            width: 200,
            render: (classification_detail, record) => (
                <div>{classification_detail}</div>
            ),
        },
        {
            id: 20,
            title: "Giá",
            dataIndex: "sku_price",
            width: 150,
            render: (sku_price, record) => (
                <div className="flex flex-col">
                    <div className="field-wrapper">
                        <input
                            className="field-input focus:text-left text-center"
                            type="number"
                            onChange={(e) => handleSKUPriceChange(record.sku_tier_idx, e.target.value)}
                            value={sku_price}
                            placeholder=""
                        />
                    </div>
                </div>
            ),
        },
        {
            id: 30,
            title: "Số lượng",
            dataIndex: "sku_stock",
            width: 150,
            render: (sku_stock, record) => (
                <div className="flex flex-col">
                    <div className="field-wrapper">
                        <input
                            className="field-input focus:text-left text-center"
                            type="number"
                            value={sku_stock}
                            onChange={(e) => handleSKUStockChange(record.sku_tier_idx, e.target.value)}
                            placeholder=""
                        />
                    </div>
                </div>
            ),
        },
    ];

    const renderTable = () => {
        return (
            <table className="table mb-4">
                <thead>
                    <tr>
                        {defaultVariationTables.map((column) => (
                            <th key={column.id} style={{ width: column.width }}>
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {classificationGroups.map((group) =>
                        group.classifications.map((classification) => (
                            <tr key={classification.id}>
                                {defaultVariationTables.map((column) => (
                                    <td key={column.id}>
                                        {column.render(
                                            column.dataIndex === 'group_name' ? group.name :
                                                column.dataIndex === 'classification_detail' ? classification.detail :
                                                    formData.product_variations[column.dataIndex],
                                            classification
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        );
    };
    ///////////////////////////////////////

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
                                    onChange={handleSelectChange}
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
                                    onChange={handleSelectChange}  // Đảm bảo rằng hàm này xử lý sự kiện chính xác
                                >
                                    <option value="set">Set</option>
                                    <option value="piece">Piece</option>
                                </CFormSelect>
                            </CCol>
                            {attributeOptions.map(attr => (
                                <CCol md={3} key={attr.value}>
                                    <CFormLabel htmlFor={`inputAttribute-${attr.value}`}>{attr.label}</CFormLabel>
                                    <CFormSelect
                                        id={`inputAttribute-${attr.value}`}
                                        name="product_attributes"
                                        value={formData.product_attributes.find(a => a.attribute_id === attr.value)?.attribute_value[0]?.value_id || ''}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            product_attributes: [
                                                ...formData.product_attributes.filter(a => a.attribute_id !== attr.value),
                                                { attribute_id: attr.value, attribute_value: [{ value_id: e.target.value }] }
                                            ]
                                        })}
                                    >
                                        {attr.options.map(option => (
                                            <option key={option.key} value={option.value}>{option.label}</option>
                                        ))}
                                    </CFormSelect>
                                </CCol>))}


                            <CCol xs={12}>
                                <CButton type="submit" color="primary">Thêm Sản phẩm</CButton>
                            </CCol>

                        </CForm>
                        <br />
                        <CCol xs={12} className="d-grid gap-2 col-6 mx-auto">
                            <CButton type="button" color="outline-secondary" onClick={toggleClassificationForm}>
                                Phân loại sản phẩm
                            </CButton>
                        </CCol>
                        {showClassificationForm && (
                            <div className="mt-3">
                                {classificationGroups.map((group) => (
                                    <CCard className="mb-4" key={group.id}>
                                        <CCardHeader className="d-flex justify-content-between">
                                            <strong>Nhóm phân loại {group.id}</strong>
                                            <CButton
                                                type="button"
                                                color="danger"
                                                onClick={() => removeClassificationGroup(group.id)}
                                            >
                                                Xóa nhóm
                                            </CButton>
                                        </CCardHeader>
                                        <CCardBody>
                                            <CForm>
                                                <CCol md={10}>
                                                    <CFormLabel htmlFor={`groupName-${group.id}`}>Tên loại</CFormLabel>
                                                    <CFormInput
                                                        id={`groupName-${group.id}`}
                                                        value={group.name}
                                                        onChange={(e) => handleGroupNameChange(group.id, e.target.value)}
                                                    />
                                                </CCol>
                                                {group.classifications.map((classification, index) => (
                                                    <CRow key={classification.id} className="mb-3">
                                                        <CCol md={10}>
                                                            <CFormLabel htmlFor={`classificationDetail-${group.id}-${classification.id}`}>
                                                                Phân loại
                                                            </CFormLabel>
                                                            <CFormInput
                                                                id={`classificationDetail-${group.id}-${classification.id}`}
                                                                value={classification.detail}
                                                                onChange={(e) =>
                                                                    handleInputChange(group.id, classification.id, 'detail', e.target.value)
                                                                }
                                                            />
                                                        </CCol>
                                                        {index !== 0 && (
                                                            <CCol md={2} className="d-flex align-items-end">
                                                                <CButton
                                                                    type="button"
                                                                    color="danger"
                                                                    onClick={() => removeClassification(group.id, classification.id)}
                                                                >
                                                                    Xóa
                                                                </CButton>
                                                            </CCol>
                                                        )}
                                                    </CRow>
                                                ))}
                                                <CCol xs={12} className="d-grid gap-2 col-6 mx-auto">
                                                    <CButton type="button" color="outline-secondary" onClick={() => addClassification(group.id)}>
                                                        Thêm Phân loại
                                                    </CButton>
                                                </CCol>
                                            </CForm>
                                        </CCardBody>
                                    </CCard>
                                ))}
                                <CCol xs={12} className="d-grid gap-2 col-6 mx-auto mt-2">
                                    <CButton type="button" color="outline-secondary" onClick={addClassificationGroup}>
                                        Thêm nhóm phân loại
                                    </CButton>
                                </CCol>
                            </div>
                        )}
                        {renderTable()}
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default CreateProduct;
