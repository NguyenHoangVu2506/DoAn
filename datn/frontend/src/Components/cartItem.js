import { useDispatch, useSelector } from "react-redux";
import { onProductDetail, productById } from "../store/actions";
import { useEffect, useState } from "react";

export default function CartItem({ product, special_offer_today, update }) {

    const dispatch = useDispatch();
    const [product_item, setProductItem] = useState(null);
    const [selected, setSelected] = useState(null);
    const [selected_sku, setSelected_sku] = useState(null);
    const [_quantity, setQuantity] = useState(null);
    // sale
    const [sku_sale, setSku_sale] = useState(null);

    const [price, setPrice] = useState(0);

    // console log cũ
    console.log("product", product)
    const [selected_sku_old, setSelected_sku_old] = useState(null);
    const [selected_old, setSelected_old] = useState(null);

    const productItemApi = async () => {
        const respon = await dispatch(
            productById({ spu_id: product.productId })
        );
        console.log('respon', respon);
        if (respon) {
            setProductItem(respon.payload.metaData);
            setSelected_old(respon.payload.metaData?.sku_list?.length > 0 ? (respon.payload.metaData?.sku_list.find(
                (item) => item._id?.toString() === product.sku_id?.toString()
            )?.sku_tier_idx) : null);
            setSelected(respon.payload.metaData?.sku_list?.length > 0 ? (respon.payload.metaData?.sku_list.find(
                (item) => item._id?.toString() === product.sku_id?.toString()
            )?.sku_tier_idx) : null);
        }
    };

    useEffect(() => {
        productItemApi();
        setQuantity(product.quantity);
    }, [update]);
    console.log(_quantity)
console.log(special_offer_today)
    useEffect(() => {
        special_offer_today &&
            special_offer_today?.special_offer_spu_list.length > 0 && special_offer_today?.special_offer_spu_list.filter((spu) => {
                if (
                    spu.product_id.toString() === product.productId.toString() & spu.sku_list.length > 0 & selected_sku
                ) {
                    return spu.sku_list.filter((sku) => {
                        if (
                            sku.sku_id.toString() === selected_sku?.sku_id.toString()
                        ) {
                            setSku_sale(sku);
                            return;
                        }
                    });
                }
                if (spu.product_id.toString() === product.productId.toString()) {
                    console.log('price_sale', spu.price_sale)
                    setPrice(spu.price_sale)
                    return;
                }
            });
    }, [selected_sku, special_offer_today]);
    console.log(sku_sale)
    useEffect(() => {
        special_offer_today &&
            special_offer_today?.special_offer_spu_list.filter((spu) => {

                if (spu.product_id.toString() === product.productId.toString()) {
                    console.log('price_sale', spu.price_sale)
                    setPrice(spu.price_sale)
                    return;
                }

            });
    }, [special_offer_today]);

    const changeVariation = async (value, variationOrder) => {
        setSelected((s) => {
            setSelected_old(s);
            const newArray = s.slice();
            newArray[variationOrder] = value;
            return newArray;
        });
    }
    useEffect(() => {
        product_item &&
            selected &&
            setSelected_sku(
                product_item.sku_list.find(
                    (item) =>
                        item.sku_tier_idx.toString() === selected.toString()
                )
            );
    }, [selected]);

    useEffect(() => {
        product_item && (
            selected_sku && (
                selected_sku_old &&
                (
                    selected_sku._id.toString() !== selected_sku_old._id.toString() && (
                        updateCart('updateItemSkuV2', {
                            productId: product.productId,
                            sku_id: selected_sku._id,
                            sku_id_old: selected_sku_old._id,
                            quantity: _quantity,
                        })
                    )
                ))
        )

    }, [selected_sku]);

    useEffect(() => {
        product_item &&
            selected_old &&
            setSelected_sku_old(
                product_item.sku_list.find(
                    (item) =>
                        item.sku_tier_idx.toString() === selected_old.toString()
                )
            );
    }, [selected_old]);

    const handleVariationChange = async (value, variationOrder) => {
        return await changeVariation(value, variationOrder)
    };
    const updateCart = async (type, data) => {
        const { productId, quantity, old_quantity, sku_id = null, sku_id_old } = data;
        if (type === 'deleteItem') {
            await update('deleteItem', {
                productId: productId,
                sku_id: sku_id
            })
        }
        if (type === 'updateItemSku') {
            await update('updateItemSku', {
                productId: productId,
                sku_id: sku_id,
                sku_id_old: sku_id_old
            })
        }
        if (type === 'updateItemSkuV2') {
            await update('updateItemSkuV2', {
                productId: productId,
                quantity: quantity,
                sku_id: sku_id,
                sku_id_old: sku_id_old
            })
        }
        if (type === 'updateItemQuantity') {
            if (quantity === 0) {
                await update('deleteItem', {
                    productId: productId,
                    sku_id: sku_id,
                })
            }
            if (quantity >= 1 & quantity < 21) {
                await update(type, {
                    productId: productId,
                    quantity: quantity,
                    old_quantity: old_quantity,
                    sku_id: sku_id,
                });
            }
        }
    };

    console.log('Selected', selected);
    console.log('Selected_old', selected_old);
    console.log('Selected_sku', selected_sku);
    console.log('Selected_sku_old', selected_sku_old);
    console.log('price', price);

    return (
        <>
            {product_item && (
                <div class="row gy-3">
                    <div class="col-lg-6">
                        <div class="me-lg-3">
                            <div class="d-flex">
                                <img src={product_item.spu_info.product_thumb[0]} class="border rounded me-3" style={{ width: '96px', height: '96px' }} />
                                <div class="">
                                    <text class="h6 text-muted text-nowrap"> {price}/ {product_item.spu_info.product_unit} </text>
                                    <p className="text">{product_item.spu_info.product_name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                        <div className="col-md-4 col-6 mb-3">
                            <label className="mb-2 d-block">Số lượng</label>
                            <div className="input-group mb-3" style={{ width: '170px' }}>
                                <button className="btn btn-white border border-secondary px-3" type="button" onClick={() => updateCart("updateItemQuantity", { productId: product.productId, quantity: _quantity - 1, old_quantity: _quantity, sku_id: selected_sku?.sku_id })}>
                                    <i className="fas fa-minus"></i>
                                </button>
                                <input
                                    type="text"
                                    className="form-control text-center border border-secondary"
                                    value={_quantity}
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    readOnly
                                />
                                <button className="btn btn-white border border-secondary px-3" type="button" onClick={() => updateCart("updateItemQuantity", { productId: product.productId, quantity: _quantity + 1, old_quantity: _quantity, sku_id: selected_sku?.sku_id })}>
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                        <div className="float-md-end">
                            <button class="btn btn-light border icon-hover-primary"><i class="fas fa-heart fa-lg text-secondary"></i></button>
                            <button onClick={() => updateCart('deleteItem', { productId: product.productId, sku_id: selected_sku?.sku_id })} class="btn btn-light border text-danger icon-hover-danger">Xóa</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

}
