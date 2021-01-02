import { css } from '@emotion/css';
import { cssColors } from 'config/cssVariables';

interface IGetBillingSetupStyles {
    billingSetupWrapper: string;
    billingConfigurationSection: string;
    billPreviewSection: string;
    billPreview: string;
}

export const getBillingSetupStyles = (): IGetBillingSetupStyles => {
    const billingSetupWrapper = css`
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 55%;
        overflow: hidden;
    `;

    const billingConfigurationSection = css`
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const billPreviewSection = css`
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        background: ${cssColors['--tertiary-background-color']};
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 50px 0;
    `;

    const billPreview = css`
        width: 80%;
        height: auto;
    `;

    return {
        billingSetupWrapper,
        billingConfigurationSection,
        billPreviewSection,
        billPreview,
    };
};
