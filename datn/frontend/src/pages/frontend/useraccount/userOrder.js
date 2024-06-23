import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { UpdateStatusOrder, getOrderByUser, onLogout, productById } from '../../../store/actions';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./UserOrder.css";
import { NumericFormat } from 'react-number-format';

export default function UserOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderItem, setOrderItem] = useState([]);
  const { userInfo } = useSelector((state) => state.userReducer);
  const [productDetails, setProductDetails] = useState({});
  const [filterStatus, setFilterStatus] = useState('all');
  const orderUser = async () => {
    const order = await dispatch(getOrderByUser({ user_id: userInfo._id }));
    setOrderItem(order.payload.metaData);
  };
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');
  const handleReview = (productId) => {
    setShowReviewForm(true);
    setSelectedProductId(productId);
  };
  const fetchProductDetails = async (productId) => {
    const respon = await dispatch(productById({ spu_id: productId }));
    if (respon) {
      return respon.payload.metaData.spu_info;
    }
    return null;
  };

  useEffect(() => {
    orderUser();
  }, []);

  const handleSubmit = async () => {
    try {
      await dispatch(onLogout({}));
      toast.success('Đăng xuất thành công');
      window.location.reload();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const getProductDetails = async (item) => {
    if (!productDetails[item.productId]) {
      const details = await fetchProductDetails(item.productId);
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        [item.productId]: details
      }));
    }
  };

  // Object để ánh xạ trạng thái đơn hàng từ server sang tiếng Việt
  const orderStatusMapping = {
    pending: 'Đã đặt hàng',
    confirmed: 'Đã xác nhận',
    shipped: 'Đang giao hàng',
    Received: 'Đã nhận hàng',
    cancelled: 'Đơn hàng đã bị hủy'
  };

  // Hàm để xác định lớp CSS dựa trên trạng thái đơn hàng
  const getStatusClass = (status, step) => {
    if (step === 1) {
      return status === 'pending' ? 'step0 active' : 'step0 active';
    } else if (step === 2) {
      return status === 'confirmed' || status === 'shipped' || status === 'Received' ? 'step0 active text-center' : 'step0';
    } else if (step === 3) {
      return status === 'shipped' || status === 'Received' ? 'step0 active text-center' : 'step0';
    } else if (step === 4) {
      return status === 'Received' ? 'step0 active text-center text-muted text-end' : 'step0';
    }
    return 'step0';
  };
  const updateStatus = (orderId, status) => {
    dispatch(UpdateStatusOrder({ order_id: orderId, order_status: status }));
    toast.success("Hủy đơn hàng thành công!");

  };
  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };
  //////////////review
  const [reviewContent, setReviewContent] = useState('');

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    // Gửi dữ liệu đánh giá lên server, ví dụ dispatch action hoặc gọi API ở đây
    // Sau khi gửi thành công, có thể cập nhật lại dữ liệu đánh giá của sản phẩm
    // Ví dụ:
    // try {
    //   // Gửi dữ liệu đánh giá lên server
    //   const response = await dispatch(submitReview({ productId: selectedProductId, reviewContent }));
    //   // Xử lý response nếu cần
    //   if (response.success) {
    //     // Đóng form đánh giá và làm mới dữ liệu
    //     setShowReviewForm(false);
    //     // Cập nhật lại dữ liệu đánh giá hoặc làm các thao tác cần thiết
    //     // Ví dụ: dispatch action để load lại dữ liệu đánh giá sau khi gửi thành công
    //     toast.success('Đánh giá sản phẩm thành công!');
    //   } else {
    //     toast.error('Đánh giá sản phẩm thất bại. Vui lòng thử lại sau!');
    //   }
    // } catch (error) {
    //   console.error('Error submitting review:', error);
    //   toast.error('Đánh giá sản phẩm thất bại. Vui lòng thử lại sau!');
    // }
  };

  return (
    <>
      <div className="bg-primary">
        <div className="bg-2" style={{ backgroundColor: '#f6831f' }}>
          <div className="container py-4">
            <nav className="d-flex">
              <h6 className="mb-0">
                <a href="/" className="text-white">Trang chủ</a>
                <span className="text-white mx-2">/ </span>
                <a href="/account" className="text-white">Quản lý tài khoản</a>
              </h6>
            </nav>
          </div>
        </div>
      </div>
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-xl-3">
              <nav className="nav flex-lg-column w-100 d-flex nav-pills mb-4">
                <a className="nav-link my-0 bg-light" href="/profile">
                  <p className="pb-0 mb-0" style={{ width: '130px' }}>Tài khoản</p>
                </a>
                <a className="nav-link my-0 active" href="#">
                  <p className="pb-0 mb-0" style={{ width: '130px', color: '#f6831f' }}>Đơn hàng</p>
                </a>
                <a className="nav-link my-0 bg-light" href="/userorderhistory">
                  <p className="pb-0 mb-0" style={{ width: '130px' }}>Lịch sử đơn hàng</p>
                </a>
                <Link to="/wish-list" className="nav-link my-0 bg-light">
                  <p className="pb-0 mb-0" style={{ width: '130px' }}>Sản phẩm yêu thích</p>
                </Link>
                <button className="nav-link my-0 bg-light" onClick={handleSubmit}>
                  <p className="pb-0 mb-0" style={{ width: '100px' }}>Đăng xuất</p>
                </button>
              </nav>
            </div>
            <main className="col-lg-9 col-xl-9">
              {/* // Kiểm tra nếu đơn hàng có trạng thái là cancelled thì không hiển thị
                order.order_status !== 'cancelled' && ( */}
              <div className="card p-4 mb-4 shadow-0 border" >
                <div className="content-body">
                  <h5 className="mb-3">Đơn hàng của bạn</h5>
                  <button className="btn btn-sm btn-outline-warning mb-2" onClick={() => handleFilterChange('shipped')}>Chờ giao hàng</button>
                  <button className="btn btn-sm btn-outline-warning mb-2" onClick={() => handleFilterChange('Received')}>Đã giao</button>
                  <button className="btn btn-sm btn-outline-warning mb-2" onClick={() => handleFilterChange('cancelled')}>Đã hủy</button>
                  <button className="btn btn-sm btn-outline-warning mb-2" onClick={() => handleFilterChange('all')}>Tất cả</button>

                  {orderItem && orderItem.filter(order => filterStatus === 'all' || order.order_status === filterStatus).map((order, index) => (

                    <div className="card border border-primary mb-4 shadow-0" key={index}>
                      <div className="card-body pb-0">
                        <header className="d-lg-flex">
                          <div className="flex-grow-1">
                            <h6 className="mb-0">Mã đơn hàng: {order._id}</h6>
                            <i className="dot"></i>
                            <span className="text-success"> {orderStatusMapping[order.order_status]}</span>
                          </div>
                          <div>
                            {order.order_status === 'shipped' ? (
                              <button onClick={() => updateStatus(order._id, 'Received')} className="btn btn-sm btn-outline-success">Đã nhận hàng</button>
                            ) : order.order_status === 'Received' ? (
                              <>
                                <button className="btn btn-sm btn-outline-primary" onClick={() => handleReview(order._id)}>Đánh giá</button>
                                {showReviewForm && (
                                  <div className="modal fade show" style={{ display: 'block' }} id="reviewModal" tabIndex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                      <div className="modal-content">
                                        <div className="modal-header">
                                          <h5 className="modal-title" id="reviewModalLabel">Đánh giá sản phẩm</h5>
                                          <button type="button" className="btn-close" onClick={() => setShowReviewForm(false)} aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                          {/* Form đánh giá */}
                                          {/* Ví dụ: */}
                                          <form onSubmit={handleSubmitReview}>
                                            
                                            <div className="mb-3">
                                            <div className="row mb-1" >
                                              <div className="col-lg-7 mb-0">
                                                <p className="small text-muted mb-1">Tên sản phẩm</p>
                                                <p>a</p>
                                              </div>
                                            </div>
                                              <label htmlFor="rating" className="form-label">Đánh giá:</label>
                                              <select className="form-select" id="rating" 
                                              // onChange={(e) => setReviewProduct({ ...reviewProduct, rating: e.target.value })} required
                                              >
                                                <option value="">Chọn mức độ hài lòng</option>
                                                <option value="1">1 sao - Rất không hài lòng</option>
                                                <option value="2">2 sao - Không hài lòng</option>
                                                <option value="3">3 sao - Bình thường</option>
                                                <option value="4">4 sao - Hài lòng</option>
                                                <option value="5">5 sao - Rất hài lòng</option>
                                              </select>
                                            </div>
                                            <div className="mb-3">
                                              <label htmlFor="comment" className="form-label">Nhận xét:</label>
                                              <textarea className="form-control" id="comment" rows="3" 
                                              // onChange={(e) => setReviewProduct({ ...reviewProduct, comment: e.target.value })}
                                                ></textarea>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Gửi đánh giá</button>
                                          </form>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}

                              </>
                            ) : (
                              <button onClick={() => updateStatus(order._id, 'cancelled')} className="btn btn-sm btn-outline-danger">Hủy đơn hàng</button>
                            )}
                            <button type="button" className="btn btn-sm btn-outline-warning shadow-0" data-bs-toggle="modal" data-bs-target={`#exampleModal${index}`}>
                              <i></i> Thông tin vận chuyển
                            </button>
                            <div className="modal fade" id={`exampleModal${index}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header border-bottom-0">
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div className="modal-body text-start p-4">
                                    <h5 className="modal-title text-uppercase mb-2" id="exampleModalLabel">{userInfo.user_name}</h5>
                                    <h4 className="mb-2" style={{ color: '#f37a27' }}>Thông tin đơn hàng</h4>
                                    <div className="row">
                                      <div className="col mb-0">
                                        <p className="small text-dark mb-1">Ngày tạo:</p>
                                        <p>{order.createdOn ? new Date(order.createdOn).toLocaleString() : ''}</p>
                                      </div>
                                      <div className="col mb-1">
                                        <p className="small text-dark mb-1">Mã đơn hàng</p>
                                        <p>{order._id}</p>
                                      </div>
                                    </div>
                                    <hr />

                                    {order.order_product.map((product, productIndex) => (

                                      <div key={productIndex}>
                                        {product.item_products.map((item, itemIndex) => {
                                          getProductDetails(item); // Call function to fetch product details
                                          const productDetail = productDetails[item.productId] || {};
                                          return (
                                            <div className="row mb-1" key={`${productIndex}-${itemIndex}`}>
                                              <div className="col-lg-7 mb-0">
                                                <p className="small text-muted mb-1">Tên sản phẩm</p>
                                                <p>{productDetail.product_name}</p>
                                              </div>
                                              <div className="col-lg-5 mb-1">
                                                <p className="small text-muted mb-1">Giá tiền</p>

                                                <div className='row'>
                                                  <p><small><em className='fw-bold'>{item.quantity}x </em></small> {item.price_sale ? <NumericFormat value={item.price_sale} displayType="text" thousandSeparator={true} decimalScale={0} id="price" suffix="đ" />
                                                    : <NumericFormat value={item.price} displayType="text" thousandSeparator={true} decimalScale={0} id="price" suffix="đ" />
                                                  }  <s className='text-danger'>{item?.price_sale && <NumericFormat value={item.price} displayType="text" thousandSeparator={true} decimalScale={0} id="price" suffix="đ" />
                                                  }</s>

                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    ))}
                                    <hr />
                                    <div className="d-flex justify-content-between">
                                      <p className="fw-bold">Giảm Giá:</p>
                                      <p className="text-warning">-<NumericFormat value={order.order_checkout?.totalSpecialOffer} displayType="text" thousandSeparator={true} decimalScale={0} id="price" suffix="đ" /></p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <p className="fw-bold">Áp Mã Giảm Giá:</p>
                                      <p className="text-danger">-<NumericFormat value={order.order_checkout?.totalDiscount} displayType="text" thousandSeparator={true} decimalScale={0} id="price" suffix="đ" /></p>
                                    </div>
                                    <hr />
                                   
                                    <div className="d-flex justify-content-between">
                                      <p className="fw-bold">Tổng cộng:</p>
                                      <p className="fw-bold"></p><NumericFormat className='text-success fw-bold' value={order.order_checkout?.totalCheckout} displayType="text" thousandSeparator={true} decimalScale={0} id="price" suffix="đ" />
                                    </div>
                                    <hr />
                                    <h4 className="mb-4" style={{ color: '#f37a27' }}>Tình trạng đơn hàng</h4>
                                    <ul id="progressbar-1" className="progressbar">
                                      <li className={getStatusClass(order.order_status, 1)} id="step1">
                                        <span>Đã đặt hàng</span>
                                      </li>
                                      <li className={getStatusClass(order.order_status, 2)} id="step2">
                                        <span>Đã xác nhận</span>
                                      </li>
                                      <li className={getStatusClass(order.order_status, 3)} id="step3">
                                        <span>Đang giao hàng</span>
                                      </li>
                                      <li className={getStatusClass(order.order_status, 4)} id="step4">
                                        <span>Đã nhận hàng</span>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="modal-footer d-flex justify-content-center border-top-0">
                                    <p>Mọi thắc mắc<a href="#!" style={{ color: '#f37a27' }}> liên hệ chúng tôi</a></p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </header>
                        <hr />
                        <div className="row">
                          <div className="col-lg-4">
                            <p className="mb-0 text-dark fw-bold">Thông tin liên hệ</p>
                            <p className="m-0">
                              {userInfo.user_name} <br />
                              {userInfo.user_phone} <br />
                              {userInfo.user_email}
                            </p>
                          </div>
                          <div className="col-lg-4 border-start">
                            <p className="mb-0 text-dark fw-bold">Địa chỉ giao hàng</p>
                            <p className="m-0">
                              United States <br />
                              3601 Old Capitol Trail, Unit A-7, Suite 170777, Wilmington, DE 19808
                            </p>
                          </div>
                          <div className="col-lg-4 border-start">
                            <p className="mb-0 text-dark fw-bold">Phương thức thanh toán</p>
                            <em className="   m-0">
                              Tổng tiền thanh toán: <NumericFormat className='text-success fw-bold' value={order.order_checkout?.totalCheckout} displayType="text" thousandSeparator={true} decimalScale={0} id="price" suffix="đ" />
                            </em>
                          </div>
                          <hr />
                        </div>
                        <hr />
                        <ul className="row list-unstyled">
                          {order.order_product.map((product, productIndex) => (
                            <React.Fragment key={productIndex}>
                              {product.item_products.map((item, itemIndex) => {
                                getProductDetails(item); // Call function to fetch product details
                                const productDetail = productDetails[item.productId] || {};
                                return (
                                  <li className="col-xl-4 col-lg-6" key={itemIndex}>
                                    <div className="d-flex mb-3 mb-md-0">
                                      <div className="me-3">
                                        {productDetail.product_thumb && (
                                          <img
                                            width="72"
                                            height="72"
                                            src={productDetail.product_thumb[0]} // Đảm bảo product_thumb[0] là đường dẫn hợp lệ
                                            className="img-sm rounded border" // Áp dụng CSS cho hình ảnh
                                            alt={item.name}
                                          />
                                        )}
                                      </div>

                                      <div>
                                        <p className="mb-0">{productDetail.product_name}</p>
                                        <small><em className='fw-bold'>{item.quantity}x</em></small>    <strong>{item.price_sale ? <NumericFormat value={item.price_sale} displayType="text" thousandSeparator={true} decimalScale={0} id="price" suffix="đ" /> : <NumericFormat value={item.price} displayType="text" thousandSeparator={true} decimalScale={0} id="price" suffix="đ" />}</strong>

                                        {/* <strong><s className='text-danger'>{item?.price_sale && item.price_sale}</s></strong> */}

                                      </div>
                                    </div>
                                  </li>
                                );
                              })}
                            </React.Fragment>
                          ))}
                        </ul>
                      </div>
                    </div>

                  ))}
                </div>
              </div>

            </main>
          </div>
        </div>
      </section>
    </>
  );
}
