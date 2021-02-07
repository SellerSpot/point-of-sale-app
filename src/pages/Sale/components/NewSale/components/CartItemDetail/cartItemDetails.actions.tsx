import React from 'react';
import { xPercentOfY } from 'utilities/businessCalculations';
import { formatPercentData, formatPriceData } from 'utilities/general';
import { HorizontalRule } from '@sellerspot/universal-components';
import { INewSaleCart } from '../../newSale.types';
import styles from './cartItemDetail.module.scss';

/**
 * Used to get the detailed calculations for the cartItemDetails slider
 */
export const getDetailedCalculations = (cartData: INewSaleCart, rowIndex: number): JSX.Element => {
    // getting current instance of cart item
    const cartItem = cartData.productCartInformation[rowIndex];

    return (
        <div className={styles.detailedCalculations}>
            <div className={styles.dcSubListing}>
                <p>Item Quantity</p>
                <p>{cartItem.itemQuantity}</p>
            </div>
            <div className={styles.dcSubListing}>
                <p>Item Price</p>
                <p>{formatPriceData(cartItem.itemPrice)}</p>
            </div>
            <HorizontalRule
                ruleWidth={'100%'}
                style={{
                    horizontalRuleWrapperStyle: {
                        padding: '5px 0',
                        margin: 0,
                    },
                }}
            />
            <div className={styles.dcSubListing}>
                <p>Item Sub-Total (Pre-Discounts)</p>
                <p>{`${cartItem.itemQuantity} x ${formatPriceData(
                    cartItem.itemPrice,
                )} = ${formatPriceData(cartItem.itemPrice * cartItem.itemQuantity)}`}</p>
            </div>
            <br />
            <div className={styles.dcSubListing}>
                <p>Item Discount</p>
                <p>{`${formatPercentData(cartItem.itemDiscountPercent)} x ${formatPriceData(
                    cartItem.itemPrice,
                )} = ${formatPriceData(
                    xPercentOfY({
                        x: cartItem.itemDiscountPercent,
                        y: cartItem.itemPrice,
                    }),
                )}`}</p>
            </div>
        </div>
    );
};
