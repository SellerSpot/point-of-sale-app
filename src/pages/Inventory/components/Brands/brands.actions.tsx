import { InputField } from '@sellerspot/universal-components';
import { API_ROUTES } from 'config/apiRoutes';
import lodash from 'lodash';
import React from 'react';
import { apiService } from 'services';
import { showNotify } from 'store/models/notify';
import { toggleSliderModal } from 'store/models/sliderModal';
import { store } from 'store/store';
import { IGetBrands } from 'typings/ComponentTypings/brand.types';

// to get the list of brands from server
export const brandsAPIRequest = async (): Promise<IGetBrands[]> => {
    // sending API request
    const response = await apiService.get(API_ROUTES.BRAND);
    // parsing response
    if (response.status) {
        return response.data;
    } else {
        showNotify({
            content: <p>Unable to fetch sales data</p>,
            timeout: 3000,
        });
        return null;
    }
};

// compile data to show in table
export const compileBrandTableBodyData = (brandData: IGetBrands[]): JSX.Element[][] => {
    if (!lodash.isNull(brandData) && brandData.length > 0) {
        // to hold the compiled table data
        const compiledData: JSX.Element[][] = [];
        brandData.map((brand, index) => {
            compiledData.push([
                <p key={index}>{index + 1}</p>,
                <p key={brand.name}>{brand.name}</p>,
            ]);
        });
        return compiledData;
    } else {
        return [];
    }
};

// to show Slider when the tableRow is shown
export const handleTableRowClick = (brand: IGetBrands): void => {
    store.dispatch(
        toggleSliderModal({ sliderName: 'addBrandSlider', active: true, autoFillData: brand }),
    );
};
