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
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryStore, getCategory, uploadSingleImage } from '../../../store/actions';
const CreateCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { createCategory } = useSelector((state) => state.userReducer);
    const { listCategory } = useSelector((state) => state.categoryReducer);

    useEffect(() => {
        if (!listCategory) {
            dispatch(getCategory({ sort: 'ctime' }));
        }
    }, [dispatch, listCategory]);

    const [name, setName] = useState('');
    const [parent_id, setParent_Id] = useState(0);
    const [sortOrder, setSortOrder] = useState(0);
    const [description, setDescription] = useState('');

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
            image && dispatch(CategoryStore({ category_name: name, category_description: description, category_icon: image?.payload?.metaData?.thumb_url,parent_id:parent_id, isPublished: true }))
            navigate('/category/categorylist/1/10')

        } catch (error) {
            console.log(error)
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

export default CreateCategory;
