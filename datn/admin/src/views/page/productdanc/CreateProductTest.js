import React, { useState, useRef } from 'react';
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

const CreateProductTest = () => {
    const [showClassificationForm, setShowClassificationForm] = useState(false);
    const [classificationGroups, setClassificationGroups] = useState([
        { id: 1, name: '', classifications: [{ id: 1, detail: '' }] }
    ]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [images, setImages] = useState([null, null, null]);
    const fileInputRefs = useRef([]);

    const toggleClassificationForm = () => {
        setShowClassificationForm(!showClassificationForm);
    };

    const handleCategoryChange = (selectedOptions) => {
        setSelectedCategories(selectedOptions);
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

    const handleImageClick = (index) => {
        fileInputRefs.current[index].click();
    };

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Thêm Sản phẩm</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm className="row g-3">
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputName">Tên Sản phẩm</CFormLabel>
                                <CFormInput type="text" id="inputName" />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputCategory">Danh mục</CFormLabel>
                                <Select
                                    id="inputCategory"
                                    isMulti
                                    options={[
                                        { value: '1', label: 'Sữa rửa mặt' },
                                        { value: '2', label: 'Nước tẩy trang' }
                                    ]}
                                    value={selectedCategories}
                                    onChange={handleCategoryChange}
                                />
                            </CCol>
                            <CCol xs={3}>
                                <CFormLabel htmlFor="inputPrice">Giá</CFormLabel>
                                <CFormInput type="number" id="inputPrice" />
                            </CCol>
                            <CCol xs={3}>
                                <CFormLabel htmlFor="inputQuantity">Số lượng</CFormLabel>
                                <CFormInput type="number" id="inputQuantity" />
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputBrand">Thương hiệu</CFormLabel>
                                <CFormSelect id="inputBrand">
                                    <option value="1">hasaki</option>
                                </CFormSelect>
                            </CCol>
                            <CCol md={6}>
                                <CFormLabel htmlFor="inputDetails">Chi tiết</CFormLabel>
                                <CFormTextarea
                                    id="inputDetails"
                                    rows={3}
                                ></CFormTextarea>
                            </CCol>
                            <CCol md={3}>
                                <CFormLabel htmlFor="inputUnit">Đơn vị</CFormLabel>
                                <CFormSelect id="inputUnit">
                                    <option value="1">Cái</option>
                                    <option value="2">Hộp</option>
                                    </CFormSelect>
                            </CCol>
                            <CCol md={3}>
                                <CFormLabel htmlFor="inputWeight">Khối lượng</CFormLabel>
                                <CFormSelect id="inputWeight">
                                    <option value="1">50 ml</option>
                                    <option value="2">150 ml</option>
                                </CFormSelect>
                            </CCol>
                           
                        </CForm>
                        <br />
                        <CCol xs={12} className="d-grid gap-2 col-6 mx-auto ">
                            <CButton type="button" color="outline-secondary" onClick={toggleClassificationForm}>
                                Phân loại sản phẩm
                            </CButton>
                        </CCol>
                        {showClassificationForm && (
                            <div className="mt-3">
                                {classificationGroups.map(group => (
                                    <CCard className="mb-4" key={group.id}>
                                        <CCardHeader className="d-flex justify-content-between">
                                            <strong>Nhóm phân loại {group.id}</strong>
                                            <CButton type="button" color="danger" onClick={() => removeClassificationGroup(group.id)}>
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
                                                            <CFormLabel htmlFor={`classificationDetail-${group.id}-${classification.id}`}>Phân loại</CFormLabel>
                                                            <CFormInput
                                                                id={`classificationDetail-${group.id}-${classification.id}`}
                                                                value={classification.detail}
                                                                onChange={(e) => handleInputChange(group.id, classification.id, 'detail', e.target.value)}
                                                            />
                                                        </CCol>
                                                        {index !== 0 && (
                                                            <CCol md={2} className="d-flex align-items-end">
                                                                <CButton type="button" color="danger" onClick={() => removeClassification(group.id, classification.id)}>
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
                                <CCol xs={12} className="d-grid gap-2 col-6 mx-auto mt-2 ">
                                    <CButton type="button" color="outline-secondary" onClick={addClassificationGroup}>
                                        Thêm nhóm phân loại
                                    </CButton>
                                </CCol>
                            </div>
                        )}
                    </CCardBody>
                </CCard>
                <table className="table mb-4">
                    <thead>
                        <tr>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Loại da</th>
                            <th scope="col">Chức năng</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Số lượng</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {['Da khô', 'Da dầu', 'Da hỗn hợp'].map((skinType, index) => (
                            <tr key={index}>
                                <td>
                                    <div onClick={() => handleImageClick(index)} style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center', cursor: 'pointer' }}>
                                        {images[index] ? <img src={images[index]} alt="Selected" style={{ maxWidth: '100px', maxHeight: '100px' }} /> : 'Chọn ảnh'}
                                    </div>
                                    <CFormInput
                                        type="file"
                                        id={`image-${index}`}
                                        onChange={(event) => handleImageChange(index, event)}
                                        style={{ display: 'none' }}
                                        ref={(el) => (fileInputRefs.current[index] = el)}
                                    />
                                </td>
                                <td >{skinType}</td>
                                <td style={{textAlign: 'center'}}>{skinType === 'Da khô' ? 'Dưỡng ẩm' : skinType === 'Da dầu' ? 'Làm sạch' : 'Ngăn ngừa mụn'}</td>
                                <td><CFormInput type="number" id={`inputPrice-${index}`} /></td>
                                <td><CFormInput type="number" id={`inputQuantity-${index}`} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CCol>
        </CRow>
    );
};

export default CreateProductTest;
