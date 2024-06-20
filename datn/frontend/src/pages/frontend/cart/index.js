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

initMDB({ Tooltip });
export default function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.userReducer);

    const [price_total, setPriceTotal] = useState(0);
    const [price_total_discount, setPriceTotalApplyDiscount] = useState(0);
    const [discounts, setDiscounts] = useState([])
    const [cart_products, setCart] = useState([])

    const [special_offer_today, setSpecialOfferToday] = useState(null);
    const [discountCodeInput, setDiscountCodeInput] = useState('');
    const [price_discount_amount, setPriceDiscountAmount] = useState(0);
    const [appliedDiscountCode, setAppliedDiscountCode] = useState(null); // State lưu mã giảm giá đã áp dụng

    const fetchDataCart = async () => {

        const resultCart = await dispatch(getCart({ userId: userInfo._id }));
        setCart(resultCart.payload.metaData.cart_products)
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
                item_products: cart_products
            }
        }));
        console.log("///", applyDiscount)
        setPriceTotal(applyDiscount?.payload.metaData.checkout_order?.totalPrice);
        setPriceTotalApplyDiscount(applyDiscount?.payload.metaData.checkout_order?.totalPrice); // Khởi tạo giá sau giảm giá bằng tổng giá ban đầu
    }
    useEffect(() => {
        cart_products.length > 0 && loadPrice()
    }, [cart_products])

    const handleApplyDiscount = () => {
        onSelectedDiscount(discountCodeInput);
    };

    const handleAddOrderToLocalStorage = async () => {

        const discountsApply=appliedDiscountCode?[appliedDiscountCode]:[]
         addOrderFromCart({price_total, price_total_discount ,price_discount_amount,
            discountsApply,

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
        if (discount_code) {
            const applyDiscount = await dispatch(checkoutReview({
                // cartId: cart?._id,
                userId: userInfo._id,
                order_ids: {
                    shop_discounts: [{
                        discountId: discount_code._id,
                        codeId: discount_code.discount_code
                    }],
                    item_products: cart_products
                }
            }));
            if (applyDiscount?.payload.status === (200 || 201)) {
                const { checkout_order } = applyDiscount.payload.metaData;
                setPriceTotalApplyDiscount(checkout_order.totalCheckout);
                setPriceDiscountAmount(checkout_order.totalDiscount);
                setAppliedDiscountCode(discount_code); // Lưu mã giảm giá đã áp dụng
            }
        } else {
            setPriceTotalApplyDiscount(price_total);
            setPriceDiscountAmount(0);
            setAppliedDiscountCode(null); // Bỏ lưu mã giảm giá đã áp dụng khi không có mã nào được chọn
        }
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
                                    {cart_products?.length > 0 && cart_products.map((product, index) => {
                                        return <CartItem product={product} special_offer_today={special_offer_today}
                                            update={updateItemFromCart} key={index} />;
                                    })}
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
                                                            <a href="" data-mdb-tooltip-init title={`Giảm tối đa ${(item.discount_max_value)}đ cho đơn hàng từ  ${(item.discount_min_order_value)}đ`}
                                                            >!</a>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <button
                                                                className="btn btn-light border"
                                                                style={{ backgroundColor: '#f6831f', color: 'white' }}
                                                                onClick={() => onSelectedDiscount(item)}

                                                                disabled={appliedDiscountCode?.discount_code == item?.discount_code ? true : false}
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
                                        <p className="mb-2 text-success">{accounting.formatNumber(price_discount_amount, 0, ".", ",")} <span className="text-muted">đ</span></p>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">Thành Tiền:</p>
                                        <p className="mb-2 fw-bold">{accounting.formatNumber(price_total_discount, 0, ".", ",")} <span className="text-muted">đ</span></p>
                                    </div>
                                    <div className="mt-3">
                                        {price_total > 0 ? (
                                            <button
                                                onClick={() => {handleAddOrderToLocalStorage();navigate('/checkout')}}
                                                disabled={false}
                                                className="btn btn-success w-100 shadow-0 mb-2"
                                                style={{ backgroundColor: '#f6831f ' }}
                                            >
                                                Thanh toán
                                            </button>
                                        ) : (
                                            <button
                                                disabled={true}
                                                className="btn btn-success w-100 shadow-0 mb-2"
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
