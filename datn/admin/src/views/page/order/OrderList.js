import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./order.css";
import { useDispatch, useSelector } from "react-redux";
import { UpdateStatusOrder, getOrder } from "../../../store/actions/order-actions";
import accounting from "accounting";
import { toast } from "react-toastify";

const statusMap = {
    pending: "Đã đặt hàng",
    confirmed: "Đã xác nhận",
    shipped: "Đang giao hàng",
    Received: "Đã nhận hàng",
    cancelled: "Hủy đơn",
};

function OrderList() {
    const { order } = useSelector((state) => state.orderReducer);
    
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);
    const [currentOrderId, setCurrentOrderId] = useState(null);
    const [status, setStatus] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;  

    useEffect(() => {
        if (!order) {
            dispatch(getOrder({ sort: 'ctime' }));
        }
    }, [dispatch, order]);

    const showStatusForm = (orderId) => {
        setCurrentOrderId(orderId);
        setShowForm(true);
    };
    console.log(currentOrderId, 'bbb')

    const handleStatusUpdate = (e) => {
        e.preventDefault();
        dispatch(UpdateStatusOrder({ order_id: currentOrderId, order_status: status }));
        console.log(status)
        toast.success("Cập nhật trạng thái đơn hàng thành công!");
        setShowForm(false);
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = order ? order.slice(indexOfFirstItem, indexOfLastItem) : [];

    const totalPages = order ? Math.ceil(order.length / itemsPerPage) : 1;

    return (
        <div className="content-wrapper">
            <section className="content">
                <div className="card">
                    <div className="text-right pt-2 pe-4"></div>
                    <div className="card-body">
                        <div className="row content">
                            <div className="col-md old-element">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Ngày đặt</th>
                                            <th>Tổng tiền</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order && currentItems.map((item, index) => (
                                            <tr className="datarow" key={index}>
                                                <td>
                                                    <div>
                                                        {item._id}
                                                    </div>
                                                    <div className="function_style">
                                                        <Link to={`/order/orderdetail/${item._id}`} className="btn btn-sm"><i className="fa fa-eye me-1"></i>Chi tiết</Link> |
                                                        <button onClick={() => showStatusForm(item._id)} className="btn btn-sm"><i className="fa fa-edit me-1"></i>Cập nhật trạng thái</button>
                                                    </div>
                                                </td>
                                                <td>{new Date(item.createdOn).toLocaleString()}</td>
                                                <td>{accounting.formatNumber(item.order_checkout.totalPrice, 0, ".", ",")}<span className="text-muted"> đ</span></td>
                                                <td>{statusMap[item.order_status]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {showForm && (
                                <div className="new-element modal1">
                                    <div className="modal-content">
                                        <div className="row">
                                            <h4 className="col-11">Cập nhật trạng thái</h4>
                                            <span className="text-danger close col-1 btn btn-sm" onClick={() => setShowForm(false)}>&times;</span>
                                        </div>
                                        <br />
                                        <div className="col-6"></div>
                                        <form onSubmit={handleStatusUpdate}>
                                            <label className="me-4">
                                                <input 
                                                    type="radio" 
                                                    className="me-1" 
                                                    name="status" 
                                                    value="confirmed" 
                                                    onChange={(e) => setStatus(e.target.value)} 
                                                    required 
                                                />
                                                Đã xác nhận
                                            </label>
                                            <label className="me-4">
                                                <input 
                                                    type="radio" 
                                                    className="me-1" 
                                                    name="status" 
                                                    value="shipped" 
                                                    onChange={(e) => setStatus(e.target.value)} 
                                                    required 
                                                />
                                                Đang giao hàng
                                            </label>
                                            <label className="me-4">
                                                <input 
                                                    type="radio" 
                                                    className="me-1" 
                                                    name="status" 
                                                    value="Received" 
                                                    onChange={(e) => setStatus(e.target.value)} 
                                                    required 
                                                />
                                                Đã nhận hàng
                                            </label>
                                            <br />
                                            <button type="submit" className="btn btn-primary">
                                                Lưu
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}
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
            </section>
        </div>
    );
}

export default OrderList;
