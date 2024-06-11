import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiProduct from "../../../service/apiProduct";
import accounting from "accounting";
import { imageURL } from "../../../config";

function ListTrashProduct() {
    const [products, setProducts] = useState([]);

    const page = parseInt(useParams().page);
    const limit = parseInt(useParams().limit);

    const [pages, setPages] = useState(1);

    const [qty_data, setQtyData] = useState(0);

    const [tamp, setTamp] = useState();
    useEffect(() => {
        apiProduct.getListTrash(page, limit).then((res) => {
            try {
                const data = res.data;
                console.log(data);

                const numberOfPages = res.meta.pagination.pageCount;
                setPages(numberOfPages);
                const productData = res.data.map((item, index) => {
                    return {
                        id: item.id,
                        name: item.product_name,
                        price: item.price,
                        image: item.image,
                        brand_id: item.product_brand,
                        category_id: item.product_cat,
                        nameCat: item.nameCat,
                        nameBrand: item.nameBrand,
                        status: item.status,
                    }
                }
                )
                setProducts(productData);
                setQtyData(res.meta.pagination.total);


            } catch (e) {
                console.log(e);
            }
            setTamp();
        })
    }, [tamp, page])

    function rescoverTrash(id) {
        apiProduct.rescoverTrash(id).then(function (result) {
            alert(result.data.message);
            setTamp(id)

        })
    }

    function deleteProduct(id) {
        apiProduct.deleteProduct(id).then(function (result) {
            if (result.data.success === 'true') {
                alert(result.data.message);
                setTamp(id)
            }
            else {
                alert('Xóa sản phẩm không thành công !. Hãy thử lại sau.')
            }

        })
    }


    if (products.length !== 0) {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-10">
                                <h1 className="d-inline">Thùng rác</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="card">
                        <div className="card-header text-right">
                            <Link to="/product/productlist/1/10" className="btn btn-sm btn-info">
                                <i className="fa fa-reply me-1" aria-hidden="true"></i>
                                Quay lại
                            </Link>
                        </div>
                        <div className="card-body">
                            <div className="row">

                                <div className="col-md-12">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th className="text-center" style={{ width: "30px" }}>
                                                    <input type="checkbox" />
                                                </th>
                                                <th>Id</th>
                                                <th className="text-center" style={{ width: "130px" }}>Hình ảnh</th>
                                                <th>Tên sản phẩm</th>
                                                <th>Danh mục</th>
                                                <th>Giá tiền</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((item, index) => {
                                                 const imageArray = item.image.split(',');
                                                return (
                                                    <tr className="datarow" key={index}>
                                                        <td>
                                                            <input type="checkbox" />
                                                        </td>
                                                        <td>{item.id}</td>
                                                        <td>
                                                        <img
                                                            src={imageURL + imageArray[0].trim()}
                                                            alt={`product_${index}`}
                                                            style={{ width: "70px", marginRight: "5px" }}
                                                        />    
                                                        </td>
                                                        <td>
                                                            <div className="name">
                                                                {item.name}
                                                            </div>
                                                            <div className="function_style" style={{ fontSize: "14px" }}>
                                                                <Link to={`/admin/list-brands/show/${item.id}`} className="btn btn-sm"><i className="fa fa-eye me-1"></i>Chi tiết</Link> |
                                                                <button onClick={() => rescoverTrash(item.id)} className="btn btn-sm"><i className="fa fa-history me-1" aria-hidden="true"></i>Phục hồi</button>
                                                                <button onClick={() => deleteProduct(item.id)} className="btn btn-sm"><i className="fa fa-trash me-1"></i>Xoá</button>
                                                            </div>
                                                        </td>
                                                        <td>{item.nameCat}</td>
                                                        <td>{accounting.formatNumber(item.price, 0, ".", ",")} <span class="text-muted">đ</span></td>

                                                    </tr>

                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        );
    }
    else {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-10">
                                <h1 className="d-inline">Thùng rác</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="card">
                        <div className="card-header text-right">
                            <Link to="/product/productlist/1/10" className="btn btn-sm btn-info">
                                <i className="fa fa-reply me-1" aria-hidden="true"></i>
                                Quay lại
                            </Link>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <p>Hiện tại không có rác !</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        );

    }

}

export default ListTrashProduct;