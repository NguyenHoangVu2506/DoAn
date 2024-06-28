import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from "react-router-dom";

function LayoutUI() {
    return (
        <>
            <ToastContainer />
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export default LayoutUI;
