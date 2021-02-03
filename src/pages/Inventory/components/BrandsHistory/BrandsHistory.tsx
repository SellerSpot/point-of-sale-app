import { AgGridReact } from 'ag-grid-react';
import classNames from 'classnames';
import { MetaCard } from 'components/MetaCard/MetaCard';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleSliderModal } from 'store/models/sliderModal';
import { generalUtilities } from 'utilities/utilities';
import { Button, Table } from '@sellerspot/universal-components';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import { getBrandsHistoryTableColDef } from './brandsHistory.actions';
import styles from './brandsHistory.module.scss';

// import { getBrands } from 'requests/brand';
// import { toggleSliderModal } from 'store/models/sliderModal';
// import { IGetBrandFromServer } from 'pages/Inventory/components/AddBrand/brand.types';

// import {
//     compileBrandsTableBodyData,
//     handleBrandsHistoryTableRowClick,
// } from './brandHistory.actions';

export const BrandsHistory = (): JSX.Element => {
    // To manage which tab is selected
    const dispatch = useDispatch();
    const [brandData, setBrandsData] = useState<
        pointOfSaleTypes.brandResponseTypes.IGetAllBrands['data']
    >(null);

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
            <div className={classNames('ag-theme-alpine')}>
                <AgGridReact columnDefs={getBrandsHistoryTableColDef()} />
            </div>
        </div>
    );
};
