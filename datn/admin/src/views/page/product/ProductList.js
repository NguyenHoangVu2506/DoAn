import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { CButton } from '@coreui/react';
import { cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { onAllProduct } from '../../../store/actions';
function ProductList() {
    const dispatch = useDispatch();
    const { allProducts } = useSelector((state) => state.productReducer);
    useEffect(() => {
        if (!allProducts) {
            dispatch(onAllProduct({ sort: 'ctime' }));
        }
    }, [dispatch, allProducts]);
    console.log(allProducts)
    return (
        <div className=" admin content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <h1 className="d-inline">Danh sách Sản Phẩm<sup></sup></h1>
                        </div>
                        <div className="col-sm-1 mt-2 text-right">
                            <Link className="action-btn" to="/product/list-trash" style={{ color: "red" }}>
                                <CIcon icon={cilTrash} title="Download file" />
                                <sup className="count ms-1"></sup>
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
                                    <Link to='/product/createproduct'>
                                        <CButton color="primary" className="me-md-2">Thêm sản phẩm</CButton>
                                    </Link>
                                </div>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>

                                            <th className="text-center" style={{ width: "30px" }}>
                                                {/* <input type="checkbox" /> */}
                                            </th>
                                            <th className="text-center" style={{ width: "70px" }}>Hình ảnh</th>
                                            <th style={{ width: "220px" }}>Sản phẩm</th>
                                            <th className="text-center" style={{ width: "130px" }}>Loại</th>
                                            <th className="text-center" style={{ width: "130px" }}>Có thể bán</th>
                                            {/* <th className="text-center" style={{ width: "130px" }}>Ngày khởi tạo</th> */}

                                            <th className="text-center" style={{ width: "150px" }}>Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allProducts && allProducts.map((item, index) => (
                                            <tr className="datarow" key={index}>
                                                <td>
                                                    <input type="checkbox" />
                                                </td>
                                                <td>
                                                    <img
                                                        src={item.product_thumb}
                                                        alt={`product_${index}`}
                                                        style={{ width: "70px", marginRight: "5px" }}
                                                    />                                                    </td>
                                                <td>
                                                    <div className="name">
                                                        {item.product_name}
                                                    </div>
                                                </td>
                                                <td>{item.product_category}</td>
                                                <td className='text-center'>{item.product_quantity}</td>
                                                {/* <td className='text-center'>{new Date(item.created_at).toLocaleDateString()}</td> */}
                                                <td>
                                                    <div className="function_style">
                                                        <Link to={`/product/updateproduct/${item.id}`} className="btn btn-sm"><i className="fa fa-edit me-1" ></i>Chỉnh sửa</Link> |
                                                        <Link to={`/product/detailproduct/${item.id}`} className="btn btn-sm"><i className="fa fa-eye me-1"></i>Chi tiết</Link> |
                                                        <button onClick={() => trashProduct(item.id)} className="btn btn-sm"><i className="fa fa-trash me-1"></i>Xoá</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center' }}>
                                <ul className="pagination">
                                    <li className="page-item">
                                        {page > 1 ? (
                                            <Link className="page-link" to={`/product/productlist/${page - 1}/${limit}`}>Previous</Link>
                                        ) : (
                                            <span className="page-link disabled">Previous</span>
                                        )}
                                    </li>
                                    {Array.from(Array(pages).keys()).map((index) => (
                                        <li
                                            key={index}
                                            className={`page-item ${index + 1 === page ? "active" : ""}`}
                                        >
                                            <Link
                                                className="page-link bg-white text-black"
                                                to={`/product/productlist/${index + 1}/${limit}`}
                                            >
                                                {index + 1}
                                            </Link>
                                        </li>
                                    ))}
                                    <li className="page-item">
                                        {page < pages ? (
                                            <Link className="page-link" to={`/product/productlist/${page + 1}/${limit}`}>
                                                Next
                                            </Link>
                                        ) : (
                                            <span className="page-link disabled">Next</span>
                                        )}
                                    </li>
                                </ul>
                            </div> */}
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
}

export default ProductList;