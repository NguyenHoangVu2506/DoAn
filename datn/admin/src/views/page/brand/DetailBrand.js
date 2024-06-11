import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiBrand from "../../../service/apiBrand";

function DetailBrand() {

    const { id } = useParams();
    const [brand, setBrand] = useState([]);

    useEffect(() => {
        apiBrand.getBrandById(id).then((res) => {
            try {
                console.log(res)
                setBrand(res.data);
            } catch (e) {
                console.log(e);
            }
        })
    }, [])
    const [brands, setBrands] = useState([]);
    // useEffect(() => {
    //     apiBrand.getAll().then((res) => {
    //         try {
    //             console.log(res);
    //             const brandData = res.map((item) => {
    //                 return {
    //                     id: item.id,
    //                     name: item.name,
    //                     slug: item.slug,
    //                     sort_order: item.sort_order,
    //                     status: item.status,
    //                 }
    //             });
    //             setBrands(brandData);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     })
    // }, [])

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <h1 className="d-inline">Chi tiết Thương hiệu</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="card">
                    <div className="card-header text-right">
                        <Link to="/brand/brandlist/1/10" className="btn btn-sm btn-info">
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
                                    <th>ID</th>
                                    <td>{brand.id}</td>
                                </tr>
                                <tr>
                                    <th>Tên danh mục</th>
                                    <td>{brand.name}</td>
                                </tr>
                                <tr>
                                    <th>Slug</th>
                                    <td>{brand.slug}</td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>{brand.status}</td>
                                </tr>
                                <tr>
                                    <th>Ngày thêm</th>
                                    <td>{new Date(brand.created_at).toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default DetailBrand;