import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { onGetAddress, onInsertAddress, onLogout } from '../../../store/actions';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./UserOrder.css";



export default function UserOrder() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      await dispatch(onLogout({}))
      toast.success('logout success')
      window.location.reload()
      navigate('/')
    } catch (error) {
    }
  }
  return (
    <>
      <div class="bg-primary">
        <div className="bg-2" style={{ backgroundColor: '#f6831f' }} >
          <div className="container py-4 " >
            {/*<!-- Breadcrumb --> */}
            <nav className="d-flex" >
              <h6 className="mb-0">
                <a href="" className="text-white">Trang chủ</a>
                <span className="text-white mx-2">/ </span>
                <a href="" className="text-white">Quản lý tài khoản</a>
              </h6>
            </nav>
            {/*<!-- Breadcrumb --> */}
          </div>
        </div>

      </div>
      <section class="py-5 bg-light">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-xl-3">
              <nav class="nav flex-lg-column w-100 d-flex nav-pills mb-4">
                <a class="nav-link my-0 bg-light" href="/profile"><p class="pb-0 mb-0" style={{ width: '130px'}}>Tài khoản</p></a>
                <a class="nav-link my-0 active" href="#"><p class="pb-0 mb-0" style={{ width: '130px', color: '#f6831f'  }}>Đơn hàng</p></a>
                <a class="nav-link my-0 bg-light" href="/userorderhistory"><p class="pb-0 mb-0" style={{ width: '130px' }}>Lịch sử đơn hàng</p></a>
                <Link to="/wish-list" class="nav-link my-0 bg-light" ><p class="pb-0 mb-0" style={{ width: '130px' }}>Sản phẩm yêu thích</p></Link>
                <button class="nav-link my-0 bg-light"><p class="pb-0 mb-0" style={{ width: '100px' }} onClick={() => handleSubmit()}>Đăng xuất</p></button>
              </nav>
              {/* <div class="list-group list-group-light">
                <a href="#" class="list-group-item list-group-item-action px-3 border-0 active" data-mdb-ripple-init
                  aria-current="true">The current link item with a ripple</a>
                <a href="#" class="list-group-item list-group-item-action px-3 border-0" data-mdb-ripple-init>A second link item with
                  a ripple</a>
                <a href="#" class="list-group-item list-group-item-action px-3 border-0" data-mdb-ripple-init>A third link item with
                  a ripple</a>
                <a href="#" class="list-group-item list-group-item-action px-3 border-0" data-mdb-ripple-init>A fourth link item with
                  a ripple</a>
              </div> */}
            </div>
            <main class="col-lg-9 col-xl-9">
              <div class="card p-4 mb-0 shadow-0 border">
                <div class="content-body">
                  <h5 class="mb-3">Đơn hàng của bạn</h5>
                  <div class="card border border-primary mb-4 shadow-0">
                    <div class="card-body pb-0">
                      <header class="d-lg-flex">
                        <div class="flex-grow-1">
                          <h6 class="mb-0">Order ID: 8924 <i class="dot"></i>
                            <span class="text-success"> Shipped</span>
                          </h6>
                          <span class="text-muted">Date: 16 December 2022</span>
                        </div>
                        <div>
                          <a href="#" class="btn btn-sm btn-outline-danger">Cancel order</a>
                          <button type="button" className="btn btn-sm btn-outline-warning shadow-0" data-bs-toggle="modal"
                            data-bs-target={`#exampleModal`}>
                            <i></i> Thông tin vận chuyển
                          </button>
                          <div className="modal fade" id={`exampleModal`} tabIndex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header border-bottom-0">
                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body text-start p-4">
                                  <h5 className="modal-title text-uppercase mb-2" id="exampleModalLabel">test@gmail.com</h5>
                                  <h4 className="mb-2" style={{ color: '#f37a27' }}>Thông tin đơn hàng</h4>
                                  <div className="row">
                                    <div className="col mb-0">
                                      <p className="small text-muted mb-1">Date</p>
                                      <p>Date: 16 December 2022</p>
                                    </div>
                                    <div className="col mb-3">
                                      <p className="small text-muted mb-1">Order No.</p>
                                      <p>06525242</p>
                                    </div>
                                  </div>
                                  <hr />


                                  <div className="d-flex justify-content-between" >
                                    <p className="fw-bold mb-0">Test(SL:5)</p>
                                    <p className="text-muted mb-0">1.953.241đ</p>
                                  </div>

                                  <hr />
                                  <div className="d-flex justify-content-between">
                                    <p className="fw-bold">Tổng cộng</p>
                                    <p className="fw-bold">1.953.241đ</p>
                                  </div>
                                  <h4 className="mb-4" style={{ color: '#f37a27' }}>Tracking Order</h4>

                                  <ul id="progressbar-1" className="progressbar">
                                    <li className={`step0 active : ''}`} id="step1">
                                      <span>Đã đặt hàng</span>
                                    </li>
                                    <li className={`step0 active : ''} text-center`} id="step2">
                                      <span>Đang chuẩn bị hàng</span>
                                    </li>
                                    <li className={`step0 active : ''} text-center`} id="step3">
                                      <span>Đang giao hàng</span>
                                    </li>
                                    <li className={`step0 active : ''} text-muted text-end`} id="step4">
                                      <span>Đã nhận</span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="modal-footer d-flex justify-content-center border-top-0 py-4">
                                  <p>Want any help? <a href="#!" style={{ color: '#f37a27' }}>Please contact us</a></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </header>
                      <hr />
                      <div class="row">
                        <div class="col-lg-4">
                          <p class="mb-0 text-muted">Contact</p>
                          <p class="m-0">
                            Mike Johnatan <br />
                            Phone: 371-295-9131 <br />
                            Email: info@mywebsite.com
                          </p>
                        </div>
                        <div class="col-lg-4 border-start">
                          <p class="mb-0 text-muted">Shipping address</p>
                          <p class="m-0">
                            United States <br />
                            3601 Old Capitol Trail, Unit A-7, Suite 170777, Wilmington, DE 19808
                          </p>
                        </div>
                        <div class="col-lg-4 border-start">
                          <p class="mb-0 text-muted">Payment</p>
                          <p class="m-0">
                            <span class="text-success"> Visa **** 4216 </span> <br />
                            Shipping fee: $56 <br />
                            Total paid: $456
                          </p>
                        </div>
                      </div>
                      <hr />
                      <ul class="row list-unstyled">
                        <li class="col-xl-4 col-lg-6">
                          <div class="d-flex mb-3 mb-xl-0">
                            <div class="me-3">
                              <img width="72" height="72" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.webp" class="img-sm rounded border" />
                            </div>
                            <div class="">
                              <p class="mb-0">T-shirts with multiple colors</p>
                              <strong> 2x = $25.98 </strong>
                            </div>
                          </div>
                        </li>
                        <li class="col-xl-4 col-lg-6">
                          <div class="d-flex mb-3 mb-xl-0">
                            <div class="me-3">
                              <img width="72" height="72" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/7.webp" class="img-sm rounded border" />
                            </div>
                            <div class="">
                              <p class="mb-0">Gaming Headset 32db Black</p>
                              <strong> 2x = $339.90 </strong>
                            </div>
                          </div>
                        </li>
                        <li class="col-xl-4 col-lg-6">
                          <div class="d-flex mb-3 mb-md-0">
                            <div class="me-3">
                              <img width="72" height="72" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/5.webp" class="img-sm rounded border" />
                            </div>
                            <div class="">
                              <p class="mb-0">Apple Watch Series 4 Space Gray</p>
                              <strong> 2x = $339.90 </strong>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="card border border-primary shadow-0">
                    <div class="card-body pb-0">
                      <header class="d-lg-flex">
                        <div class="flex-grow-1">
                          <h6 class="mb-0">
                            Order ID: 9088
                            <i class="dot"></i>
                            <span class="text-danger"> Pending </span>
                          </h6>
                          <span class="text-muted">Date: 16 December 2022</span>
                        </div>
                        <div>
                          <a href="#" class="btn btn-sm btn-outline-danger">Cancel order</a>
                          <a href="#" class="btn btn-sm btn-primary shadow-0">Track order</a>
                        </div>
                      </header>
                      <hr />
                      <div class="row">
                        <div class="col-lg-4">
                          <p class="mb-0 text-muted">Contact</p>
                          <p class="m-0">
                            Mike Johnatan <br />
                            Phone: 371-295-9131 <br />
                            Email: info@mywebsite.com
                          </p>
                        </div>
                        <div class="col-lg-4 border-start">
                          <p class="mb-0 text-muted">Shipping address</p>
                          <p class="m-0">
                            United States <br />
                            600 Markley Street, Suite 170777 Port Reading, NJ 07064
                          </p>
                        </div>
                        <div class="col-lg-4 border-start">
                          <p class="mb-0 text-muted">Payment</p>
                          <p class="m-0">
                            <span class="text-success"> Visa **** 4216 </span> <br />
                            Shipping fee: $56 <br />
                            Total paid: $456
                          </p>
                        </div>
                      </div>
                      <hr />
                      <ul class="row list-unstyled">
                        <li class="col-xl-4 col-lg-6">
                          <div class="d-flex mb-3 mb-lg-0">
                            <div class="me-3 mb-xl-0">
                              <img width="72" height="72" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.webp" class="img-sm rounded border" />
                            </div>
                            <div class="info">
                              <p class="mb-0">T-shirts with multiple colors</p>
                              <strong> 2x = $25.98 </strong>
                            </div>
                          </div>
                        </li>
                        <li class="col-xl-4 col-lg-6">
                          <div class="d-flex mb-0 mb-md-0">
                            <div class="me-3">
                              <img width="72" height="72" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/7.webp" class="img-sm rounded border" />
                            </div>
                            <div class="info">
                              <p class="mb-0">Gaming Headset 32db Black</p>
                              <strong> 2x = $339.90 </strong>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );


}