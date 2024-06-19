import { Link } from "react-router-dom";

export default function PostItem({ blog }) {
    return (
        <>
            {/* <div class="col-md-6">
                <div class="card flex-md-row mb-4 box-shadow h-md-250">
                    <div class="card-body d-flex flex-column align-items-start">
                        <strong class="d-inline-block mb-2 text-primary">{blog.blog_name}</strong>
                        <h5 class="mb-0">
                            <a class="text-dark" href="#">{blog.blog_title}</a>
                        </h5>
                    </div>
                    <Link to={`/blog/${blog.blog_slug}-${blog._id}`} class="img-fluid">
                        <img class="rounded w-100" src={blog.blog_image} style={{ objectFit: 'cover', height: "160" }} />
                    </Link>

                </div>
            </div> */}
            <div class="col-md-6 col-lg-6 col-xl-6">
                <div className="card bg-image hover-zoom ripple rounded ripple-surface w-100 my-2 shadow-2-strong">
                    <Link to={`/blog/${blog.blog_slug}-${blog._id}`} class="img-fluid">
                        <img class="rounded w-100" src={blog.blog_image[0]} style={{ objectFit: 'cover', height: "320px" }} />
                    </Link>
                    <div class="mt-2 text-muted small d-block mb-3 mx-3 mt-4">
                        <h6 class="text-dark">{blog.blog_name}</h6>
                        <p>{blog.blog_title}</p>
                        <span>
                            <i class="fa fa-calendar-alt fa-sm mx-1"></i>
                            {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ''}
                        </span>
                    </div>
                </div>
            </div>


        </>
    )

};