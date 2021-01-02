import { css } from '@emotion/css';

interface IGetSalesHistory {
    salesHistoryWrapper: string;
    metaCardWrapper: string;
    tableWrapper: string;
}

export const getSalesHistoryStyles = (): IGetSalesHistory => {
    const salesHistoryWrapper = css`
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
        salesHistoryWrapper,
        metaCardWrapper,
        tableWrapper,
    };
};
