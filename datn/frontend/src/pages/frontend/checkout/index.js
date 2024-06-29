import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import accounting from 'accounting';
import { toast } from 'react-toastify';
import { PayPalButton } from 'react-paypal-button-v2';
import { newOrder, deleteCartIdUserId, onGetAddress } from '../../../store/actions';
import { getOrderFromCart, getCartFromLocalStorage, deleteOrderFromCart } from '../../../utils';
// <<<<<<< HEAD
import { Helmet } from 'react-helmet';
// =======
// >>>>>>> origin/main

function Checkout() {
  const dispatch = useDispatch();
  const inputStyle = {
    border: '1px solid #ced4da',
    borderRadius: '0.25rem',
    padding: '0.375rem 0.75rem',
    fontSize: '1rem',
    lineHeight: '1.5',
    marginBottom: '1rem'
  };

  const addressInputStyle = {
    ...inputStyle,
    height: '100px'
  };
  const navigate = useNavigate();

  const { price_total, price_total_discount, price_total_promotion, price_total_checkout, discountsApply = [] } = getOrderFromCart();

  const { userInfo } = useSelector((state) => state.userReducer);

  const [shippingMethod, setShippingMethod] = useState('normal');
  const [shippingFee, setShippingFee] = useState(30000);
  const [paymentMethod, setPaymentMethod] = useState('cod'); // State to track payment method
  const [cart_products] = useState(getCartFromLocalStorage());
  const [sdkReady, setSdkReady] = useState(false);
  const [list_address, setListAddress] = useState(null)
  const [selectedAddress, setSelectedAddress] = useState(null);
  const handleShippingChange = (event) => {
    const selectedShippingMethod = event.target.value;
    setShippingMethod(selectedShippingMethod);

    if (selectedShippingMethod === 'normal') {
      setShippingFee(30000);
    } else if (selectedShippingMethod === 'express') {
      setShippingFee(50000);
    }
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const handleAddressChange = (addr) => {
    setSelectedAddress(addr);
  };
  const handleOrder = async () => {
    const discounts = discountsApply.map((discount) => { return { discountId: discount._id, codeId: discount.discount_code } });

    const new_order = await dispatch(newOrder({
      userId: userInfo._id,
      user_address: selectedAddress,
      user_email: userInfo.user_email,
      user_payment: {},
      order_ids: {
        shop_discounts: discounts,
        item_products: cart_products
      }
    }));

    if (new_order?.payload?.status === (200 || 201)) {
      toast.success("Đặt hàng thành công");
      dispatch(deleteCartIdUserId({ userId: userInfo._id }));
      deleteOrderFromCart();

      navigate('/');
    } else {
      toast.error("Đặt hàng không thành công");
    }
  };
  const addPaypalScript = async () => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://www.paypal.com/sdk/js?client-id=AfEnMkMTk9Mp4mE6TQkrboXYlSLLZdK-golmOEr_4nRMDyHRDxmW53pWT_IsPwvZPIRkVWdw4lDbHhA4";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    script.onerror = () => {
      console.error("Failed to load PayPal script.");
      setSdkReady(false);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, []);
  ///address
  const getAddress = async () => {
    const call_address = await dispatch(onGetAddress({
      user_id: userInfo._id,
    }))
    setListAddress(call_address.payload.metaData)

  }

  useEffect(() => {
    if (!list_address) {
      getAddress()

    }
  }, [userInfo, list_address])
  console.log(list_address)

  /////////
  const onSuccessPaypal = async (details, data) => {
    const discounts = discountsApply.map((discount) => { return { discountId: discount._id, codeId: discount.discount_code } });

    const new_order = await dispatch(newOrder({
      userId: userInfo._id,
      user_address: selectedAddress,
      user_email: userInfo.user_email,
      user_payment: 'paypal',
      order_ids: {
        shop_discounts: discounts,
        item_products: cart_products
      }
    }));
    if (new_order?.payload?.status === (200 || 201)) {
      toast.success("Đặt hàng thành công");
      dispatch(deleteCartIdUserId({ userId: userInfo._id }));
      deleteOrderFromCart();

      navigate('/');
    } else {
      toast.error("Đặt hàng không thành công");
    }
  }
  return (
    <>
      <div className="bg-primary">
        <div className="bg-2" style={{ backgroundColor: 'white' }}>
          <div className="container py-4">
            {/* <<<<<<< HEAD */}
            <Helmet>
              <title>Thanh toán - HoangVu</title>
            </Helmet>
            {/* // =======
// >>>>>>> origin/main */}
            {/* Breadcrumb */}
            <nav className="d-flex">
              <h6 className="mb-0">
                <Link to={'/'} className=" " style={{ color: '#f6831f' }}>Trang Chủ</Link>
                <span className=" mx-2" style={{ color: '#f6831f' }}> - </span>
                <Link to={'/gio-hang'} style={{ color: '#f6831f' }}>Giỏ hàng</Link>
                <span className="mx-2" style={{ color: '#f6831f' }}> - </span>
                <Link to={'/checkout'} style={{ color: '#f6831f' }}><u>Thanh toán</u></Link>
              </h6>
            </nav>
            {/* Breadcrumb */}
          </div>
        </div>
      </div>
      <section className="bg-light my-5">
        <div className="container">
          <div className="row">
            {/* Giỏ hàng */}
            <div className="col-lg-9">
              <div className="card shadow-0 border">
                <div className="p-4">
                  <h5 className="card-title mb-3">Thông tin khách hàng</h5>
                  <div className="row">
                    <div className="col-6 mb-3">
                      <p className="mb-0">Họ và tên </p>
                      <div className="form-outline">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nhập tên"
                          style={inputStyle}
                          value={userInfo.user_name}
                        />
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      <p className="mb-0">Số Điện Thoại</p>
                      <div className="form-outline">
                        <textarea
                          type="text"
                          className="form-control"
                          placeholder="Nhập số điện thoại"
                          style={inputStyle}
                          value={userInfo.user_phone}
                        />
                      </div>
                    </div>
                    <h5 className="card-title mb-3">Vui lòng chọn địa chỉ</h5>
                    <div className="row mb-3">
                      {list_address && list_address.map((addr, index) => (
                        <div className="col-lg-6 mb-3" key={index}>
                          <div className="form-check h-100 border rounded-3">
                            <div className="p-3">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id={`flexRadioDefault${index + 2}`}
                                checked={selectedAddress === addr}
                                onChange={() => handleAddressChange(addr)}
                              />
                              <b className="mx-2 text-muted"><i className="fa fa-map-marker-alt"></i></b>
                              {addr.postal_code} {addr.street} {addr.city} {addr.country}
                              <b className="mx-2 text-muted"><i className="fa fa-phone"></i></b>
                              {addr.phone_number}
                            </div>
                          </div>
                        </div>
                      ))}                    </div>

                    {/* <div className="col-12 mb-3">
                      <p className="mb-0">Địa chỉ</p>
                      <div className="form-outline">
                        <textarea
                          type="text"
                          className="form-control"
                          placeholder="Nhập địa chỉ"
                          style={addressInputStyle}
                        />
                      </div>
                    </div> */}
                    <div className="col-12 mb-3">
                      <p className="mb-0">Ghi chú</p>
                      <div className="form-outline">
                        <textarea
                          type="text"
                          className="form-control"
                          placeholder="Nhập ghi chú"
                          style={addressInputStyle}
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <hr className="my-4" />
                  <h5 className="card-title mb-3">Hình thức thanh toán</h5>
                  <div className="row mb-3">
                    <div className="col-lg-4 mb-3">
                      <div className="form-check h-100 border rounded-3">
                        <div className="p-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="flexRadioDefault3"
                            value="cod"
                            checked={paymentMethod === 'cod'}
                            onChange={handlePaymentMethodChange}
                          />
                          <label className="form-check-label" htmlFor="flexRadioDefault3">
                            Thanh toán khi nhận hàng <br />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 mb-3">
                      <div className="form-check h-100 border rounded-3">
                        <div className="p-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="flexRadioDefault4"
                            value="paypal"
                            checked={paymentMethod === 'paypal'}
                            onChange={handlePaymentMethodChange}
                          />
                          <label className="form-check-label" htmlFor="flexRadioDefault4">
                            Thanh toán bằng Paypal <br />
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-lg-4 mb-3">
                      <div className="form-check h-100 border rounded-3">
                        <div className="p-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="flexRadioDefault5"
                            value="bank"
                            checked={paymentMethod === 'bank'}
                            onChange={handlePaymentMethodChange}
                          />
                          <label className="form-check-label" htmlFor="flexRadioDefault5">
                            Thanh toán qua ngân hàng <br />
                          </label>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  {/* Render PayPal button only if payment method is PayPal */}
                </div>
              </div>
            </div>
            {/* Giỏ hàng */}

            {/* Tóm tắt */}
            <div className="col-lg-3">
              <div className="card shadow-0 border">
                <div className="p-2">
                  <h5 className="card-title mb-3">Tóm tắt</h5>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Tạm tính:</p>
                    <p className="mb-2">{accounting.formatNumber(price_total, 0, ".", ",")} <span className="text-muted">đ</span></p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Giảm giá:</p>
                    <p className="mb-2 text-success">{accounting.formatNumber(price_total - price_total_checkout, 0, ".", ",")} <span className="text-muted">đ</span></p>
                  </div>
                  {/* <div className="d-flex justify-content-between">
                    <p className="mb-2">Phí vận chuyển:</p>
                    <p className="mb-2">{accounting.formatNumber(shippingFee, 0, ".", ",")} <span className="text-muted">đ</span></p>
                  </div> */}
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Tổng thanh toán:</p>
                    <p className="mb-2 fw-bold h6">{accounting.formatNumber(price_total_checkout, 0, ".", ",")} <span className="text-muted">đ</span></p>
                  </div>

                  <div className="mt-1">
                    {paymentMethod === 'paypal' ? (
                      sdkReady ? (
                        <div className="row mb-2">
                          <div className="col-lg-12">
                            <div className="h-100 border rounded-3">
                              <div className="p-3 w-100 " style={{ width: '90%' }}>
                                <PayPalButton
                                  amount={price_total_checkout}
                                  onSuccess={onSuccessPaypal}
                                  onError={() => {
                                    toast.error("Thanh toan không thành công");
                                  }}

                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="alert alert-danger">Failed to load PayPal script. Please try again later.</div>
                      )
                    ) : (
                      <button onClick={handleOrder} className="btn btn-success w-100 shadow-0 mb-2"> Đặt hàng </button>
                    )}
                    <Link to={'/gio-hang'} className="btn btn-light w-100 border mt-2">Trở lại giỏ hàng</Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Tóm tắt */}
          </div>
        </div>
      </section>
    </>
  );
}

export default Checkout;
