import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiSale from "../../../service/apiSale";
import { imageURL } from "../../../config";
import accounting from "accounting";

function ListTrashSale() {

    const [listTrash, setListTrash] = useState([]);
    const [tamp, setTamp] = useState();

    useEffect(() => {
        apiSale.getListTrash().then((res) => {
            try {
                console.log(res)
                setListTrash(res.data);
                setTamp();
            } catch (e) {
                console.log(e);
            }
        })
    }, [tamp])

    // rescover trash brand
    function rescoverTrashSale(id) {
        apiSale.rescoverTrash(id).then(function (result) {
            if (result.data !== null) {
                alert("Phục hồi thành công !");
                setTamp(result.data.id);
            }
            else {
                alert("Không tìm thấy dữ liệu !");
            }
        })
    }

    // xoa vinh vien
    const delSale = async (id) => {
        apiSale.delCatById(id).then((res) => {
            try {
                alert('Xóa dữ liệu thành công');
                setTamp(id);
            }
            catch (e) {
                console.log(e);
            }
        })
    }
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };
    console.log(listTrash)
    if (listTrash.length !== 0) {
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
                            <Link to="/productsale/productsalelist" className="btn btn-sm btn-info">
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
                                                <th>Hình ảnh</th>
                                                <th>Tên sản phẩm</th>
                                                <th>Giá sale</th>
                                                <th>Ngày bắt đầu</th>
                                                <th>Ngày kết thúc</th>


                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listTrash.map((item, index) => {
                                                const imageArray = item.product_image.split(',');

                                                return (
                                                    <tr className="datarow" key={index}>
                                                        <td>
                                                            <input type="checkbox" />
                                                        </td>
                                                        <td>{item.id}</td>
                                                        <td>
                                                            <img
                                                                src={imageURL + '/images/product/' + imageArray[0].trim()}
                                                                alt={`product_${index}`}
                                                                style={{ width: "70px", marginRight: "5px" }}
                                                            />
                                                        </td>
                                                        <td>
                                                            <div className="name">
                                                                {item.product_name}
                                                            </div>
                                                            <div className="function_style" style={{ fontSize: "14px" }}>
                                                                <Link to={`/admin/list-brands/show/${item.id}`} className="btn btn-sm"><i className="fa fa-eye me-1"></i>Chi tiết</Link> |
                                                                <button onClick={() => rescoverTrashSale(item.id)} className="btn btn-sm"><i className="fa fa-history me-1" aria-hidden="true"></i>Phục hồi</button>
                                                                <button onClick={() => delSale(item.id)} className="btn btn-sm"><i className="fa fa-trash me-1"></i>Xoá</button>
                                                            </div>
                                                        </td>
                                                        <td>{accounting.formatNumber(item.pricesale, 0, ".", ",")} <span class="text-muted">đ</span></td>
                                                        <td>{formatDate(item.date_begin)}</td>
                                                        <td>{formatDate(item.date_end)}</td>

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
                            <Link to="/productsale/productsalelist" className="btn btn-sm btn-info">
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

export default ListTrashSale;