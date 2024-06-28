import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getBlogDetails } from "../../../store/actions";
import { Helmet } from 'react-helmet';

export default function PostDetailItem() {
  const { slug_id } = useParams();
  const dispatch = useDispatch();
  const blog_id = slug_id.split('-').pop();
  console.log(blog_id);
  const { blogDetails } = useSelector((state) => state.blogReducer);

  useEffect(() => {
    dispatch(getBlogDetails({ blog_id }));
    console.log(blogDetails);
  }, [slug_id, dispatch]);

  if (!blogDetails || !blogDetails.post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Helmet>
        <title>{blogDetails.post.blog_name} - HoangVu</title>
      </Helmet>
      <main role="main" className="px-4 py-2 ">
        <div className="row">
          <div className="col-lg-8">
            <div className="blog-post">
              <img
                style={{ height: '100%', width: '100%' }}
                src={blogDetails.post.blog_image}
                alt="Blog"
              />
              <h3 className="blog-post-title">{blogDetails.post.blog_name}</h3>
              <div dangerouslySetInnerHTML={{ __html: blogDetails.post.blog_detail }} />
            </div>
          </div>

          <div className="col-lg-4">
            <div className="mb-3 bg-light rounded">
              <div className="">
                <div className="px-0 border rounded-2 shadow-0">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Bài Viết Liên Quan</h5>
                      {blogDetails.related_posts
                        .filter(item => !item.isDeleted)
                        .map((item, index) => (
                          <div className="d-flex mb-3" key={index}>
                            <Link to={`/blog/${item.blog_slug}-${item._id}`} className="me-3">
                              <img
                                src={item.blog_image}
                                style={{ width: '90px', height: '90px' }}
                                className="img-md img-thumbnail"
                                alt="Related Post"
                              />
                            </Link>
                            <div className="info">
                              <a href="#" className="nav-link mb-1">
                                {item.blog_name}
                                <br />
                              </a>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
