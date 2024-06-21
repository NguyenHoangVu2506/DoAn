import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Categories from "./CategoriesMenu";
import { useDispatch, useSelector } from "react-redux";
import Menu from "./MenuHeader";
import './style.css';
import { getInfo } from "../../store/actions";

const Header = () => {
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const searchInput = useRef(null)
  const { userInfo } = useSelector((state) => state.userReducer);
  const [textSearch, setTextSearch] = useState('')


  const { info } = useSelector((state) => state.infoReducer);
  useEffect(() => {
    if (!info) {
      dispatch(getInfo({ isPublished: true }))
    }
  }, [info])

  const handleLogin = async () => {
    navigate('/login');

  };

  const onClickSearch = async (e) => {
    e.preventDefault()
    //  searchInput.current.blur();
    navigate(`/tim-kiem/${textSearch}`,{replace:true});
  }

  const onChange = async (value) => {
    setTextSearch(value)
  }
  const logoStyle = {
    height: '30%',
    width: '30%',
    borderRadius: '200px'
  };


  return (
    <>
      <header>
        <div class="p-4 text-center bg-white border-bottom ">
          <div class="">
            <div class="row gy-3">
              <div class="col-lg-2 col-sm-4 col-4">
                <Link to='/' style={{ cursor: 'pointer', color: '#f6831f ' }}><h3>FRUIT STORE</h3></Link>
              </div>

              <div class="order-lg-last col-lg-5 col-sm-8 ">
                <div class="d-flex float-end">
                  {userInfo ? (
                    <Link to={`/profile`} class="me-1 py-1 px-3 nav-link d-flex align-items-center"> <i class="fas fa-user-alt m-1 me-md-2" style={{ cursor: 'pointer', color: '#f6831f' }}></i>
                      <p class="d-none d-md-block mb-0" style={{ cursor: 'pointer', color: '#f6831f ' }}>{userInfo.user_name}</p>
                    </Link>
                  ) : (

                    <a onClick={handleLogin} style={{ cursor: 'pointer', color: '#f6831f linear-gradient(180deg, #fff3ea 0%, #f6831f 100%)' }} class=" me-1  py-1 px-3 nav-link d-flex align-items-center" >
                      <i class="fas fa-user-alt m-1 me-md-2" style={{ cursor: 'pointer', color: '#f6831f' }}></i>
                      <p class="d-none d-md-block mb-0" style={{ cursor: 'pointer', color: '#f6831f ' }}>Đăng nhập</p>
                    </a>

                  )}

                  <a href="/gio-hang" class="py-1 px-3 nav-link d-flex align-items-center me-1" >
                    <i class="fas fa-shopping-cart m-1 me-md-2" style={{ cursor: 'pointer', color: '#f6831f' }}>
                    </i> <p class="d-none d-md-block mb-0" style={{ cursor: 'pointer', color: '#f6831f' }}>Giỏ hàng</p>


                  </a>

                  <a href="/wish-list" class=" py-1 px-3 nav-link d-flex align-items-center me-1" >
                    <i class="fas fa-heart m-1 me-md-2" style={{ cursor: 'pointer', color: '#f6831f' }}></i>
                    <p class="d-none d-md-block mb-0" style={{ cursor: 'pointer', color: '#f6831f' }}>Yêu thích</p>
                  </a>
                </div>
              </div>

              <div class="col-lg-5 col-md-12 col-12" >
                <div class="input-group float-center border-round" style={{ cursor: 'pointer', border: '1px', borderColor: '#f6831f' }}>
                  <div class="form-outline " data-mdb-input-init>
                    <input type="text" id="form1" class="form-control border" style={{ cursor: 'pointer', border: '1px', borderColor: '#f6831f' }} value={textSearch} onChange={(e) => { onChange(e.target.value) }} />
                    {/* <label class="form-label" for="form1" style={{ cursor: 'pointer', color: '#f6831f ' }}>Search</label> */}
                  </div>
                  <button type="button" class=" btn btn-rounded border" onClick={(e) => onClickSearch(e)}>
                    <i class="fas fa-search" style={{ color: '#f6831f ' }} ></i>
                  </button>

                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="row">
          <Categories />
        </div>
      </header>
    </>

  );
}
export default Header;
