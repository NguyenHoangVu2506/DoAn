import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';

function ForgotPassword() {
  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center">Quên Mật Khẩu</h2>
              <p className="text-white-50 mb-3">Nhập địa chỉ email của bạn dưới đây hệ thống sẽ gửi mã otp </p>

              <MDBInput wrapperClass='mb-4 w-100' label='Email của bạn ' id='formControlLg' type='email' size="lg" />
              <div className="input-group mb-4">
                <input type="text" className="form-control border" name="" placeholder="Nhập mã xác thực" />
                <button className="btn btn-light text-primary border">Lấy mã</button>
              </div>
              {/* <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' /> */}

              <MDBBtn size='lg'>
                Đặt lại mật khẩu
              </MDBBtn>

              <hr className="my-4" />



            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default ForgotPassword;