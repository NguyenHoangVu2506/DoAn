import { Link } from "react-router-dom"

export default function PostHomeItem({ blog }) {

  return (

    <div class="col-lg-3 col-md-6 col-sm-6 col-12">
      <article>
        <Link to={`/blog/${blog.blog_slug}-${blog._id}`} class="img-fluid">
          <img class="rounded w-100" src={blog.blog_image} style={{ objectFit: 'cover', height: "160px" }} />
        </Link>
        <div class="mt-2 text-muted small d-block mb-1">
          <span>
            <i class="fa fa-calendar-alt fa-sm"></i>
            {blog.createdAt}
          </span>
          <h6 class="text-dark">{blog.blog_name}</h6>
          <p>{blog.blog_title}</p>
        </div>
      </article>
    </div>

  );
}