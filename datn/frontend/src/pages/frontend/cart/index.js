import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, getCart, updateQuantityCart, updateSkuCart, updateSkuFromCartV2, checkoutReview } from "../../../store/actions";
import CartItem from "../../../Components/cartItem";
import { specialOfferToday } from "../../../store/actions/special_offer-actions";
import { Amount, getAllDiscount } from "../../../store/actions/discount-actions";
import accounting from "accounting";
import { Tooltip, initMDB } from "mdb-ui-kit";
import { addOrderFromCart } from "../../../utils";
import './tooltip.css';
<<<<<<< HEAD
import { Helmet } from 'react-helmet';
=======
>>>>>>> origin/main

initMDB({ Tooltip });
export default function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.userReducer);
    const { cart } = useSelector((state) => state.cartReducer);

    const [price_total, setPriceTotal] = useState(0);
    const [price_total_promotion, setPrice_total_promotion] = useState(0);
    const [price_total_discount, setPriceTotalDiscount] = useState(0);
    const [price_total_checkout, setPrice_total_checkout] = useState(0);

    const [discounts, setDiscounts] = useState([])

    const [special_offer_today, setSpecialOfferToday] = useState(null);
    const [discountCodeInput, setDiscountCodeInput] = useState('');
    const [appliedDiscountCode, setAppliedDiscountCode] = useState(null); // State lưu mã giảm giá đã áp dụng
    console.log('discounts', discounts)
    const fetchDataCart = async () => {

        const resultCart = await dispatch(getCart({ userId: userInfo._id }));
        const resultPromotion = await dispatch(specialOfferToday());
        setSpecialOfferToday(resultPromotion?.payload?.metaData)
        const resultDiscount = await dispatch(getAllDiscount({ sort: 'ctime' }));
        setDiscounts(resultDiscount?.payload?.metaData)

    }

    useEffect(() => {
        if (userInfo) {
            fetchDataCart()
        }
    }, []);
<<<<<<< HEAD
=======

    useEffect(() => {
        document.title = "Giỏ Hàng";
      }, []);
    
    
