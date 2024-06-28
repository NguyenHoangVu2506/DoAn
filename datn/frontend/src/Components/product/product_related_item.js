import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

export default function ProductRelatedItem({product}) {
    
    return (
        <>
            <div className="d-flex mb-3">
                <Link to={`/product/${product.product_slug}-${product._id}`} className="me-3">
                    <img src={product.product_thumb[0]} style={{ minWidth: '96px', height: '96px' }} className="img-md img-thumbnail" />
                </Link>
                <div className="info">
                    <a href="#" className="nav-link mb-1">
                      {product.product_name} <br />
                    </a>
                    <strong className="text-dark"><NumericFormat value={product.product_price} displayType="text" thousandSeparator={true} decimalScale={0} id="price" suffix="đ" /></strong>
                </div>
            </div>

        </>
    )
}