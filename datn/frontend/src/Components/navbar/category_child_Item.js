import { useDispatch, useSelector } from "react-redux";
import { getCategoryByParentId } from "../../store/actions";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function CategoryChildItem({ child_category, all_category }) {

    const [childrent_category, setchild_category] = useState(null);
    const [productByCategory, setProductByCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState()


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
                        <Link to ={`/collections/${category.category_slug}`}className="d-flex flex-column text-dark " style={{color:"dark", hover:"white"}}>
                            <p> {category.category_name}</p>
                        </Link>
                        


                    </>
                )

            }
            )}

        </>

    );

}