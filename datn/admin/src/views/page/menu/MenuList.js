import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { getListMenu } from '../../../store/actions/menu-actions';
import { cilDelete, cilPencil, cilPlus, cilTrash } from '@coreui/icons';
function MenuList() {
    const dispatch = useDispatch();
    const { allMenu } = useSelector((state) => state.menuReducer);
    useEffect(() => {
        if (!allMenu) {
            dispatch(getListMenu({ sort: 'ctime' }));
        }
    }, [dispatch, allMenu]);
    console.log(allMenu)
    return (
        <div className=" admin content-wrapper">
            <section className="content">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-begin">
                                    <Link to='/menu/createmenu'>
                                        <CButton color="primary" variant="outline" className="me-md-2">
                                            <CIcon icon={cilPlus} title="Store menu" />
                                            Thêm Menu
                                        </CButton>
                                    </Link>
                                    <Link to='/menu/createmenu'>
                                        <CButton color="danger" variant="outline" className="me-md-2">
                                            <CIcon icon={cilTrash} title="Store menu" /> Thùng rác
                                        </CButton>
                                    </Link>
                                </div>
                                <hr />
                                <table className="table ">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ width: "130px" }}>Tên</th>
                                            <th className="text-center" style={{ width: "130px" }}>parent_id</th>
                                            <th className="text-center" style={{ width: "220px" }}>menu_link</th>
                                            <th className="text-center" style={{ width: "130px" }}>Vị trí</th>
                                            <th className="text-center" style={{ width: "160px" }}>Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allMenu && allMenu.map((item, index) => (
                                            <tr className="datarow" key={index}>
                                                <td className="text-center">
                                                    {item.menu_name}
                                                </td>
                                                <td className="text-center">
                                                    <div className="name">
                                                        {item.parent_id
                                                        }
                                                    </div>
                                                </td>
                                                <td className="text-center">{item.menu_link}</td>
                                                <td className="text-center">{item.menu_position}</td>
                                                <td>
                                                    <div className="function_style">
                                                        <Link to={`/menu/updatemenu/${item._id}`} className="btn btn-sm"><CIcon icon={cilPencil} title="Store menu" /> Chỉnh sửa</Link> |
                                                        <button className="btn btn-sm"><CIcon icon={cilDelete} title="Store menu" /> Xoá</button>
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

export default MenuList;