//# GENERAL COMPUTATION FUNCTIONS

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
    const cartDataLocal = { ...props.cartData };
    // iterating through the cart items
    for (let i = 0; i < cartDataLocal.productCartInformation.length; i++) {
        // getting instance of current cart item
        const currCartItem = cartDataLocal.productCartInformation[i];
        // getting instance of current cart product
        const currCartProduct = cartDataLocal.products[i];
        // computing itemSubtotalBeforeDiscounts
        currCartItem.itemSubTotalBeforeDiscounts =
            currCartItem.itemPrice * currCartItem.itemQuantity;
        // computing the discount value for the item
        currCartItem.itemDiscountValue = xPercentOfY({
            x: currCartItem.itemDiscountPercent,
            y: currCartItem.itemPrice,
        });
        // computing the total discount for the current item (will be useful when there are multiple discounts)
        currCartItem.totalDiscountValue = currCartItem.itemDiscountValue;
        // computing itemSubTotalAfterDiscounts
        currCartItem.itemSubTotalAfterDiscounts =
            currCartItem.itemSubTotalBeforeDiscounts - currCartItem.totalDiscountValue;
        // emptyping appendable values
        currCartItem.taxes = [];
        currCartItem.taxSum = 0;
        // computing taxes
        for (let j = 0; j < currCartProduct.taxBracket.length; j++) {
            const currTaxBracket = currCartProduct.taxBracket[
                j
            ] as pointOfSaleTypes.taxBracketResponseTypes.IGetTaxBracket['data'];
            const taxValue = xPercentOfY({
                x: parseInt(currTaxBracket.taxPercent),
                y: currCartItem.itemSubTotalAfterDiscounts,
            });
            currCartItem.taxes.push({
                taxBracketName: currTaxBracket.name,
                taxPercent: parseInt(currTaxBracket.taxPercent),
                taxValue,
            });
            // adding current taxValue to get total tax sum
            currCartItem.taxSum += taxValue;
        }
        // computing totalTax for item
        currCartItem.totalTax = currCartItem.taxSum * currCartItem.itemQuantity;
        // computing itemTotal
        currCartItem.itemTotal = currCartItem.itemSubTotalAfterDiscounts + currCartItem.totalTax;
        // computing grandTotal
        currCartItem.grandTotal = currCartItem.itemTotal;
        // updating computed values in main object
        cartDataLocal.productCartInformation[i] = currCartItem;
    }
    return cartDataLocal;
};
