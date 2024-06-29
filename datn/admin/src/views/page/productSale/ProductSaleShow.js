import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { imageURL } from "../../../config";
import accounting from "accounting";
import { useDispatch, useSelector } from "react-redux";
import { getSpecialById } from "../../../store/actions/special-actions";

function ProductSaleShow() {
    const { product_slug_id } = useParams();
    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const { getspecialbyid } = useSelector((state) => state.specialReducer);

    useEffect(() => {
        if (product_slug_id) {
            const special_id = product_slug_id.split('-').pop();
            if (!getspecialbyid) {
                dispatch(getSpecialById({ _id: special_id }));
            } else {
                setData(getspecialbyid); // Set data when getspecialbyid is available
            }
        }
    }, [product_slug_id, getspecialbyid, dispatch]);

    const formatDate = (dateString) => {
        // Function to format date
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US");
    };

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <h1 className="d-inline">Chi tiết chương trình giảm giá</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="card">
                    <div className="card-header text-right">
                        <Link to="/productsale/productsalelist" className="btn btn-sm btn-info">
                            <i className="fa fa-reply me-1" aria-hidden="true"></i>
                            Quay lại
                        </Link>
                    </div>
                    <div className="card-body p-2">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th style={{ width: "30%" }}>Tên trường</th>
                                    <th>Giá trị</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Tên chương trình giảm giá</th>
                                    <td>{data.special_offer_name}</td>
                                </tr>
                                <tr>
                                    <th>Mô tả</th>
                                    <td>{data.special_offer_description}</td>
                                </tr>
                                <tr>
                                    <th>Ngày bắt đầu</th>
                                    <td>{formatDate(data.special_offer_start_date)}</td>
                                </tr>
                                <tr>
                                    <th>Ngày kết thúc</th>
                                    <td>{formatDate(data.special_offer_end_date)}</td>
                                </tr>
                                <tr>
                                    <th>Trạng thái</th>
                                    <td>{data.special_offer_is_active ? "Active" : "Inactive"}</td>
                                </tr>
                                {data.special_offer_spu_list && data.special_offer_spu_list.map((product, index) => (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <th>Product Name</th>
                                            <td>{product.product_id}</td>
                                        </tr>
                                        <tr>
                                            <th>Price Sale</th>
                                            <td>{accounting.formatNumber(product.price_sale, 0, ".", ",")} <span className="text-muted">đ</span></td>
                                        </tr>
                                        <tr>
                                            <th>Percentage</th>
                                            <td>{product.percentage}%</td>
                                        </tr>
                                        <tr>
                                            <th>Quantity</th>
                                            <td>{product.quantity}</td>
                                        </tr>
                                        {product.sku_list && product.sku_list.map((sku, skuIndex) => (
                                            <React.Fragment key={skuIndex}>
                                                <tr>
                                                    <th>SKU Name</th>
                                                    <td>{sku.sku_id}</td>
                                                </tr>
                                                <tr>
                                                    <th>Price Sale</th>
                                                    <td>{accounting.formatNumber(sku.price_sale, 0, ".", ",")} <span className="text-muted">đ</span></td>
                                                </tr>
                                                <tr>
                                                    <th>Percentage</th>
                                                    <td>{sku.percentage}%</td>
                                                </tr>
                                                <tr>
                                                    <th>Quantity</th>
                                                    <td>{sku.quantity}</td>
                                                </tr>
                                            </React.Fragment>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProductSaleShow;
