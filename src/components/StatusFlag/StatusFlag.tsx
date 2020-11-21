import React from 'react';
import styles from './statusflag.module.css';

export type PropsType = {
    type: 'completed' | 'pending' | 'failed';
};

// used to assemble the class name for the spot
const getSpotClassNames = (props: PropsType): string => {
    let classNames = styles.spot;
    switch (props.type) {
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

export const StatusFlag: React.FC<PropsType> = (props: PropsType): JSX.Element => {
    return (
        <div className={styles.statusFlagDiv}>
            <div className={getSpotClassNames(props)}></div>
            <div>{props.type.charAt(0).toUpperCase() + props.type.slice(1)}</div>
        </div>
    );
};
