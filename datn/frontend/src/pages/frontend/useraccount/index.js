import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { onGetAddress, onInsertAddress, onLogout, updateUser } from '../../../store/actions';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./UserOrder.css";
// <<<<<<< HEAD
import { Helmet } from 'react-helmet';
// =======
// >>>>>>> origin/main

import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBInputGroup,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBCheckbox,
} from 'mdb-react-ui-kit';


export default function UserAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [basicModal, setBasicModal] = useState(false);
  const [scrollableModal, setScrollableModal] = useState(false);

  const toggleOpen = () => setBasicModal(!basicModal);
  const openUser = () => setScrollableModal(!scrollableModal);

  const [phone_number, setPhone_number] = useState('');
  const [street, setStreet] = useState('');
  const [country, setCountry] = useState('');
  const [postal_code, setPostal_code] = useState('');
  const [city, setCity] = useState('');
  const [list_address, setListAddress] = useState(null)

  console.log(list_address)


  const [user_name, setUser_name] = useState('');
  const [user_phone, setUser_phone] = useState('');
  const [user_sex, setUser_sex] = useState('');
  const [user_avatar, setUser_avatar] = useState('');
  const [user_age, setUser_age] = useState('');


  const { userInfo } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(onLogout())
      toast.success('Đăng Xuất Thành Công')
      navigate('/')
    } catch (error) {
      alert("sss")
    }
  }

  const handleUpdate = async () => {
    try {
      await dispatch(updateUser({
        user_id: userInfo._id,
        user_name: user_name,
        user_phone: user_phone,
        user_sex: user_sex,
        user_age: user_age
      }))
      setUser_name('')
      setUser_phone('')
      setUser_sex('')
      setUser_avatar('')
      setUser_age('')
      setScrollableModal(false)
    } catch (error) {
      console.log(error)
    }
  }


  const handleInsert = async () => {
    try {
      await dispatch(onInsertAddress({
        user_id: userInfo._id,
        phone_number: phone_number,
        street: street,
        city: city,
        postal_code: postal_code,
        country: country
      }))
      setCity('')
      setPhone_number('')
      setPostal_code('')
      setCountry('')
      setStreet('')
      setBasicModal(false)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }



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

  return (
    <>
      <div class="bg-primary">
        <div className="bg-" style={{ backgroundColor: 'white' }} >
          <div className="container py-4 " >
{/* <<<<<<< HEAD */}
            <Helmet>
              <title>Quản lý tài khoản - HoangVu</title>
            </Helmet>
{/* =======
>>>>>>> origin/main */}
            {/*<!-- Breadcrumb --> */}
            <nav className="d-flex" >
              <h6 className="mb-0">
                <Link to="/" style={{ color: '#f6831f' }}>Trang chủ</Link>
                <span className=" mx-2" style={{ color: '#f6831f' }}>/ </span>
                <Link to="/profile" style={{ color: '#f6831f' }}>Quản lý tài khoản</Link>

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
                <a class="nav-link my-0 active" href="#"><p class="pb-0 mb-0" style={{ width: '130px', color: '#f6831f' }}>Tài khoản</p></a>
                <a class="nav-link my-0 bg-light" href="/userorder"><p class="pb-0 mb-0" style={{ width: '130px' }}>Đơn hàng</p></a>
                {/* <a class="nav-link my-0 bg-light" href="/userorderhistory"><p class="pb-0 mb-0" style={{ width: '130px' }}>Lịch sử đơn hàng</p></a> */}
                <Link to="/wish-list" class="nav-link my-0 bg-light" ><p class="pb-0 mb-0" style={{ width: '130px' }}>Sản phẩm yêu thích</p></Link>
                <button class="nav-link my-0 bg-light"><p class="pb-0 mb-0" style={{ width: '100px' }} onClick={(e) => handleSubmit(e)}>Đăng xuất</p></button>
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
                  <div class="d-flex align-items-center">
                    <div class="me-5 ml-5">
                      <img src="https://i.pinimg.com/236x/20/f7/49/20f74927b860bb6ac341f541fac9a866.jpg" class="rounded-circle" style={{ height: '200px', width: '200px' }} />
                    </div>
                    <div class="ms-5 pt-2">
                      <h6 class="pt-2">{userInfo.user_name}</h6>
                      <p>
                        Email: {userInfo.user_email}
                      </p>
                      <p>Phone: {userInfo.user_phone}</p>
                      <p>Giới Tính: {userInfo.user_sex}</p>
                      <p>Tuổi: {userInfo.user_age}</p>

{/* <<<<<<< HEAD
                      <MDBBtn style={{ backgroundColor: '#f6831f', color: 'white', boxShadow: '6px' }} onClick={openUser}><i class="fa fa-pen"></i></MDBBtn>
======= */}
                      <MDBBtn style={{ backgroundColor: '#f6831f', color: 'white', boxShadow:'6px' }} onClick={openUser}><i class="fa fa-pen"></i></MDBBtn>
{/* >>>>>>> origin/main */}
                      <MDBModal open={scrollableModal} onClose={() => setScrollableModal(false)} tabIndex='-1'>
                        <MDBModalDialog scrollable>
                          <MDBModalContent>
                            <MDBModalHeader>
                              <MDBModalTitle >Thay Đổi Thông Tin</MDBModalTitle>
                              <MDBBtn
                                className='btn-close'
                                color='none'
                                onClick={(openUser) => setScrollableModal(false)}
                              ></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody >
                              <MDBInput style={{ backgroundColor: 'white', color: '#f6831f', marginBottom: '20px' }}
                                value={user_name}
                                name='Nhập họ tên'
                                onChange={(e) => setUser_name(e.target.value)}
                                required label='Họ và Tên'
                                id="typeText" type="text" />
                              <MDBInput style={{ backgroundColor: 'white', color: '#f6831f', marginBottom: '20px' }}
                                value={user_phone}
                                name='Nhập SDT'
                                onChange={(e) => setUser_phone(e.target.value)}
                                required
                                label="Số Điện Thoại" id="typePhone" type="tel" />
                              <MDBInput style={{ backgroundColor: 'white', color: '#f6831f', marginBottom: '20px' }}
                                value={user_sex}
                                name='Nhập'
                                onChange={(e) => setUser_sex(e.target.value)}
                                required
                                label="Giới Tính" id="typeText" type="text" />
                              <MDBInput style={{ backgroundColor: 'white', color: '#f6831f', marginBottom: '20px' }}
                                value={user_age}
                                name='Nhập'
                                onChange={(e) => setUser_age(e.target.value)}
                                required
                                label="Tuổi" id="typeText" type="text" />
                              {/* <MDBInput style={{ backgroundColor: 'white', color: '#f6831f', marginBottom: '20px' }} label="Thành Phố" id="typeText" type="text" />
                              <MDBInput style={{ backgroundColor: 'white', color: '#f6831f', marginBottom: '20px' }} label="Tỉnh" id="typeText" type="text" /> */}

                            </MDBModalBody>
                            <MDBModalFooter>
                              <MDBBtn color='danger' onClick={(openUser) => setScrollableModal(!setScrollableModal)}>
                                Đóng
                              </MDBBtn>
                              <MDBBtn style={{ backgroundColor: '#f6831f', color: 'white' }} onClick={handleUpdate}>Thay Đổi</MDBBtn>
                            </MDBModalFooter>
                          </MDBModalContent>
                        </MDBModalDialog>
                      </MDBModal>

                    </div>
                  </div>

                  <hr />

                  <div class="row g-2 mb-3">
                    {list_address && list_address.map((address, index) => {
                      return (
                        <div class="col-md-6" key={index}>
                          <div class=" border p-3 rounded-3 bg-light">
                            <b class="mx-2 text-muted"><i class="fa fa-map-marker-alt"></i></b>
                            {address.phone_number},{address.postal_code}, {address.street}, {address.city}, {address.country}
                          </div>

                        </div>
                      )
                    })}


                  </div>

                  {/* ADD DRESS */}
                  <div href="" class="">
                    <MDBBtn onClick={toggleOpen} style={{ backgroundColor: '#f6831f', color: 'white' }}> <i class="me-2 fa fa-plus"></i>Thêm Địa Chỉ</MDBBtn>
                    <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
                      <MDBModalDialog centered>
                        <MDBModalContent>
                          <MDBModalHeader>
                            <MDBModalTitle>Thêm địa chỉ mới</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                          </MDBModalHeader>
                          <MDBModalBody>
                            <MDBValidation className='row g-3'>

                              <MDBValidationItem className='col-md-6'>
                                <MDBInput
                                  value={phone_number}
                                  name='phone_number'
                                  onChange={(e) => setPhone_number(e.target.value)}
                                  id='validationCustom01'
                                  required
                                  label='Số Điện Thoại'
                                />
                              </MDBValidationItem>

                              <MDBValidationItem className='col-md-6'>
                                <MDBInput
                                  value={street}
                                  name='Street'
                                  onChange={(e) => setStreet(e.target.value)}
                                  id='validationCustom02'
                                  required
                                  label='Đường'
                                />
                              </MDBValidationItem>

                              {/* <MDBValidationItem feedback='Please choose a username.' invalid className='col-md-4'>
                                <MDBInputGroup textBefore='@'>
                                  <input
                                    type='text'
                                    className='form-control'
                                    id='validationCustomUsername'
                                    placeholder='Username'
                                    required
                                  />
                                </MDBInputGroup>
                              </MDBValidationItem> */}

                              <MDBValidationItem className='col-md-6' feedback='Please provide a valid city.' invalid>
                                <MDBInput
                                  value={city}
                                  name='city'
                                  onChange={(e) => setCity(e.target.value)}
                                  id='validationCustom03'
                                  required
                                  label='Thành Phố'
                                />
                              </MDBValidationItem>

                              <MDBValidationItem className='col-md-6' feedback='Please provide a valid zip.' invalid>
                                <MDBInput
                                  value={postal_code}
                                  name='postal_code'
                                  onChange={(e) => setPostal_code(e.target.value)}
                                  id='validationCustom05'
                                  required
                                  label='Số Nhà'
                                />
                              </MDBValidationItem>

                              <MDBValidationItem className='col-md-6' feedback='Please provide a valid zip.' invalid>
                                <MDBInput
                                  value={country}
                                  name='country'
                                  onChange={(e) => setCountry(e.target.value)}
                                  id='validationCustom05'
                                  required
                                  label='Tỉnh'
                                />
                              </MDBValidationItem>

                              {/* <MDBValidationItem className='col-12' feedback='You must agree before submitting.' invalid>
                                <MDBCheckbox label='Agree to terms and conditions' id='invalidCheck' required />
                              </MDBValidationItem> */}

                              {/* <div className='col-12'>
                                <MDBBtn type='submit'onClick={handleInsert}>Submit form</MDBBtn>
                                <MDBBtn type='reset'>Reset form</MDBBtn>
                              </div> */}
                            </MDBValidation>

                          </MDBModalBody>

                          <MDBModalFooter>
                            <MDBBtn color='danger' onClick={toggleOpen}>
                              Đóng
                            </MDBBtn>
                            <MDBBtn style={{ backgroundColor: '#f6831f', color: 'white' }} onClick={handleInsert}>Thêm</MDBBtn>
                          </MDBModalFooter>
                        </MDBModalContent>
                      </MDBModalDialog>
                    </MDBModal>


                  </div>

                  <hr class="my-4" />

                  {/* <h5 class="mb-3">Your orders</h5>
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
                  </div> */}
                </div>
              </div>
            </main>
          </div>

        </div>
      </section>
    </>
  );


}