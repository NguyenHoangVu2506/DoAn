import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { onSignup } from "../../../store/actions";
import { toast } from "react-toastify";

function Register() {
  const dispatch =useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userReducer);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [nameError, setNameError] = useState('');

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setEmailError(value ? (isValidEmail(value) ? '' : 'Vui lòng nhập địa chỉ email hợp lệ!') : 'Vui lòng nhập địa chỉ email của bạn!');
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    setName(value);
    setNameError(value ? '' : 'Vui lòng nhập họ tên!');

  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setPasswordError(value ? '' : 'Vui lòng nhập mật khẩu!');
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    setConfirmPasswordError(value ? '' : 'Vui lòng nhập lại mật khẩu!');
  };
  useEffect(() => {
      if (userInfo) {
          navigate('/dang-nhap');
      }
  }, [navigate, userInfo]);

  
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!email) {
      setEmailError('Vui lòng nhập địa chỉ email của bạn!');
    } else if (!isValidEmail(email)) {
      setEmailError('Vui lòng nhập địa chỉ email hợp lệ!');
    } else {
      setEmailError('');
    }
    if (!name) {
      setNameError('Vui lòng nhập họ và tên!');
    } else {
      setNameError('');
    }
    if (!password) {
      setPasswordError('Vui lòng nhập mật khẩu!');
    } else {
      setPasswordError('');
    }
    if (password.length<8||password.length>32) {
      setPasswordError('Mật khẩu từ 6 đến 32 ký tự!');
    } else {
      setPasswordError('');
    }
    if (!confirmPassword) {
      setConfirmPasswordError('Vui lòng nhập lại mật khẩu!');
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Mật khẩu không khớp!');
    } else {
      setConfirmPasswordError('');
    }
    if (email && isValidEmail(email) && password && confirmPassword === password) {
      onFinish({ email, password, name,confirmPassword });
    }
    
    try {
      await dispatch(onSignup({ user_email: email,user_name:name, user_password: password }))
      // console.log('User successfully registered');
      navigate('/template')
      toast.info('vui long xac nhan email')


    } catch (error) {
      
    }
  };

  const handleSignIn = () => {
    navigate('/dang-nhap');
  };

  return (
    <section className="bg-image" style={{ backgroundColor: 'white',height: '125vh'}}>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: '15px' }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-1">Đăng ký</h2>

                  <form onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                    <div className="form-outline mb-4">
                      <MDBInput
                        wrapperClass="mb-4 w-100"
                        label="Họ và tên"
                        id="formControlLg"
                        type="text"
                        size="lg"
                        value={name}
                        onChange={handleNameChange}
                      />
                      {nameError && <div className="text-danger">{nameError}</div>}

                    </div>

                    <div className="form-outline mb-4">
                      <MDBInput
                        wrapperClass="mb-4 w-100"
                        label="Nhập Email"
                        id="formControlLg"
                        type="email"
                        size="lg"
                        value={email}
                        onChange={handleEmailChange}
                      />
                      {emailError && <div className="text-danger">{emailError}</div>}
                    </div>

                    {/* <div className="input-group mt-3 mb-4">
                      <input type="text" className="form-control border" name="" placeholder="Nhập mã xác thực" />
                      <button className="btn btn-light text-primary border">Lấy mã</button>
                    </div> */}
                    <div className="form-outline mb-4">
                      <MDBInput
                        wrapperClass="mb-4 w-100"
                        label="Nhập mật khẩu"
                        id="formControlLg"
                        type="password"
                        size="lg"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      {passwordError && <div className="text-danger">{passwordError}</div>}
                    </div>

                    <div className="form-outline mb-4">
                      <MDBInput
                        wrapperClass="mb-4 w-100"
                        label="Nhập lại mật khẩu"
                        id="formControlLg"
                        type="password"
                        size="lg"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                      />
                      {confirmPasswordError && <div className="text-danger">{confirmPasswordError}</div>}
                    </div>

                    <div className="form-check mb-2">
                      <input className="form-check-input" type="checkbox" id="flexCheckDefault" />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        Tôi đã đọc và đồng ý với{" "}
                        <a href="link-dieu-khoan-va-chinh-sach">Điều khoản và Chính sách của mỹ phẩm Hoàng Vũ</a>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-primary btn-block btn-lg gradient-custom-4 text-white"
                        onClick={handleSubmit}
                      >   Đăng ký 
                      </button>
                    </div>
                    <p className="text-center text-muted mt-2 mb-0">
                     Bạn đã có tài khoản?{" "}
                      <a href="#!" className="fw-bold text-body">
                        <u onClick={handleSignIn} style={{ cursor: 'pointer' }}>Đăng nhập</u>
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;