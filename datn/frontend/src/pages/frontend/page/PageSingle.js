import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPageById } from "../../../store/actions/page-actions";
import { useEffect, useState } from "react";

export default function PageSingle() {
  const [ratingCollapsed, setRatingCollapsed] = useState(false);
  const { slug_id } = useParams();
  const dispatch = useDispatch();
  const page_id = slug_id.split('-').pop();
  const { listPageById } = useSelector((state) => state.pageReducer);
  console.log(slug_id)
  useEffect(() => {
    dispatch(getPageById({ page_id }));
  }, [dispatch, page_id]);

  const toggleRatingCollapse = () => {
    setRatingCollapsed(!ratingCollapsed);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          {listPageById && (
            <div className="blog-post">
              <h5 className="pb-3 mb-2 blog-post-title border-bottom py-4" style={{ fontSize: '24px' }}>
                {listPageById.page_name}
              </h5>
              <p>
                <span style={{ fontSize: '16px' }}>{listPageById.page_title}</span>
              </p>
              <div dangerouslySetInnerHTML={{ __html: listPageById.page_detail }} />


              
            </div>
          )}
        </div>
        <div className="col-lg-3 py-4">
          <div className="collapse card d-lg-block" id="navbarSupportedContent">
            <div className="accordion" id="accordionPanelsStayOpenExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button
                    className="accordion-button text-dark bg-light"
                    type="button"
                    onClick={toggleRatingCollapse}
                  >
                    Chính sách
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseFour"
                  className={`accordion-collapse collapse ${ratingCollapsed ? "show" : ""}`}
                  aria-labelledby="headingFour"
                >
                  <div className="accordion-body">
                    <div className="d-flex flex-column justify-content-start">
                      <div className="d-flex flex-column justify-content-start">
                        Chính sách vận chuyển
                      </div>
                      <hr />
                      <div className="d-flex flex-column justify-content-start">
                        Chính sách đổi trả hàng và hoàn tiền
                      </div>
                      <hr />
                      <div className="d-flex flex-column justify-content-start">
                        Chính sách bảo mật thông tin cá nhân
                      </div>
                      <hr />
                      <div className="d-flex flex-column justify-content-start">
                        Quy định và hình thức thanh toán
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            className="rounded w-100"
            src="https://theme.hstatic.net/200000528965/1001037678/14/page_banner_image.jpg?v=534"
            style={{ objectFit: 'cover', height: "160px" }}
            alt="Banner"
          />
        </div>
      </div>
    </div>
  );
}
