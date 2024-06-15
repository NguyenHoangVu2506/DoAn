import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { CButton } from '@coreui/react';
import { imageURL } from '../../../config';
import { cilPlus, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import accounting from 'accounting';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecial } from '../../../store/actions/special-actions';
function ProductSaleList() {
    const dispatch = useDispatch();
    const { special } = useSelector((state) => state.specialReducer);

    useEffect(() => {
        if (!special) {
            dispatch(getSpecial({ sort: 'ctime' }));
        }
    }, [dispatch, special]);

    console.log(special)
    return (
        <div className=" admin content-wrapper">
            <section className="content">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                    <Link to='/category/createcategory'>
                                        <CButton color="primary" variant="outline" className="me-md-2">
                                            <CIcon icon={cilPlus} title="Thêm sản phẩm" />
                                            Thêm Chương trình giảm giá
                                        </CButton>
                                    </Link>
                                    <Link to='/menu/createmenu'>
                                        <CButton color="danger" variant="outline" className="me-md-2">
                                            <CIcon icon={cilTrash} title="Thùng rác" /> Thùng rác
                                        </CButton>
                                    </Link>
                                </div>
                                <hr />
                                <table className="table ">
                                    <thead>
                                        <tr>
                                            {/* <th className="text-center" style={{ width: "70px" }}>Hình ảnh</th> */}
                                            <th className="text-left" style={{ width: "220px" }}>Name</th>
                                            <th className="text-left" style={{ width: "220px" }}>Mô tả</th>
                                            <th className="text-left" style={{ width: "130px" }}>Ngày bắt đầu</th>
                                            <th className="text-left" style={{ width: "130px" }}>Ngày kết thúc</th>
                                            <th className="text-left" style={{ width: "150px" }}>Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {special && special.map((item, index) => (

                                            <tr className="datarow" key={index}>
                                                {/* <td>
                                                        <img
                                                            src={imageURL + '/images/product/' + imageArray[0].trim()}
                                                            alt={`product_${index}`}
                                                            style={{ width: "70px", marginRight: "5px" }}
                                                        />
                                                    </td> */}
                                                <td>
                                                    <div className='text-left'>
                                                        {item.special_offer_name}
                                                    </div>
                                                </td>
                                                <td className='text-left'>

                                                    {item.special_offer_description}

                                                </td>
                                                <td className='text-left'>{new Date(item.special_offer_start_date).toLocaleDateString()}</td>
                                                <td className='text-left'>{new Date(item.special_offer_end_date).toLocaleDateString()}</td>
                                                <td>
                                                    <div className="function_style">
                                                        <Link to={`/productsale/updateproductsale/${item.id}`} className="btn btn-sm"><i className="fa fa-edit me-1" ></i>Chỉnh sửa</Link> |
                                                        <Link to={`/productsale/detailproductsale/${item.id}`} className="btn btn-sm"><i className="fa fa-eye me-1"></i>Chi tiết</Link> |
                                                        <button onClick={() => trashProductSale(item.id)} className="btn btn-sm"><i className="fa fa-trash me-1"></i>Xoá</button>
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

export default ProductSaleList;