import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiProduct from "../../../service/apiProduct";
import { imageURL } from "../../../config";
import accounting from "accounting";

function ProductShow() {

    const { id } = useParams();
    const [data, setData] = useState([]);

    const [status, setStatus] = useState('Ẩn');

    useEffect(() => {
        apiProduct.getProductById(id).then((res) => {
            try {
                setData(res.data);
                if (res.data.status === 1) {
                    setStatus('Hiển thị');
                }
            } catch (e) {
                console.log(e);
            }
        })
    }, [])

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <h1 className="d-inline">Chi tiết sản phẩm</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="card">
                    <div className="card-header text-right">
                        <Link to="/admin/list-products/1/10" className="btn btn-sm btn-info">
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
                                    <th>Hình ảnh</th>
                                    <td>
                                        <img src={imageURL + '/images/product/' + data.image} alt="category.jpg" style={{ width: "70px" }} />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <td>{data.name}</td>
                                </tr>
                                <tr>
                                    <th>Thương hiệu</th>
                                    <td>{data.nameBrand}</td>
                                </tr>
                                <tr>
                                    <th>Danh mục</th>
                                    <td>{data.nameCat}</td>
                                </tr>
                                <tr>
                                    <th>Slug</th>
                                    <td>{data.slug}</td>
                                </tr>
                                <tr>
                                    <th>Giá</th>
                                    <td>{accounting.formatNumber(data.price, 0, ".", ",")} <span class="text-muted">đ</span></td>
                                </tr>
                                <tr>
                                    <th >Chi tiết sản phẩm</th>
                                    <td>{data.detail}</td>
                                </tr>

                                <tr>
                                    <th>Trạng thái</th>
                                    <td>{status}</td>
                                </tr>
                                <tr>
                                    <th>Ngày thêm</th>
                                    <td>{data.created_at}</td>
                                </tr>
                                <tr>
                                    <th>Ngày cập nhật</th>
                                    <td>{data.updated_at}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <br></br>
                    <br></br>
                </div>
            </section>
        </div>

    );
}

export default ProductShow;