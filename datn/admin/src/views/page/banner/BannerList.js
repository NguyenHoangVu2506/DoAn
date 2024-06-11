import React from 'react';
import { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaRegPlusSquare, FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CButton } from '@coreui/react';
import { imageURL } from '../../../config';
import { cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { getListSlider } from '../../../store/actions';
function BannerList() {
    const dispatch = useDispatch();
    const { allSlider } = useSelector((state) => state.sliderReducer);
    useEffect(() => {
        if (!allSlider) {
            dispatch(getListSlider({ sort: 'ctime' }));
        }
    }, [dispatch, allSlider]);
    console.log(allSlider)
    return (
        <div className=" admin content-wrapper">
          
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <h1 className="d-inline">Danh sách Banner<sup></sup></h1>
                        </div>
                        <div className="col-sm-1 mt-2 text-right">
                            <Link className="action-btn" to="/banner/list-trash" style={{ color: "red" }}>
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
                                    <Link to='/banner/createbanner'>
                                        <CButton color="primary" className="me-md-2">Thêm banner</CButton>
                                    </Link>                  </div>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>

                                            <th className="text-center" style={{ width: "30px" }}>
                                                {/* <input type="checkbox" /> */}
                                            </th>
                                            <th className="text-center" style={{ width: "30px" }}>Id</th>
                                            <th className="text-center" style={{ width: "130px" }}>Hình ảnh</th>
                                            <th className="text-center" style={{ width: "130px" }}>Tên banner</th>
                                            <th style={{ width: "220px" }}>Đường dẫn</th>
                                            <th className="text-center" style={{ width: "130px" }}>Vị trí</th>
                                            <th className="text-center" style={{ width: "150px" }}>Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {allSlider && allSlider.map((item, index) => (
                                                <tr className="datarow" key={index}>
                                                    <td>
                                                        <input type="checkbox" />
                                                    </td>
                                                    <td>{item.id}</td>
                                                    <td>
                                                        <img src={item.slider_image} alt={item.name} style={{ width: "70px" }} />
                                                    </td>
                                                    <td>
                                                        <div className="name">
                                                            {item.slider_name
                                                            }
                                                        </div>
                                                    </td>
                                                    <td >{item.slider_link}</td>
                                                    <td >{item.slider_position}</td>                                                  
                                                    <td>
                                                        <div className="function_style">
                                                            <Link to={`/banner/updatebanner/${item.id}`} className="btn btn-sm"><i className="fa fa-edit me-1" ></i>Chỉnh sửa</Link> |
                                                            <button className="btn btn-sm"><i className="fa fa-trash me-1"></i>Xoá</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                         
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* <div className="pagination-container"  style={{ display: 'flex', justifyContent: 'center' }}>
                                <ul className="pagination">
                                    <li className="page-item">
                                        {page > 1 ? (
                                            <Link className="page-link" to={`/post/postlist/${page - 1}/${limit}`}>Previous</Link>
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
                                                to={`/post/postlist/${index + 1}/${limit}`}
                                            >
                                                {index + 1}
                                            </Link>
                                        </li>
                                    ))}
                                    <li className="page-item">
                                        {page < pages ? (
                                            <Link className="page-link" to={`/post/postlist/${page + 1}/${limit}`}>
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

export default BannerList;