import { css } from '@emotion/css';
import { cssColors, cssVariables } from 'config/cssVariables';

interface IGetNewSaleStyles {
    newSaleWrapper: string;
    leftPanel: string;
    rightPanel: string;
    extraControlsCard: string;
    calculationCard: string;
    calculationEntry: string;
}
export const getNewSaleStyles = (): IGetNewSaleStyles => {
    return {
        newSaleWrapper: css`
            width: 100vw;
            height: 100vh;
            display: grid;
            overflow: hidden;
            grid-template-columns: 65% 1fr;
            grid-template-rows: 1fr;
            padding: 10px;
            gap: 10px;
            background-color: ${cssColors['--secondary-background-color']};
        `,
        leftPanel: css`
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 40px 1fr 100px;
            gap: 10px;
        `,
        rightPanel: css`
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 250px;
            gap: 10px;
        `,
        extraControlsCard: css`
            width: 100%;
            height: 100%;
            padding: 10px;
            background-color: ${cssColors['--primary-background-color']};
            border-radius: ${cssVariables['--border-radius']};
            box-shadow: ${cssVariables['--shadow']};
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: flex-start;
        `,
        calculationCard: css`
            width: 100%;
            height: 100%;
            padding: 10px 20px;
            background-color: ${cssColors['--primary-background-color']};
            border-radius: ${cssVariables['--border-radius']};
            box-shadow: ${cssVariables['--shadow']};
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            gap: 15px;
        `,
        calculationEntry: css`
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 700;
            font-size: ${cssVariables['--font-size-small-heading']};
        `,
    };
};
