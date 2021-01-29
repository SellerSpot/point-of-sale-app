import { Button, Table } from '@sellerspot/universal-components';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import { MetaCard } from 'components/MetaCard/MetaCard';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { getBrands } from 'requests/brand';
// import { toggleSliderModal } from 'store/models/sliderModal';
// import { IGetBrandFromServer } from 'pages/Inventory/components/AddBrand/brand.types';
import { generalUtilities } from 'utilities/utilities';
// import {
//     compileBrandsTableBodyData,
//     handleBrandsHistoryTableRowClick,
// } from './brandHistory.actions';
import styles from './brandsHistory.module.scss';

export const BrandsHistory = (): JSX.Element => {
    // To manage which tab is selected
    const dispatch = useDispatch();
    const [brandData, setBrandsData] = useState<pointOfSaleTypes.brandResponseTypes.IGetAllBrands>(
        null,
    );

    useEffect(() => {
        // (async () => {
        //     // To populate the table
        //     const brandData = await getBrands();
        //     setBrandsData(brandData.data as IGetBrandFromServer[]);
        // }).call(null);
    }, []);

    return (
        <div className={styles.brandWrapper}>
            <MetaCard
                title="Sample Description"
                secondaryText={'Sample Data'}
                buttons={[
                    <Button
                        key={'addBrand'}
                        label={`Add Brand (${generalUtilities.GLOBAL_KEYBOARD_SHORTCUTS.ADD_BRAND})`}
                        // onClick={() =>
                        //     dispatch(
                        //         toggleSliderModal({
                        //             sliderName: 'addBrandSlider',
                        //             active: true,
                        //         }),
                        //     )
                        // }
                    />,
                ]}
            />
            {/* <div className={styles.tableWrapper}>
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
            </div> */}
        </div>
    );
};
