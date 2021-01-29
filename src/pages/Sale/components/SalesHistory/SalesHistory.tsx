import React, { useEffect, useState } from 'react';

import { Button } from '@sellerspot/universal-components';
import { MetaCard } from 'components/MetaCard/MetaCard';
import { Table } from '@sellerspot/universal-components';
import { generalUtilities } from 'utilities/utilities';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import styles from './salesHistory.module.scss';
import { toggleSliderModal } from 'store/models/sliderModal';
import { useDispatch } from 'react-redux';

// import { toggleSliderModal } from 'store/models/sliderModal';
// import { compileSaleTableBodyData, getSaleHistoryData } from './saleHistory.actions';

export const SalesHistory = (): JSX.Element => {
    // To manage which tab is selected
    const dispatch = useDispatch();
    const [salesHistoryData, setSalesHistoryData] = useState<
        pointOfSaleTypes.saleResponseTypes.IGetSales[]
    >(null);

    useEffect(() => {
        // (async () => {
        //     setSalesHistoryData(await getSaleHistoryData());
        // }).call(null);
    }, []);

    return (
        <div className={styles.saleHistoryWrapper}>
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
            {/* <div className={styles.tableWrapper}>
                <Table
                    headers={[
                        <p key={'S.No'}>{'S.No'}</p>,
                        <p key={'Created At'}>{'Created'}</p>,
                        <p key={'Status'}>{'Status'}</p>,
                        <p key={'Sub-Total'}>{'Sub-Total'}</p>,
                        <p key={'Taxation'}>{'Taxation'}</p>,
                        <p key={'Grand Total'}>{'Grand Total'}</p>,
                    ]}
                    rowData={compileSaleTableBodyData(salesHistoryData)}
                />
            </div> */}
        </div>
    );
};
