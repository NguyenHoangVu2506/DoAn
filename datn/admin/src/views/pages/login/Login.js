import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';

const mockLoginUser = async ({ email, password }) => {
  // Mocked response data
  if (email === 'admin@gmail.com' && password === '12345') {
    return {
      data: {
        roles: ['admin'],
        email: 'admin@example.com',
        name: 'Admin User',
      },
    };
  } else if (email === 'user@example.com' && password === 'password') {
    return {
      data: {
        roles: ['user'],
        email: 'user@example.com',
        name: 'Regular User',
      },
    };
  } else {
    return { data: null };
  }
};

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/dang-ki');
  };

  const handleForgotPassword = () => {
    navigate('/forgotpassword');
  };

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
    setEmailError(value ? (isValidEmail(value) ? '' : 'Vui lòng nhập địa chỉ email hợp lệ!') : 'Vui lòng nhập địa chỉ email của bạn!');
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setPasswordError(value ? '' : 'Vui lòng nhập mật khẩu!');
  };

  const handleSubmit = async () => {
    if (!email || !isValidEmail(email)) {
      setEmailError('Vui lòng nhập địa chỉ email hợp lệ!');
      return;
    }

    if (!password) {
      setPasswordError('Vui lòng nhập mật khẩu!');
      return;
    }

    const res = await mockLoginUser({ email, password });

    if (res.data != null) {
      if (res.data.roles.includes('admin')) {
        alert("Đăng nhập thành công!");
        onLoginSuccess();
        localStorage.setItem('currentUser', JSON.stringify(res.data));
        setEmail('');
        setPassword('');
        console.log(res.data);
        navigate('/');
      } else {
        alert("Bạn không có quyền truy cập!");
      }
    } else {
      alert("Đăng nhập thất bại!");
    }
  };

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      if (user.roles.includes('admin')) {
        // navigate('/');
      } else {
        alert("Bạn không có quyền truy cập!");
        localStorage.removeItem('currentUser');
      }
    }
    console.log(currentUser)
  }, [navigate]);

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Đăng nhập</h1>
                    <p className="text-body-secondary">Đăng nhập vào tài khoản của bạn</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={handleEmailChange}
                        error={emailError}
                      />
                      {emailError && <div className="text-danger">{emailError}</div>}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Mật khẩu"
                        autoComplete="current-password"
                        value={password}
                        onChange={handlePasswordChange}
                        error={passwordError}
                      />
                      {passwordError && <div className="text-danger">{passwordError}</div>}
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleSubmit}>
                          Đăng nhập
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0" onClick={handleForgotPassword}>
                          Quên mật khẩu?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                  className="img-fluid" alt="Phone image" />
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
