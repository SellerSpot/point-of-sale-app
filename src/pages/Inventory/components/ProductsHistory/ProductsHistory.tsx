import { AgGridReact } from 'ag-grid-react';
import classNames from 'classnames';
import { MetaCard } from 'components/MetaCard/MetaCard';
import React, { useEffect, useState } from 'react';
import { getAllProducts } from 'requests/product';
import { generalUtilities } from 'utilities/utilities';
import { Button } from '@sellerspot/universal-components';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import {
    compileProductsHistoryTableBodyData,
    getProductsHistoryTableColDef,
} from './productsHistory.actions';
import styles from './productsHistory.module.scss';

// import { getProducts } from 'requests/product';
// import { toggleSliderModal } from 'store/models/sliderModal';
// import { IGetProductFromServer } from 'typings/components/product.types';

// import {
//     compileProductsTableBodyData,
//     handleProductsHistoryTableRowClick,
// } from './productsHistory.actions';

export const ProductsHistory = (): JSX.Element => {
    const [productsData, setProductsData] = useState<
        pointOfSaleTypes.productResponseTypes.IGetAllProducts['data']
    >([]);

    // getting all products
    useEffect(() => {
        (async () => {
            // To populate the table
            const productsData = await getAllProducts();
            // updating local state
            setProductsData(productsData);
        }).call(null);
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
                <AgGridReact
                    columnDefs={getProductsHistoryTableColDef()}
                    rowData={compileProductsHistoryTableBodyData(productsData)}
                />
                s
            </div>
        </div>
    );
};
