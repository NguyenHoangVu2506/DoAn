import * as React from 'react';

import NewProduct from './NewProduct';
import BestProduct from './BestSellerProduct';



export default function ProHome() {
    const [value, setValue] = React.useState(2);
    return (
        <>
        <NewProduct/>
        <BestProduct/>
        </>
    );
}