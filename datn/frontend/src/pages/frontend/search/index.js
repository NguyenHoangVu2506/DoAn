import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { onAllProduct } from "../../../store/actions";
import ProductItem from "../../../Components/product/productItem";
<<<<<<< HEAD
import { Helmet } from 'react-helmet';
=======
>>>>>>> origin/main

function Search() {
    const dispatch = useDispatch();
    const { meta_key } = useParams()
    const searchRes = useRef(null)
    const [product_search, setProductSearch] = useState([])
    const { allProducts } = useSelector((state) => state.productReducer)
    const fetchDataProducts = async () => {
        const products = await dispatch(onAllProduct({ limit: 50, sort: 'ctime', page: 1, filter: { isPublished: true } }));
        // setProductSearch(products?.payload?.metaData)
    }
    useEffect(() => {
        fetchDataProducts()
    }, []);
    useEffect(() => {
        allProducts && setProductSearch(allProducts?.filter((prod) => prod.product_name.toLowerCase().search(new RegExp(meta_key?.toLowerCase())) !== -1))
    }, [meta_key])

<<<<<<< HEAD

    return (
        <body>
            <Helmet>
                <title>Kết quả tìm kiếm:{meta_key} - HoangVu</title>
            </Helmet>
=======
    useEffect(() => {
        document.title = 'Tìm Kiếm Sản Phẩm';
      }, []);


    return (
        <body>
>>>>>>> origin/main
            <div className="bg-" style={{ backgroundColor: 'white' }} >
                <div className="container py-4">
                    <nav className="d-flex">
                        <h6 className="mb-0">
                            <Link to="/" style={{ color: '#f6831f' }}>Trang chủ</Link>
                            <span className=" mx-2" style={{ color: '#f6831f' }}>/ </span>
<<<<<<< HEAD
                            <Link to="/blog" style={{ color: '#f6831f' }}><u>{meta_key}</u></Link>
=======
                            <Link to="/blog" style={{ color: '#f6831f' }}></Link>
>>>>>>> origin/main
                        </h6>
                    </nav>
                </div>
            </div>
            <main role="main" className="container">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 blog-main py-4">
                            <header className="mb-1 pt-1 pb-1">
                                <h3 className="text-center text-uppercase text-dark pb-3" style={{ fontSize: '24px' }}>Kết Quả Tìm Kiếm </h3>
                            </header>
                            <div class="row" >

                                {product_search?.length > 0 && product_search.map((product, index) => {
                                    return (<ProductItem product={product} key={index} />)
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </body>
    );
}

export default Search;
