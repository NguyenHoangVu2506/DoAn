import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CButton, CFormSwitch } from '@coreui/react';
import { cilTrash, cilPlus, cilPencil, cilDescription } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { BlogPublished, BlogUnPublished, TrashBlog, getListBlog, getTopic } from '../../../store/actions';
import { toast } from "react-toastify";

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
    const handleSwitchChange = (blogId, isPublished) => {
        console.log(blogId)
        console.log(isPublished)

        if (isPublished) {
            dispatch(BlogUnPublished({ blog_id: blogId, isPublished: true }));
            toast.success("Ẩn bài viết thành công!");

        } else {
            dispatch(BlogPublished({ blog_id: blogId, isPublished: false }));
            toast.success("Hiện bài viết thành công!");

        }
    };
    const handleTrash = (blogId) => {
        dispatch(TrashBlog({ blog_id: blogId, isDeleted: false }));
        toast.success("Xóa vào thùng rác thành công!");

    };
    return (
        <div className="admin content-wrapper">
            <section className="content">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-begin">
                                    <Link to='/post/createpost'>
                                        <CButton color="primary" variant="outline" className="me-md-2">
                                            <CIcon icon={cilPlus} title="Store blog" />
                                            Thêm bài viết
                                        </CButton>
                                    </Link>
                                    <Link to='/post/list-trash'>
                                        <CButton color="danger" variant="outline" className="me-md-2">
                                            <CIcon icon={cilTrash} title="Store blog" /> Thùng rác
                                        </CButton>
                                    </Link>
                                </div>
                                <table className="table ">
                                    <thead>
                                        <tr>

                                            <th className="text-left" style={{ width: '30px' }}>Hình ảnh</th>
                                            <th style={{ width: '220px' }}>Tên bài viết</th>
                                            <th className="text-left" style={{ width: '130px' }}>Mô tả ngắn</th>
                                            <th className="text-left" style={{ width: '130px' }}>Chủ đề</th>
                                            <th className="text-left" style={{ width: '80px' }}>Ẩn/Hiện</th>
                                            <th className="text-left" style={{ width: '150px' }}>Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allBlog && allBlog.map((blog, index) => (
                                            <tr className="datarow" key={index}>

                                                <td className="text-left">
                                                    <img src={blog.blog_image[0]} alt={blog.blog_name} style={{ width: "70px" }} />

                                                </td> {/* Thêm hình ảnh ở đây */}
                                                <td><div className="text-left">{blog.blog_name}</div></td>
                                                <td><div className="text-left">{blog.blog_description}</div></td>
                                                <td className="text-left">{getTopicName(blog.topic_id)}</td>
                                                <td className="text-left">
                                                    <CFormSwitch
                                                        id={`formSwitchCheckDefault-${blog._id}`}
                                                        checked={blog.isPublished}
                                                        onChange={() => handleSwitchChange(blog._id, blog.isPublished)}
                                                    />
                                                </td>
                                                <td className="text-left">
                                                    <div className="function_style">
                                                        <Link to={`/post/updatepost/${blog._id}`} className="btn btn-sm">
                                                            <CIcon icon={cilPencil} title="Store blog" /> Chỉnh sửa
                                                        </Link> |
                                                        <Link to={`/post/${blog.blog_slug}-${blog._id}`} className="btn btn-sm">
                                                            <CIcon icon={cilDescription} title="Store blog" /> Chi tiết
                                                        </Link> |
                                                        <button className="btn btn-sm" onClick={() => handleTrash(blog._id)}>
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
