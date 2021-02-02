import { isNull } from 'lodash';
import React from 'react';
import { toggleSliderModal } from 'store/models/sliderModal';
import { store } from 'store/store';
import { pointOfSaleTypes } from '@sellerspot/universal-types';

// Compile data to show in table
export const compileProductsTableBodyData = (
    productsData: pointOfSaleTypes.productResponseTypes.ISearchProduct['data'],
): JSX.Element[][] => {
    if (!isNull(productsData) && productsData.results?.length > 0) {
        // To hold the compiled table data
        const compiledData: JSX.Element[][] = [];
        productsData.results.map((product, index) => {
            compiledData.push([
                <p key={index}>{index + 1}</p>,
                <p key={product.name}>{product.name}</p>,
                <p key={product.gtinNumber}>{product.gtinNumber}</p>,
                <p key={product.brand._id}>{product.brand.name}</p>, // change types
                <p key={product.category._id}>{product.category.name}</p>, // change types
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

// used to handle the closing of the sliderModal
export const handleCloseSlider = (
    setCallBackStateTrack: React.Dispatch<React.SetStateAction<boolean>>,
): void => {
    store.dispatch(
        toggleSliderModal({
            sliderName: 'newSaleSlider',
            active: false,
        }),
    );
    setCallBackStateTrack(false);
};
