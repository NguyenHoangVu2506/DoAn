import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import accounting from "accounting";
import { CButton, CCol, CRow } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, getListBrand, getProductById } from '../../../store/actions'; // Ensure this import is correct
import CIcon from "@coreui/icons-react";
import { cilBackspace, cilPlus, cilReload } from "@coreui/icons";

function ProductShow() {
    const { product_slug_id } = useParams();

    const dispatch = useDispatch();
    const product_id = product_slug_id ? product_slug_id.split('-').pop() : null;
    const { listProductById } = useSelector((state) => state.productReducer);
    const { allBrand } = useSelector((state) => state.brandReducer);
    const { listCategory } = useSelector((state) => state.categoryReducer);

    useEffect(() => {
        if (!allBrand) {
            dispatch(getListBrand({ sort: 'ctime' }));
        }
    }, [dispatch, allBrand]);

    useEffect(() => {
        if (!listCategory) {
            dispatch(getCategory({ sort: 'ctime' }));
        }
    }, [dispatch, listCategory]);
    console.log(listCategory)

    useEffect(() => {
        if (product_id && !listProductById) {
            dispatch(getProductById({ spu_id: product_id }));
        }
    }, [product_id, listProductById, dispatch]);

    if (!listProductById) {
        return <div>Loading...</div>;
    }

    const product = listProductById.spu_info;

    const brandName = allBrand?.find(brand => brand._id === product.product_brand)?.brand_name || 'Unknown Brand';
    const categoryNames = product.product_category.map(catId => {
        console.log(catId)
        return listCategory?.find(category => category._id === catId)?.category_name || 'Unknown Category';
    }).join(', ');

    return (
        <div className="admin content-wrapper">
            <section className="content">
                <div className="card">
                    <div className="card-body">
                        <CRow>
                            <Link to="/product/productlist"> {/* Update this link to the correct path */}
                                <CButton color="primary" variant="outline" size="sm" className="mb-3">
                                    <CIcon icon={cilReload} title="Quay lại" />
                                    Quay lại
                                </CButton>
                            </Link>
                            <CCol sm={6} xl={5} xxl={3}>
                                <div className="border rounded-4 mb-3 d-flex justify-content-center">
                                    <a data-fslightbox="mygalley" className="rounded-4" target="_blank" data-type="image">
                                        <img style={{ maxWidth: '100%', maxHeight: '100vh', margin: 'auto' }} className="rounded-4 fit"
                                            src={product.product_thumb[0]} />
                                    </a>
                                </div>
                            </CCol>
                            <CCol sm={6} xl={7} xxl={3}>
                                <div className="ps-lg-3">
                                    <h4 className="title text-dark">
                                        {product.product_name}
                                    </h4>
                                    <div className="d-flex flex-row my-3">
                                        <span className="text-success ms-2">Số Lượng: {product.product_quantity}</span>
                                    </div>
                                    <div className="mb-3">
                                        <span className="h4 fw-bold">
                                            {accounting.formatNumber(product.product_price, 0, ".", ",")} đ
                                        </span>
                                        <span className="text-muted">/{product.product_unit}</span>
                                    </div>
                                    <p className="pt-3 text-dark">
                                        Mô tả: {product.product_short_description}
                                    </p>
                                    <div className="row">
                                        <dt className="col-3">Danh mục</dt>
                                        <dd className="col-9 fw-bold">{categoryNames}</dd>
                                    </div>
                                    <div className="row">
                                        <dt className="col-3">Thương Hiệu</dt>
                                        <dd className="col-9 fw-bold">{brandName}</dd>
                                    </div>
                                    <hr />
                                    <p className="pt-3 text-dark">
                                        Chi tiết: {product.product_detail}
                                    </p>
                                </div>
                            </CCol>
                        </CRow>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProductShow;
