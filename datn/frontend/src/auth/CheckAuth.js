import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

const CheckAuth = () => {
    const { userInfo } = useSelector((state) => state.userReducer); //root
    return userInfo ? <Outlet /> : <Navigate to='/login' />
}
export default CheckAuth;