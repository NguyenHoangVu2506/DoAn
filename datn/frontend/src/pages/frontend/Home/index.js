import * as React from 'react';

import Slider from '../slider/SliderShow';
import ProHome from './Product/ProHome';
import CategoryList from './CategoryList';
import PostHome from './PostHome';
import { getCategoryByParentId, getProductByCatId, AllCategory } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
<<<<<<< HEAD
import { Helmet } from 'react-helmet';
=======
>>>>>>> origin/main

export default function Home() {

    const dispatch = useDispatch();
    const { current_category, all_category } = useSelector((state) => state.categoryReducer);
    const { productByCategory = [] } = useSelector((state) => state.productReducer);

    React.useEffect(() => {
        dispatch(AllCategory())
    }, []);
    React.useEffect(() => {
        dispatch(getCategoryByParentId({ parent_id: null }))
    }, [productByCategory]);
    React.useEffect(() => {
        dispatch(getProductByCatId({ filter: { isPublished: true, category_id: null } }))
    }, [all_category]);
<<<<<<< HEAD
    return (
        <>
            <Helmet>
                <title>Trang chủ - HoangVu</title>
            </Helmet>
=======

    React.useEffect(() => {
        document.title = 'Hoàng Vũ Beauty';
      }, []);
    return (
        <>
>>>>>>> origin/main
            <Slider />
            {current_category && (
                all_category && (
                    current_category.map((cat, index) => {
                        return < CategoryList key={index} all_product_category={productByCategory ? productByCategory : []} category_parent={cat} all_category={all_category} />
                    })
                )

            )}
            <ProHome />
            <PostHome />
        </>
    );
}