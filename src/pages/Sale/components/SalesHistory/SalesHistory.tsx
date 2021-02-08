import { AgGridReact } from 'ag-grid-react';
import cn from 'classnames';
import { MetaCard } from 'components/MetaCard/MetaCard';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saleRequests } from 'requests';
import { SLIDERS, openSliderModal } from 'store/models/sliderModal';
import { generalUtilities } from 'utilities/utilities';
import { Button } from '@sellerspot/universal-components';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import { compileSaleHistoryTableData, getSalesHistoryTableColDef } from './salesHistory.action';
import styles from './salesHistory.module.scss';

export const SalesHistory = (): JSX.Element => {
    // store dispatch
    const dispatch = useDispatch();
    const [salesHistoryData, setSalesHistoryData] = useState<
        pointOfSaleTypes.saleResponseTypes.IGetAllSales['data']
    >(null);

    useEffect(() => {
        (async () => {
            setSalesHistoryData(await saleRequests.fetchAllSales());
        }).call(null);
    }, []);

    return (
        <div className={styles.salesHistoryWrapper}>
            <MetaCard
                title="Sales History"
                secondaryText={'Holds all pending and completed sales data'}
                buttons={[
                    <Button
                        key={'newSaleBtn'}
                        label={`New Sale (${generalUtilities.GLOBAL_KEYBOARD_SHORTCUTS.NEW_SALE})`}
                        status="default"
                        onClick={() => {
                            dispatch(
                                openSliderModal({
                                    autoFillData: null,
                                    sliderName: SLIDERS.newSaleSlider,
                                }),
                            );
                        }}
                    />,
                ]}
            />
            <div className={cn('ag-theme-alpine', styles.tableWrapper)}>
                <AgGridReact
                    columnDefs={getSalesHistoryTableColDef()}
                    rowData={compileSaleHistoryTableData(salesHistoryData)}
                />
            </div>
        </div>
    );
};
