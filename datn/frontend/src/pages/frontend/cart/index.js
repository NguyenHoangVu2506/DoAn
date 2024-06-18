import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, getCart, updateQuantityCart, updateSkuCart, updateSkuFromCartV2 } from "../../../store/actions";
import CartItem from "../../../Components/cartItem";
import { specialOfferToday } from "../../../store/actions/special_offer-actions";
import CouponItem from "./discount";
import { Amount } from "../../../store/actions/discount-actions";

export default function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { amount } = useSelector((state) => state.discountReducer)
    const { userInfo } = useSelector((state) => state.userReducer)
    const { special_offer } = useSelector((state) => state.specialOfferReducer)
    const { cart } = useSelector((state) => state.cartReducer)
    const [price_total, setprice_total] = useState(0)
    const [special_offer_today, setSpecial_offer_today] = useState(null)
    const [discountCode, setDiscountCode] = useState('');
    const [productcart, setProductCart] = useState([]);

    useEffect(() => {
        if (userInfo) {
            dispatch(getCart({ userId: userInfo._id }))
            dispatch(specialOfferToday());
        }
    }, [userInfo, dispatch])

    useEffect(() => {
        if (discountCode && userInfo && cart?.cart_products) {
            const productcart = cart.cart_products.map(product => ({
                id: product.productId,
                quantity: product.quantity,
                price: price_total
            }));
            setProductCart(productcart);
            dispatch(Amount({ codeId: discountCode, userId: userInfo._id, products: productcart }));
        }
    }, [discountCode, userInfo, cart?.cart_products, dispatch]);


    useEffect(() => {
        special_offer && setSpecial_offer_today(special_offer)
    }, [special_offer]);

    useEffect(() => {
        if (cart?.cart_products?.length > 0) {
            const total = cart.cart_products.reduce((accumulator, currentValue) => {
                const itemTotal = currentValue.price * currentValue.quantity;
                return accumulator + itemTotal;
            }, 0);
            setprice_total(total);
        }
    }, [cart]);
    console.log(cart)

    const handleApplyDiscount = () => {
        // Trigger useEffect to apply discount
        setDiscountCode(discountCode);
    }

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

    return (
        <>
            {/* <!-- giỏ hàng + tóm tắt --> */}
            <section class="bg-light my-5">
                <div class="container">
                    <div class="row">
                        {/* <!-- giỏ hàng --> */}
                        <div class="col-lg-9">
                            <div class="card border shadow-0">
                                <div class="m-4">
                                    <h4 class="card-title mb-4">Giỏ hàng của bạn</h4>
                                    {cart?.cart_products?.length > 0 && cart.cart_products.map((product, index) => {
                                        return <CartItem product={product} special_offer_today={special_offer_today}
                                            update={updateItemFromCart} key={index} />
                                    })}
                                </div>
                                <div class="border-top pt-4 mx-4 mb-4">
                                    <CouponItem />
                                </div>
                            </div>
                        </div>
                        {/* <!-- giỏ hàng --> */}
                        {/* <!-- tóm tắt --> */}
                        <div class="col-lg-3">
                            <div class="card mb-3 border shadow-0">
                                <div class="card-body">
                                    <form onSubmit={(e) => { e.preventDefault(); handleApplyDiscount(); }}>
                                        <div class="form-group">
                                            {/* <label class="form-label">Có mã giảm giá?</label> */}
                                            <div class="input-group">
                                                <input 
                                                    type="text" 
                                                    class="form-control border" 
                                                    name="discountCode" 
                                                    placeholder="Mã giảm giá" 
                                                    value={discountCode}
                                                    onChange={(e) => setDiscountCode(e.target.value)}
                                                />
                                                <button class="btn btn-light border" type="submit">Áp dụng</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="card shadow-0 border">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between">
                                        <p class="mb-2">Tổng giá:</p>
                                        <p class="mb-2">{price_total}</p>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <p class="mb-2">Giảm giá:</p>
                                        <p class="mb-2 text-success">-60.000đ</p>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <p class="mb-2">Thuế:</p>
                                        <p class="mb-2">14.000đ</p>
                                    </div>
                                    <hr />
                                    <div class="d-flex justify-content-between">
                                        <p class="mb-2">Tổng giá:</p>
                                        <p class="mb-2 fw-bold">283.000đ</p>
                                    </div>
                                    <div class="mt-3">
                                        {price_total > 0
                                            ? <button onClick={() => { navigate('/checkout'); }} disabled={false} class="btn btn-success w-100 shadow-0 mb-2">Thanh toán</button>
                                            : <button disabled={true} class="btn btn-success w-100 shadow-0 mb-2">Thanh toán</button>
                                        }
                                        <Link to={"/"} class="btn btn-light w-100 border mt-2">Quay lại mua sắm</Link>
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
                <div class="container my-5">
                    <header class="mb-4">
                        <h3>Sản phẩm đề xuất</h3>
                    </header>
                    <div class="row">
                        {/* Hiển thị các sản phẩm đề xuất ở đây */}
                    </div>
                </div>
            </section>
            {/* <!-- Sản phẩm đề xuất --> */}
        </>
    );
}
