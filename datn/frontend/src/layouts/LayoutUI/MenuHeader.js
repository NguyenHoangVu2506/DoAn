

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getListMenu } from "../../store/actions";
import './style.css';

export default function Menu() {
    const dispatch = useDispatch();
    const { all_menu } = useSelector((state) => state.menuReducer);


    useEffect(() => {
        if (!all_menu) {
            dispatch(getListMenu({ isPublished: true }));
        }
    }, [all_menu]);



    return (
        // <!-- Blog -->
            <ul class="navbar-nav ms-3 mt-2 justify-content-center " >
                {all_menu && all_menu.map((menu, index) => {
                    return (
                        <>
                            <li class="category-name fw-bold  me-5 " style={{ textTransform: "uppercase" }}>
                                <Link to={menu.menu_link} className=" category-name fw-bold " >
                                  <p style={{color: '#f6831f'}} >{menu.menu_name}</p> 
                                </Link>
                            </li>
                        </>
                    )
                }
                )}
</ul>



    );
}


