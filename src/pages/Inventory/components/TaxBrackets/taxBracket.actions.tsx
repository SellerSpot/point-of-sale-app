import { API_ROUTES } from 'config/apiRoutes';
import lodash from 'lodash';
import React from 'react';
import { apiService } from 'services';
import { showNotify } from 'store/models/notify';
import { toggleSliderModal } from 'store/models/sliderModal';
import { store } from 'store/store';
import { IGetTaxBracket } from 'typings/ComponentTypings/taxBracket.types';

// to get all taxBrackets data from server
export const getTaxBrackets = async (): Promise<IGetTaxBracket[]> => {
    // sending API request
    const response = await apiService.get(API_ROUTES.TAXBRACKET);
    // parsing response
    if (response.status) {
        return (response.data as IGetTaxBracket[]).map((taxBracket) => {
            const { _id, name, taxPercent } = taxBracket;
            return {
                _id,
                name,
                taxPercent,
            };
        });
    } else {
        showNotify({
            content: <p>Unable to fetch taxBrackets data</p>,
            timeout: 3000,
        });
        return null;
    }
};

// compile data to show in table
export const compileTaxBracketTableBodyData = (
    taxBracketsData: IGetTaxBracket[],
): JSX.Element[][] => {
    if (!lodash.isNull(taxBracketsData) && taxBracketsData.length > 0) {
        // to hold the compiled table data
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

// to show Slider when the tableRow is shown
export const handleTableRowClick = (taxBracket: IGetTaxBracket): void => {
    store.dispatch(
        toggleSliderModal({
            sliderName: 'addTaxBracketSlider',
            active: true,
            autoFillData: taxBracket,
        }),
    );
};
