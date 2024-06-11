import React, { useEffect } from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { getInfo } from '../../store/actions';
import { Link } from 'react-router-dom';

export default function Footer({ }) {
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.infoReducer);
  useEffect(() => {
    if (!info) {
      dispatch(getInfo({ isPublished: true }))
    }
  }, [info])
  console.log(info)
  const logoStyle = {
    width: '200px',
    height: 'auto',
    cursor: 'pointer',
  };
  return (
    // <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>

    //   <section className='border-top'>
    //     <MDBContainer className='text-center text-md-start mt-5'>
    //       <MDBRow className=''>
    //         <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'   style={{}} >
    //         <img
    //         src={
    //           'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
    //         }
    //         style={logoStyle}
    //         alt="logo of sitemark"
    //       />

    //           <h6 className='text-uppercase fw-bold mb-4'>
    //             <MDBIcon icon="gem" className="me-3" />
    //             Company name
    //           </h6>

    //           <p>
    //             Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
    //             consectetur adipisicing elit.
    //           </p>
    //         </MDBCol>

    //         <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
    //           <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
    //           <p>
    //             <a href='#!' className='text-reset'>
    //               Angular
    //             </a>
    //           </p>
    //           <p>
    //             <a href='#!' className='text-reset'>
    //               React
    //             </a>
    //           </p>
    //           <p>
    //             <a href='#!' className='text-reset'>
    //               Vue
    //             </a>
    //           </p>
    //           <p>
    //             <a href='#!' className='text-reset'>
    //               Laravel
    //             </a>
    //           </p>
    //         </MDBCol>

    //         <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
    //           <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
    //           <p>
    //             <a href='#!' className='text-reset'>
    //               Pricing
    //             </a>
    //           </p>
    //           <p>
    //             <a href='#!' className='text-reset'>
    //               Settings
    //             </a>
    //           </p>
    //           <p>
    //             <a href='#!' className='text-reset'>
    //               Orders
    //             </a>
    //           </p>
    //           <p>
    //             <a href='#!' className='text-reset'>
    //               Help
    //             </a>
    //           </p>
    //         </MDBCol>

    //         <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
    //           <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
    //           <p>
    //             <MDBIcon icon="home" className="me-2" />
    //             New York, NY 10012, US
    //           </p>
    //           <p>
    //             <MDBIcon icon="envelope" className="me-3" />
    //             info@example.com
    //           </p>
    //           <p>
    //             <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
    //           </p>
    //           <p>
    //             <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
    //           </p>
    //         </MDBCol>
    //       </MDBRow>
    //     </MDBContainer>
    //   </section>

    // </MDBFooter>
    // <!-- Footer -->
    <footer class="text-center text-lg-start bg-light text-muted">
      {/* <!-- Section: Social media --> */}
      <section class="p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        <div class="container">
          <div class="row d-flex">
            {/* <!-- Left --> */}
            <div class="col-md-6 col-sm-12 mb-2 mb-md-0 d-flex justify-content-center justify-content-md-start">
              <div class="">
                <div class="input-group" style={{ maxWidth: '400px' }}>
                  <input type="email" class="form-control border" placeholder="Email" aria-label="Email" aria-describedby="button-addon2" />
                  <button class="btn btn-light border" type="button" id="button-addon2" data-mdb-ripple-color="dark">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            {/* <!-- Left --> */}

            {/* <!-- Right --> */}
            <div class="col-md-6 col-sm-12 float-center">
              <div class="float-md-end">
                <a class="btn btn-icon btn-light text-secondary px-3 border" title="Facebook" target="_blank" href="#"><i class="fab fa-facebook-f fa-lg"></i></a>
                <a class="btn btn-icon btn-light text-secondary px-3 border" title="Instagram" target="_blank" href="#"><i class="fab fa-instagram fa-lg"></i></a>
                <a class="btn btn-icon btn-light text-secondary px-3 border" title="Youtube" target="_blank" href="#"><i class="fab fa-youtube fa-lg"></i></a>
                <a class="btn btn-icon btn-light text-secondary px-3 border" title="Twitter" target="_blank" href="#"><i class="fab fa-twitter fa-lg"></i></a>
              </div>
            </div>
            {/* <!-- Right --> */}
          </div>
        </div>
      </section>
      {/* <!-- Section: Social media --> */}

      {/* <!-- Section: Links  --> */}
      <section class="">
        <div class="container text-center text-md-start mt-5 mb-4">
          {/* <!-- Grid row --> */}
          <div class="row mt-3">
            {/* <!-- Grid column --> */}
            <div class="col-12 col-lg-3 col-sm-12">
              {/* <!-- Content --> */}
              <Link to={"/"} target="_blank" class="ms-md-2 text-dark">
              <h2 >HIBEAUTY</h2>

              </Link>
              {info && (
                <ul class="list-unstyled mb-4" >
                  <li><a class="text-muted" href="#">{info.info_name}</a></li>
                  <li><a class="text-muted" href="#">Categories</a></li>
                  <li><a class="text-muted" href="#">Blogs</a></li>
                </ul>
              )
              }
              <p class="mt-3">
              </p>
            </div>
            {/* <!-- Grid column --> */}

            {/* <!-- Grid column --> */}
            <div class="col-6 col-sm-4 col-lg-2">
              {/* <!-- Links --> */}
              <h6 class="text-uppercase text-dark fw-bold mb-2">
                Store
              </h6>
              <ul class="list-unstyled mb-4">
                <li><a class="text-muted" href="#">About us</a></li>
                <li><a class="text-muted" href="#">Find store</a></li>
                <li><a class="text-muted" href="#">Categories</a></li>
                <li><a class="text-muted" href="#">Blogs</a></li>
              </ul>
            </div>
            {/* <!-- Grid column -->

        <!-- Grid column --> */}
            <div class="col-6 col-sm-4 col-lg-2">
              {/* <!-- Links --> */}
              <h6 class="text-uppercase text-dark fw-bold mb-2">
                Information
              </h6>
              <ul class="list-unstyled mb-4">
                <li><a class="text-muted" href="#">Help center</a></li>
                <li><a class="text-muted" href="#">Money refund</a></li>
                <li><a class="text-muted" href="#">Shipping info</a></li>
                <li><a class="text-muted" href="#">Refunds</a></li>
              </ul>
            </div>
            {/* <!-- Grid column -->

        <!-- Grid column --> */}
            <div class="col-6 col-sm-4 col-lg-2">
              {/* <!-- Links --> */}
              <h6 class="text-uppercase text-dark fw-bold mb-2">
                Support
              </h6>
              <ul class="list-unstyled mb-4">
                <li><a class="text-muted" href="#">Help center</a></li>
                <li><a class="text-muted" href="#">Documents</a></li>
                <li><a class="text-muted" href="#">Account restore</a></li>
                <li><a class="text-muted" href="#">My orders</a></li>
              </ul>
            </div>
            {/* <!-- Grid column -->

        <!-- Grid column --> */}
            <div class="col-12 col-sm-12 col-lg-3">
              {/* <!-- Links --> */}
              <h6 class="text-uppercase text-dark fw-bold mb-2">Our apps</h6>
              <a href="#" class="mb-2 d-inline-block"> <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/misc/btn-appstore.webp" height="38" /></a>
              <a href="#" class="mb-2 d-inline-block"> <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/misc/btn-market.webp" height="38" /></a>
            </div>
            {/* <!-- Grid column --> */}
          </div>
          {/* <!-- Grid row --> */}
        </div>
      </section>
      {/* <!-- Section: Links  --> */}
      <div class="container">
        <div class="py-4 border-top">
          <div class="d-flex justify-content-between">
            {/* <!--- payment ---> */}
            <div class="text-dark">
              <i class="fab fa-lg fa-cc-visa"></i>
              <i class="fab fa-lg fa-cc-amex"></i>
              <i class="fab fa-lg fa-cc-mastercard"></i>
              <i class="fab fa-lg fa-cc-paypal"></i>
            </div>
            {/* <!--- payment ---> */}

            {/* <!--- language selector ---> */}
            <div class="dropdown dropup">
              <a class="dropdown-toggle text-dark" href="#" id="Dropdown" role="button" data-mdb-toggle="dropdown" aria-expanded="false"> <i class="flag-united-kingdom flag m-0"></i> English </a>

              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="Dropdown">
                <li>
                  <a class="dropdown-item" href="#"><i class="flag-united-kingdom flag"></i>English <i class="fa fa-check text-success ms-2"></i></a>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="#"><i class="flag-poland flag"></i>Polski</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#"><i class="flag-china flag"></i>中文</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#"><i class="flag-japan flag"></i>日本語</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#"><i class="flag-germany flag"></i>Deutsch</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#"><i class="flag-france flag"></i>Français</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#"><i class="flag-spain flag"></i>Español</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#"><i class="flag-russia flag"></i>Русский</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#"><i class="flag-portugal flag"></i>Português</a>
                </li>
              </ul>
            </div>
            {/* <!--- language selector ---> */}
          </div>
        </div>
      </div>
    </footer>
    // <!-- Footer -->
  );
}