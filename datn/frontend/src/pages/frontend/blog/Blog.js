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
      <div class="container">
        {/* <div class="jumbotron p-3 p-md-5 text-white rounded bg-dark">
          <div class="col-md-6 px-0">
            <h1 class="display-4 font-italic">Title of a longer featured blog post</h1>
            <p class="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.</p>
            <p class="lead mb-0"><a href="#" class="text-white font-weight-bold">Continue reading...</a></p>
          </div>
        </div> */}
      </div>

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



            {/* <div class="blog-post">
              <h2 class="blog-post-title">Another blog post</h2>
              <p class="blog-post-meta">December 23, 2013 by <a href="#">Jacob</a></p>

              <p>Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
              <blockquote>
                <p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
              </blockquote>
              <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
              <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            </div>

            <div class="blog-post">
              <h2 class="blog-post-title">New feature</h2>
              <p class="blog-post-meta">December 14, 2013 by <a href="#">Chris</a></p>

              <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
              <ul>
                <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>
                <li>Donec id elit non mi porta gravida at eget metus.</li>
                <li>Nulla vitae elit libero, a pharetra augue.</li>
              </ul>
              <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
              <p>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>
            </div> */}

            {/* <nav class="blog-pagination">
              <a class="btn btn-outline-primary" href="#">Older</a>
              <a class="btn btn-outline-secondary disabled" href="#">Newer</a>
            </nav> */}

          </div>



          {/* <aside class="col-md-4 blog-sidebar">
            <div class="p-3 mb-3 bg-light rounded">
              <h4 class="font-italic">About</h4>
              <p class="mb-0">Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
            </div>

            <div class="p-3">
              <h4 class="font-italic">Archives</h4>
              <ol class="list-unstyled mb-0">
                <li><a href="#">March 2014</a></li>
                <li><a href="#">February 2014</a></li>
                <li><a href="#">January 2014</a></li>
                <li><a href="#">December 2013</a></li>
                <li><a href="#">November 2013</a></li>
                <li><a href="#">October 2013</a></li>
                <li><a href="#">September 2013</a></li>
                <li><a href="#">August 2013</a></li>
                <li><a href="#">July 2013</a></li>
                <li><a href="#">June 2013</a></li>
                <li><a href="#">May 2013</a></li>
                <li><a href="#">April 2013</a></li>
              </ol>
            </div>

            <div class="p-3">
              <h4 class="font-italic">Elsewhere</h4>
              <ol class="list-unstyled">
                <li><a href="#">GitHub</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Facebook</a></li>
              </ol>
            </div>
          </aside> */}

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