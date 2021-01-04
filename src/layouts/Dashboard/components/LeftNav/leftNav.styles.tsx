import { css } from '@emotion/css';

interface IGetLeftNavStyles {
    leftNavWrapper: string;
    contentWrapper: string;
    storeNameHolder: string;
    storeNameHolderSubtitle: string;
    navItem: string;
    navIcon: string;
    navTitle: string;
    navSubHeading: string;
}

export const getLeftNavStyles = (): IGetLeftNavStyles => {
    const leftNavWrapper = css`
        width: 99%;
        height: 100%;
        user-select: none;
        box-shadow: 0 0 1px 0 var(--overlay-color);
    `;

    const contentWrapper = css`
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        border-radius: var(--border-radius);
        background-color: var(--primary-background-color);
    `;

    const storeNameHolder = css`
        width: 100%;
        height: 70px;
        font-size: var(--font-size-header);
        font-weight: 700;
        pointer-events: none;
        padding-left: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
    `;

    const storeNameHolderSubtitle = css`
        font-size: var(--font-size-tertiary);
        font-weight: 500;
    `;

    const navItem = css`
        width: 100%;
        height: 50px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 20px;
        cursor: pointer;
        margin-bottom: 5px;
        transition: color var(--transition-duration);

        :hover {
            background-color: var(--tertiary-background-color);
        }

        :active {
            background-color: var(--tertiary-background-color);
        }
    `;

    const navIcon = css`
        font-size: var(--font-size-master-sub);
        margin-right: 15px;
        margin-top: 3px;
    `;

    const navTitle = css`
        font-size: var(--font-size-default);
        text-transform: capitalize;
    `;

    const navSubHeading = css`
        width: 100%;
        padding-left: 20px;
        margin-bottom: 10px;
        font-size: var(--font-size-secondary);
        font-weight: 600;
    `;

    return {
        leftNavWrapper,
        contentWrapper,
        storeNameHolder,
        storeNameHolderSubtitle,
        navItem,
        navIcon,
        navTitle,
        navSubHeading,
    };
};