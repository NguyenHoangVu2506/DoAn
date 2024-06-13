import React from 'react';
import { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaRegPlusSquare, FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CButton } from '@coreui/react';
import { imageURL } from '../../../config';
import { cilDelete, cilPencil, cilPlus, cilTrash } from '@coreui/icons';
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

            <section className="content">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                               
                                <div className="d-grid gap-2 d-md-flex justify-content-md-begin">
                                    <Link to='/banner/createbanner'>
                                        <CButton color="primary" variant="outline" className="me-md-2">
                                            <CIcon icon={cilPlus} title="Store menu" />
                                            Thêm banner
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
                                            <th className="text-center" style={{ width: "130px" }}>Tên banner</th>
                                            <th className="text-center" style={{ width: "220px" }}>Đường dẫn</th>
                                            <th className="text-center" style={{ width: "130px" }}>Vị trí</th>
                                            <th className="text-center" style={{ width: "210px" }}>Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allSlider && allSlider.map((item, index) => (
                                            <tr className="datarow" key={index}>
                                               
                                                <td className="text-center">
                                                    <img src={item.slider_image} alt={item.name} style={{ width: "70px" }} />
                                                </td>
                                                <td>
                                                    <div className="text-center">
                                                        {item.slider_name
                                                        }
                                                    </div>
                                                </td>
                                                <td className="text-center">{item.slider_link}</td>
                                                <td >{item.slider_position}</td>
                                                <td className="text-center">
                                                    <div className="function_style">
                                                        <Link to={`/banner/updatebanner/${item._id}`} className="btn btn-sm"><CIcon icon={cilPencil} title="Store menu" /> Chỉnh sửa</Link> |
                                                        <button className="btn btn-sm"><CIcon icon={cilDelete} title="Store menu" /> Xoá</button>
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