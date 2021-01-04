import { Button } from '@sellerspot/universal-components/dist/components/Button/Button';
import { API_ROUTES } from 'config/apiRoutes';
import lodash from 'lodash';
import React from 'react';
import { apiService } from 'services';
import { showNotify } from 'store/models/notify';
import { IGetBrands } from 'typings/ComponentTypings/brand.types';

// to get the list of brands from server
export const getAllBrands = async (): Promise<IGetBrands[]> => {
    // sending API request
    const response = await apiService.get(API_ROUTES.BRAND);
    // parsing response
    if (response.status) {
        return (response.data as IGetBrands[]).map((brand) => {
            return {
                _id: brand._id,
                name: brand.name,
            };
        });
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
                <p key={brand.name}>{brand.name}</p>,
                <p key={brand._id}>{brand._id}</p>,
            ]);
        });
        return compiledData;
    } else {
        return [[]];
    }
};
