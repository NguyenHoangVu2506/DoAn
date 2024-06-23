import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListBrand, getProductByBrandId, onAllProduct } from "../../../store/actions";
import ProductItem from "../../../Components/product/productItem";
function Brand() {
    const dispatch = useDispatch();
    const { all_brand } = useSelector((state) => state.brandReducer);
    const [productByBrand, setProductByBrand] = useState([])
    const [allproducts, setAllproducts] = useState([])

    const [brand_id, setBrand_ID] = useState('')

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
        console.log("brand_id",brand_id)
        setBrand_ID(brand_id)
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    useEffect(() => {
        setProductByBrand(allproducts.filter((prod) => prod.product_brand.toString() === brand_id.toString()))
    }, [brand_id])

    return (
        <body>

            <div className="bg-" style={{ backgroundColor: '#f6831f' }} >
                <div className="container py-4 " >
                    {/*<!-- Breadcrumb --> */}
                    <nav className="d-flex" >
                        <h6 className="mb-0">
                            <a href="" className="text-white">Trang chủ</a>
                            <span className="text-white-50 mx-2">/ </span>
                            <a href="" className="text-white">Thương Hiệu</a>

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
                            {productByBrand?.length > 0 ? productByBrand.map((product, index) => {
                                return <ProductItem product={product} key={index} />
                            }) :
                                <div>
                                    <div className="card-body pt-3 text-center">
                                        <p style={{ color: '#545453' }}>Không có sản phẩm</p>
                                    </div>
                                </div>}
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