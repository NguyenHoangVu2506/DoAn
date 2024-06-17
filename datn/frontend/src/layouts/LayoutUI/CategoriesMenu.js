import { Space } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "./MenuHeader";
import { useDispatch, useSelector } from "react-redux";
import { AllCategory } from "../../store/actions";
import CategoryItem from "../../Components/navbar/categoryItem";

const Categories = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(null);

    const handleDropdownMouseEnter = () => {
        setIsDropdownOpen(true);
    };
    const dispatch = useDispatch();

    const { all_category } = useSelector((state) => state.categoryReducer);
    const { productByCategory } = useSelector((state) => state.productReducer);


    const [categoryParentNull, setCategoryParentNull] = useState(null)

    useEffect(() => {
        if (!all_category) {
            dispatch(AllCategory({ isPublished: true }));
        }
    }, []);

    useEffect(() => {
        all_category && (!categoryParentNull && setCategoryParentNull(all_category.filter((category) => category.parent_id == null)))
        console.log(categoryParentNull)
        categoryParentNull && (!activeTab && setActiveTab(categoryParentNull[0]._id))
    }, [all_category]);

    const handleDropdownMouseLeave = () => {
        setIsDropdownOpen(false);
    };
    const handleTabMouseEnter = (tabId) => {
        setActiveTab(tabId);
    };


    return (
            <nav class="navbar navbar-expand-lg navbar-light bg-white ">
                <div class="container justify-content-center justify-content-md-between">
                    <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarLeftAlignExample"
                        aria-controls="navbarLeftAlignExample" aria-expanded="false" aria-label="Toggle navigation" onClick={() => {
                            document.getElementById('navbarLeftAlignExample').classList.toggle('show');
                        }}>
                        {/* <i className="fas fa-bars"></i> */}
                    </button>
                    <div class="collapse navbar-collapse" id="navbarLeftAlignExample">
                        <ul class="navbar-nav me-auto mb-1 mb-lg-0">
                            <div class="btn-group shadow-0"
                                onMouseEnter={handleDropdownMouseEnter}
                                onMouseLeave={handleDropdownMouseLeave}
                            >
                                <button type="button" class="btn btn-light category-name fw-bold me-5 " style={{ cursor: 'pointer', color: '#f6831f', marginRight: '3px' }} >
                                    <i class="fas fa-bars" style={{ cursor: 'pointer', color: '#f6831f', marginRight: '3px' }}></i>
                                    DANH MỤC
                                </button>

                                <ul
                                    class={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}
                                    style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        right: 0,
                                        zIndex: 1000000000,
                                        width: '933%',
                                        minWidth: '100%',
                                        maxWidth: 'none',
                                        padding: '0.5rem 0',
                                    }}

                                >
                                    <div class="row">
                                        <div class="col-3">
                                            {categoryParentNull && categoryParentNull.map((category, index) => {
                                                return (
                                                    <div class="list-group list-group-light" id="list-tab" role="tablist" key={index}>
                                                        <a
                                                            className={`list-group-item list-group-item-action px-3 border-0 ${activeTab == category._id ? 'active' : ''}`}
                                                            id="list-home-list"
                                                            data-mdb-list-init

                                                            role="tab"
                                                            aria-controls={activeTab}
                                                            onMouseEnter={() => handleTabMouseEnter(category._id)}
                                                        >
                                                            {
                                                                category.category_name
                                                            } </a>

                                                    </div>

                                                )

                                            })}
                                        </div>

                                        <div class="col-9">
                                            <div class="tab-content" id="nav-tabContent">
                                                {categoryParentNull && categoryParentNull.map((catParentNull, index) => {
                                                    return (
                                                        <div className={`tab-pane fade justify-content-start bg-white ${activeTab == catParentNull._id ? 'show active' : ''}`}
                                                            id={catParentNull._id} role="tabpanel" aria-labelledby="list-home-list" key={index}>
                                                            <div className="row ">
                                                                <CategoryItem catParentNull={catParentNull} all_category={all_category} key={index} />
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                </ul>

                            </div>

                            <Menu />

                        </ul>

                    </div>
                </div>

            </nav>
    );

}
export default Categories
