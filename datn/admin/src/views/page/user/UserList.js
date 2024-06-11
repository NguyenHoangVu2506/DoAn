import React from 'react';
import { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaRegPlusSquare, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CButton } from '@coreui/react';
import UserService from '../../../service/userservice';
function UserList() {
    const navigate = useNavigate();
    // const [countTrash, setCountTrash] = useState(0);
    // const [countCat, setCountCat] = useState(0);

    const [users, setUsers] = useState([]);
    // const [statusdel, setStatusDel] = useState(0);
    useEffect(() => {
        UserService.getAll('user').then((res) => {
            try {
                console.log(res);
                const data = res.data;
                const userData = data.map((item) => {
                    // if(item.status === 2){
                    //     setNameButton('Hien')
                    // }
                    return {
                        id: item.id,
                        name: item.name,
                        phone: item.phone,
                        gender: item.gender,
                        image: item.image,
                        status: item.status,
                    }
                });
                setUsers(userData);
                // setQtyCat(res.qty_categories);
                // setQtyTrash(res.qtyuserData_trash);
                console.log(userData);
            } catch (e) {
                console.log(e);
            }
        })
    }, [])
    // function catTrash(id) {
    //     categoryservice.deleteTrash(id).then(function (result) {
    //         alert(result.data.message);
    //         setStatusDel(id);
    //     })
    // }
    return (
        <div className=" admin content-wrapper">
            {console.log(users)}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <h1 className="d-inline">Danh sách Khách hàng</h1>
                        </div>
                        <div className="col-sm-1 mt-2 text-right">
                            <Link className="action-btn" to="/admin/category/trash" style={{ color: "red" }}>
                                <i className="fa fa-trash" aria-hidden="true"></i>
                                {/* <sup className="count ms-1">{countTrash}</sup> */}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>

                                            <th className="text-center" style={{ width: "30px" }}>
                                                {/* <input type="checkbox" /> */}
                                            </th>
                                            <th className="text-center" style={{ width: "30px" }}>Id</th>
                                            <th className="text-center" style={{ width: "130px" }}>Avatar</th>
                                            <th style={{ width: "220px" }}>Tên khách hàng</th>
                                            <th className="text-center" style={{ width: "130px" }}>Số điện thoại</th>

                                            <th className="text-center" style={{ width: "150px" }}>Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((item, index) => {
                                            return (
                                                <tr className="datarow" key={index}>
                                                    <td>
                                                        <input type="checkbox" />
                                                    </td>
                                                    <td>{item.id}</td>
                                                    <td>
                                                        <img src="../public/images/category.jpg" alt="category.jpg" />
                                                    </td>
                                                    <td>
                                                        <div className="name">
                                                            {item.name}
                                                        </div>
                                                    </td>
                                                    <td>{item.phone}</td>
                                                    <td>
                                                        <div className="function_style">
                                                            <Link to={`/category/updatecategory/${item.id}`} className="btn btn-sm"><i className="fa fa-edit me-1" ></i>Chỉnh sửa</Link> |
                                                            <Link to={`/category/detailcategory/${item.id}`} className="btn btn-sm"><i className="fa fa-eye me-1"></i>Chi tiết</Link> |
                                                            <button onClick={() => trashCategory(item.id)} className="btn btn-sm"><i className="fa fa-trash me-1"></i>Xoá</button>
                                                        </div>
                                                    </td>
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

export default UserList;