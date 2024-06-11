import { useDispatch, useSelector } from "react-redux";
import { addProWishList, removeFromWishList } from "../../store/actions/wishlist-actions";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addFavoriteToLocalStorage, getFavoritesFromLocalStorage, removeFavoriteFromLocalStorage } from "../../utils";


export default function ProductItem({ product }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.userReducer);
    const [favories_products, setfavoriesProduct] = useState(getFavoritesFromLocalStorage)


    const HandleAddToWishList = async ({ userId, productId }) => {
        await dispatch(addProWishList({
            userId: userId,
            productId: productId
        }))
        await addFavoriteToLocalStorage(productId)
        setfavoriesProduct(getFavoritesFromLocalStorage())
        toast.success("Đã thêm sản phẩm vào mục yêu thích!")
    }

    const HandleRemoveFromWishList = async ({ userId, productId }) => {
        await dispatch(removeFromWishList({
            userId: userId,
            productId: productId
        }))
        await removeFavoriteFromLocalStorage(productId)
        setfavoriesProduct(getFavoritesFromLocalStorage())
        toast.success("Đã xóa sản phẩm ra khỏi mục yêu thích!")
    }
    return (
        <>
            <div className="col-lg-3 col-md-6 col-sm-6 d-flex" key={product._id}>
                <div className="card bg-image hover-zoom ripple rounded ripple-surface w-100 my-2 shadow-2-strong">
                    <Link to={`/product/${product.product_slug}-${product._id}`}><img src={product.product_thumb[0]} className="card-img-top " /></Link>
                    <div className="card-body d-flex flex-column">
                        <div className="d-flex flex-row">
                            <h5 className="mb-1 me-1">{product.product_price}</h5>
                            <span className="text-danger"><s>$49.99</s></span>
                        </div>
                        <p className="card-text">{product.product_name}</p>
                        <div className=" d-flex justify-content-around">
                            <button className="btn btn-primary shadow-0 px-2 py-2 "
                            >Add to cart</button>
                            {product &&
                                (userInfo ?
                                    (
                                        favories_products.some((p_id) => p_id === product._id) == true
                                            ?
                                            <button className="btn btn-light border icon-hover  px-2 py-2  " onClick={()=>HandleRemoveFromWishList({userId:userInfo._id , productId:product._id})}><i className="fas fa-heart fa-lg text-danger px-1" ></i></button>
                                            :
                                            <button className="btn btn-light border icon-hover  px-2 py-2 " onClick={()=>HandleAddToWishList({userId:userInfo._id , productId:product._id})}><i className="fas fa-heart fa-lg text-secondary px-1" ></i></button>
                                    ) : (
                                        <button className="btn btn-light border icon-hover  px-2 py-2  " ><i className="fas fa-heart fa-lg text-secondary px-1" ></i></button>
                                    ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}