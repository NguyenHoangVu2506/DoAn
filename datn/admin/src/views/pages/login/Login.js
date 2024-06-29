import React, { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { onLogin } from '../../../store/actions'; // Điều chỉnh đường dẫn dựa vào cấu trúc của dự án
import { toast } from 'react-toastify';

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

    try {
      // Gọi hàm dispatch để thực hiện đăng nhập
      const res = await dispatch(onLogin({ user_email: email, user_password: password }));
  const role=(res.payload.metaData.user)
      // Xử lý kết quả trả về từ API
      if (role && role) {
        if (role.user_role.includes('admin')) {
          toast.success('Đăng nhập thành công!');
          onLoginSuccess(); // Gọi hàm callback khi đăng nhập thành công
          localStorage.setItem('currentUser', JSON.stringify(res.data));
          navigate('/'); // Chuyển hướng đến trang chính
        } else {
          toast.error('Bạn không có quyền truy cập!');
        }
      } else {
        toast.error('Đăng nhập thất bại!');
      }
    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
      toast.error('Đăng nhập thất bại!');
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgotpassword');
  };

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
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                  className="img-fluid"
                  alt="Phone image"
                />
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
