import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CButton } from '@coreui/react';
import { cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { getListBrand } from '../../../store/actions';

function BrandList() {
    const dispatch = useDispatch();
    const { allBrand } = useSelector((state) => state.brandReducer);

    useEffect(() => {
        if (!allBrand) {
            dispatch(getListBrand({ sort: 'ctime' }));
        }
    }, [dispatch, allBrand]);

    return (
        <div className="admin content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <h1 className="d-inline">Danh sách thương hiệu<sup></sup></h1>
                        </div>
                        <div className="col-sm-1 mt-2 text-right">
                            <Link className="action-btn" to="/brand/list-trash" style={{ color: "red" }}>
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
                                    <Link to='/brand/createbrand'>
                                        <CButton color="primary" className="me-md-2">Thêm Thương hiệu</CButton>
                                    </Link>
                                </div>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ width: "30px" }}></th>
                                            <th className="text-center" style={{ width: "30px" }}>Id</th>
                                            <th className="text-center" style={{ width: "130px" }}>Logo</th>
                                            <th style={{ width: "220px" }}>Tên thương hiệu</th>
                                            <th className="text-center" style={{ width: "130px" }}>Mô tả</th>
                                            <th className="text-center" style={{ width: "150px" }}>Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(allBrand) && allBrand.map((item, index) => (
                                            <tr className="datarow" key={index}>
                                                <td><input type="checkbox" /></td>
                                                <td>{item._id}</td>
                                                <td>
                                                    <img src={item.brand_image} alt={item.brand_name} style={{ width: "70px" }} />
                                                </td>
                                                <td>
                                                    <div className="name">{item.brand_name}</div>
                                                </td>
                                                <td>{item.brand_description}</td>
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

export default BrandList;
