import React from 'react';
import styles from './statusflag.module.css';
import { cssColors } from '../../config/cssVariables';

export interface IStatusFlagProps {
    status: 'completed' | 'pending' | 'failed';
    labelColor?: keyof typeof cssColors;
    style?: React.CSSProperties;
}
const defaultProps: IStatusFlagProps = {
    status: 'completed',
    labelColor: '--tertiary-font-color',
    style: {},
};

// used to assemble the class name for the spot
const getSpotClassNames = (sProps: IStatusFlagProps): string => {
    let classNames = styles.spot;
    switch (sProps.status) {
        case 'completed':
            classNames += ' ' + styles.successSpot;
            break;
        case 'pending':
            classNames += ' ' + styles.pendingSpot;
            break;
        case 'failed':
            classNames += ' ' + styles.failedSpot;
    }
    return classNames;
};

export const StatusFlag: React.FC<IStatusFlagProps> = (props: IStatusFlagProps): JSX.Element => {
    // seasoning the props
    const sProps: IStatusFlagProps = {
        ...defaultProps,
        ...props,
    };

    return (
        <div
            className={styles.statusFlagDiv}
            style={{ color: cssColors[sProps.labelColor ?? '--tertiary-font-color'], ...sProps.style }}
        >
            <div className={getSpotClassNames(sProps)}></div>
            <div>{sProps.status.charAt(0).toUpperCase() + sProps.status.slice(1)}</div>
        </div>
    );
};
