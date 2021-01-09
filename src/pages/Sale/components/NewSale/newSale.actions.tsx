import lodash from 'lodash';
import React from 'react';
import { IGetProduct } from 'typings/components/product.types';
import { ISaleCartItem } from 'typings/components/sale.types';

// Compile data to show in table
export const compileProductsTableBodyData = (productsData: IGetProduct[]): JSX.Element[][] => {
    if (productsData?.length > 0) {
        // To hold the compiled table data
        const compiledData: JSX.Element[][] = [];
        productsData.map((product, index) => {
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

// To get the items in the cart
export const getCartItems = (cartData: ISaleCartItem[]): JSX.Element[][] => {
    if (!lodash.isUndefined(cartData) && cartData?.length > 0) {
        // To hold the compiled table data
        const compiledData: JSX.Element[][] = [];
        cartData.map((cartItem, index) => {
            compiledData.push([
                <p key={index}>{index + 1}</p>,
                <p key={cartItem.productInformation.name}>{cartItem.productInformation.name}</p>,
                <p key={cartItem.quantity}>{cartItem.quantity}</p>,
                <p key={cartItem.subTotal}>{cartItem.subTotal}</p>,
                <p key={cartItem.discount}>{cartItem.discount}</p>,
            ]);
        });
        return compiledData;
    } else {
        [];
    }
};
