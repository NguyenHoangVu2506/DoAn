import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CButton } from '@coreui/react';
import { cilPencil, cilPlus, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../../store/actions';

function CategoryList() {
    const dispatch = useDispatch();
    const { listCategory } = useSelector((state) => state.categoryReducer);

    useEffect(() => {
        if (!listCategory) {
            dispatch(getCategory({ sort: 'ctime' }));
        }
    }, [dispatch, listCategory]);

    console.log(listCategory);

    return (
        <div className="admin content-wrapper">
            <section className="content">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-begin">
                                    <Link to='/category/createcategory'>
                                        <CButton color="primary" variant="outline" className="me-md-2">
                                            <CIcon icon={cilPlus} title="Store menu" />
                                            Thêm danh mục
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
                                            <th className="text-center" style={{ width: "130px" }}>Hình ảnh</th>
                                            <th style={{ width: "220px" }}>Tên danh mục</th>
                                            <th style={{ width: "220px" }}>Mô tả</th>
                                            <th className="text-center" style={{ width: "130px" }}>Danh mục cha</th>
                                            <th className="text-center" style={{ width: "150px" }}>Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(listCategory) && listCategory.map((item, index) => (
                                            <tr className="datarow" key={index}>
                                                <td>
                                                    <img src={item.category_icon} alt={item.category_name} style={{ width: "70px" }} />
                                                </td>
                                                <td>
                                                    <div className="name">{item.category_name}</div>
                                                </td>
                                                <td>
                                                    <div className="name">{item.category_description}</div>
                                                </td>

                                                <td value={item.parent_id}>{item.category_name}</td>

                                                <td>
                                                    <div className="function_style">
                                                        <Link to={`/category/updatecategory/${item._id}`} className="btn btn-sm">
                                                        <CIcon icon={cilPencil} title="Store menu" /> Chỉnh sửa
                                                        </Link> |
                                                        <button className="btn btn-sm">
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

export default CategoryList;
