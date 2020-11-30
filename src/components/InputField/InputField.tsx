import { nanoid } from 'nanoid';
import React, { ReactNode } from 'react';
import { cssColors, cssVariables } from '../../config/cssVariables';
import styles from './inputfield.module.css';

export interface IInputFieldProps {
    placeHolder: string;
    disabled?: boolean;
    borderColor?: keyof typeof cssColors;
    helperText?: string;
    label?: string;
    value?: string;
    type?: 'number' | 'text' | 'email' | 'password';
    borderStyle?: 'border' | 'shadow' | 'noBorder';
    size?: 'compact' | 'default';
    prefix?: ReactNode;
    onChange: (value: string) => void;
    style?: React.CSSProperties;
}

const defaultProps: IInputFieldProps = {
    placeHolder: 'Sample PlaceHolder',
    disabled: false,
    borderColor: '--border-accent-color',
    type: 'text',
    size: 'default',
    borderStyle: 'border',
    onChange: () => void 0,
    style: {},
};

// used to get the styles for the component
const getComponentStyles = (sProps: IInputFieldProps): React.CSSProperties => {
    const componentStyles: React.CSSProperties = {};
    switch (sProps.borderStyle) {
        case 'noBorder':
            componentStyles.border = '1px solid transparent';
            break;
        case 'shadow':
            componentStyles.border = '1px solid transparent';
            componentStyles.boxShadow = cssVariables['--shadow'];
    }
    if (sProps.size === 'compact') {
        componentStyles.height = cssVariables['--small-input-field-height'];
        componentStyles.padding = '0px';
        componentStyles.border = '1px solid transparent';
    }

    if (sProps.prefix !== undefined) {
        componentStyles.borderTopLeftRadius = '0px';
        componentStyles.borderBottomLeftRadius = '0px';
        componentStyles.borderLeftColor = 'transparent';
    }

    return componentStyles;
};

// used to get the prefix and suffix styles
const getPrefixSufficStyles = (sProps: IInputFieldProps): React.CSSProperties => {
    const prefixSuffixStyles: React.CSSProperties = {};
    if (sProps.size === 'compact') {
        prefixSuffixStyles.borderColor = 'transparent';
    }
    return prefixSuffixStyles;
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

            <div className={styles.inputWrapper}>
                {sProps.prefix ?? false ? (
                    <div style={getPrefixSufficStyles(sProps)} className={styles.prefix}>
                        {sProps.prefix}
                    </div>
                ) : null}
                <input
                    id={fieldId}
                    className={styles.inputField}
                    disabled={sProps.disabled}
                    placeholder={sProps.placeHolder}
                    type={sProps.type}
                    value={sProps.value}
                    onChange={(event) => sProps.onChange(event.target.value)}
                    style={getComponentStyles(sProps)}
                />
            </div>

            {sProps.helperText !== undefined ? (
                <label className={styles.label + ' ' + styles.helperText} htmlFor={fieldId}>
                    {sProps.helperText}
                </label>
            ) : null}
        </div>
    );
};
