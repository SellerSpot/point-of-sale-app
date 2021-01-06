import { API_ROUTES } from 'config/apiRoutes';
import lodash from 'lodash';
import React from 'react';
import { batch } from 'react-redux';
import { apiService } from 'services';
import { showNotify } from 'store/models/notify';
import { toggleSliderModal } from 'store/models/sliderModal';
import { store } from 'store/store';
import { IGetProduct } from 'typings/ComponentTypings/product.types';

// to get all Products data from server
export const getProducts = async (): Promise<IGetProduct[]> => {
    // sending API request
    const response = await apiService.get(API_ROUTES.PRODUCT);
    // parsing response
    if (response.status) {
        return (response.data as IGetProduct[]).map((product) => {
            const {
                _id,
                brand,
                category,
                gtinNumber,
                landingPrice,
                mrpPrice,
                name,
                profitPercent,
                sellingPrice,
                stockInformation,
                taxBracket,
            } = product;
            return {
                _id,
                brand,
                category,
                gtinNumber,
                landingPrice,
                mrpPrice,
                name,
                profitPercent,
                sellingPrice,
                stockInformation,
                taxBracket,
            };
        });
    } else {
        showNotify({
            content: <p>Unable to fetch Products data</p>,
            timeout: 3000,
        });
        return null;
    }
};

// compile data to show in table
export const compileProductsTableBodyData = (productsData: IGetProduct[]): JSX.Element[][] => {
    if (!lodash.isNull(productsData) && productsData.length > 0) {
        // to hold the compiled table data
        const compiledData: JSX.Element[][] = [];
        productsData.map((product, index) => {
            compiledData.push([
                <p key={index}>{index + 1}</p>,
                <p key={product.name}>{product.name}</p>,
                <p key={product.gtinNumber}>{product.gtinNumber}</p>,
                <p key={product.brand}>{product.brand}</p>,
                <p key={product.category}>{product.category}</p>,
                <p key={product.stockInformation.availableStock}>
                    {product.stockInformation.availableStock}
                </p>,
                <p key={product.sellingPrice}>{product.sellingPrice}</p>,
            ]);
        });
        return compiledData;
    } else {
        return [];
    }
};

// to show Slider when the tableRow is shown
export const handleTableRowClick = (product: IGetProduct): void => {
    store.dispatch(
        toggleSliderModal({ sliderName: 'addProductSlider', active: true, autoFillData: product }),
    );
};
