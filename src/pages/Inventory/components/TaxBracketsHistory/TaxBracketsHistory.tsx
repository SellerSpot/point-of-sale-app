import { AgGridReact } from 'ag-grid-react';
import classNames from 'classnames';
import { MetaCard } from 'components/MetaCard/MetaCard';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { generalUtilities } from 'utilities/utilities';
import { Button, Table } from '@sellerspot/universal-components';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import { getTaxBracketsHistoryTableColDef } from './taxBracketHistory.actions';
import styles from './taxBracketsHistory.module.scss';

// import { getTaxBrackets } from 'requests/taxBracket';
// import { toggleSliderModal } from 'store/models/sliderModal';
// import { IGetTaxBracketFromServer } from 'typings/components/taxBracket.types';


// import {
//     compileTaxBracketsTableBodyData,
//     handleTaxBracketsHistoryTableRowClick,
// } from './taxBracketsHistory.actions';


export const TaxBracketsHistory = (): JSX.Element => {
    // To manage which tab is selected
    const dispatch = useDispatch();
    const [
        taxBracketsData,
        setTaxBracketsData,
    ] = useState<pointOfSaleTypes.taxBracketResponseTypes.IGetTaxBrackets>(null);

    useEffect(() => {
        // (async () => {
        //     // To populate the table
        //     const taxBracketsData = await getTaxBrackets();
        //     setTaxBracketsData(taxBracketsData.data as IGetTaxBracketFromServer[]);
        // }).call(null);
    }, []);

    return (
        <div className={styles.taxBracketWrapper}>
            <MetaCard
                title="Sample Description"
                secondaryText={'Sample Data'}
                buttons={[
                    <Button
                        key={'addTaxBracket'}
                        label={`Add Tax-Bracket (${generalUtilities.GLOBAL_KEYBOARD_SHORTCUTS.ADD_TAXBRACKET})`}
                        // onClick={() =>
                        //     dispatch(
                        //         toggleSliderModal({
                        //             sliderName: 'addTaxBracketSlider',
                        //             active: true,
                        //         }),
                        //     )
                        // }
                    />,
                ]}
            />
            <div className={classNames('ag-theme-alpine')}>
                <AgGridReact columnDefs={getTaxBracketsHistoryTableColDef()} />
            </div>
        </div>
    );
};
