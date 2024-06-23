import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { CButton, CFormSwitch } from '@coreui/react';
import { cilDelete, cilPencil, cilPlus, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { BannerPublished, BannerUnPublished, TrashBanner, getListSlider } from '../../../store/actions';
import { toast } from "react-toastify";

function BannerList() {
    const dispatch = useDispatch();
    const { allSlider } = useSelector((state) => state.sliderReducer);

    useEffect(() => {
        if (!allSlider) {
            dispatch(getListSlider({ sort: 'ctime' }));
        }
    }, [dispatch, allSlider]);

    const handleSwitchChange = (sliderId, isPublished) => {
        if (isPublished) {
            dispatch(BannerUnPublished({ slider_id: sliderId }));
            toast.success("Ẩn banner thành công!");

        } else {
            dispatch(BannerPublished({ slider_id: sliderId }));
            toast.success("Ẩn banner thành công!");

        }
    };

    const handleTrash = (sliderId) => {
        dispatch(TrashBanner({ slider_id: sliderId, isDeleted: false }));
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
                                    <Link to='/banner/createbanner'>
                                        <CButton color="primary" variant="outline" className="me-md-2">
                                            <CIcon icon={cilPlus} title="Add banner" />
                                            Thêm banner
                                        </CButton>
                                    </Link>
                                    <Link to='/banner/list-trash'>
                                        <CButton color="danger" variant="outline" className="me-md-2">
                                            <CIcon icon={cilTrash} title="Trash" /> Thùng rác
                                        </CButton>
                                    </Link>
                                </div>
                                <hr />
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="text-left" style={{ width: "130px" }}>Hình ảnh</th>
                                            <th className="text-left" style={{ width: "130px" }}>Tên banner</th>
                                            <th className="text-left" style={{ width: "220px" }}>Đường dẫn</th>
                                            <th className="text-left" style={{ width: "130px" }}>Vị trí</th>
                                            <th className="text-left" style={{ width: "100px" }}>Ẩn/Hiện</th>
                                            <th className="text-left" style={{ width: "210px" }}>Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allSlider && allSlider.map((item, index) => (
                                            <tr className="datarow" key={index}>
                                                <td className="text-left">
                                                    <img src={item.slider_image} alt={item.name} style={{ width: "70px" }} />
                                                </td>
                                                <td>
                                                    <div className="text-left">{item.slider_name}</div>
                                                </td>
                                                <td className="text-left">{item.slider_link}</td>
                                                <td>{item.slider_position}</td>
                                                <td className="text-left">
                                                    <CFormSwitch
                                                        id={`formSwitchCheckDefault-${item._id}`}
                                                        checked={item.isPublished}
                                                        onChange={() => handleSwitchChange(item._id, item.isPublished)}
                                                    />
                                                </td>
                                                <td className="text-left">
                                                    <div className="function_style">
                                                        <Link to={`/banner/updatebanner/${item._id}`} className="btn btn-sm">
                                                            <CIcon icon={cilPencil} title="Edit" /> Chỉnh sửa
                                                        </Link> |
                                                        <button className="btn btn-sm" onClick={() => handleTrash(item._id)}>
                                                            <CIcon icon={cilDelete} title="Delete" /> Xoá
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* Pagination code (if any) */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default BannerList;
