import React from 'react';
import styles from './button.module.css';

export type PropsType = {
    label: string;
    variant: 'success' | 'warning' | 'danger' | 'default';
    type: 'solid' | 'line' | 'link' | 'icon';
    shape: 'default' | 'rounded';
    disabled?: boolean;
};

// used to get the classnames
const getClassNames = (props: PropsType): string => {
    let classNames = styles.default;
    switch (props.variant) {
        case 'success':
            classNames = styles.success;
            break;
        case 'danger':
            classNames = styles.danger;
            break;
        case 'warning':
            classNames = styles.warning;
            if (props.type === 'solid') classNames += ' ' + styles.darkText;
            break;
    }
    switch (props.type) {
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
    if (props.shape === 'rounded') classNames += ' ' + styles.rounded;
    if (props.disabled) classNames += ' ' + styles.disabled;
    return classNames;
};

export const Button: React.FC<PropsType> = (props: PropsType): JSX.Element => {
    return (
        <div>
            <button disabled={props.disabled} className={getClassNames(props)}>
                {props.label}
            </button>
        </div>
    );
};