>>>>>>> origin/main
    const loadPrice = async () => {
        const applyDiscount = await dispatch(checkoutReview({
            // cartId: cart?._id,
            userId: userInfo._id,
            order_ids: {
                shop_discounts: [],
                item_products: cart?.cart_products
            }
        }));
        setPriceTotal(applyDiscount?.payload.metaData.checkout_order?.totalPrice);
        setPrice_total_promotion(applyDiscount?.payload.metaData.checkout_order?.totalSpecialOffer);
        setPrice_total_checkout(applyDiscount?.payload.metaData.checkout_order?.totalCheckout)
    }
    useEffect(() => {
        if (cart?.cart_products?.length > 0) {
            console.log('Cart has products, loading prices...');
            loadPrice();
        } else {
            console.log('Cart is empty, resetting prices...');
            setPriceTotal(0);
            setPrice_total_promotion(0);
            setPriceTotalDiscount(0);
            setPrice_total_checkout(0);
        }
    }, [cart]);

    const handleApplyDiscount = () => {
        onSelectedDiscount(discountCodeInput);
    };

    const handleAddOrderToLocalStorage = async () => {

        const discountsApply = appliedDiscountCode ? [appliedDiscountCode] : []
        addOrderFromCart({
            price_total, price_total_discount, price_total_promotion, price_total_checkout, discountsApply

        })
    };

    const updateItemFromCart = async (type, data) => {
        if (type === 'deleteItem') {
            const { productId, sku_id = null } = data;
            await dispatch(deleteCartItem({ userId: userInfo._id, productId, sku_id }));
        }
        if (type === 'updateItemQuantity') {
            const { productId, sku_id = null, quantity, old_quantity } = data;
            await dispatch(updateQuantityCart({
                userId: userInfo._id,
                shop_order_ids: {
                    item_products: { productId, sku_id, quantity, old_quantity }
                },
            }));
        }
        if (type === 'updateItemSku') {
            const { productId, sku_id, sku_id_old } = data;
            await dispatch(updateSkuCart({
                userId: userInfo._id,
                shop_order_ids: {
                    item_products: { productId, sku_id, sku_id_old }
                },
            }));
        }
        if (type === 'updateItemSkuV2') {
            const { productId, sku_id, sku_id_old, quantity } = data;
            await dispatch(updateSkuFromCartV2({
                userId: userInfo._id,
                shop_order_ids: {
                    item_products: { productId, sku_id, sku_id_old, quantity }
                },
            }));
        }
        return dispatch(getCart({ userId: userInfo._id }));
    };

    const onSelectedDiscount = async (discount_code) => {
        if (discount_code && price_total_checkout > 0) {
            const applyDiscount = await dispatch(checkoutReview({
                // cartId: cart?._id,
                userId: userInfo._id,
                order_ids: {
                    shop_discounts: [{
                        discountId: discount_code._id,
                        codeId: discount_code.discount_code
                    }],
                    item_products: cart?.cart_products
                }
            }));
            if (applyDiscount?.payload.status === (200 || 201)) {
                const { checkout_order } = applyDiscount.payload.metaData;
                setPrice_total_checkout(checkout_order.totalCheckout)
                setPriceTotalDiscount(checkout_order.totalDiscount);
                setPrice_total_promotion(checkout_order.totalSpecialOffer);
                setAppliedDiscountCode(discount_code); // Lưu mã giảm giá đã áp dụng
            }
        } else {
            setPrice_total_checkout(price_total);
            setPriceTotalDiscount(0);
            setPrice_total_promotion(0)
            setAppliedDiscountCode(null); // Bỏ lưu mã giảm giá đã áp dụng khi không có mã nào được chọn
        }

    };
    const isDiscountApplicable = (discount) => {
        if (discount.discount_applies_to === 'all') return true;
        const applicableProductIds = discount.discount_product_ids || [];
        return cart?.cart_products.some(product => applicableProductIds.includes(product.productId));
    };
    const renderDiscountUsage = (discount) => {
        const { discount_users_used } = discount;

        if (discount_users_used && discount_users_used.length > 0) {
            const userDiscountData = discount_users_used.find(data => data.userId === userInfo._id);
            if (userDiscountData) {
                const { uses, discount_max_uses_per_user } = userDiscountData;
                const remainingUses = discount.discount_max_uses_per_user - uses;
                return (
                    <p className="mb-0 text-success">{`Còn ${remainingUses} lần sử dụng`}</p>
                );
            } else {
                return (
                    <p className="mb-0 text-success">{`Còn ${discount.discount_max_uses_per_user} lần sử dụng`}</p>
                );
            }
        }
        return null;
    };

    const calculateRemainingUses = (discount) => {
        const { discount_users_used } = discount;

        if (discount_users_used && discount_users_used.length > 0) {
            const userDiscountData = discount_users_used.find(data => data.userId === userInfo._id);
            if (userDiscountData) {
                const { uses, discount_max_uses_per_user } = userDiscountData;
                return discount.discount_max_uses_per_user - uses;
            } else {
                return discount.discount_max_uses_per_user; // Display full uses if user has not used the discount
            }
        }
        return 0; // Default to 0 if discount information is missing
    };


    return (
        <>
            <div className="bg-primary">
                <div className="bg-2" style={{ backgroundColor: 'white' }}>
                    <div className="container py-4">
<<<<<<< HEAD
                    <Helmet>
                        <title>Giỏ hàng - HoangVu</title>
                    </Helmet>
=======
>>>>>>> origin/main
                        {/* Breadcrumb */}
                        <nav className="d-flex">
                            <h6 className="mb-0">
                                <Link to={'/'} className=" " style={{ color: '#f6831f' }}>Trang Chủ</Link>
                                <span className=" mx-2" style={{ color: '#f6831f' }}> - </span>
                                <Link to={'/gio-hang'} style={{ color: '#f6831f' }}><u>Giỏ hàng</u></Link>
                            </h6>
                        </nav>
                        {/* Breadcrumb */}
                    </div>
                </div>
            </div>

            {/* <!-- giỏ hàng + tóm tắt --> */}
            <section className="bg-light my-5">
                <div className="container">
                    <div className="row">
                        {/* <!-- giỏ hàng --> */}
                        <div className="col-lg-9">
                            <div className="card border shadow-0">
                                <div className="m-4">
                                    <h4 className="card-title mb-4">Giỏ hàng của bạn</h4>
                                    {cart?.cart_products?.length > 0 ? (
                                        cart.cart_products.map((product, index) => (
                                            <CartItem
                                                product={product}
                                                special_offer_today={special_offer_today}
                                                update={updateItemFromCart}
                                                key={index}
                                            />
                                        ))
                                    ) : (
                                        <div className="row" style={{ height: "300px" }}>
                                            <div className="col-md-4"></div>
                                            <div className="col-md-4 text-center d-flex flex-column justify-content-center align-items-center">
                                                <h6 className="">Không có sản phẩm nào trong giỏ hàng !</h6>
                                                <br />
                                                <Link
                                                    className="btn btn-light"
                                                    style={{ backgroundColor: '#f6831f', color: 'white' }}
                                                    to={`/`}
                                                >
                                                    Về trang chủ
                                                </Link>
                                            </div>
                                            <div className="col-md-4"></div>
                                        </div>
                                    )}
                                </div>
                                <div className="border-top pt-4 mx-4 mb-4">
                                    <div className="row">
                                        <h5>Khuyến mãi dành cho bạn</h5>
                                        {discounts?.length > 0 ? (
                                            discounts.some(item => calculateRemainingUses(item) > 0) ? (
                                                discounts.map((item, index) => {
                                                    const remainingUses = calculateRemainingUses(item); // Assume calculateRemainingUses is a function to get remaining uses
                                                    if (remainingUses > 0) {
                                                        return (
                                                            <div className="col-lg-3" key={index}>
                                                                <div className="card shadow-0 border">
                                                                    <div className="card-body">
                                                                        <div className="d-flex justify-content-between">
                                                                            <p className="mb-0 fw-bold">{item.discount_name}</p>
                                                                        </div>
                                                                        <div className="d-flex justify-content-between">
                                                                            {renderDiscountUsage(item)}
                                                                        </div>
                                                                        <hr />
                                                                        <div className="d-flex justify-content-between">
                                                                            <p className="mb-2">Mã: {item.discount_code}</p>
                                                                        </div>
                                                                        <div className="d-flex justify-content-between">
                                                                            <p className="mb-2">HSD: {item.discount_end_date ? new Date(item.discount_end_date).toLocaleDateString() : ''}</p>
                                                                            <div className="tooltip1">!
                                                                                <span className="tooltiptext">
                                                                                    {`Giảm tối đa ${item.discount_max_value}đ cho đơn hàng từ ${item.discount_min_order_value}đ và áp dụng cho ${item.discount_applies_to === 'all' ? 'tất cả sản phẩm' : `các sản phẩm với ID: ${item.discount_product_ids.join(', ')}`}`}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="d-flex justify-content-between">
                                                                            <button
                                                                                className="btn btn-light border"
                                                                                style={{ backgroundColor: '#f6831f', color: 'white' }}
                                                                                onClick={() => onSelectedDiscount(item)}
                                                                                disabled={!isDiscountApplicable(item) || appliedDiscountCode?.discount_code === item?.discount_code}
                                                                            >
                                                                                Áp dụng
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                })
                                            ) : (
                                                <p>Không có mã giảm giá nào khả dụng11111111.</p>
                                            )
                                        ) : (
                                            <p>Không có mã giảm giá nào khả dụng.</p>
                                        )}

                                        <div className="col-lg-9"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- giỏ hàng --> */}
                        {/* <!-- tóm tắt --> */}
                        <div className="col-lg-3">
                            <div className="card shadow-0 border">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">Tổng giá:</p>
                                        <p className="mb-2">{accounting.formatNumber(price_total, 0, ".", ",")} <span className="text-muted">đ</span></p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">Giảm giá:</p>
                                        <p className="mb-2 text-success">{accounting.formatNumber(price_total_promotion, 0, ".", ",")} <span className="text-muted">đ</span></p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">Mã giảm giá giảm:</p>
                                        <p className="mb-2 text-success">{accounting.formatNumber(price_total_discount, 0, ".", ",")} <span className="text-muted">đ</span></p>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">Thành Tiền:</p>
                                        <p className="mb-2 fw-bold">{accounting.formatNumber(price_total_checkout, 0, ".", ",")} <span className="text-muted">đ</span></p>
                                    </div>
                                    <div className="mt-3">
                                        {price_total > 0 ? (
                                            <button
                                                onClick={() => { handleAddOrderToLocalStorage(); navigate('/checkout') }}
                                                disabled={false}
                                                className="btn btn-success w-100 shadow-0 mb-2"
                                                style={{ backgroundColor: '#f6831f ' }}
                                            >
                                                Thanh toán
                                            </button>
                                        ) : (
                                            <button
                                                disabled={true}
                                                className="btn btn-success w-100 shadow-0 mb-2" style={{ backgroundColor: '#f6831f', color: 'white' }}
                                            >
                                                Thanh toán
                                            </button>
                                        )}
                                        <Link to="/" className="btn btn-light w-100 border mt-2">
                                            Quay lại mua sắm
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- tóm tắt --> */}
                    </div>
                </div>
            </section>
            {/* <!-- giỏ hàng + tóm tắt --> */}
            <section>
                <div className="container my-5">
                    <header className="mb-4">
                        <h3>Sản phẩm đề xuất</h3>
                    </header>
                    <div className="row">{/* Hiển thị các sản phẩm đề xuất ở đây */}
                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <div class="card px-4 border shadow-0 mb-4 mb-lg-0">
                                <div class="mask px-2" style={{ height: '50px' }}>
                                    <div class="d-flex justify-content-between">
                                        <h6><span class="badge bg-danger pt-1 mt-3 ms-2">New</span></h6>
                                        <a href="#"><i class="fas fa-heart text-primary fa-lg float-end pt-3 m-2"></i></a>
                                    </div>
                                </div>
                                <a href="#" class="">
                                    <img src="https://www.guardian.com.vn/media/catalog/product/cache/3965315a10862e276fd3fdea4a2f2bdf/t/h/thay_doi_bao_bi__5__bb53fcaec552445ab730654cec143286_x0qflobuasj2qemd.png" class="card-img-top rounded-2" />
                                </a>
                                <div class="card-body d-flex flex-column pt-3 border-top">
                                    <a href="#" class="nav-link">Gaming Headset with Mic</a>
                                    <div class="price-wrap mb-2">
                                        <strong class="">$18.95</strong>
                                        <del class="">$24.99</del>
                                    </div>
                                    <div class="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                        <a href="#" class="btn btn-outline-primary w-100">Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {/* <!-- Sản phẩm đề xuất --> */}
        </>
    );
}
