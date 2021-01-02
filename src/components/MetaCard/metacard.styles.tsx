import { css } from '@emotion/css';
import { cssColors, cssVariables } from '../../config/cssVariables';

export interface IGetMetaCardStyles {
    metaCard: string;
    pageInformationSection: string;
    cardTitle: string;
    cardSecondaryText: string;
    cardActions: string;
}

export const getMetaCardStyles = (): IGetMetaCardStyles => {
    const metaCard = css`
        width: 100%;
        height: 90px;
        padding: 20px;
        border-radius: ${cssVariables['--border-radius']};
        box-shadow: ${cssVariables['--shadow']};
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: ${cssColors['--primary-background-color']};
    `;

    const pageInformationSection = css`
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 10px;
    `;

    const cardTitle = css`
        font-size: ${cssVariables['--font-size-default']};
        font-weight: 600;
    `;

    const cardSecondaryText = css`
        color: ${cssColors['--secondary-font-color']};
        font-size: ${cssVariables['--font-size-secondary']};
        font-weight: 400;
    `;

    const cardActions = css`
        height: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;
    `;

    return {
        cardActions,
        cardSecondaryText,
        cardTitle,
        metaCard,
        pageInformationSection,
    };
};
