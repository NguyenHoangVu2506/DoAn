import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { imageURL } from "../../../config";
import accounting from "accounting";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../store/actions/order-actions";
import { getProductById } from "../../../store/actions";

function OrderShow() {
    const { id } = useParams();
    const { orderbyid } = useSelector((state) => state.orderReducer);
    const { listProductById } = useSelector((state) => state.productReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!orderbyid) {
            dispatch(getOrderById({ order_id: id }));
        }
    }, [dispatch, id, orderbyid]);

    useEffect(() => {
        if (orderbyid && orderbyid.order_product) {
            orderbyid.order_product.forEach((product) => {
                if (product.item_products) {
                    product.item_products.forEach((item) => {
                        const { productId } = item;
                        console.log(productId)
                        if (productId && !listProductById) {
                            dispatch(getProductById({ spu_id: productId }));
                        }
                    });
                }
            });
        }
    }, [dispatch, listProductById, orderbyid]);

    console.log("listProductById", listProductById)
    if (!orderbyid || !listProductById) {
        return <div>Loading...</div>;
    }

    const statusMap = {
        pending: "Đã đặt hàng",
        confirmed: "Đã xác nhận",
        shipped: "Đang giao hàng",
        Received: "Đã nhận hàng",
        cancelled: "Hủy đơn",
    };

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
                    {orderbyid ? (
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
                                        <th>ID đơn hàng</th>
                                        <td>{orderbyid._id}</td>
                                    </tr>
                                    <tr>
                                        <th>ID khách hàng</th>
                                        <td>{orderbyid.order_userId}</td>
                                    </tr>
                                    <tr>
                                        <th>Số điện thoại</th>
                                        <td>{orderbyid.delivery_phone}</td>
                                    </tr>
                                    <tr>
                                        <th>Địa chỉ</th>
                                        <td>{orderbyid.delivery_address}</td>
                                    </tr>
                                    <tr>
                                        <th>Tạm tính</th>
                                        <td>
                                            {accounting.formatNumber(orderbyid.order_checkout.totalPrice, 0, ".", ",")}<span className="text-muted">đ</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Giá giảm</th>
                                        <td>
                                            {accounting.formatNumber(orderbyid.order_checkout.totalSpecialOffer, 0, ".", ",")}<span className="text-muted">đ</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Giá giảm của mã giảm giá</th>
                                        <td>
                                            {accounting.formatNumber(orderbyid.order_checkout.totalDiscount, 0, ".", ",")}<span className="text-muted">đ</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Tổng tiền</th>
                                        <td>
                                            {accounting.formatNumber(orderbyid.order_checkout.totalCheckout, 0, ".", ",")}<span className="text-muted">đ</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Phương thức thanh toán</th>
                                        <td>{orderbyid.order_payment ? orderbyid.order_payment : "Thanh toán khi nhận hàng"}</td>
                                    </tr>
                                    <tr>
                                        <th>Ngày đặt</th>
                                        <td>{new Date(orderbyid.createdOn).toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <th>Trạng thái</th>
                                        <td>{statusMap[orderbyid.order_status]}</td>
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
                                        <th>Giá bán</th>
                                        <th>Số lượng</th>
                                        <th>Tổng tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderbyid.order_product && orderbyid.order_product.map((product, productIndex) => (
                                        product.item_products.map((item, itemIndex) => {
                                            return (
                                                <tr className="datarow" key={`${productIndex}-${itemIndex}`}>
                                                    <td>
                                                        {listProductById.spu_info.product_thumb
 ? (
                                                            <img src={listProductById.spu_info.product_thumb[0]} alt="product.jpg" style={{ width: "100%" }} />
                                                        ) : (
                                                            <span>Không có hình ảnh</span>
                                                        )}
                                                    </td>
                                                    <td>{listProductById.spu_info.product_name}</td>
                                                    <td>
                                                        {item.price_sale ?
                                                            accounting.formatNumber(item.price_sale, 0, ".", ",") :
                                                            accounting.formatNumber(item.price, 0, ".", ",")
                                                        }<span className="text-muted">đ</span>
                                                    </td>
                                                    <td>{item.quantity}</td>
                                                    <td>{accounting.formatNumber((item.price_sale || item.price) * item.quantity)}<span className="text-muted">đ</span></td>
                                                </tr>
                                            );
                                        })
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default OrderShow;
