import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import ProductRelatedItem from "../../../../Components/product/product_related_item";
import { addCart, addProWishList, removeFromWishList, productImageList, onProductDetail, getUserByID } from "../../../../store/actions";
import { toast } from 'react-toastify';
import { addFavoriteToLocalStorage, getFavoritesFromLocalStorage, removeFavoriteFromLocalStorage } from "../../../../utils";
import { getComment } from "../../../../store/actions/comment_rating-actions";
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
function ProductDetail() {

    const { product_slug_id } = useParams()
    const spu_id = product_slug_id.split("-").pop()

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { getComentProduct } = useSelector((state) => state.commnetRatingReducer);
    const { userbyid } = useSelector((state) => state.userReducer);
    const { userInfo } = useSelector((state) => state.userReducer);
    const [favories_products, setfavoriesProduct] = useState(getFavoritesFromLocalStorage)
    const [special_offer, setSpecial_offer] = useState([])

    const [activeTab, setActiveTab] = useState("ex1-pills-1");
    const [sku_tier_idx, setSku_tier_idx] = useState([0])
    const [sku_list, setSkuList] = useState(null);
    const [price_sku, setPrice] = useState(0);

    const [name, setName] = useState('');
    const [detail, setDetail] = useState('');
    const [stock, setStock] = useState(0);


    const [selectedImage, setSelectedImage] = useState(null);
    const [productDetail, setproduct_detail] = useState(null);
    const [productReview, setProductReview] = useState(null);

    const [product_images, setProductImages] = useState([]);
    const [selected_sku, set_selected_sku] = useState(null);
    const [sale, setSale] = useState(null);

    // const [special_offer, setSpecial_offer] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };
    const HandleImageChoose = (thumb) => {
        setSelectedImage(thumb);
    };

    ////comment

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStars = rating % 1 !== 0 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStars;

        return (
            <>
                {Array(fullStars).fill(<i className="fa fa-star"></i>)}
                {halfStars === 1 && <i className="fas fa-star-half-alt"></i>}
                {Array(emptyStars).fill(<i className="far fa-star"></i>)}
            </>
        );
    };
    console.log(productReview,'aaaaaaaaaaaaaaaaaaaa')
    // const review = prod

    const calculateAverageRating = () => {
        if (productReview && productReview.length > 0) {
            const totalRatings = productReview.reduce((acc, comment) => acc + comment.comment_rating, 0);

            return (totalRatings / productReview.length).toFixed(1);
        }
        return 0; // Default to 0 if there are no comments
    };
    // console.log("rating",calculateAverageRating)
    ////addtoCart
    const handleAddToCart = async (userId, { productId, sku_id = null, quantity }) => {
        console.log("productId, sku_id, quantity", productId, sku_id, quantity, userId)
        if (userId) {
            if (quantity <= stock) {
                // console.log('selected_sku', sku_id + productId + sku_id)
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


    /////changeVariation
    const onChangeVariation = async (indexOption, indexVariation) => {
        setSku_tier_idx((e) => {
            const newArr = e.slice();
            newArr[indexVariation] = indexOption
            console.log(newArr)
            return newArr
        })
    }
    console.log(sku_tier_idx)

    useEffect(() => {
        if (special_offer && special_offer?.special_offer_spu_list?.length > 0) {
            special_offer.special_offer_spu_list.forEach((spu) => {
                if (spu.product_id.toString() === productDetail.product_detail._id.toString() && spu.sku_list?.length > 0) {
                    const sku = spu.sku_list.find((item) => item?.sku_id == selected_sku._id);
                    setSale(sku)
                    //
                } else if (spu.product_id.toString() === productDetail.product_detail._id.toString()) {
                    setSale(spu)
                }
            });
        }
    }, [special_offer, selected_sku]);

    useEffect(() => {
        if (productDetail) {
            setSpecial_offer(productDetail?.special_offer)

            setName(
                productDetail?.product_detail?.product_name
            );
            setDetail(
                productDetail?.product_detail?.product_detail
            );
            setStock(
                productDetail?.product_detail?.product_quantity
            )

            if (productDetail?.sku_list?.length > 0) {
                setSkuList(productDetail?.sku_list)
                set_selected_sku(productDetail?.sku_list[0])
                setSelectedImage(productDetail?.product_images[0]?.thumb_url)
                //
                setProductImages(productDetail?.product_images[0]?.thumb_url)
                setStock(productDetail.sku_list[0]?.sku_stock)
                setPrice(productDetail.sku_list[0]?.sku_price)
            } else {
                setSelectedImage(
                    productDetail?.product_detail?.product_thumb[0]
                );
                setPrice(
                    productDetail.product_detail
                        .product_price
                );
            }
        }
    }, [productDetail, product_images])

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
            setSelectedImage(productDetail?.product_images?.length > 0 && productDetail.product_images?.find((item) => item.sku_id === selected_sku._id)?.thumb_url);
        }
    }, [selected_sku])



    const fetchDataDetail = async () => {
        const detail = await dispatch(onProductDetail({ spu_id: spu_id }));
        setproduct_detail(
            detail?.payload.metaData
        );
        setProductReview(detail?.payload.metaData.product_comment

        )
        const images = await dispatch(productImageList({ spu_id: spu_id }))
        setProductImages(images?.payload?.metaData)
    }

    useEffect(() => {
        fetchDataDetail()
    }, [product_slug_id]);

    console.log("product_detail", productDetail, selected_sku);
    console.log("pro", selected_sku);

    // const review= productDetail.product_comment;
    console.log(productReview)
    return (
        <>
            <div className="bg-" style={{ backgroundColor: 'white' }} >
                <div className="container py-4 " >
                    {/*<!-- Breadcrumb --> */}
                    <nav className="d-flex" >
                        <h6 className="mb-0">
                            <Link href="" className="" style={{ color: '#f6831f' }}>Trang chủ</Link>
                            <span className=" mx-2" style={{ color: '#f6831f' }}>/ </span>
                            <Link href="" className="" style={{ color: '#f6831f' }}>Chi tiết</Link>

                        </h6>
                    </nav>
                    {/*<!-- Breadcrumb --> */}
                </div>
            </div>
            <section className="py-5">
                <div className="container">
                    <div className="row gx-5">
                        <aside className="col-lg-6">
                            <div className="border rounded-4 mb-3 d-flex justify-content-center">
                                <a data-fslightbox="mygalley" className="rounded-4" target="_blank" data-type="image"
                                >
                                    <img style={{ maxWidth: '100%', maxHeight: '100vh', margin: 'auto' }} className="rounded-4 fit"
                                        src={selectedImage} />
                                </a>
                            </div>
                            <div className="d-flex justify-content-center mb-3">

                                {productDetail?.product_images?.map((thumb, index) => {
                                    return (
                                        <a key={index} data-fslightbox="mygalley" className="border mx-1 rounded-2" target="_blank" data-type="image"
                                            onClick={() => HandleImageChoose(thumb.thumb_url)}>
                                            <img width="60" height="60" className="rounded-2" src={thumb.thumb_url} />
                                        </a>
                                    )
                                })}


                            </div>
                            {/*<!-- thumbs-wrap.// --> */}
                            {/*<!-- gallery-wrap .end// --> */}
                        </aside>
                        <main className="col-lg-6">
                            <div className="ps-lg-3">
                                <h4 className="title text-dark">
                                    {name}
                                </h4>
                                <div className="d-flex flex-row my-3">
                                    <div className="text-warning mb-1 me-2">
                                        {renderStars(calculateAverageRating())}
                                        <span className="ms-1">
                                            {calculateAverageRating()}
                                        </span>
                                    </div>
                                    <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1"></i>Đã Mua</span>
                                    {/* <span className="text-success ms-2">Số Lượng : {selected_sku && selected_sku.sku_stock}</span> */}
                                    <span className="text-success ms-2">Số Lượng :{(selected_sku && selected_sku ? (selected_sku.sku_stock) : (stock))}</span>

                                </div>

                                <div className="mb-3">
                                    <span className="h4 fw-bold">
                                        {(
                                            sale ? <NumericFormat value={sale.price_sale} displayType="text" thousandSeparator={true} decimalScale={0} id="price" suffix="đ" />
                                                : <NumericFormat value={price_sku} displayType="text" thousandSeparator={true} decimalScale={0} id="price" suffix="đ" />
                                        )
                                        }                                    </span>
                                    <span className="text-muted">/{productDetail && productDetail.product_detail.product_unit}</span>
                                    <span className="h5 text-danger ms-3" >
                                        <s>
                                            {sale && <NumericFormat value={price_sku} displayType="text" thousandSeparator={true} decimalScale={0} id="price" suffix="đ" />
                                            }</s>
                                    </span>
                                </div>
                                <span>
                                    {sale && (
                                        <button className="fw-bold"
                                            style={{ backgroundColor: "white", color: "red", cursor: 'pointer', borderRadius: '10px', borderColor: 'red' }}>
                                            Giảm đến {sale?.percentage}%
                                        </button>
                                    )}
                                </span>

                                <p className="pt-3 text-dark">
                                    Mô tả: {productDetail && productDetail.product_detail.product_short_description}
                                </p>

                                <div className="row">

                                    <dt className="col-3">Thương Hiệu</dt>
                                    <dd className="col-9 fw-bold" style={{ cursor: 'pointer', color: '#f6831f ' }}>{productDetail && productDetail.product_brand.brand_name}</dd>
                                </div>
                                <hr />

                                <div className="row mb-4">
                                    {
                                        productDetail && productDetail.product_detail.product_variations.map((variation, indexVariation) => {
                                            return (
                                                <div className="col-12 mb-3" key={indexVariation}>
                                                    <div>
                                                        <p className="fw-bold" style={{ cursor: 'pointer', color: '#f6831f ' }}>{variation.name}</p>

                                                        {variation.options.map((option, indexOption) => {
                                                            return (
                                                                <React.Fragment key={indexOption}>
                                                                {/* // <div key={indexOption} className="flex flex-row justify-content-around "> */}
                                                                    {/* <MDBRadio
                                                                        btn
                                                                        btnColor='warning'
                                                                        id={option}
                                                                        name={option}
                                                                        wrapperClass='mx-2'
                                                                        wrapperTag='span'
                                                                        label={option}
                                                                    /> */}

                                                                    <input type="radio" className={`btn-check `} name={option} id={option} autocomplete="off" value={indexOption} onClick={() => onChangeVariation(indexOption, indexVariation)} />
                                                                    <label class={`btn ${productDetail.product_detail.product_variations[indexVariation].options[sku_tier_idx.length == 1 ? sku_tier_idx[0] : `${sku_tier_idx[0]},${sku_tier_idx[1]}`].toString() == option.toString() ? "btn-warning" : "btn-warning-outlined"}`} for={option}>{option}</label>

                                                                    {/* 
                                                                  <button type="radio" className={`btn btn-`}
                                                                        name="options" id={option} autocomplete="off"
                                                                        value={indexOption} onClick={() => onChangeVariation(indexOption, indexVariation)} >
                                                                        <label class="btn mx-1 my-1" for={option} data-mdb-ripple-init>{option}</label> 
                                                                        </button> */}

                                                                {/* // </div> */}
                                                                </React.Fragment>
                                                            )
                                                        })}

                                                    </div>
                                                </div>

                                            )
                                        })
                                    }



                                    {/*<!-- col.// --> */}

                                    < div className="col-md-4 col-6 mb-3" >
                                        <label className="mb-2 d-block fw-bold" style={{ cursor: 'pointer', color: '#f6831f ' }}>Số Lượng</label>
                                        <div className="input-group mb-3" style={{ width: '170px' }}>
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
                                <button href="#" className="btn btn-warning shadow-0 me-1"> Mua Ngay </button>

                                {productDetail ? (
                                    <button className="btn btn-primary shadow-0 me-1"
                                        style={{ backgroundColor: '#f6831f', color: 'white' }}
                                        onClick={() =>
                                            handleAddToCart(userInfo, {
                                                productId:
                                                    productDetail?.product_detail?._id,
                                                sku_id: selected_sku?._id,
                                                quantity: quantity,
                                            })
                                        }> <i className="me-1 fa fa-shopping-basket"></i>  Thêm Vào Giỏ Hàng </button>
                                ) :
                                    <button className="btn btn-primary shadow-0 me-1"
                                        style={{ backgroundColor: '#f6831f', color: 'white' }}
                                    > <i className="me-1 fa fa-shopping-basket"></i>  Thêm Vào Giỏ Hàng </button>


                                }
                                {productDetail &&
                                    (userInfo ?
                                        (
                                            favories_products.some((p_id) => p_id === productDetail.product_detail._id) == true
                                                ?
                                                <button className="btn btn-light border icon-hover  px-2 py-2  " onClick={() => HandleRemoveFromWishList({ userId: userInfo._id, productId: productDetail.product_detail._id })}><i className="fas fa-heart fa-lg text-danger px-1" ></i></button>
                                                :
                                                <button className="btn btn-light border icon-hover  px-2 py-2 " onClick={() => HandleAddToWishList({ userId: userInfo._id, productId: productDetail.product_detail._id })}><i className="fas fa-heart fa-lg text-secondary px-1" ></i></button>
                                        ) : (
                                            <button className="btn btn-light border icon-hover  px-2 py-2  " ><i className="fas fa-heart fa-lg text-secondary px-1" ></i></button>
                                        ))}
                            </div>
                        </main>
                    </div>
                </div >
            </section >
            {/*<!-- content --> */}

            < section className="bg-light border-top py-4" >
                <div className="container">
                    <div className="row gx-4">
                        <div className="col-lg-8 mb-4">
                            <div className="border rounded-2 px-3 py-2 bg-white">
                                {/*<!-- Pills navs --> */}
                                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                                    <li className="nav-item d-flex" role="presentation">
                                        <a className={`nav-link d-flex align-items-center justify-content-center w-100 ${activeTab === "ex1-pills-1" ? "active" : ""}`}
                                            id="ex1-tab-1"
                                            data-mdb-toggle="pill"
                                            href="#ex1-pills-1"
                                            role="tab"
                                            aria-controls="ex1-pills-1"
                                            aria-selected="true"
                                            onClick={() => handleTabChange("ex1-pills-1")}
                                        >Giới thiệu</a>
                                    </li>
                                    <li className="nav-item d-flex" role="presentation">
                                        <a className={`nav-link d-flex align-items-center justify-content-center w-100 ${activeTab === "ex1-pills-2" ? "active" : ""}`}
                                            id="ex1-tab-2"
                                            data-mdb-toggle="pill"
                                            href="#ex1-pills-2"
                                            role="tab"
                                            aria-controls="ex1-pills-2"
                                            aria-selected="true"
                                            onClick={() => handleTabChange("ex1-pills-2")}
                                        >Công dụng</a>
                                    </li>
                                    <li className="nav-item d-flex" role="presentation">
                                        <a className={`nav-link d-flex align-items-center justify-content-center w-100 ${activeTab === "ex1-pills-3" ? "active" : ""}`}
                                            id="ex1-tab-3"
                                            data-mdb-toggle="pill"
                                            href="#ex1-pills-3"
                                            role="tab"
                                            aria-controls="ex1-pills-3"
                                            aria-selected="true"
                                            onClick={() => handleTabChange("ex1-pills-3")}
                                        >Thành phần</a>
                                    </li>
                                    <li className="nav-item d-flex" role="presentation">
                                        <a className={`nav-link d-flex align-items-center justify-content-center w-100 ${activeTab === "ex1-pills-4" ? "active" : ""}`}
                                            id="ex1-tab-4"
                                            data-mdb-toggle="pill"
                                            href="#ex1-pills-4"
                                            role="tab"
                                            aria-controls="ex1-pills-4"
                                            aria-selected="true"
                                            onClick={() => handleTabChange("ex1-pills-4")}

                                        >Hướng dẫn sử dụng</a>
                                    </li>
                                </ul>
                                {/*<!-- Pills navs --> */}

                                {/*<!-- Pills content --> */}
                                <div className="tab-content" id="ex1-content">
                                    <div className={`tab-pane fade ${activeTab === 'ex1-pills-1' ? 'show active' : ''} `} id="ex1-pills-1" role="tabpanel" aria-labelledby="ex1-tab-1">

                                    Son Kem 3CE Velvet Lip Tint lên môi “mướt mườn mượt”. Chất 3CE cũng ở dạng kem mịn như nhung. Lên môi nhẹ, căng và bám môi rất tốt. Giá thành quá ổn cho 1 cây son Hàn xịn, màu son ko chỉ đa dạng mà màu nào cũng xinh. Swatch cũng “bao” chuẩn luôn nhé các chị em.

                                    

                                    </div>
                                    <div className={`tab-pane fade ${activeTab === 'ex1-pills-2' ? 'show active' : ''} mb-2`} id="ex1-pills-2" role="tabpanel" aria-labelledby="ex1-tab-2">
                                        {/* Tab content or sample information now <br />
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                        officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo */}
                                    </div>
                                    <div className={`tab-pane fade ${activeTab === 'ex1-pills-3' ? 'show active' : ''} mb-2`} id="ex1-pills-3" role="tabpanel" aria-labelledby="ex1-tab-3">
                                    Water, Dimethicone, Dimethicone/Vinyl Dimethicone Crosspolymer, Glycerin, Alcohol Denat., Pentylene Glycol, Polyglyceryl-10 Myristate, Polyacrylate Crosspolymer-6, Butylene Glycol, Dimethicone Crosspolymer, Ceteareth-20, Ethylhexylglycerin, Trisodium Ethylenediamine Disuccinate, Arginine, Aluminum Hydroxide, Ammonium Polyacrylate, Carbomer, Phenoxyethanol, Fragrance(Parfum), Titanium Dioxide (CI 77891), Acid Red 18 (CI 16255), Yellow 6 (CI 15985), Red 33 (CI 17200), Yellow 5 (CI 19140), Blue 1 (CI 42090)
                                    </div>
                                    <div className={`tab-pane fade ${activeTab === 'ex1-pills-4' ? 'show active' : ''} mb-2`} id="ex1-pills-4" role="tabpanel" aria-labelledby="ex1-tab-4">
                                        {/* Some other tab content or sample information now <br />
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                        officia deserunt mollit anim id est laborum. */}
                                    </div>
                                </div>
                                {/*<!-- Pills content --> */}
                            </div>

                            <div className="border rounded-2 px-3 py-2 bg-white">
                                <div className="tab-content" id="ex1-content">
                                    <div className="tab-pane fade show active" id="ex1-pills-1" role="tabpanel" aria-labelledby="ex1-tab-1">
                                        <h4>ĐÁNH GIÁ CỦA KHÁCH HÀNG</h4>

                                        {productReview && productReview.length > 0 ? (
                                            <>
                                                <span className="text-success"> {productReview.length} đánh giá</span>

                                                {productReview && productReview.map((comment, index) => {
                                                    console.log(comment.comment_rating)
                                                    return (
                                                        <div class="card mb-3" key={index}>
                                                            <div class="card-body">
                                                                <div class="d-flex flex-start">
                                                                    <img class="rounded-circle shadow-1-strong me-3"
                                                                        src={comment.comment_userId.user_avatar} alt="avatar" width="40"
                                                                        height="40" />
                                                                    <div class="w-100">
                                                                        <div class="d-flex justify-content-between align-items-center mb-0">
                                                                            <div className="text-warning mb-1 me-2">
                                                                                <h6 class="text-primary fw-bold mb-0">
                                                                                    {comment.comment_userId.user_name}
                                                                                </h6>
                                                                                {renderStars(comment.comment_rating)}
                                                                                <span className="ms-1">
                                                                                    {comment.comment_rating}
                                                                                </span>

                                                                            </div>

                                                                            <p class="mb-0">{comment.createdAt ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: vi }) : ''}</p>
                                                                        </div>
                                                                        <div class="d-flex justify-content-between align-items-center">
                                                                            <span class="text-body ms-1">{comment.comment_content}</span>

                                                                            {/* <p class="small mb-0" style={{ color: '#aaa' }}>
                                                                    <a href="#!" class="link-grey">Remove</a> •
                                                                    <a href="#!" class="link-grey">Reply</a> •
                                                                    <a href="#!" class="link-grey">Translate</a>
                                                                </p> */}
                                                                            {/* <div class="d-flex flex-row">
                                                                    <i class="fas fa-star text-warning me-2"></i>
                                                                    <i class="far fa-check-circle me-2" style={{ color: '#ff8647' }}></i>
                                                                    <a href="#!" class="link-grey " style={{ color: '#ff8647' }}>Đã mua hàng</a>
                                                                </div> */}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    )
                                                }
                                                )}
                                            </>
                                        ) : (
                                            <span className="text-success" style={{ textAlign: "center" }}>Không có đánh giá nào</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="px-0 border rounded-2 shadow-0">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Sản phẩm liên quan</h5>
                                        {productDetail && productDetail.related_products.map((product, index) => {
                                            return (
                                                <ProductRelatedItem key={index} product={product} />
                                            )
                                        })}

                                        {/* <div className="d-flex mb-3">
                                            <a href="#" className="me-3">
                                                <img src="" style={{ minWidth: '96px', height: '96px' }} className="img-md img-thumbnail" />
                                            </a>
                                            <div className="info">
                                                <a href="#" className="nav-link mb-1">
                                                    Rucksack Backpack Large <br />
                                                    Line Mounts
                                                </a>
                                                <strong className="text-dark"> $38.90</strong>
                                            </div>
                                        </div> */}

                                        {/* <div className="d-flex mb-3">
                                            <a href="#" className="me-3">
                                                <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/9.webp" style={{ minWidth: '96px', height: '96px' }} className="img-md img-thumbnail" />
                                            </a>
                                            <div className="info">
                                                <a href="#" className="nav-link mb-1">
                                                    Summer New Men's Denim <br />
                                                    Jeans Shorts
                                                </a>
                                                <strong className="text-dark"> $29.50</strong>
                                            </div>
                                        </div> */}


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
}
export default ProductDetail;