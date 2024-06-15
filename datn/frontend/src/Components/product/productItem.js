import { useDispatch, useSelector } from "react-redux";
import { addProWishList, removeFromWishList } from "../../store/actions/wishlist-actions";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addFavoriteToLocalStorage, getFavoritesFromLocalStorage, removeFavoriteFromLocalStorage } from "../../utils";
import accounting from "accounting";
import { onProductDetail } from "../../store/actions";

export default function ProductItem({ product }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log("product", product);
    const { userInfo } = useSelector((state) => state.userReducer);

    const { productDetail } = useSelector((state) => state.productReducer);


    const [favories_products, setfavoriesProduct] = useState(getFavoritesFromLocalStorage());
    const [price_default, setprice_default] = useState(0);
    const [price, setPrice] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [largeImageSrc, setLargeImageSrc] = useState(product.product_thumb[0]);

    const HandleAddToWishList = async ({ userId, productId }) => {
        await dispatch(addProWishList({
            userId: userId,
            productId: productId
        }));
        await addFavoriteToLocalStorage(productId);
        setfavoriesProduct(getFavoritesFromLocalStorage());
        toast.success("Đã thêm sản phẩm vào mục yêu thích!");
    };

    const HandleRemoveFromWishList = async ({ userId, productId }) => {
        await dispatch(removeFromWishList({
            userId: userId,
            productId: productId
        }));
        await removeFavoriteFromLocalStorage(productId);
        setfavoriesProduct(getFavoritesFromLocalStorage());
        toast.success("Đã xóa sản phẩm ra khỏi mục yêu thích!");
    };

    useEffect(() => {
        setprice_default(product.product_price);
    }, [product.product_price]);

    useEffect(() => {
        if (product.special_offer && product.special_offer.special_offer_spu_list.length > 0) {
            product.special_offer.special_offer_spu_list.forEach((spu) => {
                if (spu.product_id.toString() === product._id.toString() && spu.sku_list?.length > 0) {
                    const min_price = spu.sku_list.flatMap((item) => item.price_sale);
                    setPrice(Math.min(...min_price));
                } else if (spu.product_id.toString() === product._id.toString()) {
                    setPrice(spu.price_sale);
                }
            });
        }
    }, [product]);

    const handleSizeChange = (thumb) => {
        setLargeImageSrc(thumb);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        dispatch(onProductDetail({ spu_id: productId }));
    }, [product_slug_id]);
    console.log("productDetail", productDetail, selected_sku);

    return (
        <>
            <div className="col-lg-3 col-md-6 col-sm-6 d-flex" key={product._id}>
                <div className="card bg-image hover-zoom ripple rounded ripple-surface w-100 my-2 shadow-2-strong">
                    <Link to={`/product/${product.product_slug}-${product._id}`}><img src={product.product_thumb[0]} className="card-img-top" alt="product" /></Link>
                    <div className="card-body d-flex flex-column">
                        <div className="d-flex flex-row">
                            <h5 className="mb-1 me-1">{price === 0 ? price_default : price}</h5>
                            <span className="text-danger"><s>{price !== 0 && price_default}</s></span>
                        </div>
                        <p className="card-text">{product.product_name}</p>
                        <div className="d-flex justify-content-around">
                            <button className="btn btn-primary shadow-0 px-2 py-2"
                                style={{ backgroundColor: '#f6831f', color: 'white' }}
                                onClick={openModal}
                            >Thêm vào giỏ</button>
                            {product.product_variations && product.product_variations.length > 0 ? (
                                showModal && (
                                    <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog">
                                        <div className="modal-dialog modal-lg" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <section>
                                                        <div className="container">
                                                            <div className="row gx-2">
                                                                <aside className="col-lg-6">
                                                                    <div className="border rounded-4 mb-3 d-flex justify-content-center">
                                                                        <a className="rounded-4" target="_blank" data-type="image">
                                                                            <img style={{ maxWidth: '100%', maxHeight: '100vh', margin: 'auto' }} className="rounded-4 fit" src={largeImageSrc} alt="product" />
                                                                        </a>
                                                                    </div>
                                                                    <div className="d-flex justify-content-center mb-3">
                                                                        {product.product_thumb.map((thumb, index) => (
                                                                            <a key={index} className="border mx-1 rounded-2" target="_blank" data-type="image" onClick={() => handleSizeChange(thumb)}>
                                                                                <img width="50" height="50" className="rounded-2" src={thumb} alt="thumb" />
                                                                            </a>
                                                                        ))}
                                                                    </div>
                                                                </aside>
                                                                <main className="col-lg-6">
                                                                    <div className="ps-lg-2">
                                                                        <h4 className="title text-dark">
                                                                            {product.product_name}
                                                                        </h4>
                                                                        <div className="d-flex flex-row my-3">
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
                                                                            <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1"></i>{product.orders} orders</span>
                                                                            <span className="text-success ms-1">
                                                                                Còn 10 sản phẩm
                                                                            </span>
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            <>
                                                                                <h5 className="mb-1 me-1">{accounting.formatNumber(price === 0 ? price_default : price, 0, ".", ",")} <span className="text-muted">đ</span></h5>
                                                                                {price !== 0 && (
                                                                                    <span className="text-danger"><s>{accounting.formatNumber(price_default, 0, ".", ",")} <span className="text-muted">đ</span></s></span>
                                                                                )}
                                                                            </>
                                                                        </div>
                                                                        <p>{product.product_description}</p>
                                                                        <div className="row">
                                                                            <div className="col-12 mb-3">
                                                                                <label className="mb-2">Variations:</label>
                                                                                <div>
                                                                                    {product.product_variations.map((variation, index) => (
                                                                                        variation.options.map((option, optIndex) => (
                                                                                            <button key={optIndex} className="btn btn-outline-secondary mx-1 my-1">
                                                                                                {option}
                                                                                            </button>
                                                                                        ))
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <hr />
                                                                        <div className="row mb-2">
                                                                            <div className="col-md-4 col-6 mb-1">
                                                                                <label className="mb-2 d-block">Quantity</label>
                                                                                <div className="input-group mb-1" style={{ width: '170px' }}>
                                                                                    <button className="btn btn-white border border-secondary px-3" type="button">
                                                                                        <i className="fas fa-minus"></i>
                                                                                    </button>
                                                                                    <input
                                                                                        type="number"
                                                                                        className="form-control text-center border border-secondary"
                                                                                        aria-label="Example text with button addon"
                                                                                        aria-describedby="button-addon1"
                                                                                    />
                                                                                    <button className="btn btn-white border border-secondary px-3" type="button">
                                                                                        <i className="fas fa-plus"></i>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <button className="btn btn-primary shadow-0"> <i className="me-1 fa fa-shopping-basket"></i>Thêm vào giỏ hàng</button>
                                                                    </div>
                                                                </main>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <></>
                            )}
                            {product &&
                                (userInfo ?
                                    (
                                        favories_products.some((p_id) => p_id === product._id) === true
                                            ?
                                            <button className="btn btn-light border icon-hover  px-2 py-2" onClick={() => HandleRemoveFromWishList({ userId: userInfo._id, productId: product._id })}><i className="fas fa-heart fa-lg text-danger px-1"></i></button>
                                            :
                                            <button className="btn btn-light border icon-hover  px-2 py-2" onClick={() => HandleAddToWishList({ userId: userInfo._id, productId: product._id })}><i className="fas fa-heart fa-lg text-secondary px-1"></i></button>
                                    ) : (
                                        <button className="btn btn-light border icon-hover  px-2 py-2"><i className="fas fa-heart fa-lg text-secondary px-1"></i></button>
                                    ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
