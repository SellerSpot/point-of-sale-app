import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@sellerspot/universal-components';
import { MetaCard } from 'components/MetaCard/MetaCard';
import { Table } from '@sellerspot/universal-components';
import { toggleSliderModal } from 'store/models/sliderModal';
import { cssColors } from 'config/cssVariables';
import { getBrandsStyles } from './brands.styles';
import { compileBrandTableBodyData, getAllBrands } from './brands.actions';
import { IGetBrands } from 'typings/ComponentTypings/brand.types';

export const Brands = (): JSX.Element => {
    // to manage which tab is selected
    const dispatch = useDispatch();
    const styles = getBrandsStyles();
    const [brandsData, setBrandsData] = useState<IGetBrands[]>(null);

    // call action function to fetch the sales history data
    const getSalesHistoryData = async () => {
        // to populate the table
        setBrandsData(await getAllBrands());
    };

    useEffect(() => {
        getSalesHistoryData();
    }, []);

    return (
        <div className={styles.brandsWrapper}>
            <MetaCard
                title="Sample Description"
                secondaryText={'Sample Data'}
                buttons={[
                    <Button
                        key={'addBrand'}
                        label="Add Brand (F4)"
                        style={{
                            color: cssColors['--inventory-color'],
                            backgroundColor: cssColors['--primary-background-color'],
                            borderColor: cssColors['--inventory-color'],
                        }}
                        onClick={() =>
                            dispatch(
                                toggleSliderModal({ sliderName: 'addBrandSlider', active: true }),
                            )
                        }
                    />,
                ]}
            />
            <div className={styles.tableWrapper}>
                <Table
                    headers={[
                        <p key={'S.No'}>{'S.No'}</p>,
                        <p key={'Brand Name'}>{'Brand Name'}</p>,
                        <p key={'Brand ID'}>{'Brand ID'}</p>,
                    ]}
                    rowData={compileBrandTableBodyData(brandsData)}
                />
            </div>
        </div>
    );
};
