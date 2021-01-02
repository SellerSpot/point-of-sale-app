import { css } from '@emotion/css';

interface IGetProductStyles {
    productsWrapper: string;
    metaCardWrapper: string;
    tableWrapper: string;
}

export const getProductsStyles = (): IGetProductStyles => {
    const productsWrapper = css`
        width: 100%;
        height: 100%;
        padding: 10px;
        overflow: hidden;
        display: grid;
        grid-template-rows: 90px 1fr;
        gap: 10px;
    `;

    const metaCardWrapper = css`
        width: 100%;
        height: 100%;
    `;

    const tableWrapper = css`
        width: 100%;
        height: 100%;
        overflow-y: auto;
    `;

    return {
        productsWrapper,
        metaCardWrapper,
        tableWrapper,
    };
};
