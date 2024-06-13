import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { imageURL } from "../../../config";
import { getBlogByTopicId, getBlogDetails, getTopic } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";

function DetailPost() {
    const { slug_id } = useParams()
    const blog_id = slug_id.split('-').pop()
    console.log(blog_id)
    const { blogDetails } = useSelector((state) => state.blogReducer)
    const { onBlogByTopicId } = useSelector((state) => state.blogReducer);
    const { allTopic } = useSelector((state) => state.topicReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!blogDetails) {
            dispatch(getBlogDetails({ blog_id: blog_id }))
        }

        blogDetails && (!onBlogByTopicId && dispatch(getBlogByTopicId({ topic_id: blogDetails.topic_id })))

        console.log(blogDetails)
    }, [blogDetails, onBlogByTopicId])

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
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <h1 className="d-inline">Chi tiết bài viết</h1>
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
                    <div className="card-body p-2">
                        {blogDetails && (
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th style={{ width: "30%" }}>Tên trường</th>
                                        <th>Giá trị</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>ID</th>
                                        <td>{blogDetails.post._id}</td>
                                    </tr>

                                    <tr>
                                        <th>Hình ảnh</th>
                                        <td>
                                        <img src={blogDetails.blog_image} alt={blogDetails.blog_name} style={{ width: "70px" }} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Tiêu đề bài viết</th>
                                        <td>{blogDetails.post.blog_name}</td>
                                    </tr>
                                    <tr>
                                        <th>Mô tả ngắn</th>
                                        <td>{blogDetails.post.blog_description}</td>
                                    </tr>
                                    <tr>
                                        <th>Chi tiết</th>
                                        <td>{blogDetails.post.blog_detail}</td>
                                    </tr>
                                    <tr>
                                        <th>Chủ đề</th>
                                        <td>{getTopicName(blogDetails.post.topic_id)}</td>
                                    </tr>

                                    <tr>
                                        <th>Ngày thêm</th>
                                        <td>{new Date(blogDetails.post.createdAt).toLocaleString()}</td>
                                    </tr>
                                </tbody>

                            </table>
                        )
                        }
                    </div>
                </div>
            </section>
        </div>

    );
}

export default DetailPost;
