import React, { useEffect } from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { getInfo } from '../../store/actions';
import { Link } from 'react-router-dom';
import { getListPage } from '../../store/actions/page-actions';

export default function Footer({ }) {
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.infoReducer);
  useEffect(() => {
    if (!info) {
      dispatch(getInfo({ isPublished: true }))
    }
  }, [info])
  const { allPage } = useSelector((state) => state.pageReducer);
  useEffect(() => {
    if (!allPage) {
      dispatch(getListPage({ sort: 'ctime' }));
    }
  }, [dispatch, allPage]);
  const logoStyle = {
    height: '50%',
    width: '50%',
    borderRadius: '200px'
  };
  return (
    <MDBFooter className='text-center text-lg-start text-light fw-bold' style={{ backgroundColor: '#f6831f'  }}>
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

                </p>
              </MDBCol>

              {/* <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Tin Tức</h6>
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
              </MDBCol> */}

              <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Chính Sách</h6>
                {allPage && allPage.map((item, index) => (
                  <p key={index}>
                    <Link to={`/page/${item.page_slug}-${item._id}`} className='text-reset'>
                      {item.page_name}
                    </Link>
                  </p>
                ))}
                {/* <p>
                  <a href='#!' className='text-reset'>
                  Chính Sách Đổi Trả
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                  Chính Sách Giao Hàng
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Trợ Giúp
                  </a>
                </p> */}
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