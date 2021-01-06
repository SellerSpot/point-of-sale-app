import { API_ROUTES } from 'config/apiRoutes';
import lodash from 'lodash';
import React from 'react';
import { apiService } from 'services';
import { showNotify } from 'store/models/notify';
import { toggleSliderModal } from 'store/models/sliderModal';
import { store } from 'store/store';
import { IGetCategory } from 'typings/ComponentTypings/categories.types';

// to get all categories data form server
export const getCategories = async (): Promise<IGetCategory[]> => {
    // sending API request
    const response = await apiService.get(API_ROUTES.CATEGORY);
    // parsing response
    if (response.status) {
        return (response.data as IGetCategory[]).map((category) => {
            const { _id, name } = category;
            return {
                _id,
                name,
            };
        });
    } else {
        showNotify({
            content: <p>Unable to fetch categories data</p>,
            timeout: 3000,
        });
    }
};

// compile data to show in table
export const compileCategoriesTableBodyData = (categoriesData: IGetCategory[]): JSX.Element[][] => {
    if (!lodash.isNull(categoriesData) && categoriesData.length > 0) {
        // to hold the compiled table data
        const compiledData: JSX.Element[][] = [];
        categoriesData.map((category, index) => {
            compiledData.push([
                <p key={index}>{index + 1}</p>,
                <p key={category.name}>{category.name}</p>,
            ]);
        });
        return compiledData;
    } else {
        return [];
    }
};

// to show Slider when the tableRow is shown
export const handleTableRowClick = (category: IGetCategory): void => {
    store.dispatch(
        toggleSliderModal({
            sliderName: 'addCategorySlider',
            active: true,
            autoFillData: category,
        }),
    );
};
