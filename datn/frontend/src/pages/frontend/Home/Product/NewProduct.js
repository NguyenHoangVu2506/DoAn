import { useDispatch, useSelector } from "react-redux";
import { onAllProduct } from "../../../../store/actions";
import { useEffect } from "react";
import ProductItem from "../../../../Components/product/productItem";
import { Link } from "react-router-dom";

export default function NewProduct() {
    const dispatch = useDispatch();

    const { allProducts } = useSelector((state) => state.productReducer);

    useEffect(() => {
        if (!allProducts) {
            dispatch(onAllProduct({ limit: 50, sort: 'ctime', page: 1, filter: { isPublished: true } }));
        }
        console.log('allProducts<home',allProducts);
    }, [allProducts]);

    return (
        <section>
            <div class="container my-5">
                <header class="mb-4">
                    <div className="container">
                    <h3>Sản phẩm mới</h3>
                    <Link to={"/collections/"} >
                    <button type="button" class="btn btn-rounded mr-2 left" style={{ backgroundColor: '#f6831f', color: 'white', textAlign: 'right' }} data-mdb-ripple-init >Xem Thêm</button>
                    </Link>

                    </div>
                </header>


                <div class="row" >

                    {allProducts && allProducts.map((product, index) => {
                        return  <ProductItem product={product} key={index}/>
                           
                            // <div class="col-lg-3 col-md-6 col-sm-6" key={index}>
                            //     <div class="card my-2 shadow-0">
                            //         <a href="#" class="">
                            //             <div class="mask" style={{ height: '50px' }}>
                            //                 <div class="d-flex justify-content-start align-items-start h-100 m-2">
                            //                     <h6><span class="badge pt-1" style={{ backgroundColor: '#f87217' }}>Offer</span></h6>
                            //                 </div>
                            //             </div>
                            //             <img src={product.product_thumb} class="card-img-top rounded-2" style={{ aspectRatio: '1/1' }} />
                            //         </a>
                            //         <div class="card-body p-0 pt-2">
                            //             <a href="#!" class="btn btn-light border px-2 pt-2 float-end icon-hover"><i class="fas fa-heart fa-lg px-1 text-secondary"></i></a>
                            //             <h5 class="card-title"></h5>
                            //             <p class="card-text mb-0">{product.product_name}</p>
                            //             <p class="text-muted">
                            //                 Capacity: 128GB
                            //             </p>
                            //         </div>
                            //     </div>
                            // </div>
                        
                    })}

                  
                </div>
            </div>
        </section>
        // <!-- Products -->
    );
}


