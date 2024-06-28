import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAllProduct } from "../../../store/actions";
import ProductItem from "../../../Components/product/productItem";
import { Link } from "react-router-dom";

export default function CategoryList({ category_parent, all_product_category, all_category }) {
  const [category_childrent, setCattagoryChildrent] = useState(null)
  const [productByCategory, setProductByCategory] = useState([])
  const [selectedCategory, setSelectedCategory] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const changeSelectedCategory = async (category) => {
    setSelectedCategory(category)
  }
  useEffect(() => {
    !category_childrent && setCattagoryChildrent(all_category.filter((cat) => cat.parent_id == category_parent._id))
  }, [category_parent]);
  useEffect(() => {
    setProductByCategory(all_product_category?.filter((product) => product.product_category.includes(category_parent._id)))
  }, [category_parent]);

  useEffect(() => {
    selectedCategory && setProductByCategory(all_product_category?.filter((product) => product.product_category.includes(selectedCategory._id)))
  }, [selectedCategory]);

  const totalPages = Math.ceil(productByCategory.length / itemsPerPage);
  const productcate = productByCategory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
    <div className="container">
      <div className="container pt-2 " style={{ background: '#ffd6b2 linear-gradient(180deg, #fff3ea 0%, #ffd6b2 100%)' }}>
        <header className="mb-2 d-flex justify-content-between align-items-center " >
          <h3 >{category_parent.category_name}</h3>
          <a href={`/collections/${category_parent.category_slug}`} className="d-block ">
            <button type="button" class="btn btn-rounded" style={{ backgroundColor: '#f6831f', color: 'white' }} data-mdb-ripple-init >Xem tất cả</button>
          </a>
        </header>
        <div className="row flex justify-content-around ">
          {category_childrent && category_childrent.map((category, index) => {
            return (
              <button onClick={() => changeSelectedCategory(category)} key={index} className="btn btn-white btn-group-vertical  col-2 flex justify-content-center align-content-center rounded-3 mb-3" style={{ width: '140px', height: '140px' }}>
                <img src={category.category_image} style={{ width: '100%', height: '50%' }} />
                <div className="card-body pt-3 text-center">
                  <p style={{ color: '#545453' }}>{category.category_name}</p>
                </div>
              </button>
            )
          })}

        </div>

      </div>

      <div class=" row flex px-2 " >
        {productcate.length > 0 ? productcate.map((product, index) => {
          return <ProductItem product={product} key={index} />
        })
          :
          <div>
            <div className="card-body pt-3 text-center">
              <p style={{ color: '#545453' }}>Không có sản phẩm</p>
            </div>
          </div>}
        {/* <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center' }}>
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
                    </div> */}
      </div>

    </div>
  );
}
