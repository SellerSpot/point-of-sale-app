import { css } from '@emotion/css';
import { cssColors, cssVariables } from '../../config/cssVariables';

export interface IGetTabBarStyles {
    tabBarWrapper: string;
    tab: string;
    tabTitle: string;
    selectedTab: string;
}

export const getTabBarStyles = (): IGetTabBarStyles => {
    const tabBarWrapper = css`
        width: 100%;
        height: 50px;
        background-color: ${cssColors['--primary-background-color']};
        box-shadow: ${cssVariables['--shadow']};
        border-radius: ${cssVariables['--border-radius']};
        display: flex;
        justify-content: flex-start;
        align-items: center;
        user-select: none;
        padding-left: 20px;
    `;

    const tab = css`
        cursor: pointer;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0px 10px;

        :hover {
            background-color: ${cssColors['--tertiary-background-color']};
        }
    `;

    const tabTitle = css`
        font-weight: 700;
        font-size: ${cssVariables['--font-size-default']};
        color: ${cssColors['--primary-font-color']};
        transition: color ${cssVariables['--transition-duration']};
        text-decoration: none;
    `;

    const selectedTab = css`
        color: ${cssColors['--sales-color']};
    `;

    return {
        selectedTab,
        tab,
        tabBarWrapper,
        tabTitle,
    };
};
