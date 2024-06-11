import { Link } from "react-router-dom";

export default function PostItem({blog}) {
    return (
        <>
            <div class="col-md-6">
                <div class="card flex-md-row mb-4 box-shadow h-md-250">
                    <div class="card-body d-flex flex-column align-items-start">
                        <strong class="d-inline-block mb-2 text-primary">{blog.blog_name}</strong>
                        <h5 class="mb-0">
                            <a class="text-dark" href="#">{blog.blog_title}</a>
                        </h5>
                    </div>
                    <img class="card-img-right flex-auto d-none d-md-block" style={{width:"50%",height:"90%"}} src={blog.blog_image} alt="Card image cap" />
                
                </div>
            </div>

        </>
    )

};