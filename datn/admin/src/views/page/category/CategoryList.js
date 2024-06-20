import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CButton } from '@coreui/react';
import { cilPencil, cilPlus, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { TrashCategory, getCategory } from '../../../store/actions';

function CategoryList() {
    const dispatch = useDispatch();
    const { listCategory } = useSelector((state) => state.categoryReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        if (!listCategory) {
            dispatch(getCategory({ sort: 'ctime' }));
        }
    }, [dispatch, listCategory]);

    const handleTrash = (categoryId) => {
        dispatch(TrashCategory({ category_id: categoryId, isDeleted: false }));
    };

    const filteredCategories = Array.isArray(listCategory) ? listCategory.filter(category => !category.isDeleted) : [];
    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
    const currentCategories = filteredCategories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="admin content-wrapper">
            <section className="content">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-begin">
                                    <Link to='/category/createcategory'>
                                        <CButton color="primary" variant="outline" className="me-md-2">
                                            <CIcon icon={cilPlus} title="Store menu" />
                                            Thêm danh mục
                                        </CButton>
                                    </Link>
                                    <Link to='/category/list-trash'>
                                        <CButton color="danger" variant="outline" className="me-md-2">
                                            <CIcon icon={cilTrash} title="Store menu" /> Thùng rác
                                        </CButton>
                                    </Link>
                                </div>
                                <hr />
                                <table className="table ">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ width: "130px" }}>Hình ảnh</th>
                                            <th style={{ width: "220px" }}>Tên danh mục</th>
                                            <th style={{ width: "220px" }}>Mô tả</th>
                                            <th className="text-center" style={{ width: "130px" }}>Danh mục cha</th>
                                            <th className="text-center" style={{ width: "150px" }}>Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentCategories.map((item, index) => (
                                            <tr className="datarow" key={index}>
                                                <td>
                                                    <img src={item.category_icon} alt={item.category_name} style={{ width: "70px" }} />
                                                </td>
                                                <td>
                                                    <div className="name">{item.category_name}</div>
                                                </td>
                                                <td>
                                                    <div className="name">{item.category_description}</div>
                                                </td>
                                                <td>
                                                    {item.parent_id ? (
                                                        <div className="name">
                                                            {filteredCategories.find(cat => cat._id === item.parent_id)?.category_name}
                                                        </div>
                                                    ) : (
                                                        <div className="name">Không có</div>
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="function_style">
                                                        <Link to={`/category/updatecategory/${item._id}`} className="btn btn-sm">
                                                            <CIcon icon={cilPencil} title="Store menu" /> Chỉnh sửa
                                                        </Link> |
                                                        <button className="btn btn-sm" onClick={() => handleTrash(item._id)}>
                                                            <CIcon icon={cilTrash} title="Delete" /> Xoá
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <ul className="pagination">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={handlePrevious}>Previous</button>
                                        </li>
                                        {Array.from({ length: totalPages }, (_, index) => (
                                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                                            </li>
                                        ))}
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={handleNext}>Next</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CategoryList;
