import { useDispatch, useSelector } from "react-redux";
import { getListBlog } from "../../../store/actions/blog-actions";
import { useEffect, useState } from "react";
import PostItem from "../../../Components/blog/postItem";
import { getTopic } from "../../../store/actions";
import { useNavigate } from "react-router-dom";
import PostHomeItem from "../../../Components/blog/postHomeItem";

export default function PostHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allBlog } = useSelector((state) => state.blogReducer);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;


  useEffect(() => {
    if (!allBlog) {
      dispatch(getListBlog({ sort: 'ctime', filter: { isPublished: true } }));
    }
  }, [allBlog]);

  const totalPages = Math.ceil(allBlog?.length / itemsPerPage);
  const blog = allBlog?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSubmit = () => {
    navigate('/blog');
  };



  return (
    // <!-- Blog -->
    <section class="" style={{backgroundColor:' '}}>
      <div class="container text-dark">
        <header class="mb-4 d-flex justify-content-between align-items-center">
          <h3>Bài viết mới</h3>
          <button type="button" class="btn btn-rounded mr-2 left" style={{ backgroundColor: '#f6831f', color: 'white', textAlign: 'right' }} data-mdb-ripple-init onClick={handleSubmit}>Xem them</button>

        </header>



        <div class="row">

          {blog && blog.map((blog, index) => {
            return <PostHomeItem blog={blog} key={index} />
          })}

        </div>
      </div>
    </section>
    // <!-- Blog -->



  );
}
