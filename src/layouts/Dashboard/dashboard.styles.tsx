import { css } from '@emotion/css';
import { cssColors } from 'config/cssVariables';

interface IGetDashboardStyles {
    dashboardWrapper: string;
    leftNavWrapper: string;
    mainBodyWrapper: string;
}

export const getDashboardStyles = (): IGetDashboardStyles => {
    const dashboardWrapper = css`
        height: 100vw;
        overflow-x: hidden;
        height: 100vh;
        overflow-y: hidden;
        display: grid;
        background-color: ${cssColors['--secondary-background-color']};
        grid-template-columns: 240px 1fr;
    `;

    const leftNavWrapper = css`
        width: 100%;
        height: 100%;
        /* padding: 10px; */
        overflow-x: hidden;
        overflow-y: auto;
        position: relative;
    `;

    const mainBodyWrapper = css`
        width: 100%;
        height: 100%;
        overflow-x: auto;
        overflow-y: auto;
        position: relative;
    `;

    return {
        dashboardWrapper,
        leftNavWrapper,
        mainBodyWrapper,
    };
};
