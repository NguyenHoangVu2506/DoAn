import { useDispatch, useSelector } from "react-redux";
import { AllCategory, getAllAttribute, getAttribute, getCategoryByParentId, getProductByCatId, onAllProduct } from "../../../store/actions";
import ProductListItem from "../../../Components/product/productListItem";
import React, { useEffect, useState } from "react";
import ProductItem from "../../../Components/product/productItem";
import { getListBrand } from "../../../store/actions/brand-actions";
import { Link, useNavigate, useParams } from "react-router-dom";
import SaleProduct from "../Home/Product/SaleProduct";
import { all } from "axios";

function Collections() {
  const { category1, category2, category3 } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [isList, setIsList] = useState(false)
  //
  const [option, setOption] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  const { allProducts } = useSelector((state) => state.productReducer);
  const { all_brand } = useSelector((state) => state.brandReducer);
  const { all_category } = useSelector((state) => state.categoryReducer);
  const { all_attribute } = useSelector((state) => state.attributeReducer);


  const [categoriesParentNull, setCategoriesParentNull] = useState([])
  const [productByFilter, setProductByFilter] = useState([])
  const [products, setProducts] = useState([])
  const [pagedProducts, setPagedProducts] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState([])
  const [selectedAttribute, setSelectedAttribute] = useState([])

  const [categoryCollapsed, setCategoryCollapsed] = useState(0);
  const [categoryCollapsedStatus, setCategoryCollapsedStatus] = useState(false);
  const [brandCollapsed, setBrandCollapsed] = useState(false);
  const [attributeCollapsed, setAttributeCollapsed] = useState(false);
  const [attributeCollapsedStatus, setAttributeCollapsedStatus] = useState(false);
  const [priceCollapsed, setPriceCollapsed] = useState(false);
  const [ratingCollapsed, setRatingCollapsed] = useState(false);

  console.log(category1, category2, category3, pagedProducts, selectedAttribute, selectedBrand, productByFilter, products, allProducts)


  // const listSale = allProducts && allProducts[0]?.special_offer?.special_offer_spu_list;
  // const saleProducts = allProducts?.slice()?.filter((item) => item._id ===
  //   listSale
  //     ?.slice()
  //     ?.find((subitem) => subitem?.product_id === item._id)?.product_id
  // );

  useEffect(() => {
    if (!allProducts) {
      dispatch(onAllProduct({ limit: 50, sort: 'ctime', page: 1, filter: { isPublished: true } }));
    }
  }, [allProducts])

  React.useEffect(() => {
    dispatch(getListBrand({ isPublished: true }))
    dispatch(AllCategory())
    dispatch(getAllAttribute({ isPublished: true }))
  }, [])

  useEffect(() => {
    document.title = "Danh Mục Sản Phẩm";
  }, []);

  useEffect(() => {
    all_category && setCategoriesParentNull(all_category?.filter((cat) => cat.parent_id == null))
  }, [all_category])


  useEffect(() => {
    if (allProducts) {
      // if (
      //   category1 !== undefined &&
      //   category2 === undefined &&
      //   category3 === undefined &&
      //   all_category
      //     ?.slice()
      //     .findIndex((item) => item.category_slug === category1) === -1
      // ) {
      //   navigate('/404');
      // }
      // if (
      //   category1 !== undefined &&
      //   category2 !== undefined &&
      //   category3 === undefined &&
      //   all_category
      //     ?.slice()
      //     .findIndex(
      //       (item) =>
      //         item.parent_id ===
      //         all_category
      //           ?.slice()
      //           .find(
      //             (item) => item.category_slug === category1
      //           )?._id && item.category_slug === category2
      //     ) === -1
      // ) {
      //   navigate('/404');
      // }
      // if (
      //   category1 !== undefined &&
      //   category2 !== undefined &&
      //   category3 !== undefined &&
      //   all_category
      //     ?.slice()
      //     .findIndex(
      //       (item) =>
      //         item.parent_id ===
      //         all_category
      //           ?.slice()
      //           .find(
      //             (subitem) =>
      //               subitem.parent_id ===
      //               all_category
      //                 ?.slice()
      //                 .find(
      //                   (subsubitem) =>
      //                     subsubitem.category_slug ===
      //                     category1
      //                 )?._id &&
      //               subitem.category_slug === category2
      //           )?._id && item.category_slug === category3
      //     ) === -1
      // ) {
      //   navigate('/404');
      // }
      // setSelectedBrand([]);
      // setSelectedAttribute([]);
      if (
        category1 === undefined &&
        category2 === undefined &&
        category3 === undefined
      ) {
        setProducts(allProducts);
      }
      if (
        category1 !== undefined &&
        category2 === undefined &&
        category3 === undefined
      ) {
        setProducts(
          allProducts
            ?.slice()
            .filter((item) =>
              item.product_category.includes(
                all_category?.find(
                  (item) => item.category_slug.toString() === category1.toString()
                )?._id
              )
            )
        );
      }

      if (
        category1 !== undefined &&
        category2 !== undefined &&
        category3 === undefined
      ) {
        setProducts(
          allProducts
            ?.slice()
            .filter((item) =>
              item.product_category.includes(
                all_category?.find(
                  (item) => item.category_slug.toString() === category2.toString()
                )?._id
              )
            )
        );
      }
      if (
        category1 !== undefined &&
        category2 !== undefined &&
        category3 !== undefined
      ) {
        setProducts(
          allProducts
            ?.slice()
            .filter((item) =>
              item.product_category.includes(
                all_category?.find(
                  (item) => item.category_slug.toString() === category3.toString()
                )?._id
              )
            )
        );
      }
    }
  }, [allProducts, category1, category2, category3]);

  useEffect(() => {
    if (selectedBrand?.length > 0 && selectedAttribute?.length > 0) {
      setProductByFilter(
        products
          ?.slice()
          .filter(
            (item) =>
              selectedBrand?.includes(item.product_brand) &&
              selectedAttribute?.some((UUID) =>
                item.product_attributes.some((attribute) =>
                  attribute.attribute_value.some(
                    (subitem) => subitem.value == UUID
                  )
                )
              )
          )
      );
    }
    if (selectedBrand?.length > 0) {
      setProductByFilter(
        products
          ?.slice()
          .filter((item) =>
            selectedBrand?.includes(item.product_brand)
          )
      );
    }
    if (selectedBrand.length === 0) {
      setProductByFilter(
        products
      );
    }

  }, [selectedBrand]);

  useEffect(() => {
    if (selectedAttribute?.length > 0 && selectedBrand?.length > 0) {
      setProductByFilter(
        products
          ?.slice()
          .filter(
            (item) =>
              selectedAttribute.some((UUID) =>
                item.product_attributes.some((attribute) =>
                  attribute.attribute_value.some(
                    (subitem) => subitem.value.toString() === UUID.toString()
                  )
                )
              ) && selectedBrand.includes(item.product_brand)
          ))
    }
    if (selectedAttribute?.length > 0) {
      setProductByFilter(
        products
          ?.slice()
          .filter((item) =>
            selectedAttribute.some((UUID) =>
              item.product_attributes.some((attribute) =>
                attribute.attribute_value.some(
                  (subitem) => subitem.value === UUID
                )
              )
            )
          ))
    }
    if (selectedAttribute.length === 0) {
      setProductByFilter(
        products
      );
    }

  }, [selectedAttribute]);
  useEffect(() => {
    setProductByFilter(products);
  }, [products]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    setPagedProducts(productByFilter?.slice(startIndex, endIndex));
  }, [productByFilter, currentPage]);


  useEffect(() => {
    if (option === "all") {
      setProductByFilter(products)

    }
    if (option === "sale") {
      setProductByFilter(products.filter((product) => product.special_offer !== null))
    }
    if (option === "price_max") {
      setProductByFilter(products)

    }else{
      
    }
    if (option === "rating") {
      setProductByFilter(products)

    }

  }, [option])
  const changeSelectedCategory = async (category) => {

    navigate(`/collections/${categoryCollapsed.category_slug}/${category.category_slug}`)

  }
  const handleChangeBrand = async (checked, brand_id) => {
    if (checked === true) {
      setSelectedBrand([...selectedBrand, brand_id])

    }
    if (checked === false) {
      setSelectedBrand(selectedBrand.length > 0 && selectedBrand?.filter((brandId) => brandId != brand_id))
    }
  }
  const handleChangeAtribute = async (checked, attribute_value_id) => {
    if (checked === true) {
      setSelectedAttribute([...selectedAttribute, attribute_value_id])
    }
    if (checked === false) {
      setSelectedAttribute(selectedAttribute?.filter((attribute) => attribute !== attribute_value_id))
    }
  }

  const toggleBrandCollapse = () => {
    setBrandCollapsed(!brandCollapsed);
  };

  const toggleAttributeCollapse = (id) => {
    setAttributeCollapsed(id);
    setAttributeCollapsedStatus(!attributeCollapsedStatus)

  };

  const toggleCategoryCollapse = (cat) => {
    navigate(`/collections/${cat.category_slug}`)

    setCategoryCollapsed(cat);
    setCategoryCollapsedStatus(!categoryCollapsedStatus)
  };

  const togglePriceCollapse = () => {
    setPriceCollapsed(!priceCollapsed);
  };

  const toggleRatingCollapse = () => {
    setRatingCollapsed(!ratingCollapsed);
  };


  const totalPages = Math.ceil(allProducts?.length / limit);

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
    <>
      <section class="">
        <div class="container">
          <div class="row">
            {/*<!-- sidebar -->*/}
            <div class="col-lg-3">
              {/*<!-- Toggle button -->*/}
              {/* <button
                class="btn btn-outline-secondary mb-3 w-100 d-lg-none"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span>Show filter</span>
              </button> */}
              {/*<!-- Collapsible wrapper -->*/}
              <div class="collapse card d-lg-block mb-5 pt-4" id="navbarSupportedContent">
                <div class="accordion" id="accordionPanelsStayOpenExample">

                  {categoriesParentNull && categoriesParentNull?.map((categoryParentnull, index) => {
                    return (
                      <div class="accordion-item" key={index}>
                        <h2 class="accordion-header" id={categoryParentnull._id}>
                          <button
                            className="accordion-button text-dark bg-light"
                            type="button"
                            onClick={() => toggleCategoryCollapse(categoryParentnull)}
                          >{categoryParentnull.category_name}</button>

                        </h2>
                        <div
                          id={index}
                          className={`collapse ${categoryCollapsed._id == categoryParentnull._id && categoryCollapsedStatus == true ? "show" : ""}`}
                          aria-labelledby={categoryParentnull._id}
                        >
                          <div class="accordion-body">
                            <div className="d-flex flex-column justify-content-start ">
                              {all_category && all_category?.map((category) => {
                                if (category.parent_id == categoryParentnull._id) {
                                  return (
                                    <button onClick={() => changeSelectedCategory(category)} className="btn d-flex flex-column justify-content-start" style={{ color: '' }}>
                                      {category.category_name}
                                    </button>
                                  )
                                }
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button text-dark bg-light"
                        type="button"
                        onClick={toggleBrandCollapse}
                      >
                        THƯƠNG HIỆU
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseTwo"
                      className={`accordion-collapse collapse ${brandCollapsed ? "show" : ""}`}
                      aria-labelledby="headingTwo"
                    >
                      <div class="accordion-body">
                        <div>
                          <div class="form-check">
                            {all_brand && all_brand.map((brand, index) => {
                              return (
                                <div key={index}>
                                  <input class="form-check-input" type="checkbox" value={brand._id} id={index} onChange={(e) => handleChangeBrand(e.target.checked, brand._id)} />
                                  <label class="form-check-label" for={index}>{brand.brand_name}</label>
                                </div>

                              )
                            })}
                            {/* <span class="badge badge-secondary float-end">30</span> */}
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                      <button
                        className="accordion-button text-dark bg-light"
                        type="button"
                        onClick={togglePriceCollapse}
                      >
                        KHOẢNG GIÁ
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseThree"
                      className={`accordion-collapse collapse ${priceCollapsed ? "show" : ""}`}
                      aria-labelledby="headingThree"
                    >
                      <div class="accordion-body">
                        <div class="row mb-3">
                          <div class="col-6">
                         
                            <div class="form-outline">
                              <input type="number" id="typeNumber" class="form-control border-secondary" />
                              <label class="form-label border-secondary" for="typeNumber">0</label>
                            </div>
                          </div>
                          <div class="col-6">
                           
                            <div class="form-outline">
                              <input type="number" id="typeNumber" class="form-control border-secondary" />
                              <label class="form-label border-secondary" for="typeNumber">1,0000</label>
                            </div>
                          </div>
                        </div>
                        <button type="button" class="btn btn-white w-100 border border-secondary">apply</button>
                      </div>
                    </div>
                  </div> */}

                  {/* <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                      <button
                        class="accordion-button text-dark bg-light"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#panelsStayOpen-collapseFour"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseFour"
                      >
                        Size
                      </button>
                    </h2>
                    <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse show" aria-labelledby="headingThree">
                      <div class="accordion-body">
                        <input type="checkbox" class="btn-check border justify-content-center" id="btn-check1" checked autocomplete="off" />
                        <label class="btn btn-white mb-1 px-1" style={{ width: '60px' }} for="btn-check1">XS</label>
                        <input type="checkbox" class="btn-check border justify-content-center" id="btn-check2" checked autocomplete="off" />
                        <label class="btn btn-white mb-1 px-1" style={{ width: '60px' }} for="btn-check2">SM</label>
                        <input type="checkbox" class="btn-check border justify-content-center" id="btn-check3" checked autocomplete="off" />
                        <label class="btn btn-white mb-1 px-1" style={{ width: '60px' }} for="btn-check3">LG</label>
                        <input type="checkbox" class="btn-check border justify-content-center" id="btn-check4" checked autocomplete="off" />
                        <label class="btn btn-white mb-1 px-1" style={{ width: '60px' }} for="btn-check4">XXL</label>
                      </div>
                    </div>
                  </div> */}
                  {all_attribute && all_attribute?.map((attribute, index) => {
                    return (
                      <div class="accordion-item" key={index}>
                        <h2 class="accordion-header" id={attribute._id}>
                          <button
                            className="accordion-button text-dark bg-light"
                            type="button"
                            onClick={() => toggleAttributeCollapse(attribute._id)}
                          >
                            {attribute.attribute_name}
                          </button>
                        </h2>
                        <div
                          id={index}
                          className={`collapse ${attributeCollapsed == attribute._id && attributeCollapsedStatus == true ? "show" : ""}`}
                          aria-labelledby={attribute._id}
                        >
                          <div class="accordion-body">
                            {attribute?.attribute_value?.map((attribute_value) => {
                              return (
                                <div class="form-check">
                                  <input class="form-check-input" type="checkbox" value={attribute_value._id} id={attribute_value._id} onChange={(e) => handleChangeAtribute(e.target.checked, attribute_value._id)} />
                                  <label class="form-check-label" for={attribute_value._id}>{attribute_value.attribute_value}</label>
                                </div>
                              )
                            })}

                          </div>
                        </div>
                      </div>
                    )
                  })}


                  {/* <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                      <button
                        className="accordion-button text-dark bg-light"
                        type="button"
                        onClick={toggleRatingCollapse}
                      >
                        ĐÁNH GIÁ
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseFour"
                      className={`accordion-collapse collapse ${ratingCollapsed ? "show" : ""}`}
                      aria-labelledby="headingFour"
                    >
                      <div class="accordion-body">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                          <label class="form-check-label" for="flexCheckDefault">
                            <i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i>
                            <i class="fas fa-star text-warning"></i>
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                          <label class="form-check-label" for="flexCheckDefault">
                            <i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i>
                            <i class="fas fa-star text-secondary"></i>
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                          <label class="form-check-label" for="flexCheckDefault">
                            <i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-secondary"></i>
                            <i class="fas fa-star text-secondary"></i>
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                          <label class="form-check-label" for="flexCheckDefault">
                            <i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-secondary"></i><i class="fas fa-star text-secondary"></i>
                            <i class="fas fa-star text-secondary"></i>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            {/*<!-- sidebar -->*/}

            {/*<!-- content -->*/}
            <div class="col-lg-9">

              <header class="d-sm-flex align-items-center border-bottom mb-4 pb-3 pt-4">
                <div class="ms-auto">
                  <select class="form-select d-inline-block w-auto border pt-1" onChange={(e) => setOption(e.target.value)}>
                    <option value="all">Tất Cả</option>
                    <option value="sale">Khuyến Mãi</option>
                    <option value="price_max">Giá Cao - Thấp</option>
                    <option value="price_min">Giá Thấp - Cao</option>
                    <option value="rating">Đánh Giá</option>
                    {/* <option value="2">High rated</option>
                    <option value="3">Randomly</option> */}
                  </select>

                  <div class="btn-group shadow-0 border">
                    <button onClick={() => setIsList(true)} class="btn btn-light" title="List view">
                      <i class="fa fa-bars fa-lg" style={{ color: '#f6831f' }}></i>
                    </button>
                    <button onClick={() => setIsList(false)} class="btn btn-light active" title="Grid view">
                      <i class="fa fa-th fa-lg" style={{ color: '#f6831f' }}></i>
                    </button>
                  </div>
                </div>
              </header>

              <div class="row justify-content-start mb-3">

                {pagedProducts.length > 0 ? pagedProducts.map((product, index) => {
                  return (
                    isList === true ? (
                      <ProductListItem product={product} key={index} />
                    )
                      :
                      (
                        <ProductItem product={product} key={index} />
                      )

                  )
                }) :
                  <div>
                    <div className="card-body pt-3 text-center">
                      <p style={{ color: '#545453' }}>Không có sản phẩm</p>
                    </div>
                  </div>
                }


              </div>


              <hr />


              {/* <!-- Pagination -->*/}
              <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center' }}>
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={handlePrevious}>Trước</button>
                  </li>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button style={{ backgroundColor: '', color: '#f6831f' }} className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={handleNext} >Sau</button>
                  </li>
                </ul>
              </div>
              {/*<!-- Pagination --> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );

}
export default Collections;