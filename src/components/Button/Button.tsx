import React from 'react';
import styles from './button.module.css';

export type PropsType = {
    label: string;
    variant: 'success' | 'warning' | 'danger' | 'default';
    type: 'solid' | 'line' | 'link';
    shape: 'default' | 'rounded';
    disabled?: boolean;
    size?: 'small' | 'default';
    onClickCallback?: () => void;
};

// used to get the classnames
const getClassNames = (props: PropsType): string => {
    let classNames = styles.button + ' ' + styles.default;
    switch (props.variant) {
        case 'success':
            classNames += ' ' + styles.success;
            break;
        case 'danger':
            classNames += ' ' + styles.danger;
            break;
        case 'warning':
            classNames += ' ' + styles.warning;
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
    }
    if (props.shape === 'rounded') classNames += ' ' + styles.rounded;
    if (props.disabled) classNames += ' ' + styles.disabled;
    if (props.size === 'small') classNames += ' ' + styles.smallButton;
    return classNames;
};

export const Button: React.FC<PropsType> = (props: PropsType): JSX.Element => {
    return (
        <div>
            <button onClick={props.onClickCallback} disabled={props.disabled} className={getClassNames(props)}>
                {props.label}
            </button>
        </div>
    );
};
