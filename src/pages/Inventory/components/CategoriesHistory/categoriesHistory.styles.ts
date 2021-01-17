import { css } from '@emotion/css';

interface IGetCategoriesFromServerStyles {
    categoriesWrapper: string;
    metaCardWrapper: string;
    tableWrapper: string;
}

export const getCategoriesHistoryStyles = (): IGetCategoriesFromServerStyles => {
    return {
        categoriesWrapper: css`
            width: 100%;
            height: 100%;
            padding: 10px;
            overflow: hidden;
            display: grid;
            grid-template-rows: 90px 1fr;
            gap: 10px;
        `,
        metaCardWrapper: css`
            width: 100%;
            height: 100%;
        `,
        tableWrapper: css`
            width: 100%;
            height: 100%;
            overflow-y: auto;
        `,
    };
};
