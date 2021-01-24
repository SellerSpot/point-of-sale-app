import React from 'react';
import { toggleSliderModal } from 'store/models/sliderModal';
import { store } from 'store/store';
import { IGetCategoryFromServer } from 'typings/components/category.types';

/**
 * Compile data to show in table
 */
export const compileCategoriesTableBodyData = (
    categoriesData: IGetCategoryFromServer[],
): JSX.Element[][] => {
    if (categoriesData?.length > 0) {
        // To hold the compiled table data
        const compiledData: JSX.Element[][] = [];
        categoriesData.map((category, index) => {
            compiledData.push([
                <p key={index}>{index + 1}</p>,
                <p key={category._id}>{category.name}</p>,
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
export const handleCategoriesHistoryTableRowClick = (category: IGetCategoryFromServer): void => {
    store.dispatch(
        toggleSliderModal({
            sliderName: 'addCategorySlider',
            active: true,
            autoFillData: category,
        }),
    );
};
