import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CButton } from '@coreui/react';
import { cilTrash } from '@coreui/icons';
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
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <h1 className="d-inline">Danh sách Danh mục<sup></sup></h1>
                        </div>
                        <div className="col-sm-1 mt-2 text-right">
                            <Link className="action-btn" to="/category/list-trash" style={{ color: "red" }}>
                                <CIcon icon={cilTrash} title="Download file" />
                                <sup className="count ms-1">2</sup>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <Link to='/category/createcategory'>
                                        <CButton color="primary" className="me-md-2">Thêm danh mục</CButton>
                                    </Link>
                                </div>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ width: "30px" }}></th>
                                            <th className="text-center" style={{ width: "30px" }}>Id</th>
                                            <th className="text-center" style={{ width: "130px" }}>Hình ảnh</th>
                                            <th style={{ width: "220px" }}>Tên danh mục</th>
                                            <th className="text-center" style={{ width: "130px" }}>Danh mục cha</th>
                                            <th className="text-center" style={{ width: "150px" }}>Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(listCategory) && listCategory.map((item, index) => (
                                            <tr className="datarow" key={index}>
                                                <td><input type="checkbox" /></td>
                                                <td>{item._id}</td>
                                                <td>
                                                    <img src={item.category_icon} alt={item.category_name} style={{ width: "70px" }} />
                                                </td>
                                                <td>
                                                    <div className="name">{item.category_name}</div>
                                                </td>
                                                <td value={item.parent_id}>{item.category_name}</td>

                                                <td>
                                                    <div className="function_style">
                                                        <Link to="" className="btn btn-sm">
                                                            <i className="fa fa-edit me-1"></i>Chỉnh sửa
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
