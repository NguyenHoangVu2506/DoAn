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
        return cart.cart_products.some(product => applicableProductIds.includes(product.productId));
    };
    return (
        <>
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
                                        {discounts?.length > 0 && discounts.map((item, index) => (
                                            <div className="col-lg-3" key={index}>
                                                <div className="card shadow-0 border">
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-between">
                                                            <p className="mb-0 fw-bold">{item.discount_name}</p>
                                                        </div>
                                                        <hr />
                                                        <div className="d-flex justify-content-between">
                                                            <p className="mb-2">Mã: {item.discount_code}</p>
                                                        </div>
                                                        <div className="d-flex justify-content-between">

                                                            <p className="mb-2">HSD: {item.discount_end_date ? new Date(item.discount_end_date).toLocaleDateString() : ''}</p>
                                                            <div className="tooltip1">!
                                                                <span className="tooltiptext" >
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
                                        ))}
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
                    <div className="row">{/* Hiển thị các sản phẩm đề xuất ở đây */}</div>
                </div>
            </section>
            {/* <!-- Sản phẩm đề xuất --> */}
        </>
    );
}
