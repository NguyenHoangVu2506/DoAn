import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListBrand, getProductByBrandId, onAllProduct } from "../../../store/actions";
import ProductItem from "../../../Components/product/productItem";
import { Link } from "react-router-dom";
function Brand() {
    const dispatch = useDispatch();
    const { all_brand } = useSelector((state) => state.brandReducer);
    const [productByBrand, setProductByBrand] = useState([])
    const [allproducts, setAllproducts] = useState([])

    const [brand_id, setBrand_ID] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const fetchDataBrand = async () => {
        dispatch(getListBrand())
        const productsByBrand = await dispatch(onAllProduct())
        if (productsByBrand) {
            setAllproducts(productsByBrand.payload?.metaData)
            setProductByBrand(productsByBrand.payload?.metaData)
        }
    }
    useEffect(() => {
        fetchDataBrand()
    }, []);

    const onChangeBrand = async (brand_id) => {
        console.log("brand_id", brand_id)
        setBrand_ID(brand_id)
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    useEffect(() => {
        setProductByBrand(allproducts.filter((prod) => prod.product_brand.toString() === brand_id.toString()))
    }, [brand_id])

    const totalPages = Math.ceil(productByBrand.length / itemsPerPage);
    const productBrand = productByBrand.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    return (
        <body>

            <div className="bg-" style={{ backgroundColor: 'white' }} >
                <div className="container py-4 " >
                    {/*<!-- Breadcrumb --> */}
                    <nav className="d-flex" >
                        <h6 className="mb-0">
                            <Link to="/" style={{ color: '#f6831f' }}>Trang chủ</Link>
                            <span className=" mx-2"style={{ color: '#f6831f' }}>/ </span>
                            <Link to="/thuong-hieu" style={{ color: '#f6831f' }}>Thương Hiệu</Link>

                        </h6>
                    </nav>
                    {/*<!-- Breadcrumb --> */}
                </div></div>



            <main role="main" class="container">
                <div class="row">
                    <div class="col-md-12 blog-main">
                        <header class="mb-2 pt-4 pb-3">
                            {/* <h3 className="text-center text-uppercase text-dark pb-3">THƯƠNG HIỆU MỸ PHẨM</h3> */}
                            <h3 className="text-center text-uppercase text-dark pb-3">THƯƠNG HIỆU</h3>

                        </header>
                        {all_brand && all_brand.map((brand, index) => {
                            return (
                                <>
                                    {/* <img src={brand.brand_image} class="rounded-circle" style={{ height: '150px', width: '150px' }} /> */}
                                    <button onClick={() => onChangeBrand(brand._id)} key={index} type="button" class="btn btn-rounded me-2 pb-1 fw-bold " style={{ backgroundColor: 'white', color: '#f6831f' }} data-mdb-ripple-init >
                                        {brand.brand_name}
                                    </button>
                                </>)
                        })}


                        <div class=" row pt-4" >
                            {productBrand?.length > 0 ? productBrand.map((product, index) => {
                                return <ProductItem product={product} key={index} />
                            }) :
                                <div>
                                    <div className="card-body pt-3 text-center">
                                        <p style={{ color: '#545453' }}>Không có sản phẩm</p>
                                    </div>
                                </div>}
                            <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center' }}>
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={handlePrevious}>Previous</button>
                                    </li>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                            <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={handleNext}>Next</button>
                                    </li>
                                </ul>
                            </div>
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
export default Brand;