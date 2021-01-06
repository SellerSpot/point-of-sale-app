import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@sellerspot/universal-components';
import { MetaCard } from 'components/MetaCard/MetaCard';
import { Table } from '@sellerspot/universal-components';
import { toggleSliderModal } from 'store/models/sliderModal';
import { KEYCODES } from 'services/KeyCodeService';
import { cssColors } from 'config/cssVariables';
import { getSalesHistoryStyles } from './salesHistory.styles';
import { compileSalesTableBodyData, getSalesHistory } from './salesHistory.actions';
import { IGetSales } from 'typings/ComponentTypings/sales.types';

export const SalesHistory = (): JSX.Element => {
    // to manage which tab is selected
    const dispatch = useDispatch();
    const [salesHistoryData, setSalesHistoryData] = useState<IGetSales[]>(null);

    const styles = getSalesHistoryStyles();

    // call action function to fetch the sales history data
    const getSalesHistoryData = async () => {
        // to populate the table
        setSalesHistoryData(await getSalesHistory());
    };

    useEffect(() => {
        getSalesHistoryData();
    }, []);

    return (
        <div className={styles.salesHistoryWrapper}>
            <MetaCard
                title="Sample Description"
                secondaryText={'Sample Data'}
                buttons={[
                    <Button
                        key={'newSaleBtn'}
                        label={`New Sale (${KEYCODES.NEWSALE})`}
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
                    rowData={compileSalesTableBodyData(salesHistoryData)}
                />
            </div>
        </div>
    );
};
