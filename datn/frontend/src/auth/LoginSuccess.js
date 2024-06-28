import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useParams } from "react-router-dom";
import { onLoginWithFacebook, onLoginWithGoogle } from "../store/actions";
import { toast } from "react-toastify";

const LoginSuccess = () => {
    const { userInfo } = useSelector((state) => state.userReducer); //root
    const {userId,provider}=useParams()
    const dispatch = useDispatch()

    useEffect(()=>{
        userId && (provider === 'facebook' ? dispatch(onLoginWithFacebook({ userId, provider})) : dispatch(onLoginWithGoogle({ userId, provider })))
    }, [])
    
    return userInfo ?  <Navigate to="/" />  :(toast.error('ddd') && <Navigate to="/login" replace={true} />)
}

export default LoginSuccess;