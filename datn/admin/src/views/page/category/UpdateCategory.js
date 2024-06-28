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
import { useDispatch, useSelector } from 'react-redux';
import { CategoryStore, CategoryUpdate, getCategory, getCategoryById, uploadSingleImage } from '../../../store/actions';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateCategory = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { createCategory } = useSelector((state) => state.userReducer);
    const { listCategory } = useSelector((state) => state.categoryReducer);
    const { listCateById } = useSelector((state) => state.categoryReducer);

    useEffect(() => {
        if (!listCategory) {
            dispatch(getCategory({ sort: 'ctime' }));
        }
    }, [dispatch, listCategory]);

    const [name, setName] = useState('');
    const [parent_id, setParent_Id] = useState(0);
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (!listCateById) {
            dispatch(getCategoryById({ category_id: id }));
        } else {
            setName(listCateById.category_name || '');
            setParent_Id(listCateById.parent_id || '');
            setDescription(listCateById.category_description || 'slider-main');
            setImage(listCateById.category_image || '');
        }
    }, [dispatch, listCateById]);

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
            formFile.append('folderName', 'website/category')
            const image = await dispatch(uploadSingleImage(formFile))
            image && dispatch(CategoryUpdate({ category_id: id, category_name: name, category_description: description, category_image: image?.payload?.metaData?.thumb_url, parent_id: parent_id, isPublished: true }))
            toast.success("Cập nhật danh mục thành công!");

            navigate('/category/categorylist')

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Chỉnh sửa danh mục</strong>
                    </CCardHeader>
                    <div className="card-header text-right ">
                        <Link to="/category/categorylist" className="btn btn-sm btn-info text-white">
                            <i className="fa fa-reply me-1" aria-hidden="true"></i>
                            Quay lại
                        </Link>
                    </div>
                    <CCardBody>
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputName">Tên danh mục</CFormLabel>
                                <CFormInput type="text" id="inputName" value={name} onChange={(e) => setName(e.target.value)} />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputState">Danh mục cha</CFormLabel>
                                <CFormSelect id="inputState" onChange={(e) => setParent_Id(e.target.value)} value={parent_id}>
                                    {Array.isArray(listCategory) && listCategory.map((item, index) => (
                                        <option value={item._id} key={index}>{item.category_name}</option>
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
                                <CFormInput type="file" id="image" />
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

export default UpdateCategory;
