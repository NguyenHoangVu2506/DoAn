import * as React from 'react';

import NewProduct from './NewProduct';
import SaleProduct from './SaleProduct';
// import BestProduct from './BestSellerProduct';



export default function ProHome() {
    const [value, setValue] = React.useState(2);
    return (
        <>
        <NewProduct/>
        {/* <SaleProduct/> */}
        </>
    );
}