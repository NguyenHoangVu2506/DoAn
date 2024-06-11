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
                    <div className="d-flex flex-column justify-content-center align-items-center " key={index}>
                        <button className="btn btn-primary " style={{ textTransform: "uppercase" }}>{category.category_name}</button>
                        <CategoryChildItem child_category={category} all_category={all_category} key={index} />
                    </div>
                )
            })}

        </>

    );

}