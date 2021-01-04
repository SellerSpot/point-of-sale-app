import { Dispatch } from '@reduxjs/toolkit';
import { InputField } from '@sellerspot/universal-components';
import { API_ROUTES } from 'config/apiRoutes';
import lodash from 'lodash';
import React from 'react';
import { apiService } from 'services';
import { addbrand, editBrand } from 'store/models/brand';
import { showNotify } from 'store/models/notify';
import { store } from 'store/store';
import { IGetBrands } from 'typings/ComponentTypings/brand.types';

// to get all brands from server
export const getAllBrands = async (): Promise<void> => {
    // to fetch all brands
    const allBrands = await brandsAPIRequest();
    store.dispatch(addbrand(allBrands));
};

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
export const compileBrandTableBodyData = (brandsData: IGetBrands[]): JSX.Element[][] => {
    if (!lodash.isNull(brandsData) && brandsData.length > 0) {
        // to hold the compiled table data
        const compiledData: JSX.Element[][] = [];
        brandsData.map((brand, index) => {
            compiledData.push([
                <p key={index}>{index + 1}</p>,
                <InputField
                    key={brand.name}
                    selectTextOnFocus={true}
                    size={'compact'}
                    value={brand.name}
                    onChange={(event) =>
                        store.dispatch(editBrand({ _id: brand._id, name: event.target.value }))
                    }
                />,
                <p key={brand._id}>{brand._id}</p>,
            ]);
        });
        return compiledData;
    } else {
        return [];
    }
};
