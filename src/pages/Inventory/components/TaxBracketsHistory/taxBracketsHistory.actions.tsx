import React from 'react';
import { toggleSliderModal } from 'store/models/sliderModal';
import { store } from 'store/store';
import { IGetTaxBracketFromServer } from 'typings/components/taxBracket.types';

/**
 * Compile data to show in table
 */
export const compileTaxBracketsTableBodyData = (
    taxBracketsData: IGetTaxBracketFromServer[],
): JSX.Element[][] => {
    if (taxBracketsData?.length > 0) {
        // To hold the compiled table data
        const compiledData: JSX.Element[][] = [];
        taxBracketsData.map((taxBracket, index) => {
            compiledData.push([
                <p key={index}>{index + 1}</p>,
                <p key={taxBracket.name}>{taxBracket.name}</p>,
                <p key={taxBracket.taxPercent}>{taxBracket.taxPercent}</p>,
            ]);
        });
        return compiledData;
    } else {
        return [];
    }
};

/**
 * To show Slider when the tableRow is shown
 */
export const handleTaxBracketsHistoryTableRowClick = (
    taxBracket: IGetTaxBracketFromServer,
): void => {
    store.dispatch(
        toggleSliderModal({
            sliderName: 'addTaxBracketSlider',
            active: true,
            autoFillData: taxBracket,
        }),
    );
};
