import { css } from '@emotion/css';
import { cssColors, cssVariables } from 'config/cssVariables';

interface IGetCheckoutStyles {
    checkoutWrapper: string;
    checkoutBillPreviewWrapper: string;
    checkoutBillPreviewHolder: string;
    checkoutBillingDetailsWrapper: string;
    calculationEntry: string;
}

export const getCheckoutStyles = (): IGetCheckoutStyles => {
    const checkoutWrapper = css`
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        background: ${cssColors['--primary-background-color']};
    `;

    const checkoutBillPreviewWrapper = css`
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        background: ${cssColors['--tertiary-background-color']};
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding: 50px 0;
    `;

    const checkoutBillPreviewHolder = css`
        width: 90%;
        height: auto;
    `;

    const checkoutBillingDetailsWrapper = css`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        padding: 30px;
        gap: 25px;
    `;

    const calculationEntry = css`
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 700;
        font-size: ${cssVariables['--font-size-header']};
    `;

    return {
        checkoutWrapper,
        checkoutBillPreviewWrapper,
        checkoutBillPreviewHolder,
        checkoutBillingDetailsWrapper,
        calculationEntry,
    };
};
