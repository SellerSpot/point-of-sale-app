import React from 'react';
import styles from './statusflag.module.css';
import { cssColors } from '../../config/cssVariables';
import cn from 'classnames';

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

export const StatusFlag: React.FC<IStatusFlagProps> = (props: IStatusFlagProps): JSX.Element => {
    // seasoning the props
    const sProps: IStatusFlagProps = {
        ...defaultProps,
        ...props,
    };

    return (
        <div
            className={styles.statusFlagDiv}
            style={{
                color: cssColors[sProps.labelColor ?? '--tertiary-font-color'],
                ...sProps.style,
            }}
        >
            <div
                className={cn(
                    styles.spot,
                    { [styles.successSpot]: sProps.status === 'completed' ? true : false },
                    { [styles.pendingSpot]: sProps.status === 'pending' ? true : false },
                    { [styles.failedSpot]: sProps.status === 'failed' ? true : false },
                )}
            ></div>
            <div>{sProps.status.charAt(0).toUpperCase() + sProps.status.slice(1)}</div>
        </div>
    );
};
