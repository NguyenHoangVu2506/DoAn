import React from 'react';
import { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaRegPlusSquare, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CAvatar, CButton, CFormSwitch } from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllUser } from '../../../store/actions';
function UserList() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const { alluser } = useSelector((state) => state.userReducer);
    useEffect(() => {
        if (!alluser) {
            dispatch(GetAllUser({ sort: 'ctime' }));
        }
    }, [dispatch, alluser]);
    console.log(alluser)
    return (
        <div className="admin content-wrapper">
            <section className="content">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <table className="table ">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ width: "130px" }}>Avatar</th>
                                            <th className="text-center" style={{ width: "120px" }}>Tên khách hàng</th>
                                            <th className="text-center" style={{ width: "130px" }}>Số điện thoại</th>
                                            <th className="text-center" style={{ width: "130px" }}>Email</th>
                                            <th className="text-center" style={{ width: "50px" }}>Khóa tài khoản</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {alluser && alluser.map((item, index) => (
                                           
                                                <tr className="datarow" key={index}>
                                                    <td className="text-center">
                                                    <CAvatar src={item.user_avatar} size="lg" />
                                                    </td>
                                                    <td className="text-center">
                                                    {item.user_name}
                                                    </td>
                                                    <td className="text-center">{item.user_phone}</td>
                                                    <td className="text-center">
                                                        {item.user_email}
                                                    </td>
                                                    <td className="text-center">
                                                        <CFormSwitch 
                                                            id={`formSwitchCheckDefault-${item._id}`} 
                                                        />
                                                    </td>
                                                </tr>
                                             ))}
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