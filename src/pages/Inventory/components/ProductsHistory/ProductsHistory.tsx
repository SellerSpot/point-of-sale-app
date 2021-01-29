import { Button, Table } from '@sellerspot/universal-components';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import { MetaCard } from 'components/MetaCard/MetaCard';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { getProducts } from 'requests/product';
// import { toggleSliderModal } from 'store/models/sliderModal';
// import { IGetProductFromServer } from 'typings/components/product.types';
import { generalUtilities } from 'utilities/utilities';
// import {
//     compileProductsTableBodyData,
//     handleProductsHistoryTableRowClick,
// } from './productsHistory.actions';
import styles from './productsHistory.module.scss';

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
            {/* <div className={styles.tableWrapper}>
                <Table
                    headers={[
                        <p key={'S.No'}>{'S.No'}</p>,
                        <p key={'Item Name'}>{'Item Name'}</p>,
                        <p key={'Code'}>{'Code'}</p>,
                        <p key={'Brand'}>{'Brand'}</p>,
                        <p key={'Category'}>{'Category'}</p>,
                        <p key={'Available Stock'}>{'Available Stock'}</p>,
                        <p key={'Price'}>{'Price'}</p>,
                    ]}
                    rowData={compileProductsTableBodyData(productsData)}
                    className={{
                        bodyRow: css`
                            :hover {
                                cursor: pointer;
                                background-color: ${cssColors['--secondary-background-color']};
                            }
                        `,
                    }}
                    onClick={{
                        rowClick: (index: number) => {
                            handleProductsHistoryTableRowClick(productsData[index]);
                        },
                    }}
                />
            </div> */}
        </div>
    );
};