//# GENERAL COMPUTATION FUNCTIONS

import { merge } from 'lodash';
import { IInitialStateNewSale } from 'store/models/newSale';
import { pointOfSaleTypes } from '@sellerspot/universal-types';

/**
 * * Computes x % of y
 */
export const xPercentOfY = (props: { x: number; y: number }): number =>
    parseInt(((props.x / 100) * props.y).toFixed(2));

//# ITEM COMPUTATION FUNCTIONS

/**
 * * ITEM_PRICE - Compute the item price after applying discount
 */
export const computeItemPrice = (props: {
    itemSubTotal: number;
    itemTotalDiscount: number;
    itemQuantity: number;
}): number => {
    return props.itemSubTotal * props.itemQuantity - props.itemTotalDiscount;
};

/**
 * * ITEM_SUB_TOTAL - Cost of item before applying tax or discounts
 */
export const computeItemSubtotal = (props: { itemPrice: number; itemQuantity: number }): number => {
    return parseInt((props.itemPrice * props.itemQuantity).toFixed(2));
};

/**
 * * ITEM_TOTAL - Complete cost of item with every charge included
 */
export const computeItemTotal = (props: {
    itemSubtotalAfterDiscounts: number;
    itemTotalTax: number;
    itemQuantity: number;
}): number => {
    return parseInt(
        ((props.itemSubtotalAfterDiscounts + props.itemTotalTax) * props.itemQuantity).toFixed(2),
    );
};

/**
 * * ITEM_TOTAL_TAX - Computes the total tax amount to be applied on an item
 */
export const computeItemTotalTax = (props: {
    itemTaxPercents: number[];
    itemSubtotalAfterDiscounts: number;
    itemQuantity: number;
}): number => {
    let itemTotalTax = 0;
    for (let index = 0; index < props.itemTaxPercents.length; index++) {
        itemTotalTax += xPercentOfY({
            x: props.itemTaxPercents[index],
            y: props.itemSubtotalAfterDiscounts,
        });
    }

    itemTotalTax *= props.itemQuantity;
    return parseInt(itemTotalTax.toFixed(2));
};

/**
 * * ITEM_TOTAL_DISCOUNT - Computes the total discount amount to be applied on the item
 */
export const computeItemTotalDiscount = (props: {
    itemDiscountPercent: number;
    itemPrice: number;
    itemQuantity: number;
}): number => {
    return parseInt(
        (
            xPercentOfY({
                x: props.itemDiscountPercent,
                y: props.itemPrice,
            }) * props.itemQuantity
        ).toFixed(2),
    );
};

//# GRANDTOTAL COMPUTATION FUNCTIONS

/**
 * * GRAND_TOTAL - Computes the total amount applied across all items
 */
export const computeGrandTotal = (props: { itemTotals: number[] }): number => {
    let grandTotal = 0;
    for (let index = 0; index < props.itemTotals.length; index++) {
        grandTotal += props.itemTotals[index];
    }
    return parseInt(grandTotal.toFixed(2));
};

/**
 * * GRAND_TOTAL_TAX - Computes the total taxes amount applied across all items
 */
export const computeGrandTotalTax = (props: { itemTotalTaxes: number[] }): number => {
    let grandTotalTax = 0;
    for (let index = 0; index < props.itemTotalTaxes.length; index++) {
        grandTotalTax += props.itemTotalTaxes[index];
    }
    return parseInt(grandTotalTax.toFixed(2));
};

/**
 * * GRAND_TOTAL_DISCOUNT - Computes the total discounts amount applied across all items
 */
export const computeGrandTotalDiscount = (props: { itemTotalDiscounts: number[] }): number => {
    let grandTotalDiscount = 0;
    for (let index = 0; index < props.itemTotalDiscounts.length; index++) {
        grandTotalDiscount += props.itemTotalDiscounts[index];
    }
    return parseInt(grandTotalDiscount.toFixed(2));
};

/**
 * * Used to perform all cart related computations
 */
export const computeCartData = (props: {
    cartData: IInitialStateNewSale['cartData'];
}): IInitialStateNewSale['cartData'] => {
    // creating local copy of the cartData
    const cartDataLocal = merge({}, props.cartData);
    // clearing sale totals data
    cartDataLocal.totals = {
        grandTotal: 0,
        grandTotalDiscount: 0,
        grandTotalTax: 0,
    };
    // iterating through the cart items
    for (let i = 0; i < cartDataLocal.productCartInformation.length; i++) {
        // getting instance of currentent cart item
        const currentCartItem = cartDataLocal.productCartInformation[i];
        // getting instance of currentent cart product
        const currentCartProduct = cartDataLocal.products[i];
        // computing itemSubtotalBeforeDiscounts
        currentCartItem.itemSubTotalBeforeDiscounts =
            currentCartItem.itemPrice * currentCartItem.itemQuantity;
        // computing the discount value for the item
        currentCartItem.itemDiscountValue = xPercentOfY({
            x: currentCartItem.itemDiscountPercent,
            y: currentCartItem.itemPrice,
        });
        // computing the total discount for the currentent item (will be useful when there are multiple discounts)
        currentCartItem.totalDiscountValue =
            currentCartItem.itemDiscountValue * currentCartItem.itemQuantity;
        // adding total discount to sale totals
        cartDataLocal.totals.grandTotalDiscount += currentCartItem.totalDiscountValue;
        // computing itemSubTotalAfterDiscounts
        currentCartItem.itemSubTotalAfterDiscounts =
            currentCartItem.itemSubTotalBeforeDiscounts - currentCartItem.totalDiscountValue;
        // emptyping appendable values
        currentCartItem.taxes = [];
        currentCartItem.taxSum = 0;
        // computing taxes
        for (let j = 0; j < currentCartProduct.taxBracket.length; j++) {
            const currentTaxBracket = currentCartProduct.taxBracket[
                j
            ] as pointOfSaleTypes.taxBracketResponseTypes.IGetTaxBracket['data'];
            const taxValue = xPercentOfY({
                x: parseInt(currentTaxBracket.taxPercent),
                y: currentCartItem.itemSubTotalAfterDiscounts,
            });
            currentCartItem.taxes.push({
                taxBracketName: currentTaxBracket.name,
                taxPercent: parseInt(currentTaxBracket.taxPercent),
                taxValue,
            });
            // adding currentent taxValue to get total tax sum
            currentCartItem.taxSum += taxValue;
        }
        // computing totalTax for item
        currentCartItem.totalTax = currentCartItem.taxSum * currentCartItem.itemQuantity;
        // adding total taxes to sale totals
        cartDataLocal.totals.grandTotalTax += currentCartItem.totalTax;
        // computing itemTotal
        currentCartItem.itemTotal =
            currentCartItem.itemSubTotalAfterDiscounts + currentCartItem.totalTax;
        // computing grandTotal
        currentCartItem.grandTotal = currentCartItem.itemTotal;
        // adding grandTotal to sale totals
        cartDataLocal.totals.grandTotal += currentCartItem.grandTotal;
        // updating computed values in main object
        cartDataLocal.productCartInformation[i] = currentCartItem;
    }
    return cartDataLocal;
};
