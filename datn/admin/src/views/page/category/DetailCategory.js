import { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import apiCategory from "../../../service/categoryservice";

function DetailCategory() {

    const {id} = useParams();
    const [category, setCategory] = useState([]);

    useEffect(() => {
        apiCategory.getCategoryById(id).then((res) => {
            try {
            const data = res.data;
               setCategory(res.data[0]);
            } catch (e) {
                console.log(e);
            }
        })
    }, [])
    const [categorys, setCategorys] = useState([]);
    // const [statusdel, setStatusDel] = useState(0);
    useEffect(() => {
        apiCategory.getAll().then((res) => {
            try {
                console.log(res);
                const data = res.data;
                const categoryData = res.map((item) => {
                    // if(item.status === 2){
                    //     setNameButton('Hien')
                    // }
                    return {
                        id: item.id,
                        name: item.name,
                        slug: item.slug,
                        parent: item.parent_id,
                        sort_order: item.sort_order,
                        status: item.status,
                    }
                });
                setCategorys(categoryData);
                // setQtyCat(res.qty_categories);
                // setQtyTrash(res.qty_trash);
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
                            <h1 className="d-inline">Chi tiết danh mục</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="card">
                    <div className="card-header text-right">
                        <Link to="/category/categorylist" className="btn btn-sm btn-info">
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
                                    <td>{category.id}</td>
                                </tr>
                                <tr>
                                    <th>Tên danh mục</th>
                                    <td>{category.name}</td>
                                </tr>
                                <tr>
                                    <th>Slug</th>
                                    <td>{category.slug}</td>
                                </tr>
                                <tr>
                                    <th>Thứ tự</th>
                                    <td>{category.sort_order}</td>
                                </tr>
                                <tr>
                                    <th>Danh mục cha</th>
                                    <td>{category.parent_id}</td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>{category.status}</td>
                                </tr>
                                <tr>
                                    <th>Ngày thêm</th>
                                    <td>{new Date(category.created_at).toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default DetailCategory;