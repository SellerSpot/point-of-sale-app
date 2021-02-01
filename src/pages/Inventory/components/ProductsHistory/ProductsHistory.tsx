import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import classNames from 'classnames';
import { MetaCard } from 'components/MetaCard/MetaCard';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { generalUtilities } from 'utilities/utilities';
import { Button, Table } from '@sellerspot/universal-components';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import { getProductsHistoryTableColDef } from './productsHistory.actions';
import styles from './productsHistory.module.scss';

// import { getProducts } from 'requests/product';
// import { toggleSliderModal } from 'store/models/sliderModal';
// import { IGetProductFromServer } from 'typings/components/product.types';

// import {
//     compileProductsTableBodyData,
//     handleProductsHistoryTableRowClick,
// } from './productsHistory.actions';

export const ProductsHistory = (): JSX.Element => {
    // To manage which tab is selected
    const dispatch = useDispatch();
    const [
        productsData,
        setProductsData,
    ] = useState<pointOfSaleTypes.productResponseTypes.IGetProducts>(null);

    useEffect(() => {
        // (async () => {
        //     // To populate the table
        //     const productsData = await getProducts();
        //     setProductsData(productsData.data as IGetProductFromServer[]);
        // }).call(null);
    }, []);
    return (
        <div className={styles.productsWrapper}>
            <MetaCard
                title="Sample Description"
                secondaryText={'Sample Data'}
                buttons={[
                    <Button
                        key={'addProduct'}
                        label={`Add Product (${generalUtilities.GLOBAL_KEYBOARD_SHORTCUTS.ADD_PRODUCT})`}
                        // onClick={() =>
                        //     dispatch(
                        //         toggleSliderModal({ sliderName: 'addProductSlider', active: true }),
                        //     )
                        // }
                    />,
                ]}
            />
            <div className={classNames('ag-theme-alpine')}>
                <AgGridReact columnDefs={getProductsHistoryTableColDef()} />s
            </div>
        </div>
    );
};
