import React, { useEffect, useState } from "react";
import { Carousel } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getListBrand, getProductByBrandId, onAllProduct } from "../../../store/actions";
import ProductItem from "../../../Components/product/productItem";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';



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

    useEffect(() => {
        document.title = "Thương Hiệu";
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
                    <Helmet>
                        <title>Thương hiệu:{ } - HoangVu</title>
                    </Helmet>
                    {/*<!-- Breadcrumb --> */}
                    <nav className="d-flex" >
                        <h6 className="mb-0">
                            <Link to="/" style={{ color: '#f6831f' }}>Trang chủ</Link>
                            <span className=" mx-2" style={{ color: '#f6831f' }}>/ </span>
                            <Link to="/thuong-hieu" style={{ color: '#f6831f' }}>Thương Hiệu</Link>

                        </h6>
                    </nav>
                    {/*<!-- Breadcrumb --> */}
                </div></div>



            <main role="main" class="container">
                <div class="row">
                    {/* <<<<<<< HEAD */}
                    <div class="col-md-12 blog-main">
                        {/* =======
                    <div class="">
>>>>>>> origin/main */}
                        <header class="mb-2 pt-2 pb-3">
                            {/* <h3 className="text-center text-uppercase text-dark pb-3">THƯƠNG HIỆU MỸ PHẨM</h3> */}
                            <h3 className="text-center text-uppercase text-dark pb-3">THƯƠNG HIỆU</h3>

                        </header>
                        {/* <<<<<<< HEAD
                        <div className="row">
                            {all_brand && all_brand.map((brand, index) => {
                                return (
                                    <div className="col">
                                        <img src={brand.brand_image} class="rounded-circle img-fluid" />
                                        <button onClick={() => onChangeBrand(brand._id)} key={index} type="button" class="btn btn-rounded me-2 pb-1 fw-bold mb-1 " style={{ backgroundColor: 'white', color: '#f6831f' }} data-mdb-ripple-init >
                                            {brand.brand_name}
                                        </button>
                                    </div>)
                            })}
                        </div>
======= */}

                        <div className="multi-carousel" data-mdb-carousel-init data-mdb-interval="3000" data-mdb-items="7">
                            <div class="d-flex justify-content-center m-2 mb-3">
                                <button data-mdb-button-init class="carousel-control-prev btn btn-floating mx-3" style={{ backgroundColor: '#f6831f' }} type="button" tabindex="0" aria-current="true" data-mdb-slide="prev">
                                    <i class="fas fa-angle-left fa-lg " ></i>
                                </button>
                                <button data-mdb-button-init class="carousel-control-next btn  btn-floating mx-3" style={{ backgroundColor: '#f6831f' }} type="button" tabindex="1" data-mdb-slide="next">
                                    <i class="fas fa-angle-right fa-lg " ></i>
                                </button>
                            </div>
                            <div className="multi-carousel-inner">
                                <div class="d-flex  m-2 mb-3">
                                    {all_brand && all_brand.map((brand, index) => {
                                        return (
                                            <button className="multi-carousel-item border-0" >
                                                <img onClick={() => onChangeBrand(brand._id)} key={index} data-mdb-ripple-init src={brand.brand_image}
                                                    className="rounded-circle" style={{ height: '200px', width: '200px' }} />
                                            </button>
                                        )
                                    })}
                                </div>

                            </div>



                        </div>



                        {/* >>>>>>> origin/main */}

                        <div class=" row pt-4" >
                            <div className="card-body pt-3 text-center">
                                <h4 className="fw-bold" style={{ color: '#f6831f', textTransform: 'uppercase' }}>Sản phẩm theo thương hiệu
                                </h4>
                            </div>
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
                                        <button className="page-link" onClick={handlePrevious}>Trước</button>
                                    </li>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                            {/* <<<<<<< HEAD
                                            <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
======= */}
                                            <button style={{ color: '#f6831f' }} className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                                            {/* >>>>>>> origin/main */}
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={handleNext}>Sau</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* <<<<<<< HEAD */}




                    </div>





                    {/* =======
                    </div>
>>>>>>> origin/main */}
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