import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@sellerspot/universal-components';
import { MetaCard } from 'components/MetaCard/MetaCard';
import { Table } from '@sellerspot/universal-components';
import { toggleSliderModal } from 'store/models/sliderModal';
import { cssColors } from 'config/cssVariables';
import { compileSaleTableBodyData, getSaleHistoryData } from './saleHistory.actions';
import { IGetSale } from 'typings/components/sale.types';
import { getSaleHistoryStyles } from './saleHistory.styles';
import { GLOBAL_KEYBOARD_SHORTCUTS } from 'utilities/keyboardShortcuts';

export const SaleHistory = (): JSX.Element => {
    // To manage which tab is selected
    const dispatch = useDispatch();
    const [salesHistoryData, setSalesHistoryData] = useState<IGetSale[]>(null);

    useEffect(() => {
        (async () => {
            setSalesHistoryData(await getSaleHistoryData());
        }).call(null);
    }, []);

    const styles = getSaleHistoryStyles();

    return (
        <div className={styles.saleHistoryWrapper}>
            <MetaCard
                title="Sample Description"
                secondaryText={'Sample Data'}
                buttons={[
                    <Button
                        key={'newSaleBtn'}
                        label={`New Sale (${GLOBAL_KEYBOARD_SHORTCUTS.NEW_SALE})`}
                        style={{
                            backgroundColor: 'transparent',
                            color: cssColors['--sales-color'],
                            borderColor: cssColors['--sales-color'],
                        }}
                        onClick={() =>
                            dispatch(
                                toggleSliderModal({ sliderName: 'newSaleSlider', active: true }),
                            )
                        }
                    />,
                ]}
            />
            <div className={styles.tableWrapper}>
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
            </div>
        </div>
    );
};
