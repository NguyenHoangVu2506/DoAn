import React from "react";
function Checkout() {
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
  return (
    <>
      <div class="bg-primary">
        <div class="container py-4">
          {/*<!-- Breadcrumb -->*/}
          <nav class="d-flex">
            <h6 class="mb-0">
              <a href="" class="text-white-50">Home</a>
              <span class="text-white-50 mx-2"> - </span>
              <a href="" class="text-white-50">2. Shopping cart</a>
              <span class="text-white-50 mx-2"> - </span>
              <a href="" class="text-white"><u>3. Order info</u></a>
              <span class="text-white-50 mx-2"> - </span>
              <a href="" class="text-white-50">4. Payment</a>
            </h6>
          </nav>
          {/*<!-- Breadcrumb -->*/}
        </div>
      </div>
      <section class="bg-light py-5">
        <div class="container">
          <div class="row">
            <div class="col-xl-8 col-lg-8 mb-4">

              {/*<!-- Checkout -->*/}
              <div class="card shadow-0 border">
                <div class="p-4">
                  <h5 class="card-title mb-3">Thông tin khách hàng</h5>
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
                          placeholder="Nhập địa chỉ"
                          style={addressInputStyle}
                        />
                      </div>
                    </div>
                  </div>
                  <hr class="my-4" />

                  <h5 class="card-title mb-3">Mã giảm giá</h5>

                  <div class="row mb-3">
                    <div class="col-lg-4 mb-3">
                      {/*<!-- Default checked radio -->*/}
                      <div class="form-check h-100 border rounded-3">
                        <div class="p-3">
                          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked />
                          <label class="form-check-label" for="flexRadioDefault1">
                            Express delivery 
                            <br />
                            <small class="text-muted">3-4 days via Fedex </small>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 mb-3">
                      {/*<!-- Default radio -->*/}
                      <div class="form-check h-100 border rounded-3">
                        <div class="p-3">
                          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                          <label class="form-check-label" for="flexRadioDefault2">
                            Post office <br />
                            <small class="text-muted">20-30 days via post </small>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 mb-3">
                      {/*<!-- Default radio -->*/}
                      <div class="form-check h-100 border rounded-3">
                        <div class="p-3">
                          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                          <label class="form-check-label" for="flexRadioDefault3">
                            Self pick-up <br />
                            <small class="text-muted">Come to our shop </small>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr class="my-4" />

                  <h5 class="card-title mb-3">Phương thức vận chuyển</h5>

                  <div class="row mb-3">
                    <div class="col-lg-4 mb-3">
                      {/*<!-- Default checked radio -->*/}
                      <div class="form-check h-100 border rounded-3">
                        <div class="p-3">
                          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked />
                          <label class="form-check-label" for="flexRadioDefault1">
                            Express delivery <br />
                            <small class="text-muted">3-4 days via Fedex </small>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 mb-3">
                      {/*<!-- Default radio -->*/}
                      <div class="form-check h-100 border rounded-3">
                        <div class="p-3">
                          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                          <label class="form-check-label" for="flexRadioDefault2">
                            Post office <br />
                            <small class="text-muted">20-30 days via post </small>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 mb-3">
                      {/*<!-- Default radio -->*/}
                      <div class="form-check h-100 border rounded-3">
                        <div class="p-3">
                          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                          <label class="form-check-label" for="flexRadioDefault3">
                            Self pick-up <br />
                            <small class="text-muted">Come to our shop </small>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="my-4" />
                  <h5 class="card-title mb-3">Hình thức thanh toán</h5>

                  <div class="row mb-3">
                    <div class="col-lg-4 mb-3">
                      {/*<!-- Default checked radio -->*/}
                      <div class="form-check h-100 border rounded-3">
                        <div class="p-3">
                          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked />
                          <label class="form-check-label" for="flexRadioDefault1">
                            Thanh toán khi nhận hàng <br />
                            <small class="text-muted">3-4 days via Fedex </small>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 mb-3">
                      {/*<!-- Default radio -->*/}
                      <div class="form-check h-100 border rounded-3">
                        <div class="p-3">
                          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                          <label class="form-check-label" for="flexRadioDefault2">
                            Thanh toán bằng momo <br />
                            <small class="text-muted">20-30 days via post </small>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 mb-3">
                      {/*<!-- Default radio -->*/}
                      <div class="form-check h-100 border rounded-3">
                        <div class="p-3">
                          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                          <label class="form-check-label" for="flexRadioDefault3">
                            Thanh toán bằng Zalopay <br />
                            <small class="text-muted">Come to our shop </small>
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
              {/*<!-- Checkout -->*/}
            </div>
            <div class="col-xl-4 col-lg-4 d-flex justify-content-center justify-content-lg-end">
              <div class="ms-lg-4 mt-4 mt-lg-0" style={{ maxWidth: '320px' }}>
                <h6 class="mb-3">Summary</h6>
                <div class="d-flex justify-content-between">
                  <p class="mb-2">Total price:</p>
                  <p class="mb-2">$195.90</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="mb-2">Discount:</p>
                  <p class="mb-2 text-danger">- $60.00</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="mb-2">Shipping cost:</p>
                  <p class="mb-2">+ $14.00</p>
                </div>
                <hr />
                <div class="d-flex justify-content-between">
                  <p class="mb-2">Total price:</p>
                  <p class="mb-2 fw-bold">$149.90</p>
                </div>

                <div class="input-group mt-3 mb-4">
                  <input type="text" class="form-control border" name="" placeholder="Promo code" />
                  <button class="btn btn-light text-primary border">Apply</button>
                </div>

                <hr />
                <h6 class="text-dark my-4">Items in cart</h6>

                <div class="d-flex align-items-center mb-4">
                  <div class="me-3 position-relative">
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary">
                      1
                    </span>
                    <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/7.webp" style={{ height: '96px', width: '96px' }} class="img-sm rounded border" />
                  </div>
                  <div class="">
                    <a href="#" class="nav-link">
                      Gaming Headset with Mic <br />
                      Darkblue color
                    </a>
                    <div class="price text-muted">Total: $295.99</div>
                  </div>
                </div>

                <div class="d-flex align-items-center mb-4">
                  <div class="me-3 position-relative">
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary">
                      1
                    </span>
                    <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/5.webp" style={{ height: '96px', width: '96px' }} class="img-sm rounded border" />
                  </div>
                  <div class="">
                    <a href="#" class="nav-link">
                      Apple Watch Series 4 Space <br />
                      Large size
                    </a>
                    <div class="price text-muted">Total: $217.99</div>
                  </div>
                </div>

                <div class="d-flex align-items-center mb-4">
                  <div class="me-3 position-relative">
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary">
                      3
                    </span>
                    <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/1.webp" style={{ height: '96px', width: '96px' }} class="img-sm rounded border" />
                  </div>
                  <div class="">
                    <a href="#" class="nav-link">GoPro HERO6 4K Action Camera - Black</a>
                    <div class="price text-muted">Total: $910.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
export default Checkout;