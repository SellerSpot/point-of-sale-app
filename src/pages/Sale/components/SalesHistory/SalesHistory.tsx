import { AgGridReact } from 'ag-grid-react';
import cn from 'classnames';
import { MetaCard } from 'components/MetaCard/MetaCard';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saleRequests } from 'requests';
import { toggleSliderModal } from 'store/models/sliderModal';
import { generalUtilities } from 'utilities/utilities';
import { Button } from '@sellerspot/universal-components';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import { compileSaleHistoryTableData, getSalesHistoryTableColDef } from './salesHistory.action';
import styles from './salesHistory.module.scss';

export const SalesHistory = (): JSX.Element => {
    // To manage which tab is selected
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
                title="Sample Description"
                secondaryText={'Sample Data'}
                buttons={[
                    <Button
                        key={'newSaleBtn'}
                        label={`New Sale (${generalUtilities.GLOBAL_KEYBOARD_SHORTCUTS.NEW_SALE})`}
                        status="default"
                        onClick={() => {
                            dispatch(
                                toggleSliderModal({ sliderName: 'newSaleSlider', active: true }),
                            );
                        }}
                    />,
                ]}
            />
            <div className={cn('ag-theme-alpine', styles.tableWrapper)}>
                <AgGridReact columnDefs={getSalesHistoryTableColDef()} />
            </div>
        </div>
    );
};
