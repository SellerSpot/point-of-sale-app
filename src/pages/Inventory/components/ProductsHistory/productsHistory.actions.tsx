import lodash from 'lodash';
import React from 'react';
import { toggleSliderModal } from 'store/models/sliderModal';
import { store } from 'store/store';
import { IGetProductFromServer } from 'typings/components/product.types';

// Compile data to show in table
export const compileProductsTableBodyData = (
    productsData: IGetProductFromServer[],
): JSX.Element[][] => {
    if (productsData?.length > 0) {
        // To hold the compiled table data
        const compiledData: JSX.Element[][] = [];
        productsData.map((product, index) => {
            console.log(product);

            compiledData.push([
                <p key={index}>{index + 1}</p>,
                <p key={product.name}>{product.name}</p>,
                <p key={product.gtinNumber}>{product.gtinNumber}</p>,
                <p key={product.brand._id}>{product.brand.name}</p>,
                <p key={product.category._id}>{product.category.name}</p>,
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

// To show Slider when the tableRow is shown
export const handleTableRowClick = (product: IGetProductFromServer): void => {
    store.dispatch(
        toggleSliderModal({ sliderName: 'addProductSlider', active: true, autoFillData: product }),
    );
};
