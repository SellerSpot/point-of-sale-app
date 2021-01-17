import { css } from '@emotion/css';
import { cssColors, cssVariables } from 'config/cssVariables';

interface IGetProductFromServerStyles {
    pageWrapper: string;
    pageHeader: string;
    pageHeaderBackIcon: string;
    pageTitleBar: string;
    pageBody: string;
    formGroup: string;
    formGroupSplitEqual: string;
    pageFooter: string;
}

export const getAddProductStyles = (): IGetProductFromServerStyles => {
    return {
        pageWrapper: css`
            width: 100%;
            height: 100%;
            background: ${cssColors['--primary-background-color']};
            display: grid;
            grid-template-rows: 50px 40px 1fr 70px;
        `,
        pageHeader: css`
            width: 100%;
            height: 50px;
            display: grid;
            grid-template-rows: 1fr;
            grid-template-columns: 30px 1fr;
            padding: 0 10px;
        `,
        pageHeaderBackIcon: css`
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        `,
        pageTitleBar: css`
            width: 100%;
            height: 100%;
            color: ${cssColors['--primary-font-color']};
            font-size: ${cssVariables['--font-size-header']};
            background-color: ${cssColors['--primary-background-color']};
            font-weight: bold;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 0 20px;
        `,
        pageBody: css`
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            padding: 0 20px;
            padding-top: 10px;
        `,
        formGroup: css`
            margin-bottom: 10px;
        `,
        formGroupSplitEqual: css`
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        `,
        pageFooter: css`
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 10px;
            padding: 0 20px;
        `,
    };
};
