import { useDispatch, useSelector } from "react-redux";
import { getCategoryByParentId } from "../../store/actions";
import React, { useEffect, useState } from "react";
import CategoryChildItem from "./category_child_Item";

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
                    
                    <div className="col-md">
                        <div className="d-flex flex-column align-items-start" key={index}>
                            <div className="category-name fw-bold" style={{ textTransform: "uppercase" }}>{category.category_name}</div>
                            <CategoryChildItem catParentNull={catParentNull} child_category={category} all_category={all_category} />
                        </div>
                    </div>
                    
                )
            })}


        </>

    );

}

