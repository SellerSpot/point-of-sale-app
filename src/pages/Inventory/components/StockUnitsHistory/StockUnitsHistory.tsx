import { AgGridReact } from 'ag-grid-react';
import classNames from 'classnames';
import { MetaCard } from 'components/MetaCard/MetaCard';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { stockUnitRequests } from 'requests';
import { SLIDERS, openSliderModal } from 'store/models/sliderModal';
import { generalUtilities } from 'utilities/utilities';
import { Button, Table } from '@sellerspot/universal-components';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import { IAddStockUnitFormSchema } from '../AddStockUnit/addStockUnit.types';
import {
    compileStockUnitsHistoryTableBodyData,
    getStockUnitsHistoryTableColDef,
} from './stockUnitsHistory.actions';
import styles from './stockUnitsHistory.module.scss';

export const StockUnitsHistory = (): JSX.Element => {
    // To manage which tab is selected
    const dispatch = useDispatch();
    const [stockUnitsData, setStockUnitsData] = useState<
        pointOfSaleTypes.categoryResponseTypes.IGetAllCategories['data']
    >([]);

    useEffect(() => {
        (async () => {
            // To populate the table
            const stockUnitsData = await stockUnitRequests.getAllStockUnits();
            setStockUnitsData(stockUnitsData);
        }).call(null);
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
                        onClick={() =>
                            dispatch(
                                openSliderModal({
                                    autoFillData: null,
                                    sliderName: SLIDERS.addStockUnitSlider,
                                }),
                            )
                        }
                    />,
                ]}
            />
            <div className={classNames('ag-theme-alpine')}>
                <AgGridReact
                    columnDefs={getStockUnitsHistoryTableColDef()}
                    rowData={compileStockUnitsHistoryTableBodyData(stockUnitsData)}
                    suppressCellSelection
                    onRowClicked={(event) => {
                        // compiling data for autofill
                        const autoFillData: IAddStockUnitFormSchema = {
                            name: stockUnitsData[event.rowIndex].name,
                        };
                        dispatch(
                            openSliderModal({
                                autoFillData,
                                sliderName: SLIDERS.addStockUnitSlider,
                            }),
                        );
                    }}
                />
            </div>
        </div>
    );
};
