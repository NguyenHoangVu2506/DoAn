import React, { Suspense, useEffect, useState } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { CSpinner, useColorModes } from '@coreui/react';
import './scss/style.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');
  const storedTheme = useSelector((state) => state.theme);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme);
    }
    if (isColorModeSet()) {
      return;
    }
    setColorMode(storedTheme);

    // Kiểm tra trạng thái đăng nhập từ localStorage hoặc global state
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setIsLoggedIn(true);
    }
  }, []); 

  // Hàm xử lý đăng nhập thành công
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <ToastContainer />
        <Routes>
          {/* Route chỉ cho phép truy cập vào trang Login khi chưa đăng nhập */}
          {!isLoggedIn && <Route exact path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />}
          {/* Route chỉ cho phép truy cập vào các trang DefaultLayout khi đã đăng nhập */}
          {isLoggedIn && <Route path="*" element={<DefaultLayout />} />}
          {/* Route mặc định chuyển hướng đến trang Login nếu chưa đăng nhập */}
          {!isLoggedIn && <Route path="*" element={<Navigate to="/login" />} />}
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;
