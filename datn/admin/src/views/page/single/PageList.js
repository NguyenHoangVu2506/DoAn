import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { CButton, CFormSwitch } from '@coreui/react';
import { toast } from "react-toastify";
import CIcon from '@coreui/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { cilDelete, cilPencil, cilPlus, cilTrash } from '@coreui/icons';
import { PagePublished, PageUnPublished, TrashPage, getListPage } from '../../../store/actions/page-actions';
function PageList() {
    const dispatch = useDispatch();
    const { allPage } = useSelector((state) => state.pageReducer);
    useEffect(() => {
        if (!allPage) {
            dispatch(getListPage({ sort: 'ctime' }));
        }
    }, [dispatch, allPage]);
    console.log(allPage)
    const handleSwitchChange = (pageId, isPublished) => {
        console.log(pageId)
        console.log(isPublished)

        if (isPublished) {
            dispatch(PageUnPublished({ page_id: pageId, isPublished: true }));
            toast.success("Ẩn trang đơn thành công!");

        } else {
            dispatch(PagePublished({ page_id: pageId, isPublished: false }));
            toast.success("Hiện trang đơn thành công!");

        }
    };
    const handleTrash = (pageId) => {
        dispatch(TrashPage({ page_id: pageId, isDeleted: false }));
        toast.success("Xóa vào thùng rác thành công!");

    };

    return (
        <div className=" admin content-wrapper">
            <section className="content">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-begin">
                                    <Link to='/page/createpage'>
                                        <CButton color="primary" variant="outline" className="me-md-2">
                                            <CIcon icon={cilPlus} title="Store page" />
                                            Thêm trang đơn
                                        </CButton>
                                    </Link>
                                    <Link to='/page/list-trash'>
                                        <CButton color="danger" variant="outline" className="me-md-2">
                                            <CIcon icon={cilTrash} title="Store page" /> Thùng rác
                                        </CButton>
                                    </Link>
                                </div>
                                <hr />
                                <table className="table ">
                                    <thead>
                                        <tr>
                                            <th className="text-left" style={{ width: "70px" }}>Hình ảnh</th>
                                            <th className="text-left" style={{ width: "130px" }}>Tên</th>
                                            <th className="text-left" style={{ width: "130px" }}>Tiêu đề</th>
                                            <th className="text-left" style={{ width: "130px" }}>Page_type</th>
                                            <th className="text-left" style={{ width: "70px" }}>Ẩn/Hiện</th>
                                            <th className="text-left" style={{ width: "160px" }}>Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allPage && allPage.map((item, index) => (
                                            <tr className="datarow" key={index}>
                                                <td>
                                                    <img src={item.page_image} alt={item.page_name} style={{ width: "70px" }} />
                                                </td>
                                                <td className="text-left">
                                                    {item.page_name}
                                                </td>
                                                <td className="text-left">

                                                    {item.page_title
                                                    }

                                                </td>
                                                <td className="text-left">{item.page_type}</td>
                                                <td className="text-left">
                                                    <CFormSwitch
                                                        id={`formSwitchCheckDefault-${item._id}`}
                                                        checked={item.isPublished}
                                                        onChange={() => handleSwitchChange(item._id, item.isPublished)}
                                                    />
                                                </td>

                                                <td>
                                                    <div className="function_style">
                                                        <Link to={`/page/updatepage/${item._id}`} className="btn btn-sm"><CIcon icon={cilPencil} title="Store page" /> Chỉnh sửa</Link> |
                                                        <button className="btn btn-sm" onClick={() => handleTrash(item._id)}><CIcon icon={cilDelete} title="Store page" /> Xoá</button>
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

export default PageList;