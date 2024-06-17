import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProWishList, removeFromWishList } from "../../store/actions";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { addFavoriteToLocalStorage, getFavoritesFromLocalStorage, removeFavoriteFromLocalStorage } from "../../utils";

export default function ProductListItem({ product }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(product);
    const { userInfo } = useSelector((state) => state.userReducer);
    const [favoritesProducts, setFavoritesProducts] = useState(getFavoritesFromLocalStorage());

    const handleAddToWishList = async ({ userId, productId }) => {
        try {
            await dispatch(addProWishList({ userId, productId }));
            addFavoriteToLocalStorage(productId);
            setFavoritesProducts(getFavoritesFromLocalStorage());
            toast.success("Đã thêm sản phẩm vào mục yêu thích!");
        } catch (error) {
            console.error("Error adding to wishlist:", error);
        }
    };

    const handleRemoveFromWishList = async ({ userId, productId }) => {
        try {
            await dispatch(removeFromWishList({ userId,productId}));
            removeFavoriteFromLocalStorage(productId);
            setFavoritesProducts(getFavoritesFromLocalStorage());
            toast.success("Đã xóa sản phẩm ra khỏi mục yêu thích!");
        } catch (error) {
            console.error("Error removing from wishlist:", error);
        }
    };

    return (
        <div className="col-md-12" key={product._id}>
            <div className="card shadow-0 border rounded-3">
                <div className="card-body">
                    <div className="row g-0">
                        <div className="col-xl-3 col-md-4 d-flex justify-content-center">
                            <div className="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0">
                                <img src={product.product_thumb[0]} className="w-100" />
                                <Link to={`/product/${product.product_slug}-${product._id}`}>
                                    <div className="hover-overlay">
                                        <div className="mask" style={{ backgroundColor: 'rgba(253, 253, 253, 0.15)' }}></div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-5 col-sm-7">
                            <h5>{product.product_name}</h5>
                            <div className="d-flex flex-row">
                                <div className="text-warning mb-1 me-2">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fas fa-star-half-alt"></i>
                                    <span className="ms-1">
                                        4.5
                                    </span>
                                </div>
                                <span className="text-muted">154 orders</span>
                            </div>

                            <p className="text mb-4 mb-md-0">
                                {product.product_name}
                            </p>
                        </div>
                        <div className="col-xl-3 col-md-3 col-sm-5">
                            <div className="d-flex flex-row align-items-center mb-1">
                                <h4 className="mb-1 me-1">{product.product_price}</h4>
                                <span className="text-danger"><s>$49.99</s></span>
                            </div>
                            <h6 className="text-success">Free shipping</h6>
                            <div className="mt-4">
                                <button className="btn btn-primary shadow-0" type="button">Add to cart</button>
                                {product && userInfo ? (
                                    favoritesProducts.some((p_id) => p_id === product._id) ? (
                                        <button
                                            className="btn btn-light border icon-hover px-2 py-2"
                                            onClick={() => handleRemoveFromWishList({ userId: userInfo._id, productId: product._id })}
                                        >
                                            <i className="fas fa-heart fa-lg text-danger px-1"></i>
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-light border icon-hover px-2 py-2"
                                            onClick={() => handleAddToWishList({ userId: userInfo._id, productId: product._id })}
                                        >
                                            <i className="fas fa-heart fa-lg text-secondary px-1"></i>
                                        </button>
                                    )
                                ) : (
                                    <button className="btn btn-light border icon-hover px-2 py-2">
                                        <i className="fas fa-heart fa-lg text-secondary px-1"></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
