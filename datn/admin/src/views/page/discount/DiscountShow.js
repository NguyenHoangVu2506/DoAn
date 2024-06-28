import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { imageURL } from "../../../config";
import apiSale from "../../../service/apiSale";
import accounting from "accounting";

function ProductSaleShow() {
    const { id } = useParams();
    const [data, setData] = useState({
        image: '',
        name: '',
        brand_name: '',
        category_name: '',
        price: '',
        pricesale: '',
        qty_sale: '',
        detail: '',
        status: 0,
        date_begin: '',
        date_end: ''
    });

    const [status, setStatus] = useState('Ẩn');

    useEffect(() => {
        apiSale.getSaleById(id).then((res) => {
            try {
                setData(res.data);
                if (res.data.status === 1) {
                    setStatus('Hiển thị');
                }
            } catch (e) {
                console.log(e);
            }
        });
    }, [id]);
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };
    const imageArray = data.image ? data.image.split(',') : [];

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <h1 className="d-inline">Chi tiết sản phẩm giảm giá</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="card">
                    <div className="card-header text-right">
                        <Link to="/productsale/productsalelist" className="btn btn-sm btn-info">
                            <i className="fa fa-reply me-1" aria-hidden="true"></i>
                            Quay lại
                        </Link>
                    </div>
                    <div className="card-body p-2">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th style={{ width: "30%" }}>Tên trường</th>
                                    <th>Giá trị</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Hình ảnh</th>
                                    <td>
                                        {imageArray.map((image, index) => (
                                            <img
                                                key={index}
                                                src={imageURL + '/images/product/' + image.trim()}
                                                alt={`product_${index}`}
                                                style={{ width: "70px", marginRight: "5px" }}
                                            />
                                        ))}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <td>{data.name}</td>
                                </tr>
                                <tr>
                                    <th>Thương hiệu</th>
                                    <td>{data.brand_name}</td>
                                </tr>
                                <tr>
                                    <th>Danh mục</th>
                                    <td>{data.category_name}</td>
                                </tr>
                                <tr>
                                    <th>Giá bán</th>
                                    <td>{data.price}</td>
                                </tr>
                                <tr>
                                    <th>Giá sale</th>
                                    <td>{accounting.formatNumber(data.pricesale, 0, ".", ",")} <span className="text-muted">đ</span></td>
                                </tr>
                                <tr>
                                    <th>Số lượng sale</th>
                                    <td>{data.qty_sale}</td>
                                </tr>

                                <tr>
                                    <th>Chi tiết sản phẩm</th>
                                    <td>{data.detail}</td>
                                </tr>

                                <tr>
                                    <th>Trạng thái</th>
                                    <td>{status}</td>
                                </tr>
                                <tr>
                                    <th>Ngày Bắt đầu</th>
                                    <td>{formatDate(data.date_begin)}</td>
                                </tr>
                                <tr>
                                    <th>Ngày kết thúc</th>
                                    <td>{formatDate(data.date_end)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <br></br>
                    <br></br>
                </div>
            </section>
        </div>
    );
}

export default ProductSaleShow;
