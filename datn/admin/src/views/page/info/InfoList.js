import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    CAvatar,
    CButton,
    CForm,
    CFormInput,
    CFormLabel,
    CInputGroup
} from '@coreui/react';
import avatar8 from '../../../assets/images/avatars/9.jpg';
import { getInfo, updateInfo, uploadSingleImage } from '../../../store/actions';
import './InfoList.css';  // Import the CSS file for custom styles
import CIcon from '@coreui/icons-react';
import { cilPencil } from '@coreui/icons';

function InfoList() {
    const dispatch = useDispatch();
    const { info } = useSelector((state) => state.infoReducer);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        info_name: '',
        info_mail: '',
        info_phone: '',
        info_address: '',
        info_hotline: '',
        info_website: '',
        other_info: '',
        avatar: null,
    });

    useEffect(() => {
        if (!info) {
            dispatch(getInfo({ sort: 'ctime' }));
        } else {
            setFormData({
                info_name: info.info_name || '',
                info_mail: info.info_mail || '',
                info_phone: info.info_phone || '',
                info_address: info.info_address || '',
                info_hotline: info.info_hotline || '',
                info_website: info.info_website || '',
                other_info: info.other_info || '',
                avatar: null,
            });
        }
    }, [dispatch, info]);
console.log(info)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, avatar: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formFile = new FormData();
            if (formData.avatar) {
                formFile.append("file", formData.avatar);
            }
            formFile.append('folderName', 'website/info');
            
            const imageResponse = formData.avatar ? await dispatch(uploadSingleImage(formFile)) : null;
            const imageUrl = imageResponse ? imageResponse.payload.metaData.thumb_url : info.info_logo;

            await dispatch(updateInfo({
                info_id: info._id,
                info_name: formData.info_name,
                info_mail: formData.info_mail,
                info_phone: formData.info_phone,
                info_address: formData.info_address,
                info_hotline: formData.info_hotline,
                info_website: formData.info_website,
                other_info: formData.other_info,
                info_logo: imageUrl
            }));
            alert("Chỉnh sửa thành công!");
            setIsEditing(false);  // Close the form after submission
        } catch (error) {
            console.log(error);
        }
    };
    console.log('Form Data:', formData);
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    return (
        <div className="admin content-wrapper">
            <section className="content">
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title">Thông tin cửa hàng</h2>
                    </div>
                    <div className="card-body">
                        {!isEditing ? (
                            <>
                                <div className="info-header">
                                    <CAvatar src={info?.info_logo || avatar8} size="xl" />
                                    <div className="store-name">{info?.info_name}</div>
                                    <CButton color='warning' variant="outline" onClick={handleEditClick}>
                                        <CIcon icon={cilPencil} /> Chỉnh sửa
                                    </CButton>
                                </div>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <strong>Email:</strong> <span>{info?.info_mail}</span>
                                    </div>
                                    <div className="info-item">
                                        <strong>Số điện thoại:</strong> <span>{info?.info_phone}</span>
                                    </div>
                                    <div className="info-item">
                                        <strong>Địa chỉ:</strong> <span>{info?.info_address}</span>
                                    </div>
                                    <div className="info-item">
                                        <strong>Số điện thoại hotline:</strong> <span>{info?.info_hotline}</span>
                                    </div>
                                    <div className="info-item">
                                        <strong>Link website:</strong> <span><a href={info?.info_website} target="_blank" rel="noopener noreferrer">{info?.info_website}</a></span>
                                    </div>
                                    <div className="info-item">
                                        <strong>Link khác:</strong> <span><a href={info?.other_info} target="_blank" rel="noopener noreferrer">{info?.other_info}</a></span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <CForm onSubmit={handleSubmit}>
                                <div className="info-header">
                                    <CAvatar src={formData.avatar ? URL.createObjectURL(formData.avatar) : (info?.info_logo || avatar8)} size="xl" />
                                    <CInputGroup>
                                        <CFormLabel htmlFor="image">Logo</CFormLabel>
                                        <CFormInput type="file" id="image" name="avatar" onChange={handleImageChange} />
                                    </CInputGroup>
                                </div>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <CFormLabel htmlFor="info_name">Tên cửa hàng</CFormLabel>
                                        <CFormInput type="text" id="info_name" name="info_name" value={formData.info_name} onChange={handleInputChange} />
                                    </div>
                                    <div className="info-item">
                                        <CFormLabel htmlFor="info_mail">Email</CFormLabel>
                                        <CFormInput type="email" id="info_mail" name="info_mail" value={formData.info_mail} onChange={handleInputChange} />
                                    </div>
                                    <div className="info-item">
                                        <CFormLabel htmlFor="info_phone">Số điện thoại</CFormLabel>
                                        <CFormInput type="text" id="info_phone" name="info_phone" value={formData.info_phone} onChange={handleInputChange} />
                                    </div>
                                    <div className="info-item">
                                        <CFormLabel htmlFor="info_address">Địa chỉ</CFormLabel>
                                        <CFormInput type="text" id="info_address" name="info_address" value={formData.info_address} onChange={handleInputChange} />
                                    </div>
                                    <div className="info-item">
                                        <CFormLabel htmlFor="info_hotline">Số điện thoại hotline</CFormLabel>
                                        <CFormInput type="text" id="info_hotline" name="info_hotline" value={formData.info_hotline} onChange={handleInputChange} />
                                    </div>
                                    <div className="info-item">
                                        <CFormLabel htmlFor="info_website">Link website</CFormLabel>
                                        <CFormInput type="text" id="info_website" name="info_website" value={formData.info_website} onChange={handleInputChange} />
                                    </div>
                                    <div className="info-item">
                                        <CFormLabel htmlFor="other_info">Link khác</CFormLabel>
                                        <CFormInput type="text" id="other_info" name="other_info" value={formData.other_info} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="action-buttons">
                                    <CButton type="submit" color="success">Lưu</CButton>
                                    <CButton type="button" color="danger" variant="outline" onClick={handleCancelClick}>Hủy</CButton>
                                </div>
                            </CForm>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default InfoList;
