import { useDispatch, useSelector } from "react-redux";
import { addProWishList, getWishList, onAllProduct, onLogout, removeFromWishList } from "../../../store/actions";
import { useEffect, useState } from "react";
import { addFavoriteToLocalStorage, getFavoritesFromLocalStorage, removeFavoriteFromLocalStorage } from "../../../utils";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProductListItem from "../../../Components/product/productListItem";

export default function Wishlist() {
    const dispatch = useDispatch();
    const { wish_list } = useSelector((state) => state.wishlistReducer);
    const { userInfo } = useSelector((state) => state.userReducer);
    const { allProducts } = useSelector((state) => state.productReducer);
    const [favories_products, setfavoriesProduct] = useState(getFavoritesFromLocalStorage());

    const navigate = useNavigate();
    const handleSubmit = async () => {
        try {
            await dispatch(onLogout({}));
            toast.success('logout success');
            window.location.reload();
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (userInfo) {
            if (!wish_list) {
                dispatch(getWishList({ userId: userInfo._id }));
            } else if (wish_list.length !== getFavoritesFromLocalStorage().length) {
                dispatch(onAllProduct({ limit: 20, page: 1 }));
            }
        }
        if (!allProducts) {
            dispatch(onAllProduct({ limit: 20, page: 1 }));
        }
    }, [wish_list]);

    const HandleAddToWishList = async ({ userId, productId }) => {
        await dispatch(addProWishList({ userId, productId }));
        addFavoriteToLocalStorage(productId);
        setfavoriesProduct(getFavoritesFromLocalStorage());
        toast.success("Đã thêm sản phẩm vào mục yêu thích!");
    };

    const HandleRemoveFromWishList = async ({ userId, productId }) => {
        await dispatch(removeFromWishList({ userId, productId }));
        removeFavoriteFromLocalStorage(productId);
        setfavoriesProduct(getFavoritesFromLocalStorage());
        window.location.reload()

        toast.success("Đã xóa sản phẩm ra khỏi mục yêu thích!");
    };

    return (
        <>
            <div className="bg-primary">
                <div className="bg-2" style={{ backgroundColor: '#f6831f' }}>
                    <div className="container py-4">
                        <nav className="d-flex">
                            <h6 className="mb-0">
                                <Link to="/" className="text-white">Trang chủ</Link>
                                <span className="text-white mx-2">/ </span>
                                <Link to="/account" className="text-white">Quản lý tài khoản</Link>
                            </h6>
                        </nav>
                    </div>
                </div>
            </div>
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-xl-3">
                            <nav className="nav flex-lg-column w-100 d-flex nav-pills mb-4">
                                <Link className="nav-link my-0 bg-light" to="/profile"><p className="pb-0 mb-0" style={{ width: '130px' }}>Tài khoản</p></Link>
                                <Link className="nav-link my-0 bg-light" to="/userorder"><p className="pb-0 mb-0" style={{ width: '130px' }}>Đơn hàng</p></Link>
                                <Link className="nav-link my-0 bg-light" to="/userorderhistory"><p className="pb-0 mb-0" style={{ width: '130px' }}>Lịch sử đơn hàng</p></Link>
                                <Link className="nav-link my-0 active" to="/wish-list"><p className="pb-0 mb-0" style={{ width: '130px', color: '#f6831f' }}>Sản phẩm yêu thích</p></Link>
                                <button className="nav-link my-0 bg-light" onClick={handleSubmit}><p className="pb-0 mb-0" style={{ width: '100px' }}>Đăng xuất</p></button>
                            </nav>
                        </div>

                        <main className="col-lg-9 col-xl-9">
                            <div className="card p-4 mb-0 shadow-0 border">
                                <div className="content-body">
                                    <div className="col-lg-12">
                                        <div className="row justify-content-center mb-3">
                                            {wish_list && wish_list.wish_list_products?.length > 0 ? (
                                                wish_list.wish_list_products.map((product_in_wish_list) => {
                                                    return allProducts && allProducts.map((product) => {
                                                        if (product_in_wish_list === product._id) {
                                                                return (<ProductListItem product={product} />);
                                                            
                                                        }
                                                    });
                                                })
                                            ) : (
                                                <p>Chưa có sản phẩm yêu thích nào.</p>
                                            )}
                                        </div>
                                        <hr />
                                        <nav aria-label="Page navigation example" className="d-flex justify-content-center mt-3">
                                            <ul className="pagination">
                                                <li className="page-item disabled">
                                                    <a className="page-link" href="#" aria-label="Previous">
                                                        <span aria-hidden="true">&laquo;</span>
                                                    </a>
                                                </li>
                                                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                <li className="page-item"><a className="page-link" href="#">4</a></li>
                                                <li className="page-item"><a className="page-link" href="#">5</a></li>
                                                <li className="page-item">
                                                    <a className="page-link" href="#" aria-label="Next">
                                                        <span aria-hidden="true">&raquo;</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </section>
        </>
    );
}
