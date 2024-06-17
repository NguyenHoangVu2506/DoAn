import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, getCart, updateQuantityCart, updateSkuCart, updateSkuFromCartV2 } from "../../../store/actions";
import CartItem from "../../../Components/cartItem";
import { specialOfferToday } from "../../../store/actions/special_offer-actions";
import CouponItem from "./discount";

export default function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.userReducer)
    const { special_offer } = useSelector((state) => state.specialOfferReducer)
    const { cart } = useSelector((state) => state.cartReducer)
    const [price_total, setprice_total] = useState(0)
    const [special_offer_today, setSpecial_offer_today] = useState(null)

    useEffect(() => {
        if (userInfo) {
            dispatch(getCart({ userId: userInfo._id }))
            dispatch(specialOfferToday());
        }
    }, [])

    const updateItemFromCart = async (type, data) => {
        if (type === 'deleteItem') {
            const { productId, sku_id = null } = data;
            await dispatch(
                deleteCartItem({
                    userId: userInfo._id,
                    productId: productId,
                    sku_id: sku_id,
                })
            );
        }
        if (type === 'updateItemQuantity') {
            const { productId, sku_id = null, quantity, old_quantity } = data;

            console.log("updateItemQuantity: ", productId, sku_id, quantity, old_quantity);
            await dispatch(updateQuantityCart({
                userId: userInfo._id,
                shop_order_ids: {
                    item_products: {
                        productId: productId,
                        sku_id: sku_id,
                        quantity: quantity,
                        old_quantity: old_quantity,
                    },
                },
            })
            );
        }
        if (type === 'updateItemSku') {
            const { productId, sku_id, sku_id_old } = data;

            console.log("updateItemSku: ", productId, sku_id, sku_id_old);
            await dispatch(updateSkuCart({
                userId: userInfo._id,
                shop_order_ids: {
                    item_products: {
                        productId: productId,
                        sku_id: sku_id,
                        sku_id_old: sku_id_old,
                    },
                },
            })
            );
        }
        if (type === 'updateItemSkuV2') {
            const { productId, sku_id, sku_id_old, quantity } = data;

            console.log("updateItemSkuV2: ", productId, sku_id, sku_id_old, quantity);
            await dispatch(updateSkuFromCartV2({
                userId: userInfo._id,
                shop_order_ids: {
                    item_products: {
                        productId: productId,
                        sku_id: sku_id,
                        sku_id_old: sku_id_old,
                        quantity: quantity
                    },
                },
            })
            );
        }
        return dispatch(getCart({ userId: userInfo._id }));
    };
    useEffect(() => {
        special_offer && setSpecial_offer_today(special_offer)
    }, [special_offer]);
    // useEffect(() => {
    //     cart?.cart_products?.length > 0 && setprice_total(cart?.cart_products?.reduce(
    //         (accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity),
    //         0,
    //     ))
    // }, [cart]);
    // const OpenCart = async () => {
    //     await dispatch(getCart({ userId: userInfo._id }));
    //     dispatch(specialOfferToday());

    //     setSelectedProductFromCart(getSelectedListFromCart)
    //     setprice_total(0)
    //     setOpen(true);
    // };

    return (
        <>

            {/* <!-- cart + summary --> */}
            <section class="bg-light my-5">
                <div class="container">
                    <div class="row">
                        {/* <!-- cart --> */}
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
                                   <CouponItem/>
                                </div>
                            </div>
                        </div>
                        {/* <!-- cart --> */}

                        {/* <!-- summary --> */}
                        <div class="col-lg-3">
                            <div class="card mb-3 border shadow-0">
                                <div class="card-body">
                                    <form>
                                        <div class="form-group">
                                            <label class="form-label">Have coupon?</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control border" name="" placeholder="Coupon code" />
                                                <button class="btn btn-light border">Apply</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="card shadow-0 border">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between">
                                        <p class="mb-2">Total price:</p>
                                        <p class="mb-2">{price_total}</p>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <p class="mb-2">Discount:</p>
                                        <p class="mb-2 text-success">-$60.00</p>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <p class="mb-2">TAX:</p>
                                        <p class="mb-2">$14.00</p>
                                    </div>
                                    <hr />
                                    <div class="d-flex justify-content-between">
                                        <p class="mb-2">Total price:</p>
                                        <p class="mb-2 fw-bold">$283.00</p>
                                    </div>

                                    <div class="mt-3">
                                        {price_total > 0
                                            ? <button href="/checkout" onClick={() => {
                                                navigate('/checkout');

                                            }} disabled={false} class="btn btn-success w-100 shadow-0 mb-2">  Thanh toan </button>
                                            : <button disabled={true} class="btn btn-success w-100 shadow-0 mb-2">Thanh toan </button>
                                        }
                                        <Link
                                            to={"/"} class="btn btn-light w-100 border mt-2"> Back to shop </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- summary --> */}
                    </div>
                </div>
            </section>
            {/* <!-- cart + summary --> */}
            <section>
                <div class="container my-5">
                    <header class="mb-4">
                        <h3>Recommended items</h3>
                    </header>

                    <div class="row">
                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <div class="card px-4 border shadow-0 mb-4 mb-lg-0">
                                <div class="mask px-2" style={{ height: '50px' }}>
                                    <div class="d-flex justify-content-between">
                                        <h6><span class="badge bg-danger pt-1 mt-3 ms-2">New</span></h6>
                                        <a href="#"><i class="fas fa-heart text-primary fa-lg float-end pt-3 m-2"></i></a>
                                    </div>
                                </div>
                                <a href="#" class="">
                                    <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/7.webp" class="card-img-top rounded-2" />
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
                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <div class="card px-4 border shadow-0 mb-4 mb-lg-0">
                                <div class="mask px-2" style={{ height: '50px' }}>
                                    <a href="#"><i class="fas fa-heart text-primary fa-lg float-end pt-3 m-2"></i></a>
                                </div>
                                <a href="#" class="">
                                    <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/5.webp" class="card-img-top rounded-2" />
                                </a>
                                <div class="card-body d-flex flex-column pt-3 border-top">
                                    <a href="#" class="nav-link">Apple Watch Series 1 Sport </a>
                                    <div class="price-wrap mb-2">
                                        <strong class="">$120.00</strong>
                                    </div>
                                    <div class="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                        <a href="#" class="btn btn-outline-primary w-100">Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <div class="card px-4 border shadow-0">
                                <div class="mask px-2" style={{ height: '50px' }}>
                                    <a href="#"><i class="fas fa-heart text-primary fa-lg float-end pt-3 m-2"></i></a>
                                </div>
                                <a href="#" class="">
                                    <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/9.webp" class="card-img-top rounded-2" />
                                </a>
                                <div class="card-body d-flex flex-column pt-3 border-top">
                                    <a href="#" class="nav-link">Men's Denim Jeans Shorts</a>
                                    <div class="price-wrap mb-2">
                                        <strong class="">$80.50</strong>
                                    </div>
                                    <div class="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                        <a href="#" class="btn btn-outline-primary w-100">Add to cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6">
                            <div class="card px-4 border shadow-0">
                                <div class="mask px-2" style={{ height: '50px' }}>
                                    <a href="#"><i class="fas fa-heart text-primary fa-lg float-end pt-3 m-2"></i></a>
                                </div>
                                <a href="#" class="">
                                    <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.webp" class="card-img-top rounded-2" />
                                </a>
                                <div class="card-body d-flex flex-column pt-3 border-top">
                                    <a href="#" class="nav-link">Mens T-shirt Cotton Base Layer Slim fit </a>
                                    <div class="price-wrap mb-2">
                                        <strong class="">$13.90</strong>
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
            {/* <!-- Recommended --> */}

        </>
    );

}