import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getListPage, getPageById } from "../../../store/actions/page-actions";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';

export default function PageSingle() {
  const [ratingCollapsed, setRatingCollapsed] = useState(false);
  const { slug_id } = useParams();
  const dispatch = useDispatch();
  const page_id = slug_id.split('-').pop();
  const { listPageById } = useSelector((state) => state.pageReducer);
  const { allPage } = useSelector((state) => state.pageReducer);

  console.log(slug_id)
  useEffect(() => {
    dispatch(getPageById({ page_id }));
  }, [dispatch, page_id]);
  useEffect(() => {
    if (!allPage) {
      dispatch(getListPage({ sort: 'ctime' }));
    }
  }, [dispatch, allPage]);

  const toggleRatingCollapse = () => {
    setRatingCollapsed(!ratingCollapsed);
  };
  if (!listPageById || !listPageById.page_name) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <Helmet>
                        <title>{listPageById.page_name} - HoangVu</title>
                    </Helmet>
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
                    {allPage && allPage.map((item, index) => (
                      <>
                      <div className="d-flex flex-column justify-content-start" key={index}>
                        <Link style={{color:'#4f4f4f'}} to={`/page/${item.page_slug}-${item._id}`}>
                        {item.page_name}
                        </Link>
                      </div>
                      <hr />
                      </>
                    ))}
                    </div>
                  </div>
                </div>
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
  );
}
