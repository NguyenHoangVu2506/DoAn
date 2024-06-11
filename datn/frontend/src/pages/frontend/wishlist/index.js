import { useDispatch, useSelector } from "react-redux";
import { getWishList, onAllProduct } from "../../../store/actions";
import ProductListItem from "../../../Components/product/productListItem";
import { useEffect, useState } from "react";
import { getFavoritesFromLocalStorage } from "../../../utils";

export default function Wishlist() {
    const dispatch = useDispatch()
    const { wish_list } = useSelector((state) => state.wishlistReducer);
    const { userInfo } = useSelector((state) => state.userReducer);
    const { allProducts } = useSelector((state) => state.productReducer);

    useEffect(() => {
        userInfo && (
            !wish_list ? dispatch(getWishList({ userId: userInfo._id })) : (wish_list.length != getFavoritesFromLocalStorage().length && dispatch(onAllProduct({ limit: 20, page: 1 })))
        )
        !allProducts && dispatch(onAllProduct({ limit: 20, page: 1 }))

    }, [wish_list]);

console.log("wishList, userInfo, allProducts",wish_list, userInfo, allProducts)

    return (
        <>
            <div class="bg-primary">
                <div class="container py-4">
                    {/*<!-- Breadcrumb -->*/}
                    <nav class="d-flex">
                        <h6 class="mb-0">
                            <a href="" class="text-white-50">Home</a>
                            <span class="text-white-50 mx-2"> - </span>
                            <a href="" class="text-white-50">Profile</a>
                            <span class="text-white-50 mx-2"> - </span>
                            <a href="" class="text-white"><u>Shopping cart</u></a>
                        </h6>
                    </nav>
                    {/*<!-- Breadcrumb -->*/}
                </div>
            </div>
            <section class="py-5 bg-light">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3 col-xl-3">
                            <nav class="nav flex-lg-column w-100 d-flex nav-pills mb-4">
                                <a class="nav-link my-0 " href="#"><p class="pb-0 mb-0" style={{ width: '100px' }}>Account main</p></a>
                                <a class="nav-link my-0 bg-light" href="#"><p class="pb-0 mb-0" style={{ width: '100px' }}>New orders</p></a>
                                <a class="nav-link my-0 bg-light" href="#"><p class="pb-0 mb-0" style={{ width: '100px' }}>Orders history</p></a>
                                <a class="nav-link my-0 bg-light" href="#"><p class="pb-0 mb-0" style={{ width: '100px' }}>My wishlist</p></a>
                                <a class="nav-link my-0 bg-light" href="#"><p class="pb-0 mb-0" style={{ width: '100px' }}>Transactions</p></a>
                                <a class="nav-link my-0 bg-light" href="#"><p class="pb-0 mb-0" style={{ width: '100px' }}>Profile setting</p></a>
                                <button class="nav-link my-0 bg-light"><p class="pb-0 mb-0" style={{ width: '100px' }} o>Log out</p></button>
                            </nav>
                        </div>

                        <main class="col-lg-9 col-xl-9">
                            <div class="card p-4 mb-0 shadow-0 border">
                                <div class="content-body">
                                    <div class="col-lg-12">

                                        <div class="row justify-content-center mb-3">
                                            {wish_list && wish_list.wish_list_products?.length > 0 ? (
                                                wish_list.wish_list_products.map((product_in_wish_list) => {
                                                    allProducts && allProducts.map((product, index2) => {
                                                        if (product_in_wish_list == product._id) {
                                                            console.log("de vao", product)
                                                            return (<ProductListItem product={product} />)
                                                        }
                                                    })
                                                })
                                            ) : <></>}

                                        </div>



                                        <hr />

                                        {/*<!-- Pagination -->*/}
                                        <nav aria-label="Page navigation example" class="d-flex justify-content-center mt-3">
                                            <ul class="pagination">
                                                <li class="page-item disabled">
                                                    <a class="page-link" href="#" aria-label="Previous">
                                                        <span aria-hidden="true">&laquo;</span>
                                                    </a>
                                                </li>
                                                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                <li class="page-item"><a class="page-link" href="#">4</a></li>
                                                <li class="page-item"><a class="page-link" href="#">5</a></li>
                                                <li class="page-item">
                                                    <a class="page-link" href="#" aria-label="Next">
                                                        <span aria-hidden="true">&raquo;</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                        {/*<!-- Pagination -->*/}
                                    </div>

                                </div>
                            </div>
                        </main>
                    </div>

                </div>
            </section>
        </>
    );
}