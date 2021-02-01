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
}) => {
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
}) => {
    let itemTotalDiscount =
        xPercentOfY({
            x: props.itemDiscountPercent,
            y: props.itemPrice,
        }) * props.itemQuantity;
    return itemTotalDiscount;
};

//~ GRANDTOTAL COMPUTATION FUNCTIONS

export const computeTotalTaxes = (props: { taxPercents: number[]; quantity: number }) => {};
