//# GENERAL COMPUTATION FUNCTIONS

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
    itemPrice: number;
    itemTotalDiscount: number;
    itemQuantity: number;
}): number => {
    return props.itemPrice * props.itemQuantity - props.itemTotalDiscount;
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
    itemPrice: number;
    itemTotalTax: number;
    itemQuantity: number;
}): number => {
    return parseInt(((props.itemPrice + props.itemTotalTax) * props.itemQuantity).toFixed(2));
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
