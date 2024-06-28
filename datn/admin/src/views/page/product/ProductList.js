import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { CButton } from '@coreui/react';
import { cilPlus, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, onAllProduct } from '../../../store/actions';

function ProductList() {
    const dispatch = useDispatch();
    const { allProducts } = useSelector((state) => state.productReducer);
    const { listCategory } = useSelector((state) => state.categoryReducer);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        if (!allProducts) {
            dispatch(onAllProduct({ sort: 'ctime' }));
        }
    }, [dispatch, allProducts]);

    useEffect(() => {
        if (!listCategory) {
            dispatch(getCategory({ sort: 'ctime' }));
        }
    }, [dispatch, listCategory]);

    const getCategoryName = (categoryIds) => {
        if (!listCategory || !categoryIds) return '';
        const categoryNames = categoryIds.map(id => {
            const category = listCategory.find(cat => cat._id === id);
            return category ? category.category_name : '';
        });
        return categoryNames.filter(name => name).join(', ');
    };

    // Tính toán các sản phẩm hiển thị trên trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allProducts ? allProducts.slice(indexOfFirstItem, indexOfLastItem) : [];

    const totalPages = allProducts ? Math.ceil(allProducts.length / itemsPerPage) : 1;

    return (
        <div className="admin content-wrapper">
            <section className="content">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                    <Link to='/product/createproduct'>
                                        <CButton color="primary" variant="outline" className="me-md-2">
                                            <CIcon icon={cilPlus} title="Thêm sản phẩm" />
                                            Thêm sản phẩm
                                        </CButton>
                                    </Link>
                                    {/* <Link to='/menu/createmenu'>
                                        <CButton color="danger" variant="outline" className="me-md-2">
                                            <CIcon icon={cilTrash} title="Thùng rác" /> Thùng rác
                                        </CButton>
                                    </Link> */}
                                </div>
                                <hr />
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className='text-left' style={{ width: "70px" }}>Hình ảnh</th>
                                            <th className='text-left' style={{ width: "220px" }}>Sản phẩm</th>
                                            <th className='text-left' style={{ width: "130px" }}>Loại</th>
                                            <th className='text-left' style={{ width: "130px" }}>Có thể bán</th>
                                            <th className='text-left' style={{ width: "150px" }}>Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((item, index) => (
                                            <tr className="datarow" key={index}>
                                                <td>
                                                    <img
                                                        src={item.product_thumb}
                                                        alt={`product_${index}`}
                                                        style={{ width: "70px", marginRight: "5px" }}
                                                    />
                                                </td>
                                                <td>
                                                    <div className='text-left'>
                                                        {item.product_name}
                                                    </div>
                                                </td>
                                                <td className='text-left'>
                                                    {Array.isArray(item.product_category)
                                                        ? getCategoryName(item.product_category)
                                                        : getCategoryName([item.product_category])}
                                                </td>
                                                <td className='text-left'>{item.product_quantity}</td>
                                                <td>
                                                    <div className="function_style">
                                                        {/* <Link to={`/product/updateproduct/${item.id}`} className="btn btn-sm">
                                                            <i className="fa fa-edit me-1"></i>Chỉnh sửa
                                                        </Link> | */}
                                                        <Link to={`/product/${item.product_slug}-${item._id}`} className="btn btn-sm">
                                                            <i className="fa fa-eye me-1"></i>Chi tiết
                                                        </Link> |
                                                        {/* <button onClick={() => trashProduct(item.id)} className="btn btn-sm">
                                                            <i className="fa fa-trash me-1"></i>Xoá
                                                        </button> */}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <ul className="pagination">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Trước</button>
                                        </li>
                                        {[...Array(totalPages).keys()].map(number => (
                                            <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                                                <button className="page-link" onClick={() => setCurrentPage(number + 1)}>{number + 1}</button>
                                            </li>
                                        ))}
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Sau</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProductList;
