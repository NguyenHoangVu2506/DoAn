import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onProductDetail } from "../../../../store/actions/product-actions";
import { useNavigate, useParams } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import ProductRelatedItem from "../../../../Components/product/product_related_item";
import { addCart, addProWishList, removeFromWishList } from "../../../../store/actions";
import { toast } from 'react-toastify';
import { addFavoriteToLocalStorage, getFavoritesFromLocalStorage, removeFavoriteFromLocalStorage } from "../../../../utils";
function ProductDetail({ }) {
    const { product_slug_id } = useParams()
    const spu_id = product_slug_id.split("-").pop()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productDetail } = useSelector((state) => state.productReducer);
    const { userInfo } = useSelector((state) => state.userReducer);
    const [favories_products, setfavoriesProduct] = useState(getFavoritesFromLocalStorage)

    const [activeTab, setActiveTab] = useState("ex1-pills-1");
    const [largeImageSrc, setLargeImageSrc] = useState(productDetail && productDetail.product_detail.product_thumb[0]);
    const [sku_tier_idx, setSku_tier_idx] = useState([0, 0])

    const [price, setPrice] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [product_detail, setProductDetail] = useState(null);
    const [product_images, setProductImages] = useState(null);
    const [selected_sku, set_selected_sku] = useState(null);
    const [spicial_offer, setSpicial_offer] = useState(null);
    const [sale_sku, setSale_sku] = useState(null);
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

    const changeLargeImage = (newSrc) => {
        setLargeImageSrc(newSrc);
    };

    /////changeVariation
    const onChangeVariation = async (indexOption, indexVariation) => {
        setSku_tier_idx((e) => {
            const newArr = e.slice();
            newArr[indexVariation] = indexOption
            console.log(newArr)
            return newArr
        })
        console.log(indexOption, indexVariation)
    }
    ////addtoCart
    const handleAddToCart = async (userId, { productId, sku_id = null, quantity }) => {
        console.log("productId, sku_id, quantity", productId, sku_id, quantity, userId)
        if (userId) {
            if (quantity <= stock) {
                // console.log('selected_sku', sku_id + productId + sku_id)
                await dispatch(
                    addCart({
                        userId: userId._id,
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
    useEffect(() => {
        productDetail && (
            !selected_sku && set_selected_sku(productDetail.sku_list.find((sku) => sku.sku_tier_idx.toString() === sku_tier_idx.toString()))
        )
        productDetail && setLargeImageSrc(productDetail.product_detail.product_thumb[0])
        productDetail && setStock(productDetail.product_detail.product_quantity)

    }, [productDetail, sku_tier_idx])

    useEffect(() => {
        dispatch(onProductDetail({ spu_id: spu_id }));
    }, [product_slug_id]);
    console.log("productDetail", productDetail, selected_sku);
    console.log("pro", selected_sku);

    return (
        <>
            <div className="bg-"style={{backgroundColor: '#f6831f' }} >
                <div className="container py-4 " >
                    {/*<!-- Breadcrumb --> */}
                    <nav className="d-flex" >
                        <h6 className="mb-0">
                            <a href="" className="text-white-50">Trang chủ</a>
                            <span className="text-white-50 mx-2">/ </span>
                            <a href="" className="text-white-50">Chi tiết</a>

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
                                        src={largeImageSrc} />
                                </a>
                            </div>
                            <div className="d-flex justify-content-center mb-3">
                                {productDetail && productDetail.product_detail.product_thumb.map((img, index) => {
                                    return (
                                        <a key={index} data-fslightbox="mygalley" className="border mx-1 rounded-2" target="_blank" data-type="image"
                                            onClick={() => changeLargeImage(img)}
                                        >
                                            <img width="60" height="60" className="rounded-2" src={img} />
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
                                    {productDetail && productDetail.product_detail.product_name}
                                </h4>
                                <div className="d-flex flex-row my-3">
                                    <div className="text-warning mb-1 me-2">
                                        <i className="fa fa-star"style={{ cursor: 'pointer', color: '#f6831f ' }}></i>
                                        <i className="fa fa-star"style={{ cursor: 'pointer', color: '#f6831f ' }}></i>
                                        <i className="fa fa-star"style={{ cursor: 'pointer', color: '#f6831f ' }}></i>
                                        <i className="fa fa-star"style={{ cursor: 'pointer', color: '#f6831f ' }}></i>
                                        <i className="fas fa-star-half-alt"style={{ cursor: 'pointer', color: '#f6831f ' }}></i>
                                        <span className="ms-1">
                                            4.5
                                        </span>
                                    </div>
                                    <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1"></i>154 orders</span>
                                    <span className="text-success ms-2">In stock : {selected_sku && selected_sku.sku_stock}</span>
                                </div>

                                <div className="mb-3">
                                    <span className="h5"> <NumericFormat value={selected_sku ? selected_sku.sku_price : (productDetail && productDetail.product_detail.product_price)} displayType="text" thousandSeparator={true} decimalScale={0} id="price" suffix="đ" /> </span>
                                    <span className="text-muted">/{productDetail && productDetail.product_detail.product_unit}</span>
                                </div>

                                <p>
                                    {productDetail && productDetail.product_detail.product_description}
                                </p>

                                <div className="row">

                                    <dt className="col-3">Thương Hiệu</dt>
                                    <dd className="col-9 fw-bold" style={{ cursor: 'pointer', color: '#f6831f ' }}>{productDetail && productDetail.product_brand.brand_name}</dd>
                                </div>

                                <hr />

                                <div className="row mb-4">

                                    {productDetail && productDetail.product_detail.product_variations.map((variation, indexVariation) => {
                                        return (
                                            <div className="col-12 mb-3">
                                                <div key={indexVariation}>
                                                    <p className="fw-bold"style={{ cursor: 'pointer', color: '#f6831f ' }}>{variation.name}</p>

                                                    {variation.options.map((option, indexOption) => {
                                                        return (
                                                            <div key={indexOption} >
                                                                <input type="radio" class="btn btn-check" name="options" id={option} autocomplete="off"
                                                                    value={indexOption} onClick={() => onChangeVariation(indexOption, indexVariation)} />
                                                                <label class="btn  mx-1 my-1" for={option} data-mdb-ripple-init>{option}</label>
                                                            </div>
                                                        )
                                                    })}

                                                </div>
                                            </div>

                                        )
                                    })}
                                    {/*<!-- col.// --> */}

                                    <div className="col-md-4 col-6 mb-3">
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

                                {productDetail &&
                                    <button className="btn btn-primary shadow-0 me-1"
                                    style={{ backgroundColor: '#f6831f', color: 'white' }}
                                        onClick={() =>
                                            handleAddToCart(userInfo, {
                                                productId:
                                                    productDetail?.product_detail?._id,
                                                sku_id: selected_sku?.sku_id,
                                                quantity: quantity,
                                            })
                                        }> <i className="me-1 fa fa-shopping-basket"></i>  Thêm Vào Giỏ Hàng </button>

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
                </div>
            </section>
            {/*<!-- content --> */}

            <section className="bg-light border-top py-4">
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
                                        <p>
                                            With supporting text below as a natural lead-in to additional content. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur.
                                        </p>
                                        <div className="row mb-2">
                                            <div className="col-12 col-md-6">
                                                <ul className="list-unstyled mb-0">
                                                    <li><i className="fas fa-check text-success me-2"></i>Some great feature name here</li>
                                                    <li><i className="fas fa-check text-success me-2"></i>Lorem ipsum dolor sit amet, consectetur</li>
                                                    <li><i className="fas fa-check text-success me-2"></i>Duis aute irure dolor in reprehenderit</li>
                                                    <li><i className="fas fa-check text-success me-2"></i>Optical heart sensor</li>
                                                </ul>
                                            </div>
                                            <div className="col-12 col-md-6 mb-0">
                                                <ul className="list-unstyled">
                                                    <li><i className="fas fa-check text-success me-2"></i>Easy fast and ver good</li>
                                                    <li><i className="fas fa-check text-success me-2"></i>Some great feature name here</li>
                                                    <li><i className="fas fa-check text-success me-2"></i>Modern style and design</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <table className="table border mt-3 mb-2">
                                            <tr>
                                                <th className="py-2">Display:</th>
                                                <td className="py-2">13.3-inch LED-backlit display with IPS</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2">Processor capacity:</th>
                                                <td className="py-2">2.3GHz dual-core Intel Core i5</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2">Camera quality:</th>
                                                <td className="py-2">720p FaceTime HD camera</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2">Memory</th>
                                                <td className="py-2">8 GB RAM or 16 GB RAM</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2">Graphics</th>
                                                <td className="py-2">Intel Iris Plus Graphics 640</td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div className={`tab-pane fade ${activeTab === 'ex1-pills-2' ? 'show active' : ''} mb-2`} id="ex1-pills-2" role="tabpanel" aria-labelledby="ex1-tab-2">
                                        Tab content or sample information now <br />
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                        officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    </div>
                                    <div className={`tab-pane fade ${activeTab === 'ex1-pills-3' ? 'show active' : ''} mb-2`} id="ex1-pills-3" role="tabpanel" aria-labelledby="ex1-tab-3">
                                        Another tab content or sample information now <br />
                                        Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                        mollit anim id est laborum.
                                    </div>
                                    <div className={`tab-pane fade ${activeTab === 'ex1-pills-4' ? 'show active' : ''} mb-2`} id="ex1-pills-4" role="tabpanel" aria-labelledby="ex1-tab-4">
                                        Some other tab content or sample information now <br />
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                        officia deserunt mollit anim id est laborum.
                                    </div>
                                </div>
                                {/*<!-- Pills content --> */}
                            </div>
                            <div className="border rounded-2 px-3 py-2 bg-white">
                                <div className="tab-content" id="ex1-content">
                                    <div className="tab-pane fade show active" id="ex1-pills-1" role="tabpanel" aria-labelledby="ex1-tab-1">
                                        <h4>ĐÁNH GIÁ CỦA KHÁCH HÀNG</h4>
                                        <p>(0)</p>
                                        <ul data-mdb-rating-init class="rating mb-3" data-mdb-toggle="rating">
                                            <li>
                                                <i class="far fa-star fa-sm text-danger" title="Bad"></i>
                                            </li>
                                            <li>
                                                <i class="far fa-star fa-sm text-danger" title="Poor"></i>
                                            </li>
                                            <li>
                                                <i class="far fa-star fa-sm text-danger" title="OK"></i>
                                            </li>
                                            <li>
                                                <i class="far fa-star fa-sm text-danger" title="Good"></i>
                                            </li>
                                            <li>
                                                <i class="far fa-star fa-sm text-danger" title="Excellent"></i>
                                            </li>
                                        </ul>
                                        <div class="card mb-3">
                                            <div class="card-body">
                                                <div class="d-flex flex-start">
                                                    <img class="rounded-circle shadow-1-strong me-3"
                                                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(26).webp" alt="avatar" width="40"
                                                        height="40" />
                                                    <div class="w-100">
                                                        <div class="d-flex justify-content-between align-items-center mb-3">
                                                            <h6 class="text-primary fw-bold mb-0">
                                                                lara_stewart
                                                                <span class="text-body ms-2">Hmm, This poster looks cool</span>
                                                            </h6>
                                                            <p class="mb-0">2 days ago</p>
                                                        </div>
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <p class="small mb-0" style={{ color: '#aaa' }}>
                                                                <a href="#!" class="link-grey">Remove</a> •
                                                                <a href="#!" class="link-grey">Reply</a> •
                                                                <a href="#!" class="link-grey">Translate</a>
                                                            </p>
                                                            <div class="d-flex flex-row">
                                                                <i class="fas fa-star text-warning me-2"></i>
                                                                <i class="far fa-check-circle me-2" style={{ color: '#ff8647' }}></i>
                                                                <a href="#!" class="link-grey " style={{ color: '#ff8647' }}>Đã mua hàng</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
            </section>
        </>
    );
}
export default ProductDetail;