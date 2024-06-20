import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogById, getBlogByTopicId, getTopic } from "../../../store/actions";
import { imageURL } from "../../../config";
import { CCard, CCardBody, CCol, CContainer, CTableRow } from "@coreui/react";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";

function DetailPost() {
    const { slug_id } = useParams();
    const blog_id = slug_id.split('-').pop();
    const { listBlogById } = useSelector((state) => state.blogReducer);
    const { onBlogByTopicId } = useSelector((state) => state.blogReducer);
    const { allTopic } = useSelector((state) => state.topicReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!listBlogById) {
            dispatch(getBlogById({ blog_id: blog_id }));
        }

        listBlogById && (!onBlogByTopicId && dispatch(getBlogByTopicId({ topic_id: listBlogById.topic_id })));
    }, [listBlogById, onBlogByTopicId]);

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
            <CContainer>

                <section className="content">
                    <CCard>
                        <div className="card-header text-right">
                            <Link to="/post/postlist" className="btn btn-sm btn-info">
                                <i className="fa fa-reply me-1" aria-hidden="true"></i>
                                Quay lại
                            </Link>
                        </div>
                        <CCardBody>
                            {listBlogById && (
                                <CTableRow>
                                    <CCol md-4>
                                        <img src={listBlogById.blog_image} alt={listBlogById.blog_name} className="img-fluid rounded" />
                                    </CCol>
                                    <CCol md-8>
                                        <h2>{listBlogById.blog_name}</h2>
                                        <p className="text-muted">{new Date(listBlogById.createdAt).toLocaleString()}</p>
                                        <h5>Chủ đề: {getTopicName(listBlogById.topic_id)}</h5>
                                        <p><strong>Mô tả ngắn:</strong> {listBlogById.blog_description}</p>
                                        <p><strong>Chi tiết:</strong> {listBlogById.blog_detail}</p>
                                    </CCol>
                                </CTableRow>
                            )}
                        </CCardBody>
                    </CCard>
                </section>
            </CContainer>
        </div>
    );
}

export default DetailPost;
