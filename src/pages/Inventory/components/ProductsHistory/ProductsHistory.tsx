import { AgGridReact } from 'ag-grid-react';
import classNames from 'classnames';
import { MetaCard } from 'components/MetaCard/MetaCard';
import React, { useEffect, useState } from 'react';
import { getAllProducts } from 'requests/product';
import { toggleSliderModal } from 'store/models/sliderModal';
import { store } from 'store/store';
import { generalUtilities } from 'utilities/utilities';
import { Button } from '@sellerspot/universal-components';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import { IAddProductFormSchema } from '../AddProduct/addProduct.types';
import {
    compileProductsHistoryTableBodyData,
    getProductsHistoryTableColDef,
} from './productsHistory.actions';
import styles from './productsHistory.module.scss';

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
                        onClick={() =>
                            store.dispatch(
                                toggleSliderModal({
                                    sliderName: 'addProductSlider',
                                    active: true,
                                    autoFillData: null,
                                }),
                            )
                        }
                    />,
                ]}
            />
            <div className={classNames('ag-theme-alpine')}>
                <AgGridReact
                    columnDefs={getProductsHistoryTableColDef()}
                    rowData={compileProductsHistoryTableBodyData(productsData)}
                    suppressCellSelection
                    onRowClicked={(event) => {
                        // compiling data to push to page
                        const autoFillData: IAddProductFormSchema = {
                            name: productsData[event.rowIndex].name,
                            brand: productsData[event.rowIndex].brand,
                            category: productsData[event.rowIndex].category,
                            gtinNumber: productsData[event.rowIndex].gtinNumber,
                            landingPrice: productsData[event.rowIndex].landingPrice,
                            availableStock:
                                productsData[event.rowIndex].stockInformation.availableStock,
                            mrpPrice: productsData[event.rowIndex].mrpPrice,
                            profitPercent: productsData[event.rowIndex].profitPercent,
                            sellingPrice: productsData[event.rowIndex].sellingPrice,
                            stockUnit: productsData[event.rowIndex].stockInformation.stockUnit,
                            taxBrackets: productsData[event.rowIndex].taxBracket,
                        };
                        store.dispatch(
                            toggleSliderModal({
                                sliderName: 'addProductSlider',
                                active: true,
                                autoFillData: autoFillData,
                            }),
                        );
                    }}
                />
                s
            </div>
        </div>
    );
};
