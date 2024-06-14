import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { CButton } from '@coreui/react';
import { imageURL } from '../../../config';
import { cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import apiProduct from '../../../service/apiProduct';
import apiSale from '../../../service/apiSale';
import accounting from 'accounting';
function ProductSaleList() {
    const navigate = useNavigate();
    const [qty_trash, setQtyTrash] = useState(0);
    const [qty_cat, setQtyCat] = useState(0);

    const [tamp, setTamp] = useState();
    const [trash, setTrash] = useState();
    //////////////// 
    const page = parseInt(useParams().page);
    const limit = parseInt(useParams().limit);
    const [pages, setPages] = useState(1);

    const [sales, setSale] = useState([]);
    const [qty_sale, setQtySale] = useState(0);
    // const [statusdel, setStatusDel] = useState(0);
    useEffect(() => {
        apiSale.getAll(1, 10).then((res) => {
            try {
                console.log(res);
                // const data = res.data;
                const numberOfPages = res.data.page;
                setPages(numberOfPages);

                setSale(res.data.data);
                // setQtyCat(res.meta.pagination.total);
                // setQtyTrash(res.meta.pagination.qty_trash);
                setQtySale(res.data.meta.pagination.total);
                setQtyTrash(res.data.qty_trash);
            } catch (e) {
                console.log(e);
            }
            setTamp();
        })
    }, [tamp, trash,qty_trash])
    function trashProductSale(id) {
        apiSale.trashSale(id).then(function (result) {
            if (result.data !== null) {
                alert("Đã thêm vào thùng rác !");
                setSale(prevSales => prevSales.filter(item => item.id !== id));
            }
            else {
                alert("Không tìm thấy dữ liệu !");
            }
        })
    }
    return (
        <div className=" admin content-wrapper">
            {console.log(sales)}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <h1 className="d-inline">Danh sách Sản Phẩm Giảm Giá<sup>({qty_sale})</sup></h1>
                        </div>
                        <div className="col-sm-1 mt-2 text-right">
                            <Link className="action-btn" to="/productsale/list-trash" style={{ color: "red" }}>
                                <CIcon icon={cilTrash} title="Download file" />
                                <sup className="count ms-1">{qty_trash}</sup>
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
                                    <Link to='/productsale/createproductsale'>
                                        <CButton color="primary" className="me-md-2">Thêm sản phẩm giảm giá</CButton>
                                    </Link>
                                </div>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>

                                            <th className="text-center" style={{ width: "30px" }}>
                                                {/* <input type="checkbox" /> */}
                                            </th>
                                            <th className="text-center" style={{ width: "70px" }}>Hình ảnh</th>
                                            <th className="text-center" style={{ width: "220px" }}>Sản phẩm</th>
                                            <th className="text-center" style={{ width: "130px" }}>Giá sale</th>
                                            <th className="text-center" style={{ width: "130px" }}>Số lượng sale</th>
                                            <th className="text-center" style={{ width: "130px" }}>Ngày bắt đầu Sale</th>
                                            <th className="text-center" style={{ width: "130px" }}>Ngày kết thúc Sale</th>
                                            <th className="text-center" style={{ width: "150px" }}>Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sales.map((item, index) => {
                                            const imageArray = item.image.split(',');
                                            return (
                                                <tr className="datarow" key={index}>
                                                    <td>
                                                        <input type="checkbox" />
                                                    </td>
                                                    <td>
                                                        <img
                                                            src={imageURL + '/images/product/' + imageArray[0].trim()}
                                                            alt={`product_${index}`}
                                                            style={{ width: "70px", marginRight: "5px" }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <div className="name">
                                                            {item.name}
                                                        </div>
                                                    </td>
                                                    <td className='text-center'>{accounting.formatNumber(item.price_sale, 0, ".", ",")} <span class="text-muted">đ</span></td>
                                                    <td className='text-center'>{item.qty_sale}</td>
                                                    <td className='text-center'>{new Date(item.date_begin).toLocaleDateString()}</td>
                                                    <td className='text-center'>{new Date(item.date_end).toLocaleDateString()}</td>

                                                    <td>
                                                        <div className="function_style">
                                                            <Link to={`/productsale/updateproductsale/${item.id}`} className="btn btn-sm"><i className="fa fa-edit me-1" ></i>Chỉnh sửa</Link> |
                                                            <Link to={`/productsale/detailproductsale/${item.id}`} className="btn btn-sm"><i className="fa fa-eye me-1"></i>Chi tiết</Link> |
                                                            <button onClick={() => trashProductSale(item.id)} className="btn btn-sm"><i className="fa fa-trash me-1"></i>Xoá</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center' }}>
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
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
}

export default ProductSaleList;