import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { useEffect } from "react";
import { getBlogByTopicId, getBlogDetails } from "../../../store/actions";
import PostHomeItem from "../../../Components/blog/postHomeItem";

export default function PostDetailItem() {
  const { slug_id } = useParams()
  const dispatch = useDispatch();
  const blog_id = slug_id.split('-').pop()
  console.log(blog_id)
  const { blogDetails } = useSelector((state) => state.blogReducer)


  useEffect(() => {
      dispatch(getBlogDetails({ blog_id: blog_id }))
    console.log(blogDetails)
  }, [slug_id])


  return (
    <body>
      <main role="main" class="px-4 py-2 ">
        <div class="row">
          <div class="col-md-8 blog-main ">
            <div class="blog-post">
              {blogDetails && (
                <div class="blog-post">
                  <h2 class="pb-3 mb-4 blog-post-title  border-bottom">
                    {blogDetails.post.blog_title}
                  </h2>
                  <img src={blogDetails.post.blog_image} style={{}}></img>
                  <blockquote></blockquote>

                  <h3 class="blog-post-title">{blogDetails.post.blog_name}</h3>
                  <p class="blog-post-meta">{blogDetails.post.blog_detail}</p>
                </div>
              )}
            </div>
          </div>

          <aside class="col-md-4 blog-sidebar">
            <div class=" mb-3 bg-light rounded">
              <div class="">
                <div className="px-0 border rounded-2 shadow-0">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Bài Viết Liên Quan</h5>
                      <>
                        {
                          blogDetails && blogDetails.related_posts.map((post, index) => {
                            return (
                              <div className="d-flex mb-3" key={index}>
                                <Link to={`/blog/${post.blog_slug}-${post._id}`} className="me-3">
                                  <img src={post.blog_image} style={{ width: '90px', height: '90px' }} className="img-md img-thumbnail" />
                                </Link>
                                <div className="info">
                                  <a href="#" className="nav-link mb-1">
                                    {post.blog_name}
                                    <br />
                                  </a>
                                </div>
                              </div>

                            )
                          })

                        }
                      </>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </aside>

        </div>

      </main >




    </body >
  )
};