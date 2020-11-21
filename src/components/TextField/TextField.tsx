import React from 'react';
import styles from './textfield.module.css';

export type PropsType = {
    placeHolder?: string;
    fullWidth?: boolean;
    disabled?: boolean;
    variant?: 'success' | 'warning' | 'danger' | 'default';
    label?: string;
    value?: string;
};

// used to assemble classnames for the textfield
const getClassNames = (props: PropsType): string => {
    let classNames = styles.textField;
    if (props.fullWidth) classNames += ' ' + styles.fullWidth;
    switch (props.variant) {
        case 'success':
            classNames += ' ' + styles.successField;
            break;
        case 'warning':
            classNames += ' ' + styles.warningField;
            break;
        case 'danger':
            classNames += ' ' + styles.dangerField;
            break;
    }
    return classNames;
};

export const TextField: React.FC<PropsType> = (props: PropsType): JSX.Element => {
    return (
        <div>
            {props.label !== undefined ? <label htmlFor={props.label}>{props.label}</label> : null}
            <input
                name={props.label}
                className={getClassNames(props)}
                disabled={props.disabled}
                placeholder={props.placeHolder}
                type="text"
                value={props.value}
            />
        </div>
    );
};
