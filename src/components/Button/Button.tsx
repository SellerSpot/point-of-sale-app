import React from 'react';
import styles from './button.module.css';

export type PropsType = {
    label: string;
    variant: 'success' | 'warning' | 'danger' | 'default';
    type: 'solid' | 'line' | 'link' | 'icon';
    shape: 'default' | 'rounded';
};

// used to get the classnames
const getClassNames = (variant: PropsType['variant'], type: PropsType['type'], shape: PropsType['shape']): string => {
    let classNames = styles.default;
    switch (variant) {
        case 'success':
            classNames = styles.success;
            break;
        case 'danger':
            classNames = styles.danger;
            break;
        case 'warning':
            classNames = styles.warning;
            if (type === 'solid') classNames += ' ' + styles.darkText;
            break;
    }
    switch (type) {
        case 'solid':
            classNames += ' ' + styles.solid;
            break;
        case 'line':
            classNames += ' ' + styles.line;
            break;
        case 'link':
            classNames += ' ' + styles.link;
            break;
        case 'icon':
            classNames += ' ' + styles.icon;
    }
    if (shape === 'rounded') classNames += ' ' + styles.rounded;
    return classNames;
};

export const Button: React.FC<PropsType> = ({
    label = 'Button Label',
    variant = 'default',
    type = 'solid',
    shape = 'default',
}: PropsType): JSX.Element => {
    return (
        <div>
            <button className={getClassNames(variant, type, shape)}>{label}</button>
        </div>
    );
};
