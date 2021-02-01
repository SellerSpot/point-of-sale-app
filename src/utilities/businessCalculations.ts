import { isUndefined } from 'lodash';

interface IXPercentOfY {
    x: number;
    y: number;
}
/**
 * Computes what x% of y is
 * @param x percentage
 * @param y value to find percentage of
 */
export const xPercentOfY = (props: IXPercentOfY): number => (props.x / 100) * props.y;

interface IComputeSubtotal {
    itemPrice: number;
    quantity: number;
}
/**
 * ITEM_SUB_TOTAL - Only the price of the item with it's quantity without tax or discount calculations
 * @param props itemPrice and quantity
 */
export const computeItemSubtotal = (props: IComputeSubtotal): number =>
    parseInt((props.itemPrice * props.quantity).toFixed(3));

interface IComputeItemTotal {
    itemPrice: number;
    taxPercents?: number[];
    discount?: {
        percent?: number;
        value?: number;
    };
    quantity?: number;
}

/**
 * ITEM_TOTAL - Complete computed pricing for the item with tax and discount calculations, etc
 * @param props all details realting to item pricing and quantity
 */
export const computeItemTotal = (props: IComputeItemTotal): number => {
    // holds the final subtotal value
    let total: number = 0;
    // applying discount calculations
    if (!isUndefined(props.discount)) {
        if (!isUndefined(props.discount.percent)) {
            props.itemPrice -= xPercentOfY({ x: props.discount.percent, y: props.itemPrice });
        } else if (!isUndefined(props.discount.value)) {
            props.itemPrice -= props.discount.value;
        }
    }
    // tax calculations
    if (!isUndefined(props.taxPercents)) {
        props.taxPercents.map((taxPercent) => {
            total += xPercentOfY({ x: taxPercent, y: props.itemPrice });
        });
    }
    // multiplying value by the quantity
    total *= props.quantity;

    return parseInt(total.toFixed(3));
};
