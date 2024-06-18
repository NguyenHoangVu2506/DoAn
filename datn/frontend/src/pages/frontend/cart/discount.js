import React, { useEffect, useState } from 'react';
import './discount.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDiscount } from '../../../store/actions/discount-actions';

export default function CouponItem() {
    const [copied, setCopied] = useState(false);
    const [copiedCode, setCopiedCode] = useState('');
    const dispatch = useDispatch();

    const { all_discount } = useSelector((state) => state.discountReducer);

    useEffect(() => {
        if (!all_discount) {
            dispatch(getAllDiscount({ sort: 'ctime' }));
        }
    }, [all_discount, dispatch]);

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
            setCopiedCode('');
        }, 2000); // Reset after 2 seconds
    };

    return (
        <div className="row">
            <h5>Khuyến mãi dành cho bạn</h5>
            {Array.isArray(all_discount) && all_discount.map((item, index) => (
                <div className="col-lg-3" key={index}>
                    <div className="card shadow-0 border">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <p className="mb-0 fw-bold">{item.discount_name}</p>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <p className="mb-2">Mã: {item.discount_code}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="mb-2">HSD: {item.discount_end_date ? new Date(item.discount_end_date).toLocaleDateString() : ''}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <button
                                    className={`cp-btn button ${copied && copiedCode === item.discount_code ? 'disabled' : ''}`}
                                    onClick={() => handleCopy(item.discount_code)}
                                    data-coupon={item.discount_code}
                                >
                                    {copied && copiedCode === item.discount_code ? 'Đã sao chép' : 'Sao chép'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div className="col-lg-9">
            </div>
        </div>
    );
}
