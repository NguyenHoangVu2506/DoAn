import { useDispatch, useSelector } from "react-redux";
import { onProductDetail } from "../store/actions";
import { useEffect, useState } from "react";

export default function CartItem({ product_id, sku_id, quantity }) {

    const { productDetail } = useSelector((state) => state.productReducer)
    const [sku_idx, setSku_idx] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        if (!productDetail) {
            dispatch(onProductDetail({ spu_id: product_id }))
        }
        console.log(productDetail)

    }, [productDetail])

    // const sku_tier_idx = (sku) => {
    //     productDetail.spu_info.variations.filter((variation, index1) => {
    //         variation.options.filter((option, index2) => {
    //             if ([index1, index2].toString() === sku.sku_tier_idx.toString()) {
    //                 return option[index2]
    //             }
    //         })
    //     })
    // }

    console.log(productDetail)
    return (
        <>
            {productDetail && productDetail.sku_list.map((sku, index) => {
                if (sku._id.toString() === sku_id.toString()) {
                    return (
                        <div class="row gy-3" key={index}>
                            <div class="col-lg-5">
                                <div class="me-lg-5">
                                    <div class="d-flex">
                                        <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/13.webp" class="border rounded me-3" style={{ width: '96px', height: '96px' }} />
                                        <div class="">
                                            <a href="#" class="nav-link">{productDetail.spu_info.product_name}</a>
                                            {/* <p class="text-muted">{sku_tier_idx(sku)}</p> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                                <div class="">
                                    <select style={{ width: '100px' }} class="form-select me-4">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </div>
                                <div class="">
                                    <text class="h6">{sku.sku_price}</text> <br />
                                    {/* <small class="text-muted text-nowrap"> $460.00 / per item </small> */}
                                </div>
                            </div>
                            <div class="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                                <div class="float-md-end">
                                    <a href="#!" class="btn btn-light border px-2 icon-hover-primary"><i class="fas fa-heart fa-lg px-1 text-secondary"></i></a>
                                    <a href="#" class="btn btn-light border text-danger icon-hover-danger"> Remove</a>
                                </div>
                            </div>
                        </div>
                    )
                }

            })}
        </>
    );

}