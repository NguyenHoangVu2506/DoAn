import React, { useState, useEffect } from "react";
import accounting from "accounting";

function ProductModel() {
    const [largeImageSrc, setLargeImageSrc] = useState("");
    const [product, setProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedDimension, setSelectedDimension] = useState(null);

    // Mock product data
    useEffect(() => {
        const mockProduct = {
            name: "Cherry",
            description: "Delicious cherry with multiple sizes.",
            type: "Fruit",
            color: "Red",
            material: "Fresh",
            brand: "Nature's Best",
            sizes: [
                {
                    size: "1kg",
                    dimensions: [
                        {
                            dimension: "11cm",
                            price: 100000,
                            salePrice: 90000,
                            image: "https://product.hstatic.net/200000528965/product/1_3fa0381c308448e19504070ede04dc6a_master.png"
                        }
                    ]
                },
                {
                    size: "2kg",
                    dimensions: [
                        {
                            dimension: "12cm",
                            price: 180000,
                            salePrice: 160000,
                            image: "https://product.hstatic.net/200000528965/product/z4346622267565_56e777b719beaeb9fea73a63435a148d_c6c3b846c207426db13889683afbea26_master.jpg"
                        }
                    ]
                },
                {
                    size: "3kg",
                    dimensions: [
                        {
                            dimension: "13cm",
                            price: 250000,
                            salePrice: 220000,
                            image: "https://product.hstatic.net/200000528965/product/z4346622267597_35e408a00ce9a5f38fb1087007171ed5_be29caa54fa94671a12381556a739c78_master.jpg"
                        }
                    ]
                },
                {
                    size: "4kg",
                    dimensions: [
                        {
                            dimension: "14cm",
                            price: 320000,
                            salePrice: 280000,
                            image: "https://product.hstatic.net/200000528965/product/z4346622272316_1801537b57cbbadf734d301af76e72a7_51bb6aa963ff4de68404de1f183bc892_master.jpg"
                        }
                    ]
                },
                {
                    size: "5kg",
                    dimensions: [
                        {
                            dimension: "15cm",
                            price: 380000,
                            salePrice: 330000,
                            image: "https://product.hstatic.net/200000528965/product/z4358747855645_d97476ab0c11f797ba7593ee661183b7_df0d204f1c3d47f68b3f7f7dc53cef6b_master.jpg"
                        }
                    ]
                }
            ],
            stock: 25,
            orders: 154,
            rating: 4.5
        };
        setProduct(mockProduct);
        setSelectedSize(mockProduct.sizes[0]); // Set initial size
        setSelectedDimension(mockProduct.sizes[0].dimensions[0]); // Set initial dimension
        setLargeImageSrc(mockProduct.sizes[0].dimensions[0].image); // Set initial large image
    }, []);

    const handleSizeChange = (size) => {
        setSelectedSize(size);
        setSelectedDimension(size.dimensions[0]);
        setLargeImageSrc(size.dimensions[0].image);
    };

    const handleDimensionChange = (dimension) => {
        setSelectedDimension(dimension);
        setLargeImageSrc(dimension.image);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <button type="button" className="btn btn-primary" onClick={openModal}>
                Open Modal
            </button>
            
            {showModal && (
                <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <section>
                                    <div className="container">
                                        <div className="row gx-2">
                                            <aside className="col-lg-6">
                                                <div className="border rounded-4 mb-3 d-flex justify-content-center">
                                                    <a data-fslightbox="mygalley" className="rounded-4" target="_blank" data-type="image">
                                                        <img style={{ maxWidth: '100%', maxHeight: '100vh', margin: 'auto' }} className="rounded-4 fit" src={largeImageSrc} />
                                                    </a>
                                                </div>
                                                <div className="d-flex justify-content-center mb-3">
                                                    {product.sizes && product.sizes.map((size, index) => (
                                                        <a key={index} data-fslightbox="mygalley" className="border mx-1 rounded-2" target="_blank" data-type="image" onClick={() => handleSizeChange(size)}>
                                                            <img width="60" height="60" className="rounded-2" src={size.dimensions[0].image} />
                                                        </a>
                                                    ))}
                                                </div>
                                            </aside>
                                            <main className="col-lg-6">
                                                <div className="ps-lg-2">
                                                    <h4 className="title text-dark">
                                                        {product.name}
                                                    </h4>
                                                    <div className="d-flex flex-row my-3">
                                                        <div className="text-warning mb-1 me-2">
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fas fa-star-half-alt"></i>
                                                            <span className="ms-1">
                                                                {product.rating}
                                                            </span>
                                                        </div>
                                                        <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1"></i>{product.orders} orders</span>
                                                        <span className="text-success ms-1">
                                                            Còn {product.stock} sản phẩm
                                                        </span>
                                                    </div>
                                                    <div className="mb-3">
                                                        <>
                                                            <h5 className="mb-1 me-1">{accounting.formatNumber(selectedDimension.price, 0, ".", ",")} <span className="text-muted">đ</span></h5>
                                                            <span className="text-danger"><s>{accounting.formatNumber(selectedDimension.salePrice, 0, ".", ",")} <span className="text-muted">đ</span></s></span>
                                                        </>
                                                    </div>

                                                    <p>{product.description}</p>

                                                    <div className="row">
                                                        <div className="col-12 mb-3">
                                                            <label className="mb-2">Size:</label>
                                                            <div>
                                                                {product.sizes.map((size, index) => (
                                                                    <button
                                                                        key={index}
                                                                        className={`btn ${size.size === selectedSize.size ? 'btn-outline-primary btn-square-md' : 'btn-outline-secondary  btn-square-md'} mx-1`}

                                                                        onClick={() => handleSizeChange(size)}
                                                                    >
                                                                        {size.size}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="col-12 mb-3">
                                                            <label className="mb-2">Dimension:</label>
                                                            <div>
                                                                {selectedSize.dimensions.map((dimension, index) => (
                                                                    <button
                                                                        key={index}
                                                                        className={`btn ${dimension.dimension === selectedDimension.dimension ? 'btn-outline-primary btn-square-md' : 'btn-outline-success btn-square-md'} mx-1`}
                                                                        onClick={() => handleDimensionChange(dimension)}
                                                                    >
                                                                        {dimension.dimension}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />

                                                    <div className="row mb-2">
                                                        <div className="col-md-4 col-6 mb-1">
                                                            <label className="mb-2 d-block">Quantity</label>
                                                            <div className="input-group mb-1" style={{ width: '170px' }}>
                                                                <button className="btn btn-white border border-secondary px-3" type="button" >
                                                                    <i className="fas fa-minus"></i>
                                                                </button>
                                                                <input
                                                                    type="number"
                                                                    className="form-control text-center border border-secondary"
                                                                    aria-label="Example text with button addon"
                                                                    aria-describedby="button-addon1"
                                                                />
                                                                <button className="btn btn-white border border-secondary px-3" type="button" >
                                                                    <i className="fas fa-plus"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button className="btn btn-primary shadow-0"> <i className="me-1 fa fa-shopping-basket"></i>Thêm vào giỏ hàng</button>
                                                </div>
                                            </main>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductModel;
