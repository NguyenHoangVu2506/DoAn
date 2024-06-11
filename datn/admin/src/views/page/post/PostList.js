import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CButton } from '@coreui/react';
import { cilTrash, cilPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { getListBlog, getTopic } from '../../../store/actions';

function PostList() {
    const dispatch = useDispatch();
    const { allBlog } = useSelector((state) => state.blogReducer);
    const { allTopic } = useSelector((state) => state.topicReducer);

    useEffect(() => {
        if (!allBlog) {
            dispatch(getListBlog({ sort: 'ctime' }));
        }
    }, [dispatch, allBlog]);

    useEffect(() => {
        if (!allTopic) {
            dispatch(getTopic({ sort: 'ctime' }));
        }
    }, [dispatch, allTopic]);

    const getTopicName = (topicId) => {
        if (!allTopic) return ''; // Kiểm tra nếu mảng allTopic không tồn tại
        const topic = allTopic.find((topic) => topic._id === topicId);
        return topic ? topic.topic_name : '';
    };
    return (
        <div className="admin content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <h1 className="d-inline">Danh sách Chủ đề</h1>
                        </div>
                        <div className="col-sm-1 mt-2 text-right">
                            <Link className="action-btn" to="/category/list-trash" style={{ color: 'red' }}>
                                <CIcon icon={cilTrash} title="Download file" />
                                <sup className="count ms-1">5</sup>
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
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <Link to="/post/createpost">
                                        <CButton color="primary" className="me-md-2">
                                            <CIcon icon={cilPlus} title="Download file" />
                                            Thêm bài viết
                                        </CButton>
                                    </Link>
                                </div>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ width: '30px' }}></th>
                                            <th className="text-center" style={{ width: '30px' }}>Id</th>
                                            <th className="text-center" style={{ width: '30px' }}>Hình ảnh</th>
                                            <th style={{ width: '220px' }}>Tên bài viết</th>
                                            <th className="text-center" style={{ width: '130px' }}>Chủ đề</th>
                                            <th className="text-center" style={{ width: '130px' }}>Ngày tạo</th>
                                            <th className="text-center" style={{ width: '150px' }}>Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allBlog && allBlog.map((blog, index) => (
                                            <tr className="datarow" key={index}>
                                                <td><input type="checkbox" /></td>
                                                <td>{blog._id}</td>
                                                <td>
                                                <img src={blog.blog_image} alt={blog.blog_name} style={{ width: "70px" }} />

                                                    </td> {/* Thêm hình ảnh ở đây */}
                                                <td><div className="name">{blog.blog_name}</div></td>
                                                <td>{getTopicName(blog.topic_id)}</td> {/* Sử dụng hàm để lấy tên topic */}
                                                <td>{blog.createdAt}</td>
                                                <td>
                                                    <div className="function_style">
                                                        <Link to="" className="btn btn-sm">
                                                            <i className="fa fa-edit me-1"></i>Chỉnh sửa
                                                        </Link> |
                                                        <Link to={`/post/${blog.blog_slug}-${blog._id}`} className="btn btn-sm">
                                                            <i className="fa fa-eye me-1"></i>Chi tiết
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

export default PostList;
