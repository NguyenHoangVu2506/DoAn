import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Categories from "./CategoriesMenu";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userReducer);

  const handleLogin = async () => {
    navigate('/login');

  };

  return (
    <>
      <header>
        <div class="p-4 text-center bg-white border-bottom ">
          <div class="container">
            <div class="row gy-3">

              <div class="col-lg-2 col-sm-4 col-4">
                 {/* <img src='../../' alt="" height="100px"
                    width="100px"></img>  */}
                   <Link to='/' className="text-dark"><h3>FRUITSTORE</h3></Link> 
              </div>

              <div class="order-lg-last col-lg-5 col-sm-8 col-8">
                <div class="d-flex float-end">
                  {userInfo ? (
                    <Link to={`/profile`} style={{ cursor: 'pointer',background: '#f6831f linear-gradient(180deg, #fff3ea 0%, #f6831f 100%)'}} class="me-1 btn btn-rounded py-1 px-3 nav-link d-flex align-items-center"> <i class="fas fa-user-alt m-1 me-md-2"></i>
                      <p class="d-none d-md-block mb-0">{userInfo.user_name}</p>
                    </Link>
                  ) : (

                    <a onClick={handleLogin} style={{ cursor: 'pointer' ,background: '#f6831f linear-gradient(180deg, #fff3ea 0%, #f6831f 100%)'}} class="btn btn-rounded me-1  py-1 px-3 nav-link d-flex align-items-center" > <i class="fas fa-user-alt m-1 me-md-2"></i>
                      <p class="d-none d-md-block mb-0">Đăng nhập</p>
                    </a>

                  )}

                  <a href="/gio-hang" class="btn btn-rounded py-1 px-3 nav-link d-flex align-items-center me-1"style={{ background: '#f6831f linear-gradient(180deg, #fff3ea 0%, #f6831f 100%)' }} > <i class="fas fa-shopping-cart m-1 me-md-2"></i>
                    <p class="d-none d-md-block mb-0">Giỏ hàng</p>
                  </a>

                  <a href="/wish-list" class="btn btn-rounded py-1 px-3 nav-link d-flex align-items-center me-1"style={{ background: '#f6831f linear-gradient(180deg, #fff3ea 0%, #f6831f 100%)' }} > <i class="fas fa-heart m-1 me-md-2"></i>
                    <p class="d-none d-md-block mb-0">Yêu thích</p>
                  </a>
                </div>
              </div>

              <div class="col-lg-5 col-md-12 col-12">
                <div class="input-group float-center" > 
                  <div class="form-outline "style={{ background: '#ffd6b2 linear-gradient(180deg, #fff3ea 0%, #ffd6b2 100%)' }}>
                    <input type="search" id="form1" class="form-control text-dark" />
                    <label class="form-label  text-dark" for="form1">Search</label>
                  </div>
                  <button type="button" class=" btn btn-rounded" style={{ background: '#f6831f linear-gradient(180deg, #fff3ea 0%, #f6831f 100%)' }}>
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
        <Categories />
      </header>
    </>

  );
}
export default Header;
