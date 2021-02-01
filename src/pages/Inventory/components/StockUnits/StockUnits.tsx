import { AgGridReact } from 'ag-grid-react';
import classNames from 'classnames';
import { MetaCard } from 'components/MetaCard/MetaCard';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { generalUtilities } from 'utilities/utilities';
import { Button, Table } from '@sellerspot/universal-components';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import styles from './stockUnits.module.scss';
import { getStockUnitsHistoryTableColDef } from './stockUnitsHistory.actions';

// import { getCategories } from 'requests/category';
// import { toggleSliderModal } from 'store/models/sliderModal';

// import {
//     compileCategoriesTableBodyData,
//     handleCategoriesHistoryTableRowClick,
// } from './categoriesHistory.actions';



export const StockUnitsHistory = (): JSX.Element => {
    // To manage which tab is selected
    const dispatch = useDispatch();
    const [
        categoriesData,
        setCategoriesData,
    ] = useState<pointOfSaleTypes.categoryResponseTypes.IGetAllCategories>(null);

    useEffect(() => {
        // (async () => {
        //     // To populate the table
        //     const categoriesData = await getCategories();
        //     setCategoriesData(
        //         categoriesData.data as pointOfSaleTypes.categoryResponseTypes.IGetAllCategories,
        //     );
        // }).call(null);
    }, []);

    return (
        <div className={styles.stockUnitsWrapper}>
            <MetaCard
                title="Sample Description"
                secondaryText={'Sample Data'}
                buttons={[
                    <Button
                        key={'addStockUnits'}
                        label={`Add Stock Unit (${generalUtilities.GLOBAL_KEYBOARD_SHORTCUTS.ADD_STOCKUNIT})`}

                        // onClick={() =>
                        //     dispatch(
                        //         toggleSliderModal({
                        //             sliderName: 'addCategorySlider',
                        //             active: true,
                        //         }),
                        //     )
                        // }
                    />,
                ]}
            />
            <div className={classNames('ag-theme-alpine')}>
                <AgGridReact columnDefs={getStockUnitsHistoryTableColDef()} />
            </div>
        </div>
    );
};
