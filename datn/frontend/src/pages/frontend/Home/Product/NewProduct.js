import { useDispatch, useSelector } from "react-redux";
import { onAllProduct } from "../../../../store/actions";
import { useEffect, useState } from "react";
import ProductItem from "../../../../Components/product/productItem";
import { Link } from "react-router-dom";

export default function NewProduct() {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const { allProducts } = useSelector((state) => state.productReducer);

    useEffect(() => {
        if (!allProducts) {
            dispatch(onAllProduct({ limit: 8, sort: 'ctime', page: 1, filter: { isPublished: true } }));
        }
        console.log('allProductsHome', allProducts);
    }, [allProducts, dispatch]);

    if (!allProducts) {
        return <div>Loading...</div>;
    }

    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    const newproduct = allProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
        <section>
            <div className="container my-5">
                <header className="mb-4">
                    <div className="container">
                        <h3>Sản phẩm mới</h3>
                        <Link to={"/collections/"}>
                            <button
                                type="button"
                                className="btn btn-rounded mr-2 left"
                                style={{ backgroundColor: '#f6831f', color: 'white', textAlign: 'right' }}
                                data-mdb-ripple-init
                            >
                                Xem Thêm
                            </button>
                        </Link>
                    </div>
                </header>
                <div className="row">
                    {newproduct && newproduct.map((product, index) => (
                        <ProductItem product={product} key={index} />
                    ))}
                </div>
                <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center' }}>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={handlePrevious}>Trước</button>
                        </li>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button  className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={handleNext}>Sau</button>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
