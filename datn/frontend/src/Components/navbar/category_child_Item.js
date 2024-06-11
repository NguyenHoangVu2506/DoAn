import { useDispatch, useSelector } from "react-redux";
import { getCategoryByParentId } from "../../store/actions";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CategoryChildItem({ child_category, all_category }) {

    const [childrent_category, setchild_category] = useState(null);

    const getCategoryItem = async () => {
        setchild_category(all_category.filter((category) => category.parent_id == child_category._id))
    }
    useEffect(() => {
        getCategoryItem()
    }, []);

    return (
        <>
            {childrent_category && childrent_category.map((category, index) => {
                return (
                    <>
                        <div className="d-flex flex-column ">
                            <p> {category.category_name}</p>
                        </div>


                    </>
                )

            }
            )}

        </>

    );

}