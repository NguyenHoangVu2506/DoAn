import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, productById } from "../../../store/actions";

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
  
  const { cart } = useSelector((state) => state.cartReducer);
  const { userInfo } = useSelector((state) => state.userReducer);

  const [shippingMethod, setShippingMethod] = useState('normal');
  const [shippingFee, setShippingFee] = useState(30000);
  const [product_item, setProductItem] = useState(null);
  const [_quantity, setQuantity] = useState(null);
  const [productItems, setProductItems] = useState([]);

  useEffect(() => {
    if (userInfo) {
      dispatch(getCart({ userId: userInfo._id }));
    }
  }, [userInfo, dispatch]);

  useEffect(() => {
    if (cart && cart.cart_products && cart.cart_products.length > 0) {
      fetchProductDetails();
    }
  }, [cart]);
console.log(cart)
  const fetchProductDetails = async () => {
    try {
      const productsWithDetails = await Promise.all(
        cart.cart_products.map(async (product) => {
          const response = await dispatch(productById({ spu_id: product.productId }));
          if (response && response.payload.metaData) {
            return response.payload.metaData;
          }
          return null;
        })
      );

      setProductItems(productsWithDetails.filter(product => product !== null));
    } catch (error) {
      console.error('Lỗi khi lấy thông tin sản phẩm:', error);
    }
  };

  const handleShippingChange = (event) => {
    const selectedShippingMethod = event.target.value;
    setShippingMethod(selectedShippingMethod);

    if (selectedShippingMethod === 'normal') {
      setShippingFee(30000);
    } else if (selectedShippingMethod === 'express') {
      setShippingFee(50000);
    }
  };
  return (
    <>
      <div className="bg-primary">
        <div className="bg-2" style={{ backgroundColor: '#f6831f' }}>
          <div className="container py-4">
            {/* Breadcrumb */}
            <nav className="d-flex">
              <h6 className="mb-0">
                <a href="" className="text-white-50">Home</a>
                <span className="text-white-50 mx-2"> - </span>
                <a href="" className="text-white-50">2. Giỏ hàng</a>
                <span className="text-white-50 mx-2"> - </span>
                <a href="" className="text-white"><u>3. Thông tin đơn hàng</u></a>
                <span className="text-white-50 mx-2"> - </span>
                <a href="" className="text-white-50">4. Thanh toán</a>
              </h6>
            </nav>
            {/* Breadcrumb */}
          </div>
        </div>
      </div>

      <section className="bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8 mb-2">
              {/* Checkout */}
              <div className="card shadow-0 border">
                <div className="p-4">
                  <h5 className="card-title mb-3">Thông tin khách hàng</h5>
                  <div className="row">
                    <div className="col-6 mb-3">
                      <p className="mb-0">Họ và tên</p>
                      <div className="form-outline">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nhập tên"
                          style={inputStyle}
                        />
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      <p className="mb-0">Phone</p>
                      <div className="form-outline">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nhập số điện thoại"
                          style={inputStyle}
                        />
                      </div>
                    </div>
                    <div className="col-12 mb-3">
                      <p className="mb-0">Địa chỉ</p>
                      <div className="form-outline">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nhập địa chỉ"
                          style={addressInputStyle}
                        />
                      </div>
                    </div>
                    <div className="col-12 mb-3">
                      <p className="mb-0">Ghi chú</p>
                      <div className="form-outline">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nhập ghi chú"
                          style={addressInputStyle}
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <h5 className="card-title mb-3">Phương thức vận chuyển</h5>
                  <div className="row mb-3">
                    <div className="col-lg-4 mb-3">
                      <div className="form-check h-100 border rounded-3">
                        <div className="p-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="shippingMethod"
                            id="flexRadioDefault2"
                            value="normal"
                            checked={shippingMethod === 'normal'}
                            onChange={handleShippingChange}
                          />
                          <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Vận chuyển nhanh <br />
                            <small className="text-muted">Thời gian từ 4-5 ngày</small>
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
                            name="shippingMethod"
                            id="flexRadioDefault1"
                            value="express"
                            checked={shippingMethod === 'express'}
                            onChange={handleShippingChange}
                          />
                          <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Vận chuyển hỏa tốc <br />
                            <small className="text-muted">Thời gian từ 1-2 ngày</small>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
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
                            checked
                          />
                          <label className="form-check-label" htmlFor="flexRadioDefault3">
                            Thanh toán khi nhận hàng <br />
                            <small className="text-muted">3-4 days via Fedex </small>
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
                          />
                          <label className="form-check-label" htmlFor="flexRadioDefault4">
                            Thanh toán bằng momo <br />
                            <small className="text-muted">20-30 days via post </small>
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
                            id="flexRadioDefault5"
                          />
                          <label className="form-check-label" htmlFor="flexRadioDefault5">
                            Thanh toán bằng Zalopay <br />
                            <small className="text-muted">Come to our shop </small>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="float-end">
                    <button className="btn btn-light border">Hủy</button>
                    <button className="btn btn-success shadow-0 border">Tiếp tục</button>
                  </div>
                </div>
              </div>
              {/* Checkout */}
            </div>
            <div className="col-xl-4 col-lg-4 d-flex justify-content-center justify-content-lg-end">
              <div className="ms-lg-4 mt-4 mt-lg-0" style={{ maxWidth: '320px' }}>
                <h6 className="mb-3">Summary</h6>
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Tổng tiền:</p>
                  <p className="mb-2">195.90</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Giảm giá:</p>
                  <p className="mb-2 text-danger">- 60.00</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Phí vận chuyển:</p>
                  <p className="mb-2">{shippingFee === 0 ? 'Miễn phí' : `${shippingFee}`}</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Tổng tiền:</p>
                  <p className="mb-2 fw-bold">149.90</p>
                </div>
                <hr />
                
                <h6 className="text-dark my-4">Sản phẩm trong giỏ hàng</h6>
                {productItems.map((product, index) => (
                  <div className="d-flex align-items-center mb-4" key={index}>
                    <div className="me-3 position-relative">
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary">
                        1
                      </span>
                      <img src={product.spu_info.product_thumb[0]} style={{ height: '96px', width: '96px' }} className="img-sm rounded border" alt="item" />
                    </div>
                    <div className="">
                      <a href="#" className="nav-link">
                      {product.spu_info.product_name}
                      </a>
                      <div className="price text-muted">Giá:  {product.spu_info.product_price}</div>
                    </div>
                  </div>

                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Checkout;
