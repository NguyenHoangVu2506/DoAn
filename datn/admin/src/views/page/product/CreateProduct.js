import React, { useEffect, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormCheck,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CFormTextarea,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axio';
import apiUploadFile from '../../../service/apiUploadFile';
import apiProduct from '../../../service/apiProduct';
import apiCategory from '../../../service/categoryservice';
import apiBrand from '../../../service/apiBrand';

const CreateProduct = () => {
    const [products, setProduct] = useState([]);
    const [categorys, setCategory] = useState([]);
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
    const [image, setImage] = useState('');
    const [created_at, setCreated_at] = useState(1714805879000);
    const [updated_at, setUpdated_at] = useState(1714805879000);
    const [created_by, setCreated_by] = useState(0);
    const [updated_by, setUpdated_by] = useState(0);

    const navigate = useNavigate();
    const [tamp, setTamp] = useState();

    useEffect(() => {
        apiCategory.getAll().then((res) => {
            try {
                const data = res.data;
                const categoryData = data.map((item) => {
                    // if(item.status === 2){
                    //     setNameButton('Hien')
                    // }
                    return {
                        id: item.id,
                        name: item.name,
                       
                    }
                });
                setCategory(categoryData);
                // setQtyCat(res.qty_categories);
                // setQtyTrash(res.qty_trash);
                setTamp();
            } catch (e) {
                console.log(e);
            }
        })
    }, [tamp])
    useEffect(() => {
        apiBrand.getAll().then((res) => {
            try {
                const data = res.data;
                const brandData = data.map((item) => {
                    // if(item.status === 2){
                    //     setNameButton('Hien')
                    // }
                    return {
                        id: item.id,
                        name: item.name,
                    }
                });
                setBrand(brandData);
                console.log(brandData)
                // setQtyCat(res.qty_categories);
                // setQtyTrash(res.qty_trash);
                
            } catch (e) {
                console.log(e);
            }
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const image = document.querySelector("#image");
        if (name !== '') {
            e.preventDefault();
            const product = {
                name: name,
                category_id: category_id,
                brand_id: brand_id,
                detail:detail,
                qty:qty,
                price:price,
                description: description,
                metakey: metakey,
                status: status,
                slug: slug,
                metadesc: metadesc,
                created_by: created_by,
                updated_by: updated_by,
                image: "",
            };
            let file = new FormData();
            file.append("files", image.files[0]);
            axiosInstance.enableUploadFile(); 
            apiUploadFile.uploadFile(file)
                .then(async (res) => {
                    let filename = res.data.filename;
                    product.image = filename;

                    axiosInstance.enableJson();
                    await apiProduct.createProduct(product).then((res) => {
                        console.log(res.data)

                        if (res.data != null) {
                            alert("Thêm dữ liệu thành công !")
                            navigate('/product/productlist/1/10', { replace: true });

                        }
                        else {
                            alert("Không thành công !")
                        }
                    })
                })
                .catch(e => console.log(e))




        }
        else {
            e.preventDefault();
            alert('Vui lòng nhập đầu đủ thông tin !')
        }
    }
   
    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Thêm Sản phẩm</strong>
                    </CCardHeader>
                    <CCardBody>



                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputName">Tên Sản phẩm</CFormLabel>
                                <CFormInput type="name" id="inputName" value={name} onChange={(e) => setName(e.target.value)} />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputState">Danh mục</CFormLabel>
                                <CFormSelect id="inputState" onChange={(e) => setCategory_id(e.target.value)} value={category_id}>
                                {categorys.map((item, index) => {
                                        return (
                                            <option value={item.id} key={index}>{item.name}</option>
                                        )
                                    })}
                                </CFormSelect>
                            </CCol>
                            <CCol xs={3}>
                                <CFormLabel htmlFor="inputAddress">Giá</CFormLabel>
                                <CFormInput id="inputName" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </CCol>
                            <CCol xs={3}>
                                <CFormLabel htmlFor="inputAddress">Số lượng</CFormLabel>
                                <CFormInput id="inputPhone" value={qty} onChange={(e) => setQty(e.target.value)} />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputState">Thương hiệu</CFormLabel>
                                <CFormSelect id="inputState" onChange={(e) => setSortOrder(e.target.value)} value={brand_id}>
                                    {brands.map((item1, index) => {
                                        return (
                                            <option value={item1.id } key={index}> {item1.name}</option>
                                        )
                                    })}
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
    )
}

export default CreateProduct
