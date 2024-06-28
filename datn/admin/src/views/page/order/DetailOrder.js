import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiOrder from "../../../service/apiOrder";
import { imageURL } from "../../../config";
import accounting from "accounting";

function OrderShow() {

    const { id } = useParams();
    const [data, setData] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        apiOrder.getOne(id).then((res) => {
            try {
                setData(res.data.order);
                setProducts(res.data.order_detail);
            } catch (e) {
                console.log(e);
            }
        })
    }, [])


   

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <h1 className="d-inline">Chi tiết đơn hàng</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="card">
                    <div className="card-header text-right">
                        <Link to="/order/orderlist/1/10" className="btn btn-sm btn-info">
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
                                    <th>ID</th>
                                    <td>{data.id}</td>
                                </tr>
                                <tr>
                                    <th>Tên người nhận</th>
                                    <td>{data.delivery_name}</td>
                                </tr>
                                <tr>
                                    <th>Số điện thoại</th>
                                    <td>{data.delivery_phone}</td>
                                </tr>
                                <tr>
                                    <th>Địa chỉ</th>
                                    <td>{data.delivery_address}</td>
                                </tr>
                                <tr>
                                    <th>Ghi chú</th>
                                    <td>{data.note}</td>
                                </tr>
                                <tr>
                                    <th>Ngày đặt</th>
                                    <td>{new Date(data.created_at).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <th>Trạng thái</th>
                                    <td>
                                        {data.status === 1 ? "Chưa giao hàng" : data.status === 2 ? "Đang giao hàng" : data.status === 0 ? "Hủy đơn hàng" : "Đã giao hàng"}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <br />
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center" style={{ width: "130px" }}>Hình ảnh</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((item, index) => {
                                     const imageArray = item.image.split(',');
                                    return (
                                        <tr className="datarow" key={index}>
                                            <td>
                                                <img src={imageURL + '/images/product/' + imageArray[0].trim()} alt="product.jpg" style={{ width: "100%" }} />
                                            </td>
                                            <td>
                                                {item.name}
                                            </td>
                                            <td>{accounting.formatNumber(item.price, 0, ".", ",")}<span className="text-muted">đ</span></td>
                                            <td>{item.qty}</td>
                                            <td>{accounting.formatNumber(item.price * item.qty)}<span className="text-muted">đ</span></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>Tổng cộng</th>
                                    <td>{accounting.formatNumber(products.reduce((total, item) => total + (item.price * item.qty), 0))}<span className="text-muted">đ</span></td>
                                </tr>
                            </tfoot>

                        </table>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default OrderShow;