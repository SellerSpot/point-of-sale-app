import React from 'react';
import styles from './button.module.css';

export type PropsType = {
    label: string;
    variant: 'success' | 'warning' | 'danger' | 'default';
    action: 'primary' | 'secondary' | 'link';
};

// used to get the classnames
const getClassNames = (variant: PropsType['variant']): string => {
    let classNames = styles.defaultButton;
    switch (variant) {
        case 'success':
            classNames = styles.successButton;
            break;
        case 'danger':
            classNames = styles.dangerButton;
            break;
        case 'warning':
            classNames = styles.warningButton;
            break;
    }
    return classNames;
};

export const Button: React.FC<PropsType> = ({ label, variant }: PropsType): JSX.Element => {
    return (
        <div>
            <button className={getClassNames(variant)}>{label}</button>
        </div>
    );
};
