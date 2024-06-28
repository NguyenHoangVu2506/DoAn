import { useDispatch, useSelector } from "react-redux";
import { getCategoryByParentId } from "../../store/actions";
import React, { useEffect, useState } from "react";
import CategoryChildItem from "./category_child_Item";
import { Link } from "react-router-dom";

export default function CategoryItem({ catParentNull, all_category }) {
    const [categoryItem, setCategoryItem] = useState(null);

    const getCategoryItem = async () => {
        setCategoryItem(all_category.filter((category) => category.parent_id == catParentNull._id))
    }
    useEffect(() => {
        getCategoryItem()
    }, []);
    return (
        <>
            {categoryItem && categoryItem.map((category, index) => {
                return (

                    <div className="col-md" key={index}>
                        <div className="d-flex flex-column align-items-start" key={index}>
                            <Link to={`/collections/${catParentNull.category_slug}/${category.category_slug}`} className=" category-name fw-bold d-flex flex-column text-dark " 
                            style={{ color: "dark", hover: "white", textTransform: "uppercase" }} key={index}>
<<<<<<< HEAD
                                <p> {category.category_name}</p>
=======
                                <p > {category.category_name}</p>
>>>>>>> origin/main
                            </Link>
                            {/* <div className="category-name fw-bold" style={{ textTransform: "uppercase" }}>{category.category_name}</div> */}
                            <CategoryChildItem catParentNull={catParentNull} child_category={category} all_category={all_category} />
                        </div>
                    </div>

                )
            })}


        </>

    );

}

