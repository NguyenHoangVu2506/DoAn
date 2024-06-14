import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CButton } from '@coreui/react';
import { cilPencil, cilPlus, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { getListBrand } from '../../../store/actions';

function BrandList() {
    const dispatch = useDispatch();
    const { allBrand } = useSelector((state) => state.brandReducer);

    useEffect(() => {
        if (!allBrand) {
            dispatch(getListBrand({ sort: 'ctime' }));
        }
    }, [dispatch, allBrand]);

    return (
        <div className="admin content-wrapper">
            
            <section className="content">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                
                                <div className="d-grid gap-2 d-md-flex justify-content-md-begin">
                                    <Link to='/brand/createbrand'>
                                        <CButton color="primary" variant="outline" className="me-md-2">
                                            <CIcon icon={cilPlus} title="Store menu" />
                                            Thêm thương hiệu
                                        </CButton>
                                    </Link>
                                    <Link to='/menu/createmenu'>
                                        <CButton color="danger" variant="outline" className="me-md-2">
                                            <CIcon icon={cilTrash} title="Store menu" /> Thùng rác
                                        </CButton>
                                    </Link>
                                </div>
                                <hr />
                                <table className="table ">
                                    <thead>
                                        <tr>
                                            <th className="text-left" style={{ width: "130px" }}>Logo</th>
                                            <th className="text-left"  style={{ width: "220px" }}>Tên thương hiệu</th>
                                            <th className="text-left"  style={{ width: "130px" }}>Mô tả</th>
                                            <th className="text-left"  style={{ width: "150px" }}>Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(allBrand) && allBrand.map((item, index) => (
                                            <tr className="datarow" key={index}>
                                                <td className="text-left" >
                                                    <img src={item.brand_image} alt={item.brand_name} style={{ width: "70px" }} />
                                                </td>
                                                <td className="text-left" >
                                                    <div className="name">{item.brand_name}</div>
                                                </td>
                                                <td className="text-left" >{item.brand_description}</td>
                                                <td className="text-left" >
                                                    <div className="function_style">
                                                        <Link to={`/brand/updatebrand/${item._id}`} className="btn btn-sm">
                                                        <CIcon icon={cilPencil} title="Store menu" /> Chỉnh sửa
                                                        </Link> |
                                                        <button className="btn btn-sm">
                                                            <CIcon icon={cilTrash} title="Delete" /> Xoá
                                                        </button>
                                                    </div>
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

export default BrandList;
