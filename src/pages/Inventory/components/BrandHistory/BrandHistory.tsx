import { css } from '@emotion/css';
import { Button, Table } from '@sellerspot/universal-components';
import { MetaCard } from 'components/MetaCard/MetaCard';
import { cssColors } from 'config/cssVariables';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBrands } from 'requests/brand';
import { toggleSliderModal } from 'store/models/sliderModal';
import { IGetBrandFromServer } from 'typings/components/brand.types';
import { GLOBAL_KEYBOARD_SHORTCUTS } from 'utils/keyboardShortcuts';
import {
    compileBrandsTableBodyData,
    handleBrandsHistoryTableRowClick,
} from './brandHistory.actions';
import styles from './brandHistory.module.css';

export const BrandsHistory = (): JSX.Element => {
    // To manage which tab is selected
    const dispatch = useDispatch();
    const [brandData, setBrandsData] = useState<IGetBrandFromServer[]>(null);

    useEffect(() => {
        (async () => {
            // To populate the table
            const brandData = await getBrands();
            setBrandsData(brandData.data as IGetBrandFromServer[]);
        }).call(null);
    }, []);

    return (
        <div className={styles.brandWrapper}>
            <MetaCard
                title="Sample Description"
                secondaryText={'Sample Data'}
                buttons={[
                    <Button
                        key={'addBrand'}
                        label={`Add Brand (${GLOBAL_KEYBOARD_SHORTCUTS.ADD_BRAND})`}
                        style={{
                            color: cssColors['--inventory-color'],
                            backgroundColor: cssColors['--primary-background-color'],
                            borderColor: cssColors['--inventory-color'],
                        }}
                        onClick={() =>
                            dispatch(
                                toggleSliderModal({
                                    sliderName: 'addBrandSlider',
                                    active: true,
                                }),
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
                    ]}
                    rowData={compileBrandsTableBodyData(brandData)}
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
                            handleBrandsHistoryTableRowClick(brandData[index]);
                        },
                    }}
                />
            </div>
        </div>
    );
};
