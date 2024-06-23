import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CButton, CFormSwitch } from '@coreui/react';
import { cilPencil, cilPlus, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { BrandPublished, BrandUnPublished, TrashBrand, getListBrand } from '../../../store/actions';
import { toast } from "react-toastify";

function BrandList() {
    const dispatch = useDispatch();
    const { allBrand } = useSelector((state) => state.brandReducer);

    useEffect(() => {
        if (!allBrand) {
            dispatch(getListBrand({ sort: 'ctime' }));
        }
    }, [dispatch, allBrand]);

    const handleSwitchChange = (brandId, isPublished) => {
        if (isPublished) {
            dispatch(BrandUnPublished({ brand_id: brandId, isPublished: true }));
            toast.success("Ẩn thương hiệu thành công!");

        } else {
            dispatch(BrandPublished({ brand_id: brandId, isPublished: false }));
            toast.success("Hiện thương hiệu thành công!");

        }
    };

    const handleTrash = (brandId) => {
        dispatch(TrashBrand({ brand_id: brandId, isDeleted: false }));
        toast.success("Xóa vào thùng rác thành công!");

    };

    return (
        <div className="admin content-wrapper">
            <section className="content">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-begin">
                                    <Link to='/brand/createbrand'>
                                        <CButton color="primary" variant="outline" className="me-md-2">
                                            <CIcon icon={cilPlus} title="Store menu" />
                                            Thêm thương hiệu
                                        </CButton>
                                    </Link>
                                    <Link to='/brand/list-trash'>
                                        <CButton color="danger" variant="outline" className="me-md-2">
                                            <CIcon icon={cilTrash} title="Store menu" /> Thùng rác
                                        </CButton>
                                    </Link>
                                </div>
                                <hr />
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="text-left" style={{ width: "130px" }}>Logo</th>
                                            <th className="text-left" style={{ width: "220px" }}>Tên thương hiệu</th>
                                            <th className="text-left" style={{ width: "130px" }}>Mô tả</th>
                                            {/* <th className="text-left" style={{ width: "130px" }}>Ẩn/Hiện</th> */}
                                            <th className="text-left" style={{ width: "150px" }}>Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(allBrand) && allBrand
                                            .filter(item => !item.isDeleted) // Chỉ hiển thị các thương hiệu chưa bị xóa
                                            .map((item, index) => (
                                                <tr className="datarow" key={index}>
                                                    <td className="text-left">
                                                        <img src={item.brand_image} alt={item.brand_name} style={{ width: "70px" }} />
                                                    </td>
                                                    <td className="text-left">
                                                        <div className="name">{item.brand_name}</div>
                                                    </td>
                                                    <td className="text-left">{item.brand_description}</td>
                                                    {/* <td className="text-left">
                                                        <CFormSwitch
                                                            id={`formSwitchCheckDefault-${item._id}`}
                                                            checked={item.isPublished}
                                                            onChange={() => handleSwitchChange(item._id, item.isPublished)}
                                                        />
                                                    </td> */}
                                                    <td className="text-left">
                                                        <div className="function_style">
                                                            <Link to={`/brand/updatebrand/${item._id}`} className="btn btn-sm">
                                                                <CIcon icon={cilPencil} title="Store menu" /> Chỉnh sửa
                                                            </Link> |
                                                            <button className="btn btn-sm" onClick={() => handleTrash(item._id)}>
                                                                <CIcon icon={cilTrash} title="Delete" /> Xoá
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default BrandList;
