import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiPost from "../../../service/apiPost";
import { imageURL } from "../../../config";

function ListTrashPost() {
    const { type, page, limit } = useParams(); // Lấy page và limit từ useParams

    const [listTrash, setListTrash] = useState([]);
    const [tamp, setTamp] = useState();

    useEffect(() => {
        apiPost.getListTrash(type, parseInt(page), parseInt(limit)).then((res) => {
            try {
                console.log(res);
                // Truy cập vào thuộc tính data của phản hồi
                const data = res.data;
                if (Array.isArray(data)) {
                    const postData = data.map((item) => ({
                        id: item.id,
                        title: item.title,
                        image: item.image,
                        slug: item.slug,
                        description: item.description,
                        name_topic: item.name_topic
                    }));
                    setListTrash(postData);
                } else {
                    console.error('API response data is not an array:', data);
                }
                setTamp();
            } catch (e) {
                console.log(e);
            }
        }).catch((error) => {
            console.error('Error fetching trash posts:', error);
        });
    }, [tamp, type, page, limit]);

    // Recover trash post
    function rescoverTrashCategory(id) {
        apiPost.rescoverTrash(id).then((result) => {
            if (result.data !== null) {
                alert("Phục hồi thành công !");
                // Cập nhật danh sách ngay lập tức
                setListTrash(listTrash.filter(item => item.id !== id));
            } else {
                alert("Không tìm thấy dữ liệu !");
            }
        }).catch((error) => {
            console.error('Error recovering post:', error);
        });
    }

    // Xóa vĩnh viễn
    const delCategory = async (id) => {
        apiPost.deletePost(id).then((res) => {
            try {
                alert('Xóa dữ liệu thành công');
                // Cập nhật danh sách ngay lập tức
                setListTrash(listTrash.filter(item => item.id !== id));
            } catch (e) {
                console.log(e);
            }
        }).catch((error) => {
            console.error('Error deleting post:', error);
        });
    }

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
                        <Link to="/post/postlist/news/1/10" className="btn btn-sm btn-info">
                            <i className="fa fa-reply me-1" aria-hidden="true"></i>
                            Quay lại
                        </Link>
                    </div>
                    <div className="card-body">
                        {listTrash.length !== 0 ? (
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
                                                <th>Tiêu đề</th>
                                                <th>Chủ đề</th>
                                                <th>Mô tả ngắn</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listTrash.map((item, index) => (
                                                <tr className="datarow" key={index}>
                                                    <td>
                                                        <input type="checkbox" />
                                                    </td>
                                                    <td>{item.id}</td>
                                                    <td>
                                                        <img src={imageURL + item.image} alt={item.title} />
                                                    </td>
                                                    <td>
                                                        <div className="name">
                                                            {item.title}
                                                        </div>
                                                        <div className="function_style" style={{ fontSize: "14px" }}>
                                                            <Link to={`/admin/list-brands/show/${item.id}`} className="btn btn-sm">
                                                                <i className="fa fa-eye me-1"></i>Chi tiết
                                                            </Link> |
                                                            <button onClick={() => rescoverTrashCategory(item.id)} className="btn btn-sm">
                                                                <i className="fa fa-history me-1" aria-hidden="true"></i>Phục hồi
                                                            </button>
                                                            <button onClick={() => delCategory(item.id)} className="btn btn-sm">
                                                                <i className="fa fa-trash me-1"></i>Xoá
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td>{item.name_topic}</td>
                                                    <td>{item.description}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <p>Hiện tại không có rác !</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ListTrashPost;
