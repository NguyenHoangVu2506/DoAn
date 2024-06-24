import { useDispatch, useSelector } from "react-redux";
import { AllCategory, getAllAttribute, getAttribute, getCategoryByParentId, getProductByCatId, onAllProduct } from "../../../store/actions";
import ProductListItem from "../../../Components/product/productListItem";
import React, { useEffect, useState } from "react";
import ProductItem from "../../../Components/product/productItem";
import { getListBrand } from "../../../store/actions/brand-actions";
import { Link, useParams } from "react-router-dom";

function Collections() {
  const { category0_slug, category1_slug, category2_slug } = useParams();
  const dispatch = useDispatch();
  const [isList, setIsList] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { allProducts } = useSelector((state) => state.productReducer);
  const { all_brand } = useSelector((state) => state.brandReducer);
  const { all_category } = useSelector((state) => state.categoryReducer);
  const { all_attribute } = useSelector((state) => state.attributeReducer);


  const [categoriesParentNull, setCategoriesParentNull] = useState([])
  const [productByFilter, setProductByFilter] = useState([])

  const [selectedBrand, setSelectedBrand] = useState([])
  const [selectedAttribute, setSelectedAttribute] = useState([])

  const [categoryCollapsed, setCategoryCollapsed] = useState(0);
  const [categoryCollapsedStatus, setCategoryCollapsedStatus] = useState(false);
  const [brandCollapsed, setBrandCollapsed] = useState(false);
  const [attributeCollapsed, setAttributeCollapsed] = useState(false);
  const [attributeCollapsedStatus, setAttributeCollapsedStatus] = useState(false);
  const [priceCollapsed, setPriceCollapsed] = useState(false);
  const [ratingCollapsed, setRatingCollapsed] = useState(false);


  useEffect(() => {
    all_category && setCategoriesParentNull(all_category?.filter((cat) => cat.parent_id == null))
  }, [all_category])


  useEffect(() => {
    all_category && setCategoriesParentNull(all_category?.filter((cat) => cat.parent_id == null))
  }, [all_category])

  const changeSelectedCategory = async (category) => {
  }
  const handleChangeBrand = async (checked, brand_id) => {
    if (checked === true) {
      setSelectedBrand([...selectedBrand, brand_id])

    }
    if (checked === false) {
      setSelectedBrand(selectedBrand.length > 0 && selectedBrand?.filter((brandId) => brandId != brand_id))
    }
  }
  const loadData = async () => {
    const filterByBrand = await allProducts?.length > 0 ? allProducts?.filter((prod) => selectedBrand.includes(prod.product_brand) === true) : []

    const filterByAttribute = await allProducts?.length > 0 ? allProducts?.map(({ product_attributes }) => {
      return product_attributes.map(({ attribute_value }) => {
        return attribute_value.map(({ value_id }) => selectedAttribute.includes(value_id) === true)
      })
    }) : []
    const arrConcat = filterByBrand.concat(...filterByAttribute)
    // const uniqueProduct = new Set(...arrConcat)
    console.log(arrConcat)
    // setProductByFilter([...uniqueProduct])
  }

  useEffect(() => {
    loadData()
  }, [selectedBrand, selectedAttribute])


  const handleChangeAtribute = async (checked, attribute_value_id) => {
    if (checked === true) {
      setSelectedAttribute([...selectedAttribute, attribute_value_id])
    }
    if (checked === false) {
      setSelectedAttribute(selectedAttribute?.filter((attribute) => attribute != attribute_value_id))
    }
  }

  const toggleBrandCollapse = () => {
    setBrandCollapsed(!brandCollapsed);
  };

  const toggleAttributeCollapse = (id) => {
    setAttributeCollapsed(id);
    setAttributeCollapsedStatus(!attributeCollapsedStatus)

  };

  const toggleCategoryCollapse = (id) => {
    setCategoryCollapsed(id);
    setCategoryCollapsedStatus(!categoryCollapsedStatus)
  };

  const togglePriceCollapse = () => {
    setPriceCollapsed(!priceCollapsed);
  };

  const toggleRatingCollapse = () => {
    setRatingCollapsed(!ratingCollapsed);
  };

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
  console.log(allProducts.length)
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
    <>
      <section class="">
        <div class="container">
          <div class="row">
            {/*<!-- sidebar -->*/}
            <div class="col-lg-3">
              {/*<!-- Toggle button -->*/}
              <button
                class="btn btn-outline-secondary mb-3 w-100 d-lg-none"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span>Show filter</span>
              </button>
              {/*<!-- Collapsible wrapper -->*/}
              <div class="collapse card d-lg-block mb-5" id="navbarSupportedContent">
                <div class="accordion" id="accordionPanelsStayOpenExample">

                  {categoriesParentNull && categoriesParentNull?.map((categoryParentnull, index) => {
                    return (
                      <div class="accordion-item" key={index}>
                        <h2 class="accordion-header" id={categoryParentnull._id}>
                          <button
                            className="accordion-button text-dark bg-light"
                            type="button"
                            onClick={() => toggleCategoryCollapse(categoryParentnull._id)}
                          >{categoryParentnull.category_name}</button>

                        </h2>
                        <div
                          id={index}
                          className={`collapse ${categoryCollapsed == categoryParentnull._id && categoryCollapsedStatus == true ? "show" : ""}`}
                          aria-labelledby={categoryParentnull._id}
                        >
                          <div class="accordion-body">
                            <div className="d-flex flex-column justify-content-start ">
                              {all_category && all_category?.map((category) => {
                                if (category.parent_id == categoryParentnull._id) {
                                  return (
                                    <div onClick={() => changeSelectedCategory(category._id)} className="d-flex flex-column justify-content-start " >
                                      {category.category_name}
                                    </div>
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

                  <div class="accordion-item">
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
                    >                      <div class="accordion-body">
                        <div class="range">
                          <input type="range" class="form-range" id="customRange1" />
                        </div>
                        <div class="row mb-3">
                          <div class="col-6">
                            <p class="mb-0">
                              Min
                            </p>
                            <div class="form-outline">
                              <input type="number" id="typeNumber" class="form-control" />
                              <label class="form-label" for="typeNumber">$0</label>
                            </div>
                          </div>
                          <div class="col-6">
                            <p class="mb-0">
                              Max
                            </p>
                            <div class="form-outline">
                              <input type="number" id="typeNumber" class="form-control" />
                              <label class="form-label" for="typeNumber">$1,0000</label>
                            </div>
                          </div>
                        </div>
                        <button type="button" class="btn btn-white w-100 border border-secondary">apply</button>
                      </div>
                    </div>
                  </div>

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


                  <div class="accordion-item">
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
                        {/*<!-- Default checkbox -->*/}
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                          <label class="form-check-label" for="flexCheckDefault">
                            <i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i>
                            <i class="fas fa-star text-warning"></i>
                          </label>
                        </div>
                        {/*<!-- Default checkbox -->*/}
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                          <label class="form-check-label" for="flexCheckDefault">
                            <i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i>
                            <i class="fas fa-star text-secondary"></i>
                          </label>
                        </div>
                        {/*<!-- Default checkbox -->*/}
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                          <label class="form-check-label" for="flexCheckDefault">
                            <i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-secondary"></i>
                            <i class="fas fa-star text-secondary"></i>
                          </label>
                        </div>
                        {/*<!-- Default checkbox -->*/}
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                          <label class="form-check-label" for="flexCheckDefault">
                            <i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-secondary"></i><i class="fas fa-star text-secondary"></i>
                            <i class="fas fa-star text-secondary"></i>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*<!-- sidebar -->*/}

            {/*<!-- content -->*/}
            <div class="col-lg-9">

              <header class="d-sm-flex align-items-center border-bottom mb-4 pb-3">
                <div class="ms-auto">

                  <div class="btn-group shadow-0 border">
                    <button onClick={() => setIsList(true)} class="btn btn-light" title="List view">
                      <i class="fa fa-bars fa-lg"></i>
                    </button>
                    <button onClick={() => setIsList(false)} class="btn btn-light active" title="Grid view">
                      <i class="fa fa-th fa-lg"></i>
                    </button>
                  </div>
                </div>
              </header>

              <div class="row justify-content-start mb-3">



                {newproduct && allProducts.length > 0 ? newproduct.map((product, index) => {

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


              {/*<!-- Pagination -->*/}
              <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center' }}>
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={handlePrevious}>Trước</button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                        <button style={{ backgroundColor: '#f6831f', color: 'white' }} className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={handleNext} >Next</button>
                    </li>
                  </ul>
                </div>
              {/*<!-- Pagination -->*/}
            </div>
          </div>
        </div>
      </section>
    </>
  );

}
export default Collections;