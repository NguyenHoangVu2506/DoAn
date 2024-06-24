import React, { useEffect, useState } from "react";
import './style.css';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBlogByTopicId, getListBlog, getTopic } from "../../../store/actions";
import PostItem from "../../../Components/blog/postItem";

function Blog() {
  const dispatch = useDispatch();
  const { allTopic } = useSelector((state) => state.topicReducer);
  const { allBlog } = useSelector((state) => state.blogReducer);
  const { onBlogByTopicId } = useSelector((state) => state.blogReducer);
  const [topic_id, setTopicId] = useState('');
  const [ratingCollapsed, setRatingCollapsed] = useState(false);

  useEffect(() => {
    if (!allBlog) {
      dispatch(getListBlog({ sort: 'ctime', filter: { isPublished: true } }));
    }
    if (!allTopic) {
      dispatch(getTopic({ filter: { isPublished: true } }));
    }
    if (topic_id && !onBlogByTopicId) {
      dispatch(getBlogByTopicId({ topic_id }));
    }
  }, [dispatch, allBlog, allTopic, onBlogByTopicId, topic_id]);

  const onChangeTopic = (topic_id) => {
    setTopicId(topic_id);
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (topic_id) {
      dispatch(getBlogByTopicId({ topic_id }));
    }
  }, [dispatch, topic_id]);

  const toggleRatingCollapse = () => {
    setRatingCollapsed(!ratingCollapsed);
  };

  return (
    <body>
      <div className="bg-" style={{ backgroundColor: '#f6831f' }} >
        <div className="container py-4">
          <nav className="d-flex">
            <h6 className="mb-0">
              <Link to="/" className="text-white">Trang chủ</Link>
              <span className="text-white-50 mx-2">/ </span>
              <Link to="/blog" className="text-white">Tin Tức</Link>
            </h6>
          </nav>
        </div>
      </div>
      <main role="main" className="container">
        <div className="card-body">
          <div className="row">
            <div className="col-md-9 blog-main py-4">
              <header className="mb-1 pt-1 pb-1">
                <h3 className="text-center text-uppercase text-dark pb-3" style={{ fontSize: '24px' }}>TẤT CẢ BÀI VIẾT</h3>
              </header>
              <div className="row">
                {topic_id !== ""
                  ? onBlogByTopicId && onBlogByTopicId
                    .filter(post => post.isPublished)
                    .map((post, index) => (
                      <PostItem blog={post} key={index} />
                    ))
                  : allBlog && allBlog
                    .filter(post => post.isPublished)
                    .map((post, index) => (
                      <PostItem blog={post} key={index} />
                    ))
                }
              </div>
            </div>
            <div className="col-md-3 blog-main py-5">
              <div className="collapse card d-lg-block" id="navbarSupportedContent">
                <div className="accordion" id="accordionPanelsStayOpenExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                      <button
                        className="accordion-button text-dark bg-light"
                        type="button"
                        onClick={toggleRatingCollapse}
                      >
                        Khám phá tin tức
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseFour"
                      className={`accordion-collapse collapse ${ratingCollapsed ? "show" : ""}`}
                      aria-labelledby="headingFour"
                    >
                      <div className="accordion-body">
                        <div className="d-flex flex-column justify-content-start">
                          {allTopic && allTopic.map((topic, index) => (
                            <div className="d-flex flex-column justify-content-start" key={index}>
                              <Link to="#" style={{ color: '#4f4f4f' }} onClick={() => onChangeTopic(topic._id)}>
                                {topic.topic_name}
                              </Link>
                              <hr />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <img
            className="rounded w-100"
            src="https://nuty.vn/Data/Sites/1/Banner/banner-01.jpg"
            style={{ objectFit: 'cover', height: "160px" }}
            alt="Banner"
          />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </body>
  );
}

export default Blog;
