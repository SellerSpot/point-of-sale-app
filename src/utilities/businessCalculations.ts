import { isUndefined } from 'lodash';

//~ GENERAL COMPUTATION FUNCTIONS

/**
 * * Computes x % of y
 */
export const xPercentOfY = (props: { x: number; y: number }): number => (props.x / 100) * props.y;

//~ ITEM COMPUTATION FUNCTIONS

/**
 * * ITEM_SUB_TOTAL - Cost of item before applying tax or discounts
 */
export const computeItemSubtotal = (props: { itemPrice: number; itemQuantity: number }): number => {
    return parseInt((props.itemPrice * props.itemQuantity).toFixed(3));
};

/**
 * * ITEM_TOTAL - Complete cost of item with every charge included
 */
export const computeItemTotal = (props: {
    itemPrice: number;
    itemTaxPercents?: number[];
    itemDiscount?: {
        percent?: number;
        value?: number;
    };
    itemQuantity?: number;
}): number => {
    let itemTotal = 0;
    // applying discount calculations
    if (!isUndefined(props.itemDiscount)) {
        if (!isUndefined(props.itemDiscount.percent)) {
            props.itemPrice -= xPercentOfY({ x: props.itemDiscount.percent, y: props.itemPrice });
        } else if (!isUndefined(props.itemDiscount.value)) {
            props.itemPrice -= props.itemDiscount.value;
        }
    }
    // tax calculations
    if (!isUndefined(props.itemTaxPercents)) {
        props.itemTaxPercents.map((taxPercent) => {
            itemTotal += xPercentOfY({ x: taxPercent, y: props.itemPrice });
        });
    }
    itemTotal *= props.itemQuantity;

    return parseInt(itemTotal.toFixed(3));
};

/**
 * * ITEM_TOTAL_TAX - Computes the total tax amount to be applied on an item
 */
export const computeItemTotalTax = (props: {
    itemTaxPercents: number[];
    itemPrice: number;
    itemQuantity: number;
}): number => {
    let itemTotalTax = 0;
    for (let index = 0; index < props.itemTaxPercents.length; index++) {
        itemTotalTax += xPercentOfY({
            x: props.itemTaxPercents[index],
            y: props.itemPrice,
        });
    }
    itemTotalTax *= props.itemQuantity;
    return itemTotalTax;
};

/**
 * * ITEM_TOTAL_DISCOUNT - Computes the total discount amount to be applied on the item
 */
export const computeItemTotalDicount = (props: {
    itemDiscountPercent: number;
    itemPrice: number;
    itemQuantity: number;
}): number => {
    let itemTotalDiscount =
        xPercentOfY({
            x: props.itemDiscountPercent,
            y: props.itemPrice,
        }) * props.itemQuantity;
    return itemTotalDiscount;
};

//~ GRANDTOTAL COMPUTATION FUNCTIONS

/**
 * * GRAND_TOTAL - Computes the total amount applied across all items
 */
export const computeGrandTotal = (props: { itemTotals: number[] }): number => {
    let grandTotal = 0;
    for (let index = 0; index < props.itemTotals.length; index++) {
        grandTotal += props.itemTotals[index];
    }
    return grandTotal;
};

/**
 * * GRAND_TOTAL_TAX - Computes the total taxes amount applied across all items
 */
export const computeGrandTotalTax = (props: { itemTotalTaxes: number[] }): number => {
    let grandTotalTax = 0;
    for (let index = 0; index < props.itemTotalTaxes.length; index++) {
        grandTotalTax += props.itemTotalTaxes[index];
    }
    return grandTotalTax;
};

/**
 * * GRAND_TOTAL_DISCOUNT - Computes the total discounts amount applied across all items
 */
export const computeGrandTotalDiscount = (props: { itemTotalDiscounts: number[] }) => {
    let grandTotalDiscount = 0;
    for (let index = 0; index < props.itemTotalDiscounts.length; index++) {
        grandTotalDiscount += props.itemTotalDiscounts[index];
    }
    return grandTotalDiscount;
};
