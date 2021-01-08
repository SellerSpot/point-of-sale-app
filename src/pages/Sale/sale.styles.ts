import { css } from '@emotion/css';
import { cssColors } from 'config/cssVariables';

interface IGetSaleStyles {
    salesWrapper: string;
    tabBarWrapper: string;
    overallPageWrapper: string;
}

export const getSaleStyles = (): IGetSaleStyles => {
    return {
        salesWrapper: css`
            width: 100%;
            height: 100%;
            position: relative;
            display: grid;
            grid-template-rows: 50px 1fr;
        `,
        tabBarWrapper: css`
            width: 100%;
            height: 100%;
            box-shadow: 0 0 3px 0 ${cssColors['--overlay-color']};
            position: relative;
            z-index: 1;
        `,
        overallPageWrapper: css`
            width: 100%;
            height: 100%;
            overflow-x: auto;
            overflow-y: auto;
        `,
    };
};
