import React from 'react';
import styles from './loadingspinner.module.css';

export type PropsType = {
    size: 'extraSmall' | 'small' | 'medium' | 'large';
};

// used to assemble the class names
const getClassNames = (props: PropsType): string => {
    let classNames = styles.loader;
    switch (props.size) {
        case 'extraSmall':
            classNames += ' ' + styles.loaderExtraSmall;
            break;
        case 'small':
            classNames += ' ' + styles.loaderSmall;
            break;
        case 'medium':
            classNames += ' ' + styles.loaderMedium;
            break;
        case 'large':
            classNames += ' ' + styles.loaderLarge;
            break;
    }
    return classNames;
};

export const LoadingSpinner: React.FC<PropsType> = (props: PropsType): JSX.Element => {
    return (
        <div>
            <div className={getClassNames(props)}>Loading Spinner</div>
        </div>
    );
};
