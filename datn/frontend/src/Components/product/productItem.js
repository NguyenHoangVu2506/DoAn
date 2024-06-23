import { useDispatch, useSelector } from "react-redux";
import { addProWishList, removeFromWishList } from "../../store/actions/wishlist-actions";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addFavoriteToLocalStorage, getFavoritesFromLocalStorage, removeFavoriteFromLocalStorage } from "../../utils";
import accounting from "accounting";
import { addCart } from "../../store/actions";
import { NumericFormat } from "react-number-format";
import { getComment } from "../../store/actions/comment_rating-actions";

export default function ProductItem({ product }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.userReducer);
    const { getComentProduct } = useSelector((state) => state.commnetRatingReducer);

    const [sku_list, setSku_list] = useState([])
    const [promotion, setPromotion] = useState(null)
    const [min_price_sku, setMin_price_sku] = useState(null)
    const [brand, setBrand] = useState(null)
    const [product_image, setProduct_image] = useState([])

    const [sale, setSale] = useState(null)

    const [favories_products, setfavoriesProduct] = useState(getFavoritesFromLocalStorage());
    const [price, setPrice] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [stock, setStock] = useState(null);
    const [selected_sku, set_selected_sku] = useState(null);
    const [sku_tier_idx, setSku_tier_idx] = useState([0])
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleAddToCart = async (userId, { productId, sku_id = null, quantity }) => {
        console.log("productId, sku_id, quantity", productId, sku_id, quantity, userId)
        if (userId) {
            if (quantity <= stock) {
                console.log('selected_sku', sku_id + productId + sku_id)
                await dispatch(
                    addCart({
                        userId: userId,
                        product: {
                            productId: productId,
                            sku_id: sku_id,
                            quantity: quantity,
                        },
                    })
                );
                //
                toast.success('Đã thêm sản phẩm vào giỏ hàng!');
                // addCartItemToLocalStorage({
                //     productId: productId,
                //     sku_id: sku_id,
                //     quantity: quantity
                // })
            }
        } else {

            toast.error('Vui lòng đăng nhập để tiếp tục');
            navigate('/login');
        }
    };


    const HandleAddToWishList = async ({ userId, productId }) => {
        await dispatch(addProWishList({
            userId: userId,
            productId: productId
        }));
        addFavoriteToLocalStorage(productId);
        setfavoriesProduct(getFavoritesFromLocalStorage());
        toast.success("Đã thêm sản phẩm vào mục yêu thích!");
    };

    const HandleRemoveFromWishList = async ({ userId, productId }) => {
        await dispatch(removeFromWishList({
            userId: userId,
            productId: productId
        }));
        removeFavoriteFromLocalStorage(productId);
        setfavoriesProduct(getFavoritesFromLocalStorage());
        toast.success("Đã xóa sản phẩm ra khỏi mục yêu thích!");
    };

    const onChangeVariation = async (indexOption, indexVariation) => {
        setSku_tier_idx((e) => {
            const newArr = e.slice();
            newArr[indexVariation] = indexOption
            console.log(newArr)
            return newArr
        })
    }

    useEffect(() => {
        setPromotion(product?.special_offer)
        setBrand(product.product_brand)
        if (product?.sku_list?.length > 0) {
            setSku_list(product?.sku_list)
            set_selected_sku(product?.sku_list[0])
            setSelectedImage(product?.product_images[0]?.thumb_url)
            setProduct_image(product?.product_images[0]?.thumb_url)
            setStock(product.sku_list[0]?.sku_stock)
            setPrice(product.sku_list[0]?.sku_price)
        } else {
            setSelectedImage(
                product?.product_thumb
            );
            setProduct_image(product?.product_thumb)
            setStock(product.product_quantity)
            setPrice(
                product.product_price
            );
        }
    }, [product]);

    useEffect(() => {
        if (promotion && promotion?.special_offer_spu_list?.length > 0) {
            promotion.special_offer_spu_list?.forEach((spu) => {
                if (spu.product_id.toString() === product._id.toString() && spu.sku_list?.length > 0) {

                    const min_price = spu.sku_list.flatMap((item) => item.price_sale);

                    setMin_price_sku(Math.min(...min_price))
                    const sku = spu.sku_list.find((item) => item?.sku_id == selected_sku?._id);
                    setSale(sku)
                } else if (spu.product_id.toString() === product._id.toString()) {
                    setSale(spu)
                    setMin_price_sku(spu.price_sale)
                }
            });
        }
    }, [selected_sku, promotion]);

    useEffect(() => {
        if (sku_tier_idx) {
            set_selected_sku(
                sku_list?.find(
                    (sku) =>
                        sku.sku_tier_idx.toString() === sku_tier_idx.toString()
                )
            );
        }
    }, [sku_tier_idx]);

    useEffect(() => {
        if (selected_sku) {
            setPrice(selected_sku.sku_price);
            setStock(selected_sku.sku_stock);
            setSelectedImage(product?.product_images?.length > 0 && product.product_images?.find((item) => item.sku_id === selected_sku._id)?.thumb_url);
        }
    }, [selected_sku])

    const handleSizeChange = (thumb) => {
        setSelectedImage(thumb);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const addToCart = () => {
        //
        if (userInfo) {
            if (product?.product_variations?.length > 0) {
                openModal();
            }
            else {
                handleAddToCart(userInfo._id, { productId: product._id, sku_id: null, quantity: quantity })
            }
        } else {
            toast.info('Vui lòng đăng nhập để tiếp tục');
            navigate('/login');
        }
    };
    // console.log(product._id)
    //////////////////rating

    // useEffect(() => {
    //     dispatch(getComment({ productId: '666c87d232ce3bce5d785772' }));
    // }, [dispatch]);
    // console.log('review',getComentProduct); 
    const review = product.review_list
    const renderStars = (rating) => {
        const fullStars = Math.max(0, Math.floor(rating));
        const halfStars = rating % 1 !== 0 ? 1 : 0;
        const emptyStars = Math.max(0, 5 - fullStars - halfStars);

        return (
            <>
                {[...Array(fullStars)].map((_, index) => (
                    <i key={`full-${index}`} className="fa fa-star"></i>
                ))}
                {halfStars === 1 && <i className="fas fa-star-half-alt"></i>}
                {[...Array(emptyStars)].map((_, index) => (
                    <i key={`empty-${index}`} className="far fa-star"></i>
                ))}
            </>
        );
    };

    // console.log(review.length);
    const calculateAverageRating = () => {
        if (review && review.length > 0) {
            const totalRatings = review.reduce((acc, comment) => acc + comment.comment_rating, 0);
            return (totalRatings / review.length).toFixed(1);
        }
        return 0; // Default to 0 if there are no comments
    };
    return (
        <>
            <div className="col-lg-3 col-md-6 col-sm-6 d-flex" key={product._id}>
                <div className="card bg-image hover-zoom ripple rounded ripple-surface w-100 my-2 shadow-2-strong">
                    <Link to={`/product/${product.product_slug}-${product._id}`}><img src={product_image} className="card-img-top" alt="product" /></Link>
                    <div className="card-body d-flex flex-column">
                        <h6 className="text-dark">{product.product_name}</h6>
                        {/* rating */}
                        <div className="text-warning mb-1 me-2">
                            {renderStars(calculateAverageRating())}
                            <span className="ms-1">
                                {calculateAverageRating()}
                            </span>
                        </div>

                        <div className="d-flex flex-row">
                            <h5 className="mb-1 me-1" style={{ fontSize: "18px" }}>
                                {sale
                                    ? accounting.formatNumber(min_price_sku, 0, '.', ',')
                                    : accounting.formatNumber(price, 0, '.', ',')} đ
                            </h5>
                            {sale && (
                                <h5 className="text-danger" style={{ fontSize: "16px" }}>
                                    <s>{accounting.formatNumber(price, 0, '.', ',')} đ</s>
                                </h5>
                            )}
                        </div>
                        <div className="d-flex justify-content-around">

                            <button className="btn btn-primary shadow-0 px-2 py-2"
                                style={{ backgroundColor: '#f6831f', color: 'white' }}
                                onClick={() => addToCart()}
                            >Thêm vào giỏ</button>

                            {product.product_variations && product.product_variations ? (
                                showModal &&
                                (
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
                                                                            <img style={{ maxWidth: '100%', maxHeight: '100vh', margin: 'auto' }} className="rounded-4 fit" src={selectedImage} alt="product" />
                                                                        </a>
                                                                    </div>
                                                                    <div className="d-flex justify-content-center mb-3">


                                                                        {product.product_images.map((thumb, index) => (
                                                                            <a key={index} className="border mx-1 rounded-2" target="_blank" data-type="image" onClick={() => handleSizeChange(thumb.thumb_url)}>
                                                                                <img width="50" height="50" className="rounded-2" src={thumb.thumb_url} alt="thumb" />
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
                                                                            <div className="text-warning mb-1 me-2" style={{ cursor: 'pointer', color: '#f6831f ' }}>
                                                                                <i className="fa fa-star" style={{ cursor: 'pointer', color: '#f6831f ' }}></i>
                                                                                <i className="fa fa-star" style={{ cursor: 'pointer', color: '#f6831f ' }}></i>
                                                                                <i className="fa fa-star" style={{ cursor: 'pointer', color: '#f6831f ' }}></i>
                                                                                <i className="fa fa-star" style={{ cursor: 'pointer', color: '#f6831f ' }}></i>
                                                                                <i className="fas fa-star-half-alt" style={{ cursor: 'pointer', color: '#f6831f ' }}></i>
                                                                                <span className="ms-1" style={{ cursor: 'pointer', color: '#f6831f ' }}>
                                                                                    4.5
                                                                                </span>
                                                                            </div>
                                                                            <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1"></i>{product.orders} orders</span>
                                                                            <span className="text-success ms-1">
                                                                                Còn 10 sản phẩm
                                                                            </span>
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            <span className="h5">
                                                                                {sale
                                                                                    ? <NumericFormat value={sale.price_sale} displayType="text" thousandSeparator={true} decimalScale={0} id="price" suffix="đ" />
                                                                                    : <NumericFormat value={price} displayType="text" thousandSeparator={true} decimalScale={0} id="price" suffix="đ" />

                                                                                }                                    </span>
                                                                            <span className="text-muted">/{product && product.product_unit}</span>
                                                                            <span className="text-danger ms-3">
                                                                                <s>
                                                                                    {sale && <NumericFormat value={price} displayType="text" thousandSeparator={true} decimalScale={0} id="price" suffix="đ" />
                                                                                    }</s>
                                                                            </span>
                                                                        </div>
                                                                        <p>{product.product_short_description}</p>
                                                                        <div className="row">
                                                                            {/* <div className="col-12 mb-3">
                                                                                <label className="mb-2">Dung Tích:</label>
                                                                                <div>
                                                                                    {product.product_variations.map((variation, index) => (
                                                                                        variation.options.map((option, optIndex) => (
                                                                                            <button key={optIndex} className="btn btn-outline-secondary mx-1 my-1">
                                                                                                {option}
                                                                                            </button>
                                                                                        ))
                                                                                    ))}
                                                                                </div>
                                                                            </div> */}
                                                                            {product && product.product_variations.map((variation, indexVariation) => {
                                                                                return (
                                                                                    <div className="row mb-2">
                                                                                        <div className="col-md-4 mb-3">
                                                                                            <div className="d-flex flex-row" key={indexVariation}>
                                                                                                <p class="d-none d-md-block mb-1" style={{ cursor: 'pointer', color: '#f6831f ' }}>{variation.name}</p>

                                                                                                {variation.options.map((option, indexOption) => {
                                                                                                    return (
                                                                                                        <div key={indexOption} >
                                                                                                            <input type="radio" class="btn btn-check" name="options" id={option} autocomplete="off"
                                                                                                                value={indexOption} onClick={() => onChangeVariation(indexOption, indexVariation)} />
                                                                                                            <label class={`btn ${product.product_variations[indexVariation].options[sku_tier_idx.length == 1 ? sku_tier_idx[0] : `${sku_tier_idx[0]},${sku_tier_idx[1]}`].toString() == option.toString() ? "btn-warning" : "btn-warning-outlined"}`} for={option}>{option}</label>

                                                                                                            {/* <label class="btn mx-1 my-1" for={option} data-mdb-ripple-init>{option}</label> */}
                                                                                                        </div>
                                                                                                    )
                                                                                                })}

                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            })}


                                                                        </div>
                                                                        <hr />
                                                                        <div className="row mb-2">
                                                                            <div className="col-md-4 col-6 mb-2">
                                                                                <p class="d-none d-md-block mb-0" style={{ cursor: 'pointer', color: '#f6831f ' }}>Số Lượng</p>
                                                                                <div className="input-group mt-3 mb-2" style={{ width: '170px' }}>
                                                                                    <button className="btn btn-white border border-secondary px-3" type="button" onClick={decreaseQuantity}>
                                                                                        <i className="fas fa-minus"></i>
                                                                                    </button>
                                                                                    <input
                                                                                        type="text"
                                                                                        className="form-control text-center border border-secondary"
                                                                                        value={quantity}
                                                                                        aria-label="Example text with button addon"
                                                                                        aria-describedby="button-addon1"
                                                                                        readOnly
                                                                                    />
                                                                                    <button className="btn btn-white border border-secondary px-3" type="button" onClick={increaseQuantity}>
                                                                                        <i className="fas fa-plus"></i>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {product &&
                                                                            <button className="btn btn-primary shadow-0 mt-1 px-2 py-2"
                                                                                style={{ backgroundColor: '#f6831f', color: 'white' }}
                                                                                onClick={() =>
                                                                                    handleAddToCart(userInfo, {
                                                                                        productId:
                                                                                            product._id,
                                                                                        sku_id: selected_sku?._id,
                                                                                        quantity: quantity,
                                                                                    })
                                                                                }> <i className="me-1 fa fa-shopping-basket"></i> Thêm Vào Giỏ Hàng </button>

                                                                        }
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
                            ) : (<></>)}

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
