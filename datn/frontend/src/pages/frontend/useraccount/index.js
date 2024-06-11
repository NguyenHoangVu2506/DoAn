import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { onGetAddress, onInsertAddress, onLogout } from '../../../store/actions';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const toggleOpen = () => setBasicModal(!basicModal);
  const [phone_number, setPhone_number] = useState('');
  const [street, setStreet] = useState('');
  const [country, setCountry] = useState('');
  const [postal_code, setPostal_code] = useState('');
  const [city, setCity] = useState('');

  const [list_address, setListAddress] = useState(null)

  console.log(list_address)

  const { userInfo } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    }
  }, [userInfo]);

  const handleSubmit = async () => {

    try {
      const userLogout = await dispatch(onLogout({}))
      toast.success('logout success')
      navigate('/')
    } catch (error) {
    }
  }
  const handleInsert = async () => {

    try {
      const insertAddress = await dispatch(onInsertAddress({
        user_id: userInfo._id,
        phone_number: phone_number, street: street, postal_code: postal_code, city: city, country: country
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
        <div class="container py-4">
          {/*<!-- Breadcrumb -->*/}
          <nav class="d-flex">
            <h6 class="mb-0">
              <a href="" class="text-white-50">Home</a>
              <span class="text-white-50 mx-2"> - </span>
              <a href="" class="text-white-50">Profile</a>
              <span class="text-white-50 mx-2"> - </span>
              <a href="" class="text-white"><u>Shopping cart</u></a>
            </h6>
          </nav>
          {/*<!-- Breadcrumb -->*/}
        </div>
      </div>
      <section class="py-5 bg-light">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-xl-3">
              <nav class="nav flex-lg-column w-100 d-flex nav-pills mb-4">
                <a class="nav-link my-0 active" href="#"><p class="pb-0 mb-0" style={{ width: '100px' }}>Account main</p></a>
                <a class="nav-link my-0 bg-light" href="#"><p class="pb-0 mb-0" style={{ width: '100px' }}>New orders</p></a>
                <a class="nav-link my-0 bg-light" href="#"><p class="pb-0 mb-0" style={{ width: '100px' }}>Orders history</p></a>
                <Link to="/wish-list"class="nav-link my-0 bg-light" ><p class="pb-0 mb-0" style={{ width: '100px' }}>My wishlist</p></Link>
                <a class="nav-link my-0 bg-light" href="#"><p class="pb-0 mb-0" style={{ width: '100px' }}>Transactions</p></a>
                <a class="nav-link my-0 bg-light" href="#"><p class="pb-0 mb-0" style={{ width: '100px' }}>Profile setting</p></a>
                <button class="nav-link my-0 bg-light"><p class="pb-0 mb-0" style={{ width: '100px' }} onClick={() => handleSubmit()}>Log out</p></button>
              </nav>
            </div>
            <main class="col-lg-9 col-xl-9">
              <div class="card p-4 mb-0 shadow-0 border">
                <div class="content-body">
                  <div class="d-flex align-items-center">
                    <div class="me-3">
                      {/* <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/avatars/avatar.webp" class="rounded-circle" style={{height: '60px', width: '60px'}} /> */}
                    </div>
                    <div class="pt-2">
                      <h6 class="pt-2">{userInfo.user_name}</h6>
                      <p>
                        Email:{userInfo.user_email}, Phone: {userInfo.user_phone}
                        <a href="#" class="px-2"><i class="fa fa-pen"></i></a>
                      </p>
                    </div>
                  </div>

                  <hr />

                  <div class="row g-2 mb-3">
                    {list_address && list_address.map((address, index) => {
                      return (
                        <div class="col-md-6" key={index}>
                          <div class="border p-3 rounded-3 bg-light">
                            <b class="mx-2 text-muted"><i class="fa fa-map-marker-alt"></i></b>
                            {address.phone_number}, {address.street}, {address.city}, {address.country}
                          </div>
                        </div>
                      )
                    })}


                  </div>

                  {/* ADD DRESS */}
                  <div href="" class="">
                    <MDBBtn onClick={toggleOpen}> <i class="me-2 fa fa-plus"></i>Add New Address</MDBBtn>
                    <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
                      <MDBModalDialog centered>
                        <MDBModalContent>
                          <MDBModalHeader>
                            <MDBModalTitle>Modal title</MDBModalTitle>
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
                                  label='Phone Number'
                                />
                              </MDBValidationItem>

                              <MDBValidationItem className='col-md-6'>
                                <MDBInput
                                  value={street}
                                  name='Street'
                                  onChange={(e) => setStreet(e.target.value)}
                                  id='validationCustom02'
                                  required
                                  label='Street'
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
                                  label='City'
                                />
                              </MDBValidationItem>

                              <MDBValidationItem className='col-md-6' feedback='Please provide a valid zip.' invalid>
                                <MDBInput
                                  value={postal_code}
                                  name='postal_code'
                                  onChange={(e) => setPostal_code(e.target.value)}
                                  id='validationCustom05'
                                  required
                                  label='postal_code'
                                />
                              </MDBValidationItem>

                              <MDBValidationItem className='col-md-6' feedback='Please provide a valid zip.' invalid>
                                <MDBInput
                                  value={country}
                                  name='country'
                                  onChange={(e) => setCountry(e.target.value)}
                                  id='validationCustom05'
                                  required
                                  label='country'
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
                            <MDBBtn color='secondary' onClick={toggleOpen}>
                              Close
                            </MDBBtn>
                            <MDBBtn onClick={handleInsert}>Save changes</MDBBtn>
                          </MDBModalFooter>
                        </MDBModalContent>
                      </MDBModalDialog>
                    </MDBModal>


                  </div>

                  <hr class="my-4" />

                  <h5 class="mb-3">Your orders</h5>
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