<<<<<<< HEAD
import React, { useEffect, useState, useRef } from 'react';
=======
import React, { useEffect, useState } from 'react'
>>>>>>> origin/main
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
<<<<<<< HEAD
} from '@coreui/react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, getListBrand, uploadSingleImage, updateSpu, getSpuById } from '../../../store/actions';
import { toast } from "react-toastify";
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
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
    const { id } = useParams();
    const { listCategory } = useSelector((state) => state.categoryReducer);
    const { allBrand } = useSelector((state) => state.brandReducer);
    const navigate = useNavigate(); // Chuyển trang

    useEffect(() => {
        dispatch(getCategory({ sort: 'ctime' }));
        dispatch(getListBrand({ sort: 'ctime' }));
        dispatch(getSpuById(id)).then((res) => {
            const product = res.payload;
            setFormData({
                product_name: product.name,
                product_short_description: product.short_description,
                product_price: product.price,
                product_quantity: product.quantity,
                product_brand: product.brand_id,
                product_unit: product.unit,
                product_detail: product.detail,
                product_category: product.category.map(cat => ({ value: cat._id, label: cat.name })),
                product_attributes: product.attributes,
                product_variations: product.variations,
                product_thumb: product.images,
                sku_list: product.sku_list,
                isDraft: product.isDraft,
                isPublished: product.isPublished,
            });
            setSelectedCategories(product.category.map(cat => ({ value: cat._id, label: cat.name })));
            setImages(product.images);
        });
    }, [dispatch, id]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productData = {
                ...formData,
                product_category: selectedCategories.map(cat => cat.value),
                product_thumb: images.filter(image => image !== null)
            };
            await dispatch(updateSpu(id, productData));
            toast.success("Cập nhật sản phẩm thành công!");
            navigate('/product/productlist');
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
            setFormData({ ...formData, product_unit: '' });
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

=======
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
>>>>>>> origin/main
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
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/main
                                    ))}
                                </CFormSelect>
                            </CCol>
                            <CCol md={6}>
<<<<<<< HEAD
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
                                                    <div className="text-center">Chọn ảnh</div>
                                                )}
                                            </div>
                                            <input
                                                type="file"
                                                ref={(el) => (fileInputRefs.current[index] = el)}
                                                onChange={(e) => handleImageChange(index, e)}
                                                style={{ display: 'none' }}
                                            />
                                            <CButton
                                                type="button"
                                                color="secondary"
                                                variant="outline"
                                                onClick={() => fileInputRefs.current[index].click()}
                                            >
                                                Chọn ảnh
                                            </CButton>
                                        </div>
                                    ))}
                                </div>
                            </CCol>
                            <CCol xs={12}>
                                <CButton type="submit">Lưu thay đổi</CButton>
=======
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
>>>>>>> origin/main
                            </CCol>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
<<<<<<< HEAD
    );
};

export default UpdateProduct;
=======
    )
}

export default UpdateProduct
>>>>>>> origin/main
