import React, { useState } from 'react';

    export default function CouponItem({ imgSrc, title, description, code }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    };

    return (
        <div className="col-12 col-md-6 col-xl-3 coupon-item">
            <div className="coupon-item__inner">
                <div className="coupon-item__left">
                    <div className="cp-img boxlazy-img">
                        <span className="boxlazy-img__insert">
                            <img className="ls-is-cached lazyloaded" src="//theme.hstatic.net/200000528965/1001037678/14/home_coupon_1_img.png?v=534" alt="Miễn phí vận chuyển đơn hàng từ 500.000đ" />
                        </span>
                    </div>
                </div>
                <div className="coupon-item__right">
                    <button type="button" className="cp-icon is-active" data-toggle="popover" data-container="body" data-placement="bottom" data-popover-content="#cp-tooltip-1" data-class="coupon-popover" title="" data-original-title="Miễn phí vận chuyển đơn hàng từ 500.000đ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                            <defs>
                                <path id="4gg7gqe5ua" d="M8.333 0C3.738 0 0 3.738 0 8.333c0 4.595 3.738 8.334 8.333 8.334 4.595 0 8.334-3.739 8.334-8.334S12.928 0 8.333 0zm0 1.026c4.03 0 7.308 3.278 7.308 7.307 0 4.03-3.278 7.308-7.308 7.308-4.03 0-7.307-3.278-7.307-7.308 0-4.03 3.278-7.307 7.307-7.307zm.096 6.241c-.283 0-.512.23-.512.513v4.359c0 .283.23.513.512.513.284 0 .513-.23.513-.513V7.78c0-.283-.23-.513-.513-.513zm.037-3.114c-.474 0-.858.384-.858.858 0 .473.384.857.858.857s.858-.384.858-.857c0-.474-.384-.858-.858-.858z"></path>
                            </defs>
                            <g>
                                <g>
                                    <g>
                                        <g>
                                            <g>
                                                <g transform="translate(-2808 -4528) translate(2708 80) translate(52 4304) translate(48 144) translate(1.667 1.667)">
                                                    <use xlinkHref="#4gg7gqe5ua"></use>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </button>
                    <div className="cp-top">
                        <h3>Miễn phí vận chuyển đơn hàng từ 500.000đ</h3>
                        <p>Đơn hàng từ 500.000đ</p>
                    </div>
                    <div className="cp-bottom">
                        <div className="cp-bottom-detail">
                            <p>Mã: <strong>FREESHIP-01</strong></p>
                            <p>HSD: </p>
                        </div>
                        <div className="cp-bottom-btn">
                            <button className={`cp-btn button ${copied ? 'disabled' : ''}`} onClick={handleCopy} data-coupon={code}>
                                {copied ? 'Đã sao chép' : 'Sao chép'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

