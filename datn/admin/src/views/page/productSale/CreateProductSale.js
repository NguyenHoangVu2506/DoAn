import React, { useEffect, useState } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CFormTextarea,
    CRow,
    CCardFooter,
    CFormSwitch 
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { DiscountStore } from '../../../store/actions/discount-actions';
import 'react-datepicker/dist/react-datepicker.css';
import { onAllProduct, uploadSingleImage } from '../../../store/actions';
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { onCreateSpecialOffer } from '../../../store/actions/special-actions';
const capitalize = (str) => {
    if (typeof str !== 'string') {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const CreateProductSale = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch()


    const defaultValues = {
        special_offer_name: "",
        special_offer_description: "",
        special_offer_image: "",
        special_offer_start_date: "",
        special_offer_end_date: "",
        special_offer_is_active: true,
        special_offer_spu_list: [],
        selected_products: [],
    };

    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: defaultValues,
    });

    /////product Options
    useEffect(() => {
        fetchProductOptions()
    }, []);

    const [productOptions, setProductOptions] = useState([])
    const [products_management, setProducts_management] = useState([])

    const fetchProductOptions = async () => {
        const reposProd = await dispatch(onAllProduct({ sort: 'ctime' }))
        reposProd && setProductOptions(reposProd?.payload?.metaData?.map((prod) => { return { label: prod.product_name, value: prod._id } }))
        reposProd && setProducts_management(reposProd?.payload?.metaData)
    }
    /////product Options????

    const startDate = watch("special_offer_start_date");
    const endDate = watch("special_offer_end_date");
    //watch if product_ids has some changes
    const selected_products = watch("selected_products");
    const product_ids = watch("special_offer_spu_list");
    useEffect(() => {
        const fetchSKU = selected_products.map((item) => {
            const productInfo = products_management.find(
                (product) => product._id === item.value
            );

            const updatedSKU = productInfo?.sku_list
                ?.filter((sku) => sku.product_id === item.value)
                ?.map((foundSKU) => {

                    let optionsString = ""
                    productInfo.product_variations?.forEach((variation, index) => {
                        if (productInfo.product_variations?.length === index + 1) {
                            optionsString += `${variation?.options[foundSKU.sku_tier_idx[index]]}`
                            return
                        }
                        optionsString += `${variation?.options[foundSKU.sku_tier_idx[index]]}, `
                        return
                    })

                    return {
                        sku_id: foundSKU._id,
                        sku_name: capitalize(optionsString),
                        sku_tier_idx: foundSKU.sku_tier_idx,
                        original_price: foundSKU.sku_price,
                        sku_stock: foundSKU.sku_stock,
                        price_sale: foundSKU.sku_price,
                        percentage: 0,
                        quantity: 0,
                        quantity_sold: 0,
                        is_active: false,
                    };
                });
            return {
                product_id: productInfo._id,
                product_name: productInfo.product_name,
                product_thumb: productInfo.product_thumb,
                product_stock: productInfo.product_quantity,
                original_price: productInfo.product_price,
                is_Apply_To_ALl: false,
                price_sale: productInfo.product_price,
                percentage: 0,
                quantity: 0,
                quantity_sold: 0,
                is_active: false,
                sku_list: updatedSKU,
            };
        });

        setValue("special_offer_spu_list", fetchSKU);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected_products]);


    const [isDisablePriceApplyToAll, setIsDisablePriceApplyToAll] = useState(true)

    const handleChangeSpuData = (e, productID, SKU_ID, name) => {
        e.preventDefault();

        const productIndex = product_ids?.findIndex(
            (item) => item.product_id === productID
        );
        const updatedProducts = product_ids?.slice();

        if (SKU_ID) {
            const skuIndex = product_ids[productIndex]?.sku_list?.findIndex(
                (item) => item.sku_id === SKU_ID
            );

            if (name === "price_sale") {
                updatedProducts[productIndex].sku_list[skuIndex].price_sale = parseInt(
                    e.target.value
                )
                    ? parseInt(e.target.value)
                    : "";
                updatedProducts[productIndex].sku_list[skuIndex].percentage = parseInt(
                    e.target.value
                )
                    ? ((updatedProducts[productIndex].sku_list[skuIndex].original_price -
                        parseInt(e.target.value)) /
                        updatedProducts[productIndex].sku_list[skuIndex].original_price) *
                    100
                    : "";
            }

            if (name === "percentage") {
                updatedProducts[productIndex].sku_list[skuIndex].percentage = parseInt(
                    e.target.value
                )
                    ? parseInt(e.target.value)
                    : "";
                updatedProducts[productIndex].sku_list[skuIndex].price_sale = parseInt(
                    e.target.value
                )
                    ? updatedProducts[productIndex].sku_list[skuIndex].original_price -
                    updatedProducts[productIndex].sku_list[skuIndex].original_price *
                    (parseInt(e.target.value) / 100)
                    : "";
            }
            if (name === "quantity") {
                updatedProducts[productIndex].sku_list[skuIndex].quantity = parseInt(
                    e.target.value
                )
                    ? parseInt(e.target.value)
                    : "";
                if (
                    updatedProducts[productIndex].sku_list[skuIndex].quantity >
                    updatedProducts[productIndex].sku_list[skuIndex].sku_stock
                ) {
                    updatedProducts[productIndex].sku_list[skuIndex].quantity =
                        updatedProducts[productIndex].sku_list[skuIndex].sku_stock;
                }
            }
        }
        if (!SKU_ID) {
            if (name === "price_sale") {

                const priceToAll = parseInt(
                    e.target.value
                )
                    ? parseInt(e.target.value)
                    : ""
                const percentageToAll = parseInt(
                    e.target.value
                )
                    ? ((updatedProducts[productIndex].original_price -
                        parseInt(e.target.value)) /
                        updatedProducts[productIndex].original_price) *
                    100
                    : ""
                updatedProducts[productIndex].price_sale = priceToAll
                updatedProducts[productIndex].percentage = percentageToAll
                const sku_list = updatedProducts[productIndex]?.sku_list
                if (sku_list.length > 0) {
                    for (let i = 0; i < sku_list?.length; i++) {
                        updatedProducts[productIndex].sku_list[i].price_sale = priceToAll
                        updatedProducts[productIndex].sku_list[i].percentage = percentageToAll
                    }
                }
            }

            if (name === "percentage") {
                const priceToAll = parseInt(
                    e.target.value
                )
                    ? updatedProducts[productIndex].original_price -
                    updatedProducts[productIndex].original_price *
                    (parseInt(e.target.value) / 100)
                    : ""
                const percentageToAll = parseInt(
                    e.target.value
                )
                    ? parseInt(e.target.value)
                    : ""

                updatedProducts[productIndex].price_sale = priceToAll
                updatedProducts[productIndex].percentage = percentageToAll
                const sku_list = updatedProducts[productIndex]?.sku_list
                if (sku_list.length > 0) {
                    for (let i = 0; i < sku_list?.length; i++) {
                        updatedProducts[productIndex].sku_list[i].price_sale = priceToAll
                        updatedProducts[productIndex].sku_list[i].percentage = percentageToAll
                    }
                }
            }
            if (name === "quantity") {
                const quantityApplyToAll = parseInt(
                    e.target.value
                )
                    ? parseInt(e.target.value)
                    : "";

                updatedProducts[productIndex].quantity = quantityApplyToAll
                if (
                    updatedProducts[productIndex].quantity >
                    updatedProducts[productIndex].product_stock
                ) {
                    updatedProducts[productIndex].quantity =
                        updatedProducts[productIndex].product_stock;

                    const sku_list = updatedProducts[productIndex]?.sku_list
                    if (sku_list.length > 0) {
                        for (let i = 0; i < sku_list?.length; i++) {
                            updatedProducts[productIndex].sku_list[i].quantity = updatedProducts[productIndex].product_stock
                        }
                    }
                } else {
                    const sku_list = updatedProducts[productIndex]?.sku_list
                    if (sku_list.length > 0) {
                        for (let i = 0; i < sku_list?.length; i++) {
                            updatedProducts[productIndex].sku_list[i].quantity = quantityApplyToAll
                        }
                    }
                }
            }
        }
        setValue("special_offer_spu_list", updatedProducts);
    };

    const handleToggleActive = (change, checked_value, productID, SKU_ID) => {
        const productIndex = product_ids?.findIndex(
            (item) => item.product_id === productID
        );
        const updatedProducts = product_ids?.slice();
        if (SKU_ID) {
            const skuIndex = product_ids[productIndex]?.sku_list?.findIndex(
                (item) => item.sku_id === SKU_ID
            );

            updatedProducts[productIndex].sku_list[skuIndex].is_active =
                checked_value;

            updatedProducts[productIndex].sku_list[skuIndex].quantity =
                updatedProducts[productIndex].sku_list[skuIndex].sku_stock;

            updatedProducts[productIndex].sku_list[skuIndex].price_sale =
                updatedProducts[productIndex].sku_list[skuIndex].original_price;

            updatedProducts[productIndex].sku_list[skuIndex].percentage = 0;
        }
        if (!SKU_ID) {
            updatedProducts[productIndex].is_active = checked_value;
            updatedProducts[productIndex].quantity =
                updatedProducts[productIndex].product_stock;
            updatedProducts[productIndex].price_sale =
                updatedProducts[productIndex].original_price;
            updatedProducts[productIndex].percentage = 0;
        }
        setValue("special_offer_spu_list", updatedProducts);
    };

    const removeProductFromList = (e, productID) => {
        e.preventDefault();
        const productIndex = product_ids?.findIndex(
            (item) => item.product_id === productID
        );

        const updatedProducts = product_ids?.slice();

        updatedProducts.splice(productIndex, 1);

        setValue("special_offer_spu_list", updatedProducts);
        setValue(
            "selected_products",
            selected_products?.filter((item) => item.value !== productID)
        );
    };

    // const upLoadImageSingle = async (formData) => {
    //     try {
    //         const response = await dispatch(uploadSingleImage(formData));
    //         return response?.payload?.metaData?.thumb_url;
    //     } catch (error) {
    //         console.error("Error uploading image:", error);
    //         return null;
    //     }
    // };
          

    const onSubmit = async (data) => {
        const { special_offer_image, special_offer_start_date, special_offer_end_date, special_offer_spu_list, special_offer_is_active, special_offer_name, special_offer_description } = data;
    
        const formData = {
            name:special_offer_name,
            description:special_offer_description,
            image: special_offer_image ? special_offer_image[0] : null,
            start_date: special_offer_start_date.getTime(),
            end_date: special_offer_end_date.getTime(),
            spu_list:special_offer_spu_list,
            is_active:special_offer_is_active,
        };
    
        // Validate input fields
        if (!special_offer_name) {
            toast.error("Tên ưu đãi đặc biệt là bắt buộc");
            return;
        }
    
        if (!special_offer_start_date || !special_offer_end_date) {
            toast.error("Ngày bắt đầu và ngày kết thúc là bắt buộc");
            return;
        }
    
        if (special_offer_spu_list.length === 0) {
            toast.error("Danh sách sản phẩm không được để trống");
            return;
        }
    
        let image_url = null;
        // if (special_offer_image) {
        //     image_url = await upLoadImageSingle(special_offer_image, "specialOffer");
        //     if (!image_url) {
        //         toast.error("Có lỗi xảy ra khi tải lên hình ảnh");
        //         return;
        //     }
        // }
    
        const sendRequest = await dispatch(onCreateSpecialOffer({
            ...formData,
            special_offer_image: [],
        }));
    
        if (sendRequest) {
            toast.success("Tạo ưu đãi đặc biệt thành công");
            navigate('/productsale/productsalelist');
        }
    };
    

    const handlePublish = async (data) => {
        onSubmit(data);
    };

    const handleSaveDraft = async (data) => {
        onSubmit({ ...data, special_offer_is_active: false });
    };

    return (
        <CRow>
            <CCol xs={12}>
                <CForm onSubmit={handleSubmit(handlePublish)}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Tạo ưu đãi đặc biệt</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="special_offer_name" className="col-sm-2 col-form-label">
                                    Tên ưu đãi đặc biệt
                                </CFormLabel>
                                <CCol sm={10}>
                                    <CFormInput
                                        type="text"
                                        id="special_offer_name"
                                        {...register("special_offer_name", { required: "Tên ưu đãi đặc biệt là bắt buộc" })}
                                    />
                                    {errors.special_offer_name && (
                                        <span className="text-danger">{errors.special_offer_name.message}</span>
                                    )}
                                </CCol>
                            </CRow>

                            <CRow className="mb-3">
                                <CFormLabel htmlFor="special_offer_description" className="col-sm-2 col-form-label">
                                    Mô tả ưu đãi
                                </CFormLabel>
                                <CCol sm={10}>
                                    <CFormTextarea
                                        id="special_offer_description"
                                        rows="3"
                                        {...register("special_offer_description")}
                                    ></CFormTextarea>
                                </CCol>
                            </CRow>

                            {/* <CRow className="mb-3">
                                <CFormLabel htmlFor="special_offer_image" className="col-sm-2 col-form-label">
                                    Hình ảnh ưu đãi
                                </CFormLabel>
                                <CCol sm={10}>
                                    <CFormInput
                                        type="file"
                                        id="special_offer_image"
                                        {...register("special_offer_image", { required: "Hình ảnh ưu đãi là bắt buộc" })}
                                    />
                                    {errors.special_offer_image && (
                                        <span className="text-danger">{errors.special_offer_image.message}</span>
                                    )}
                                </CCol>
                            </CRow> */}

                            <CRow className="mb-3">
                                <CFormLabel htmlFor="special_offer_start_date" className="col-sm-2 col-form-label">
                                    Ngày bắt đầu
                                </CFormLabel>
                                <CCol sm={4}>
                                    <DatePicker
                                        id="special_offer_start_date"
                                        selected={startDate}
                                        onChange={(date) => setValue("special_offer_start_date", date)}
                                        dateFormat="dd/MM/yyyy"
                                        className="form-control"
                                    />
                                </CCol>

                                <CFormLabel htmlFor="special_offer_end_date" className="col-sm-2 col-form-label">
                                    Ngày kết thúc
                                </CFormLabel>
                                <CCol sm={4}>
                                    <DatePicker
                                        id="special_offer_end_date"
                                        selected={endDate}
                                        onChange={(date) => setValue("special_offer_end_date", date)}
                                        dateFormat="dd/MM/yyyy"
                                        className="form-control"
                                    />
                                </CCol>
                            </CRow>

                            <CRow className="mb-3">
                                <CFormLabel htmlFor="selected_products" className="col-sm-2 col-form-label">
                                    Chọn sản phẩm
                                </CFormLabel>
                                <CCol sm={10}>
                                    <Select
                                        id="selected_products"
                                        isMulti
                                        options={productOptions}
                                        value={selected_products}
                                        onChange={(selectedOptions) => setValue("selected_products", selectedOptions)}
                                    />
                                </CCol>
                            </CRow>

                            {product_ids?.map((product, index) => (
                                <div key={index} className="border rounded mb-3 p-3">
                                    <CRow>
                                        <CCol sm={6}>
                                            <h5>{product.product_name}</h5>
                                            <img src={product.product_thumb} alt={product.product_name} width="100" />
                                        </CCol>
                                        <CCol sm={6} className="text-end">
                                            <CButton color="danger" onClick={(e) => removeProductFromList(e, product.product_id)}>
                                                Xóa
                                            </CButton>
                                        </CCol>
                                    </CRow>

                                    <CRow className="mt-3">
                                        <CCol sm={6}>
                                            <CFormLabel htmlFor={`price_sale_${product.product_id}`}>Giá bán</CFormLabel>
                                            <CFormInput
                                                type="number"
                                                id={`price_sale_${product.product_id}`}
                                                value={product.price_sale}
                                                onChange={(e) => handleChangeSpuData(e, product.product_id, null, "price_sale")}
                                            />
                                        </CCol>

                                        <CCol sm={6}>
                                            <CFormLabel htmlFor={`percentage_${product.product_id}`}>Phần trăm</CFormLabel>
                                            <CFormInput
                                                type="number"
                                                id={`percentage_${product.product_id}`}
                                                value={product.percentage}
                                                onChange={(e) => handleChangeSpuData(e, product.product_id, null, "percentage")}
                                            />
                                        </CCol>
                                    </CRow>

                                    <CRow className="mt-3">
                                        <CCol sm={6}>
                                            <CFormLabel htmlFor={`quantity_${product.product_id}`}>Số lượng</CFormLabel>
                                            <CFormInput
                                                type="number"
                                                id={`quantity_${product.product_id}`}
                                                value={product.quantity}
                                                onChange={(e) => handleChangeSpuData(e, product.product_id, null, "quantity")}
                                            />
                                        </CCol>

                                        {/* <CCol sm={6}>
                                            <CFormLabel htmlFor={`is_active_${product.product_id}`}>Kích hoạt</CFormLabel>
                                            <CFormSwitch
                                                id={`formSwitchCheckDefault-${product.product_id}`}
                                                checked={product.is_active}
                                                onChange={() => handleToggleActive(product.product_id, !product.is_active)}
                                            />
                                        </CCol> */}
                                    </CRow>

                                    {product.sku_list?.map((sku, skuIndex) => (
                                        <div key={skuIndex} className="border rounded mt-3 p-3">
                                            <CRow>
                                                <CCol sm={6}>
                                                    <h6>{sku.sku_name}</h6>
                                                </CCol>
                                                <CCol sm={6} className="text-end">
                                                    <CFormLabel htmlFor={`sku_is_active_${sku.sku_id}`}>Kích hoạt</CFormLabel>
                                                    <CFormSwitch
                                                        id={`formSwitchCheckDefault-${product.product_id}`}
                                                        checked={product.is_active}
                                                        onChange={() => handleToggleActive(product.product_id, !product.is_active)}
                                                    />
                                                </CCol>
                                            </CRow>

                                            <CRow className="mt-3">
                                                <CCol sm={4}>
                                                    <CFormLabel htmlFor={`sku_price_sale_${sku.sku_id}`}>Giá bán</CFormLabel>
                                                    <CFormInput
                                                        type="number"
                                                        id={`sku_price_sale_${sku.sku_id}`}
                                                        value={sku.price_sale}
                                                        onChange={(e) => handleChangeSpuData(e, product.product_id, sku.sku_id, "price_sale")}
                                                    />
                                                </CCol>

                                                <CCol sm={4}>
                                                    <CFormLabel htmlFor={`sku_percentage_${sku.sku_id}`}>Phần trăm</CFormLabel>
                                                    <CFormInput
                                                        type="number"
                                                        id={`sku_percentage_${sku.sku_id}`}
                                                        value={sku.percentage}
                                                        onChange={(e) => handleChangeSpuData(e, product.product_id, sku.sku_id, "percentage")}
                                                    />
                                                </CCol>

                                                <CCol sm={4}>
                                                    <CFormLabel htmlFor={`sku_quantity_${sku.sku_id}`}>Số lượng</CFormLabel>
                                                    <CFormInput
                                                        type="number"
                                                        id={`sku_quantity_${sku.sku_id}`}
                                                        value={sku.quantity}
                                                        onChange={(e) => handleChangeSpuData(e, product.product_id, sku.sku_id, "quantity")}
                                                    />
                                                </CCol>
                                            </CRow>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </CCardBody>
                        <CCardFooter>
                            <CButton type="submit" color="primary">Lưu &amp; Kích hoạt</CButton>
                            <CButton type="button" color="secondary" className="ml-2" onClick={handleSubmit(handleSaveDraft)}>Lưu nháp</CButton>
                        </CCardFooter>
                    </CCard>
                </CForm>
            </CCol>
        </CRow>
    );
};

export default CreateProductSale;
