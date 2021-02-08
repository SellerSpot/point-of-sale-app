import cn from 'classnames';
import React from 'react';
import { IInitialStateNewSale } from 'store/models/newSale';
import commonStyle from 'styles/common.module.scss';
import { xPercentOfY } from 'utilities/businessCalculations';
import { generalUtilities } from 'utilities/utilities';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import style from './bill.module.scss';

/**
 * * compiles the product listing for purchase invoice in bill
 */
export const compileProductListingInPurchaseInvoiceForBill = (
    saleData: IInitialStateNewSale['cartData'],
): JSX.Element[] => {
    // holds the array of product listings
    const arrayOfProductListing: JSX.Element[] = [];
    // iterating through the cart items
    for (let i = 0; i < saleData.products.length; i++) {
        arrayOfProductListing.push(
            <div
                className={cn(
                    style.billTableNode,
                    style.purchaseInvoiceTable,
                    style.billTableNodeContent,
                )}
            >
                <div className={cn(commonStyle.textAlignCenter)}>{i + 1}</div>
                <div className={cn(commonStyle.textAlignLeft)}>{saleData.products[i].name}</div>
                <div className={cn(commonStyle.textAlignRight)}>
                    {saleData.productCartInformation[i].itemQuantity}
                </div>
                <div className={cn(commonStyle.textAlignRight)}>
                    {`${generalUtilities.COMMON_SYMBOLS.RUPEE_SYMBOL} ${saleData.products[i].mrpPrice}`}
                </div>
                <div
                    className={cn(commonStyle.textAlignRight)}
                >{`${generalUtilities.COMMON_SYMBOLS.RUPEE_SYMBOL} ${saleData.products[i].sellingPrice}`}</div>
                <div className={cn(commonStyle.textAlignRight)}>
                    {`${generalUtilities.COMMON_SYMBOLS.RUPEE_SYMBOL} ${saleData.productCartInformation[i].totalDiscountValue} @ ${saleData.productCartInformation[i].itemDiscountPercent}`}
                </div>
                <div
                    className={cn(commonStyle.textAlignRight)}
                >{`${generalUtilities.COMMON_SYMBOLS.RUPEE_SYMBOL} ${saleData.productCartInformation[i].totalTax}`}</div>
                <div
                    className={cn(commonStyle.textAlignRight)}
                >{`${generalUtilities.COMMON_SYMBOLS.RUPEE_SYMBOL} ${saleData.productCartInformation[i].itemTotal}`}</div>
            </div>,
        );
    }
    return arrayOfProductListing;
};

/**
 * Used to calculate the total savings of the user
 */
export const calculateTotalSavings = (saleData: IInitialStateNewSale['cartData']): number => {
    // calclulating total costs with just mrp
    let conventionalTotal = 0;
    for (let i = 0; i < saleData.products.length; i++) {
        conventionalTotal += saleData.products[i].mrpPrice;
        for (let j = 0; j < saleData.products[i].taxBracket.length; j++) {
            // typecasting
            const currentTaxBracket = saleData.products[i].taxBracket[
                j
            ] as pointOfSaleTypes.taxBracketResponseTypes.IGetTaxBracket['data'];
            conventionalTotal += xPercentOfY({
                x: parseInt(currentTaxBracket.taxPercent),
                y: saleData.products[i].mrpPrice,
            });
        }
    }
    return conventionalTotal - saleData.totals.grandTotal;
};
