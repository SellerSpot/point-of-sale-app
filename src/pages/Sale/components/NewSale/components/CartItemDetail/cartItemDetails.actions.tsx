import cn from 'classnames';
import React from 'react';
import { formatPercentData, formatPriceData } from 'utilities/general';
import { HorizontalRule } from '@sellerspot/universal-components';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import { INewSaleCart } from '../../newSale.types';
import styles from './cartItemDetail.module.scss';

/**
 * Used to get the detailed calculations for the cartItemDetails slider
 */
export const getDetailedCalculationsSliderView = (
    cartData: INewSaleCart,
    rowIndex: number,
): JSX.Element => {
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
            <div className={cn(styles.dcSubListing, styles.bolderSubText)}>
                <p>Item Sub-Total (Before-Discounts)</p>
                <p>{`${cartItem.itemQuantity} x ${formatPriceData(
                    cartItem.itemPrice,
                )} = ${formatPriceData(cartItem.itemSubTotalBeforeDiscounts)}`}</p>
            </div>
            <div className={styles.dcListing}>
                <p>Discounts</p>
            </div>
            <HorizontalRule
                ruleWidth={'100%'}
                ruleSize={1}
                style={{
                    horizontalRuleWrapperStyle: {
                        padding: '0 0 5px 0',
                        margin: 0,
                    },
                }}
            />
            <div className={styles.dcSubListing}>
                <p>Item Discount</p>
                <p>{`${formatPercentData(cartItem.itemDiscountPercent)} of ${formatPriceData(
                    cartItem.itemPrice,
                )} = ${formatPriceData(cartItem.itemDiscountValue)}`}</p>
            </div>
            <div className={styles.dcSubListing}>
                <p>Total Discount</p>
                <p>{`${formatPriceData(cartItem.itemDiscountValue)} x ${
                    cartItem.itemQuantity
                } = ${formatPriceData(cartItem.totalDiscountValue)}`}</p>
            </div>
            <div className={cn(styles.dcSubListing, styles.bolderSubText)}>
                <p>Item Sub-Total (After-Discounts)</p>
                <p>{`${formatPriceData(cartItem.itemSubTotalBeforeDiscounts)} - ${formatPriceData(
                    cartItem.totalDiscountValue,
                )} = ${formatPriceData(cartItem.itemSubTotalAfterDiscounts)}`}</p>
            </div>
            <div className={styles.dcListing}>
                <p>Tax Information</p>
            </div>
            <HorizontalRule
                ruleWidth={'100%'}
                ruleSize={1}
                style={{
                    horizontalRuleWrapperStyle: {
                        padding: '0 0 5px 0',
                        margin: 0,
                    },
                }}
            />
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

            <div className={cn(styles.dcSubListing, styles.bolderSubText)}>
                <p>{'Total Tax'}</p>
                <p>{`${formatPriceData(cartItem.taxSum)} x ${
                    cartItem.itemQuantity
                } = ${formatPriceData(cartItem.totalTax)}`}</p>
            </div>
            <div className={styles.dcListing}>
                <p>Totals</p>
            </div>
            <HorizontalRule
                ruleWidth={'100%'}
                ruleSize={1}
                style={{
                    horizontalRuleWrapperStyle: {
                        padding: '0 0 5px 0',
                        margin: 0,
                    },
                }}
            />
            <div className={styles.dcSubListing}>
                <p>{'Item Total'}</p>
                <p>{`${formatPriceData(cartItem.itemTotal)}`}</p>
            </div>
            <div className={cn(styles.dcSubListing, styles.bolderSubText)}>
                <p>{'Grand Total'}</p>
                <p>{`${formatPriceData(cartItem.grandTotal)}`}</p>
            </div>
        </div>
    );
};

/**
 * * Used to get the contents of the itemDetails tab in ItemDetails Slider
 */
export const getItemDetailsSliderView = (cartData: INewSaleCart, rowIndex: number): JSX.Element => {
    // getting current instance of cart item
    const cartItem = cartData.productCartInformation[rowIndex];
    // getting current instance of product
    const cartProduct = cartData.products[rowIndex];
    // typecasting
    const currentCategory = cartProduct.category as pointOfSaleTypes.categoryResponseTypes.IGetCategory['data'];
    const currentStockUnit = cartProduct.stockInformation
        .stockUnit as pointOfSaleTypes.stockUnitResponseTypes.IGetStockUnit['data'];
    const currentTaxBracket = cartProduct.taxBracket as pointOfSaleTypes.taxBracketResponseTypes.IGetTaxBracket['data'][];
    return (
        <div className={styles.itemDetails}>
            <div className={styles.dcSubListing}>
                <p>{'Item Name'}</p>
                <p>{cartProduct.name}</p>
            </div>
            <div className={styles.dcSubListing}>
                <p>{'Item Barcode'}</p>
                <p>{cartProduct.gtinNumber}</p>
            </div>
            <div className={styles.dcSubListing}>
                <p>{'Item Category'}</p>
                <p>{currentCategory.name}</p>
            </div>
            <div className={styles.dcListing}>
                <p>Price Information</p>
            </div>
            <HorizontalRule
                ruleWidth={'100%'}
                ruleSize={1}
                style={{
                    horizontalRuleWrapperStyle: {
                        padding: '0 0 5px 0',
                        margin: 0,
                    },
                }}
            />
            <div className={styles.dcSubListing}>
                <p>{'Landing Price'}</p>
                <p>{formatPriceData(cartProduct.landingPrice)}</p>
            </div>
            <div className={styles.dcSubListing}>
                <p>{'MRP'}</p>
                <p>{formatPriceData(cartProduct.mrpPrice)}</p>
            </div>
            <div className={styles.dcSubListing}>
                <p>{'Profit Percentage'}</p>
                <p>{formatPercentData(cartProduct.profitPercent)}</p>
            </div>
            <div className={styles.dcSubListing}>
                <p>{'Selling Price'}</p>
                <p>{formatPriceData(cartProduct.sellingPrice)}</p>
            </div>
            <div className={styles.dcListing}>
                <p>Stock Information</p>
            </div>
            <div className={styles.dcSubListing}>
                <p>{'Available Stock'}</p>
                <p>{`${cartProduct.stockInformation.availableStock} ${currentStockUnit.name}`}</p>
            </div>
            <div className={styles.dcListing}>
                <p>Tax Information</p>
            </div>
            {currentTaxBracket.map((taxBracket, index) => (
                <div key={index + 'taxBracket'} className={styles.dcSubListing}>
                    <p>{taxBracket.name}</p>
                    <p>{formatPercentData(parseInt(taxBracket.taxPercent))}</p>
                </div>
            ))}
        </div>
    );
};
