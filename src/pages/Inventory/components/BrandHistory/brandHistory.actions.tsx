import React from 'react';
import { toggleSliderModal } from 'store/models/sliderModal';
import { store } from 'store/store';
import { IGetBrandFromServer } from 'typings/components/brand.types';

/**
 * Compile data to show in table
 */
export const compileBrandsTableBodyData = (brandsData: IGetBrandFromServer[]): JSX.Element[][] => {
    if (brandsData?.length > 0) {
        // To hold the compiled table data
        const compiledData: JSX.Element[][] = [];
        brandsData.map((brand, index) => {
            compiledData.push([
                <p key={index}>{index + 1}</p>,
                <p key={brand._id}>{brand.name}</p>,
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
export const handleBrandsHistoryTableRowClick = (brand: IGetBrandFromServer): void => {
    store.dispatch(
        toggleSliderModal({
            sliderName: 'addBrandSlider',
            active: true,
            autoFillData: brand,
        }),
    );
};
