import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
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
} from 'mdb-react-ui-kit';
import { onLogin } from '../../../store/actions';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate('/signup');
  };
  const handleForgotPassword = () => {
    navigate('/forgotpassword');
  };
  const { userInfo } = useSelector((state) => state.userReducer);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setEmailError(value ? (isValidEmail(value) ? '' : 'Vui lòng nhập địa chỉ email hợp lệ!') : 'Vui lòng nhập điạ chỉ email của!');
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setPasswordError(value ? '' : 'Vui lòng nhập mật khẩu!');
  };

  const LoginWithFacabook = async () => {
    try {
        // const res = await dispatch(onLoginWithFacebook())
        window.open(`http://localhost:3001/api/auth/facebook`, '_self') 
        toast.success("Đăng nhập bằng facebook thành công")
    } catch (err) {
        toast.error(err?.data?.message || err);
    }
};
const LoginWithGoogle = async () => {
    try {
        window.open(`http://localhost:3001/api/auth/google`, '_self')
        toast.success("Đăng nhập bằng google thành công")
    } catch (err) {
        toast.error(err?.data?.message || err);
    }
};

  //
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo]);
  //

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError('Vui lòng nhập địa chỉ email của bạn!');
    } else if (!isValidEmail(email)) {
      setEmailError('Vui lòng nhập địa chỉ email hợp lệ!');
    }
    if (!password) {
      setPasswordError('Vui lòng nhập mật khẩu!');
    }
    if (password.length<8||password.length>32) {
      setPasswordError('Mật khẩu từ 6 đến 32 ký tự!');
    }

    try {
      await dispatch(onLogin({ user_email: email, user_password: password }))
      toast.success('hi')
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column' autoComplete="off">
              <h2 className="fw-bold mb-2 text-center">Đăng nhập</h2>
              <p className="text-white-50 mb-2">Please enter your login and password!</p>

              <MDBInput
                wrapperClass='mb-4 w-100'
                label='Nhập Email'
                id='formControlLg'
                type='email'
                size='lg'
                value={email}
                onChange={handleEmailChange}
                error={emailError}
                style={{ marginTop: '0.5rem', important: true }}
              />
              {emailError && <div className="text-danger">{emailError}</div>}

              <MDBInput
                wrapperClass='mb-4 w-100'
                label='Nhập Password'
                id='formControlLg'
                type='password'
                size='lg'
                value={password}
                onChange={handlePasswordChange}
                error={passwordError}
              />
              {passwordError && <div className="text-danger">{passwordError}</div>}

              <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-2' label='Remember password' />
              <p className="text-center text-muted mt-2 mb-0">
                Bạn chưa có tài khoản ?
                <a className="fw-bold text-body">
                  <u onClick={handleSignUp} style={{ cursor: 'pointer' }}> Đăng ký</u>
                </a>
              </p>
              <div className="text-center">
                <a  className="fw-bold text-body" >
                  <u onClick={handleForgotPassword} style={{ cursor: 'pointer', textAlign: 'right' }}> Quên mật khẩu</u>
                </a>
              </div>
              <MDBBtn size='lg' onClick={handleSubmit}>Đăng nhập</MDBBtn>

              <hr className="my-4" />

              <MDBBtn className="mb-2 w-100" size="lg" style={{ backgroundColor: '#dd4b39' }} onClick={() => LoginWithGoogle()}>
                <MDBIcon fab icon="google" className="mx-2" />
                Sign Up With Google
              </MDBBtn>

              <MDBBtn className="mb-4w-100" size="lg" style={{ backgroundColor: '#3b5998' }}onClick={() => LoginWithFacabook()}>
                <MDBIcon fab icon="facebook-f" className="mx-2" />
                Sign Up With FaceBook
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;