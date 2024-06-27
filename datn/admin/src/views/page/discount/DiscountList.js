import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CButton } from '@coreui/react';
import { cilPencil, cilPlus, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiscount } from '../../../store/actions/discount-actions';
import accounting from 'accounting';
import { onAllProduct } from '../../../store/actions';

function DiscountList() {
    const { discount } = useSelector((state) => state.discountReducer);
    const { allProducts } = useSelector((state) => state.productReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!discount) {
            dispatch(getDiscount({ sort: 'ctime' }));
        }
    }, [dispatch, discount]);

    useEffect(() => {
        if (!allProducts) {
            dispatch(onAllProduct({ sort: 'ctime' }));
        }
    }, [dispatch, allProducts]);

    const getProductNames = (productIds) => {
        if (!allProducts || !productIds) return '';

        const productNames = productIds
            .map(productId => {
                const product = allProducts.find(p => p._id === productId);
                return product ? product.product_name : '';
            })
            .filter(product_name => product_name) // Remove empty names
            .join(', ');

        return productNames || 'N/A';
    };

    return (
        <div className="admin content-wrapper">
            <section className="content">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-begin">
                                    <Link to='/discount/creatediscount'>
                                        <CButton color="primary" variant="outline" className="me-md-2">
                                            <CIcon icon={cilPlus} title="Store menu" />
                                            Thêm mã giảm giá
                                        </CButton>
                                    </Link>
                                    <Link to='/discount/discountlist'>
                                        <CButton color="danger" variant="outline" className="me-md-2">
                                            <CIcon icon={cilTrash} title="Store menu" /> Thùng rác
                                        </CButton>
                                    </Link>
                                </div>
                                <hr />
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="text-left" style={{ width: "70px" }}>Tên</th>
                                            <th className="text-left" style={{ width: "220px" }}>Áp dụng SP</th>
                                            <th className="text-left" style={{ width: "130px" }}>Giá trị tối thiểu</th>
                                            <th className="text-left" style={{ width: "130px" }}>Số lượng</th>
                                            <th className="text-left" style={{ width: "130px" }}>Ngày bắt đầu</th>
                                            <th className="text-left" style={{ width: "130px" }}>Ngày kết thúc</th>
                                            <th className="text-left" style={{ width: "150px" }}>Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {discount && discount.map((item, index) => (
                                            <tr className="datarow" key={index}>
                                                <td>
                                                    {item.discount_name}
                                                </td>
                                                <td>
                                                    <div className="name">
                                                        {item.discount_applies_to === "all" ? "Tất cả sản phẩm" : getProductNames(item.discount_product_ids)}
                                                    </div>
                                                </td>
                                                <td className='text-left'>{accounting.formatNumber(item.discount_min_order_value, 0, ".", ",")} <span className="text-muted">đ</span></td>
                                                <td className='text-left'>{item.discount_max_uses}</td>
                                                <td className='text-left'>{new Date(item.discount_start_date).toLocaleDateString()}</td>
                                                <td className='text-left'>{new Date(item.discount_end_date).toLocaleDateString()}</td>
                                                <td>
                                                    <div className="function_style">
                                                        {/* <Link to={`/productsale/updateproductsale/${item.id}`} className="btn btn-sm"><i className="fa fa-edit me-1"></i>Chỉnh sửa</Link> |
                                                        <Link to={`/productsale/detailproductsale/${item.id}`} className="btn btn-sm"><i className="fa fa-eye me-1"></i>Chi tiết</Link> | */}
                                                        <button onClick={() => trashProductSale(item.id)} className="btn btn-sm"><i className="fa fa-trash me-1"></i>Xoá</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center' }}>
                                <ul className="pagination">
                                    <li className="page-item">
                                        <span className="page-link disabled">Previous</span>
                                    </li>
                                    <li className="page-item active">
                                        <Link className="page-link bg-white text-black" to={`/product/productlist/1/10`}>1</Link>
                                    </li>
                                    <li className="page-item">
                                        <span className="page-link disabled">Next</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default DiscountList;
