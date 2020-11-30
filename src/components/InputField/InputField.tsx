import { nanoid } from 'nanoid';
import React from 'react';
import { cssColors } from '../../config/cssVariables';
import styles from './inputfield.module.css';

export interface IInputFieldProps {
    placeHolder: string;
    disabled?: boolean;
    borderColor?: keyof typeof cssColors;
    helperText?: string;
    label?: string;
    value?: string;
    type?: 'number' | 'text' | 'email' | 'password';
    borderStyle?: 'border' | 'shadow';
    onChange: (value: string) => void;
    style?: React.CSSProperties;
}

const defaultProps: IInputFieldProps = {
    placeHolder: 'Sample PlaceHolder',
    disabled: false,
    borderColor: '--border-accent-color',
    type: 'text',
    borderStyle: 'border',
    onChange: () => void 0,
    style: {},
};

// used to get the classNames for the InputField
const getClassNames = (sProps: IInputFieldProps): string => {
    let classNames = styles.inputField;
    if (sProps.borderStyle === 'shadow') classNames += ' ' + styles.shadowBorderField;
    return classNames;
};

export const InputField: React.FC<IInputFieldProps> = (props: IInputFieldProps): JSX.Element => {
    // unique name for the inputfield for the label and helper text to attach to
    const fieldId = nanoid();

    // seasoning the props
    const sProps: IInputFieldProps = {
        ...defaultProps,
        ...props,
    };

    return (
        <div className={styles.inputFieldWrapper}>
            {sProps.label !== undefined ? (
                <label className={styles.label} htmlFor={fieldId}>
                    {sProps.label}
                </label>
            ) : null}
            <input
                id={fieldId}
                className={getClassNames(sProps)}
                disabled={sProps.disabled}
                placeholder={sProps.placeHolder}
                type={sProps.type}
                value={sProps.value}
                onChange={(event) => sProps.onChange(event.target.value)}
            />
            {sProps.helperText !== undefined ? (
                <label className={styles.label + ' ' + styles.helperText} htmlFor={fieldId}>
                    {sProps.helperText}
                </label>
            ) : null}
        </div>
    );
};
