import { cssColors } from 'config/cssVariables';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@sellerspot/universal-components';
import { MetaCard } from 'components/MetaCard/MetaCard';
import { Table } from '@sellerspot/universal-components';
import { toggleSliderModal } from 'store/models/sliderModal';
import { getProductsStyles } from './products.styles';
import { IGetProduct } from 'typings/ComponentTypings/product.types';
import { compileProductsTableBodyData, getProducts, handleTableRowClick } from './products.actions';
import lodash from 'lodash';
import { css } from '@emotion/css';

export const Products = (): JSX.Element => {
    // to manage which tab is selected
    const dispatch = useDispatch();
    const styles = getProductsStyles();
    const [productsData, setproductsData] = useState<IGetProduct[]>(null);

    useEffect(() => {
        (async () => {
            // to populate the table
            setproductsData(await getProducts());
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
                        label="Add Product (F4)"
                        style={{
                            color: cssColors['--inventory-color'],
                            backgroundColor: cssColors['--primary-background-color'],
                            borderColor: cssColors['--inventory-color'],
                        }}
                        onClick={() =>
                            dispatch(
                                toggleSliderModal({ sliderName: 'addProductSlider', active: true }),
                            )
                        }
                    />,
                ]}
            />
            <div className={styles.tableWrapper}>
                {!lodash.isNull(productsData) && productsData.length > 0 ? (
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
                                handleTableRowClick(productsData[index]);
                            },
                        }}
                    />
                ) : null}
            </div>
        </div>
    );
};
