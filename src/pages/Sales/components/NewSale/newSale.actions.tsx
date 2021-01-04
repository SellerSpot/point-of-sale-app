import lodash from 'lodash';
import React from 'react';
import { ICartItem } from 'typings/ComponentTypings/newSale.types';

// to get the items in the cart
export const getCartItems = (cartData: ICartItem[]): JSX.Element[][] => {
    if (!lodash.isNull(cartData) && cartData.length > 0) {
        // to hold the compiled table data
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
