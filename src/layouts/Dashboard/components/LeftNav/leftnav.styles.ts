import { css } from '@emotion/css';
import { cssColors, cssVariables } from 'config/cssVariables';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getLeftNavStyles = () => {
    return {
        leftNavWrapper: css`
            width: 99%;
            height: 100%;
            user-select: none;
            box-shadow: 0 0 1px 0 ${cssColors['--overlay-color']};
        `,
        contentWrapper: css`
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            border-radius: ${cssVariables['--border-radius']};
            background-color: ${cssColors['--primary-background-color']};
        `,
        storeNameHolder: css`
            width: 100%;
            height: 70px;
            font-size: ${cssVariables['--font-size-header']};
            font-weight: 700;
            pointer-events: none;
            padding-left: 20px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 10px;
        `,
        storeNameHolderSubtitle: css`
            font-size: ${cssVariables['--font-size-tertiary']};
            font-weight: 500;
        `,
        navItem: css`
            width: 100%;
            height: 50px;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding-left: 20px;
            cursor: pointer;
            margin-bottom: 5px;
            transition: color ${cssVariables['--transition-duration']};

            :hover {
                background-color: ${cssColors['--tertiary-background-color']};
            }

            :active {
                background-color: ${cssColors['--tertiary-background-color']};
            }
        `,
        navIcon: css`
            font-size: ${cssVariables['--font-size-master-sub']};
            margin-right: 15px;
            margin-top: 3px;
        `,
        navTitle: css`
            font-size: ${cssVariables['--font-size-default']};
            text-transform: capitalize;
        `,
        navSubHeading: css`
            width: 100%;
            padding-left: 20px;
            margin-bottom: 10px;
            font-size: ${cssVariables['--font-size-secondary']};
            font-weight: 600;
        `,
    };
};
