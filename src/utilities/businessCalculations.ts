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
    taxPercents?: number[];
    discount?: {
        percent?: number;
        value?: number;
    };
    quantity?: number;
}
/**
 * Compute subtotal
 */
export const computeSubtotal = (props: IComputeSubtotal): number => {
    // holds the final subtotal value
    let subTotal: number = props.itemPrice * (isUndefined(props.quantity) ? 1 : props.quantity);

    // tax calculations
    if (!isUndefined(props.taxPercents)) {
        props.taxPercents.map(
            (taxPercent) => (subTotal += xPercentOfY({ x: taxPercent, y: props.itemPrice })),
        );
    }
    // discount calculations
    if (!isUndefined(props.discount)) {
        if (!isUndefined(props.discount.percent)) {
            subTotal += xPercentOfY({ x: props.discount.percent, y: props.itemPrice });
        } else if (!isUndefined(props.discount.value)) {
            subTotal -= props.discount.value;
        }
    }
    return subTotal;
};
