import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./order.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../../store/actions/order-actions";
import accounting from "accounting";


function OrderList() {
    const { order } = useSelector((state) => state.orderReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!order) {
            dispatch(getOrder({ sort: 'ctime' }));
        }
    }, [dispatch, order]);

    console.log(order);

    return (
        <div className="content-wrapper">
           
            <section className="content">
                <div className="card">
                    <div className="text-right pt-2 pe-4">
                    </div>
                    <div className="card-body">
                        <div className="row content">
                            <div className="col-md old-element">
                                <table className="table ">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Ngày đặt</th>
                                            <th>Tổng tiền</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {order && order.map((item, index) => (
                                            
                                                <tr className="datarow" key={index}>
                                                    <td>
                                                        <div>
                                                            {item._id}
                                                        </div>

                                                        <div className="function_style">
                                                            <Link to={`/order/orderdetail/${item.id}`} className="btn btn-sm"><i className="fa fa-eye me-1"></i>Chi tiết</Link> |
                                                            <button onClick={() => showStatusForm(item.id)} className="btn btn-sm"><i className="fa fa-edit me-1" ></i>Cập nhật trạng thái</button>
                                                        </div>
                                                    </td>
                                                    <td>{new Date(item.createdOn).toLocaleString()}</td>
                                                    <td>{accounting.formatNumber(item.order_checkout.totalPrice, 0, ".", ",")}<span class="text-muted"> đ</span></td>
                                                    <td>{item.order_status}</td>
                                                </tr>
                                              ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* {showForm && (
                                <div className="new-element modal1">
                                    <div className="modal-content">
                                        <div className="row">
                                            <h4 className="col-11">Cập nhật trạng thái</h4>
                                            <span className="text-danger close col-1     btn btn-sm" onClick={() => setShowForm(false)}>&times;</span>
                                        </div>
                                        <br />
                                        <div className="col-6"></div>
                                        <form onSubmit={handleStatusUpdate}>
                                            <label className="me-4">
                                                <input type="radio" className="me-1" name="status" value="2" required />
                                                Đang chuẩn bị
                                            </label>
                                            <label className="me-4">
                                                <input type="radio" className="me-1" name="status" value="3" required />
                                                Đang giao hàng
                                            </label>
                                            <label className="me-4">
                                                <input type="radio" className="me-1" name="status" value="4" required />
                                                Đã giao
                                            </label>
                                            <label className="me-4">
                                                <input type="radio" className="me-1" name="status" value="0" required />
                                                Hủy đơn
                                            </label>
                                            <br />
                                            <button type="submit" className="btn btn-primary">
                                                Lưu
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )} */}

                            {/* <ul className="pagination">
                                <li className="page-item ">
                                    {page > 1 ? (
                                        <Link className="page-link" to={`/admin/orders/${page - 1}/${limit}`}>Previous</Link>
                                    ) : (
                                        <span className="page-link disabled">Previous</span>
                                    )}
                                </li>
                                {Array.from(Array(pages).keys()).map((index) => (
                                    <li
                                        key={index}
                                        className={`page-item  ${index + 1 === page ? "active" : ""}`}
                                    >
                                        <Link
                                            className="page-link bg-blue"
                                            to={`/admin/orders/${index + 1}/${limit}`}
                                        >
                                            {index + 1}
                                        </Link>
                                    </li>
                                ))}
                                <li className="page-item">
                                    <Link className="page-link" to={`/admin/orders/${page + 1}/${limit}`}>
                                        Next
                                    </Link>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default OrderList;