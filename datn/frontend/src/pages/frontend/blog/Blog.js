import React, { useEffect, useState } from "react";
import './style.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBlogByTopicId, getListBlog, getTopic } from "../../../store/actions";
import PostItem from "../../../Components/blog/postItem";
function Blog() {
  const dispatch = useDispatch();
  const { allTopic } = useSelector((state) => state.topicReducer);
  const { allBlog } = useSelector((state) => state.blogReducer);
  const { onBlogByTopicId } = useSelector((state) => state.blogReducer);
  const [topic_id, setTopicId] = useState('')

  useEffect(() => {
    if (!allBlog) {
      dispatch(getListBlog({ sort: 'ctime', filter: { isPublished: true } }));
    }
    !allTopic && dispatch(getTopic({ filter: { isPublished: true } }));
    !onBlogByTopicId && dispatch(getBlogByTopicId({ topic_id: topic_id }));
  }, [onBlogByTopicId, allTopic]);

  const onChangeTopic = async (topic_id) => {
    setTopicId(topic_id)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    dispatch(getBlogByTopicId({ topic_id: topic_id }));
  }, [topic_id])


  return (
    <body>

      <div className="bg-"style={{backgroundColor: '#f6831f' }} >
                <div className="container py-4 " >
                    {/*<!-- Breadcrumb --> */}
                    <nav className="d-flex" >
                        <h6 className="mb-0">
                            <a href="" className="text-white">Trang chủ</a>
                            <span className="text-white-50 mx-2">/ </span>
                            <a href="" className="text-white">Tin Tức</a>

                        </h6>
                    </nav>
                    {/*<!-- Breadcrumb --> */}
                </div></div>
        
      

      <main role="main" class="container">
        <div class="row">
          <div class="col-md-12 blog-main">
            <header class="mb-4 pt-4 pb-4">
              <h3 className="text-center text-uppercase text-dark pb-3">CẨM NANG DINH DƯỠNG</h3>
              <button onClick={() => onChangeTopic("")} type="button" class="btn btn-rounded me-2 " style={{ backgroundColor: '#f6831f', color: 'white' }} data-mdb-ripple-init >Tất cả bài viết</button>
              
              {allTopic && allTopic.map((topic, index) => {
                return <button onClick={() => onChangeTopic(topic._id)} type="button" class="btn btn-rounded me-2 " style={{ backgroundColor: '#f6831f', color: 'white' }} data-mdb-ripple-init key={index} >{topic.topic_name}</button>
              })}
            </header>

            <div class="row">
              {topic_id != ""
                ?
                onBlogByTopicId && onBlogByTopicId.map((post, index) => {
                  return <PostItem blog={post} key={index} />
                })
                : allBlog && allBlog.map((post, index) => {
                  return <PostItem blog={post} key={index} />
                })
              }

            </div>

          </div>
        </div>

      </main>

      {/* <footer class="blog-footer">
        <p>Blog template built for <a href="https://getbootstrap.com/">Bootstrap</a> by <a href="https://twitter.com/mdo">@mdo</a>.</p>
        <p>
          <a href="">Back to top</a>
        </p>
      </footer> */}

      {/* <!-- Bootstrap core JavaScript
    ================================================== --> */}
      {/* <!-- Placed at the end of the document so the pages load faster --> */}
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
      <script>window.jQuery || document.write('<script src="../../../../assets/js/vendor/jquery-slim.min.js"></script>')</script>
      <script src="../../../../assets/js/vendor/popper.min.js"></script>
      <script src="../../../../dist/js/bootstrap-material-design.min.js"></script>
      <script src="../../../../assets/js/vendor/holder.min.js"></script>

    </body>
  );


}
export default Blog;