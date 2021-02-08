import React from 'react';
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
                ruleSize={1}
                style={{
                    horizontalRuleWrapperStyle: {
                        padding: '5px 0',
                        margin: 0,
                    },
                }}
            />
            <div className={styles.dcSubListing}>
                <p>Item Sub-Total (Before-Discounts)</p>
                <p>{`${cartItem.itemQuantity} x ${formatPriceData(
                    cartItem.itemPrice,
                )} = ${formatPriceData(cartItem.itemSubTotalBeforeDiscounts)}`}</p>
            </div>
            <div className={styles.dcListing}>
                <p>Discounts</p>
            </div>
            <div className={styles.dcSubListing}>
                <p>Item Discount</p>
                <p>{`${formatPercentData(cartItem.itemDiscountPercent)} of ${formatPriceData(
                    cartItem.itemPrice,
                )} = ${formatPriceData(cartItem.itemDiscountValue)}`}</p>
            </div>
            <HorizontalRule
                ruleWidth={'100%'}
                ruleSize={1}
                style={{
                    horizontalRuleWrapperStyle: {
                        padding: '5px 0',
                        margin: 0,
                    },
                }}
            />
            <div className={styles.dcSubListing}>
                <p>Total Discount</p>
                <p>{`${formatPriceData(cartItem.itemDiscountValue)} x ${
                    cartItem.itemQuantity
                } = ${formatPriceData(cartItem.totalDiscountValue)}`}</p>
            </div>
            <div className={styles.dcSubListing}>
                <p>Item Sub-Total (After-Discounts)</p>
                <p>{`${formatPriceData(cartItem.itemSubTotalBeforeDiscounts)} - ${formatPriceData(
                    cartItem.totalDiscountValue,
                )} = ${formatPriceData(cartItem.itemSubTotalAfterDiscounts)}`}</p>
            </div>
            <div className={styles.dcListing}>
                <p>Tax Information</p>
            </div>
            {cartItem.taxes.map((itemTax, index) => {
                return (
                    <div key={index + 'taxItemInfo'} className={styles.dcSubListing}>
                        <p>{itemTax.taxBracketName}</p>
                        <p>{`${formatPercentData(itemTax.taxPercent)} of ${formatPriceData(
                            cartItem.itemSubTotalAfterDiscounts,
                        )} = ${formatPriceData(itemTax.taxValue)}`}</p>
                    </div>
                );
            })}
            <HorizontalRule
                ruleWidth={'100%'}
                ruleSize={1}
                style={{
                    horizontalRuleWrapperStyle: {
                        padding: '5px 0',
                        margin: 0,
                    },
                }}
            />
            <div className={styles.dcSubListing}>
                <p>{'Total Tax'}</p>
                <p>{`${formatPriceData(cartItem.taxSum)} x ${
                    cartItem.itemQuantity
                } = ${formatPriceData(cartItem.totalTax)}`}</p>
            </div>
            <div className={styles.dcListing}>
                <p>Totals</p>
            </div>
            <div className={styles.dcSubListing}>
                <p>{'Item Total'}</p>
                <p>{`${formatPriceData(cartItem.itemTotal)}`}</p>
            </div>
            <HorizontalRule
                ruleWidth={'100%'}
                ruleSize={1}
                style={{
                    horizontalRuleWrapperStyle: {
                        padding: '5px 0',
                        margin: 0,
                    },
                }}
            />
            <div className={styles.dcSubListing}>
                <p>{'Grand Total'}</p>
                <p>{`${formatPriceData(cartItem.grandTotal)}`}</p>
            </div>
        </div>
    );
};
