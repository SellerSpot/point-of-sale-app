import { css } from '@emotion/css';

interface IGetNewSaleStyles {
    newSaleWrapper: string;
    leftPanel: string;
    rightPanel: string;
    extraControlsCard: string;
    calculationCard: string;
    calculationEntry: string;
}

export const getNewSaleStyles = (): IGetNewSaleStyles => {
    const newSaleWrapper = css`
        width: 100vw;
        height: 100vh;
        display: grid;
        overflow: hidden;
        grid-template-columns: 65% 1fr;
        grid-template-rows: 1fr;
        padding: 10px;
        gap: 10px;
        background-color: var(--secondary-background-color);
    `;

    const leftPanel = css`
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 40px 1fr 100px;
        gap: 10px;
    `;

    const rightPanel = css`
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 250px;
        gap: 10px;
    `;

    const extraControlsCard = css`
        width: 100%;
        height: 100%;
        padding: 10px;
        background-color: var(--primary-background-color);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
    `;

    const calculationCard = css`
        width: 100%;
        height: 100%;
        padding: 10px 20px;
        background-color: var(--primary-background-color);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        gap: 15px;
    `;

    const calculationEntry = css`
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 700;
        font-size: var(--font-size-small-heading);
    `;

    return {
        newSaleWrapper,
        leftPanel,
        rightPanel,
        extraControlsCard,
        calculationCard,
        calculationEntry,
    };
};
