import { css } from '@emotion/css';

interface IGetInventoryStyles {
    inventoryWrapper: string;
    tabBarWrapper: string;
    overallPageWrapper: string;
}

export const getInventoryStyles = (): IGetInventoryStyles => {
    const inventoryWrapper = css`
        width: 100%;
        height: 100%;
        position: relative;
        display: grid;
        grid-template-rows: 50px 1fr;
    `;

    const tabBarWrapper = css`
        width: 100%;
        height: 100%;
        box-shadow: 0 0 3px 0 var(--overlay-color);
        position: relative;
        z-index: 1;
    `;

    const overallPageWrapper = css`
        width: 100%;
        height: 100%;
        overflow-x: auto;
        overflow-y: auto;
    `;

    return {
        inventoryWrapper,
        tabBarWrapper,
        overallPageWrapper,
    };
};
