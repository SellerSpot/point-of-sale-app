import { AgGridReact } from 'ag-grid-react';
import classNames from 'classnames';
import { MetaCard } from 'components/MetaCard/MetaCard';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { taxBracketRequests } from 'requests';
import { openSliderModal } from 'store/models/sliderModal';
import { generalUtilities } from 'utilities/utilities';
import { Button } from '@sellerspot/universal-components';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import { IAddTaxBracketFormSchema } from '../AddTaxBracket/addTaxBracket.types';
import {
    compileTaxBracketsHistoryTableBodyData,
    getTaxBracketsHistoryTableColDef,
} from './taxBracketHistory.actions';
import styles from './taxBracketsHistory.module.scss';

export const TaxBracketsHistory = (): JSX.Element => {
    // To manage which tab is selected
    const dispatch = useDispatch();
    const [taxBracketsData, setTaxBracketsData] = useState<
        pointOfSaleTypes.taxBracketResponseTypes.IGetAllTaxBrackets['data']
    >(null);

    useEffect(() => {
        (async () => {
            // To populate the table
            const taxBracketsData = await taxBracketRequests.getAllTaxBrackets();
            setTaxBracketsData(taxBracketsData);
        }).call(null);
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
                        onClick={() =>
                            dispatch(
                                openSliderModal({
                                    autoFillData: null,
                                    sliderName: 'addTaxBracketSlider',
                                }),
                            )
                        }
                    />,
                ]}
            />
            <div className={classNames('ag-theme-alpine')}>
                <AgGridReact
                    columnDefs={getTaxBracketsHistoryTableColDef()}
                    rowData={compileTaxBracketsHistoryTableBodyData(taxBracketsData)}
                    suppressCellSelection
                    onRowClicked={(event) => {
                        // compiling data for autofill
                        const autoFillData: IAddTaxBracketFormSchema = {
                            name: taxBracketsData[event.rowIndex].name,
                            taxPercent: taxBracketsData[event.rowIndex].taxPercent,
                        };
                        dispatch(
                            openSliderModal({
                                autoFillData,
                                sliderName: 'addTaxBracketSlider',
                            }),
                        );
                    }}
                />
            </div>
        </div>
    );
};
