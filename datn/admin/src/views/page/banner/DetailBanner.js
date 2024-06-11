import { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import apiBanner from "../../../service/apiBanner";
import { imageURL } from "../../../config";

function DetailBanner() {

    const {id} = useParams();
    const [banner , setBanner] = useState({});

    useEffect(() => {
        apiBanner.getOne(id).then((res) => {
            try {
                setBanner(res.data);
            } catch (e) {
                console.log(e);
            }
        })
    }, [id]);

    const getStatusDescription = (status) => {
        switch(status) {
            case 0:
                return "Đang xóa tạm";
            case 1:
                return "Hiện thị";
            case 2:
                return "Ẩn";
            default:
                return "Unknown";
        }
    }

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <h1 className="d-inline">Chi tiết banner</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="card">
                    <div className="card-header text-right">
                        <Link to="/banner/bannerlist" className="btn btn-sm btn-info">
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
                                    <td>{banner.id}</td>
                                </tr>
                                
                                <tr>
                                    <th>Hình ảnh</th>
                                    <td><img style={{width:"250px"}} src={imageURL + banner.image} alt={banner.name} /></td>
                                </tr>
                                <tr>
                                    <th>Tên banner</th>
                                    <td>{banner.name}</td>
                                </tr>
                                <tr>
                                    <th>Mô tả </th>
                                    <td>{banner.description}</td>
                                </tr>                                
                                <tr>
                                    <th>Vị trí</th>
                                    <td>{banner.position}</td>
                                </tr>
                                <tr>
                                    <th>Trạng thái</th>
                                    <td>{getStatusDescription(banner.status)}</td>
                                </tr>
                                <tr>
                                    <th>Ngày thêm</th>
                                    <td>{banner.created_at ? new Date(banner.created_at).toLocaleString() : ''}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default DetailBanner;
