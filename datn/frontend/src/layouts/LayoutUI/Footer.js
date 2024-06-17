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
    height: '50%',
    width: '50%',
    borderRadius: '100px'
  };
  return (
    <MDBFooter className='text-center text-lg-start text-light' style={{ backgroundColor: '#f6831f' }}>
      {info &&
        <section className='border-top'>
          <MDBContainer className='text-center text-md-start mt-5'>
            <MDBRow className=''>
              <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4' style={{}} >
                <img
                  className='border-radius'
                  src={info.info_logo}
                  style={logoStyle}
                  alt="logo of sitemark"
                />

                <h6 className='text-uppercase fw-bold mt-4 mb-4'>
                  <MDBIcon icon="gem" className="me-3" />
                  {info.info_name}
                </h6>

                <p>
                  Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit.
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
                <p>
                  <a href='#!' className='text-reset'>
                    Angular
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    React
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Vue
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Laravel
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Chính Sách Và Dịch Vụ</h6>
                <p>
                  <a href='#!' className='text-reset'>
                    Pricing
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Settings
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Orders
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Help
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Thông tin liên hệ</h6>
                <>
                  <p>
                    <MDBIcon icon="home" className="me-2" />
                    {info.info_address}
                  </p>
                  <p>
                    <MDBIcon icon="envelope" className="me-3" />
                    {info.info_mail}
                  </p>
                  <p>
                    <MDBIcon icon="phone" className="me-3" /> {info.info_hotline}
                  </p>
                  <p>
                    <MDBIcon icon="print" className="me-3" /> {info.info_website}
                  </p>


                </>

              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>}

    </MDBFooter>

  );
}