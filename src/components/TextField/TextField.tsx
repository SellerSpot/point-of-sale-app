import React from 'react';
import styles from './textfield.module.css';

export type PropsType = {
    placeHolder?: string;
    fullWidth?: boolean;
    disabled?: boolean;
    variant?: 'success' | 'warning' | 'danger' | 'default';
    label?: string;
    helperText?: string;
    value?: string;
    inputType: 'number' | 'text' | 'email' | 'password';
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

// used to get the name for the textfield (and for the labels to attach to)
const getTextFieldName = (props: PropsType): string => {
    return (
        (props.label === undefined ? (props.helperText === undefined ? 'nolable' : props.helperText) : props.label) +
        btoa(Math.random().toString()).substr(10, 5)
    );
};

export const TextField: React.FC<PropsType> = (props: PropsType): JSX.Element => {
    return (
        <div>
            {props.label !== undefined ? (
                <label className={styles.label} htmlFor={getTextFieldName(props)}>
                    {props.label}
                </label>
            ) : null}
            <input
                id={getTextFieldName(props)}
                className={getClassNames(props)}
                disabled={props.disabled}
                placeholder={props.placeHolder}
                type={props.inputType}
                value={props.value}
            />
            {props.helperText !== undefined ? (
                <label className={styles.label + ' ' + styles.helperText} htmlFor={getTextFieldName(props)}>
                    {props.helperText}
                </label>
            ) : null}
        </div>
    );
};
