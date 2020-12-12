import React, { ReactNode } from 'react';
import { cssColors } from '../../config/cssVariables';
import styles from './inputfield.module.css';
import cn from 'classnames';

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
    suffix?: ReactNode;
    error?: {
        showError: boolean;
        errorMessage: string;
    };
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
    error: {
        errorMessage: 'Default error message',
        showError: false,
    },
    onChange: () => void 0,
    style: {},
};

export const InputField: React.FC<IInputFieldProps> = (props: IInputFieldProps): JSX.Element => {
    // seasoning the props
    const sProps: IInputFieldProps = {
        ...defaultProps,
        ...props,
    };

    return (
        <div className={styles.inputFieldWrapper}>
            {sProps.label !== undefined ? <label className={styles.label}>{sProps.label}</label> : null}

            <div className={styles.inputWrapper}>
                {sProps.prefix ?? false ? (
                    <div
                        className={cn(
                            styles.prefix,
                            { [styles.prefixSuffixCompact]: sProps.size === 'compact' },
                            { [styles.prefixSuffixDisabled]: sProps.disabled },
                            { [styles.prefixSuffixError]: sProps.error?.showError },
                            { [styles.prefixSuffixNoBorder]: sProps.borderStyle === 'noBorder' },
                            { [styles.prefixSuffixShadow]: sProps.borderStyle === 'shadow' },
                        )}
                    >
                        {sProps.prefix}
                    </div>
                ) : null}
                <input
                    className={cn(
                        styles.inputField,
                        {
                            [styles.inputFieldError]:
                                sProps.error?.showError && sProps.size === 'default' && sProps.borderStyle === 'border',
                        },
                        { [styles.inputFieldCompactSize]: sProps.size === 'compact' },
                        {
                            [styles.inputFieldNoBorder]: sProps.borderStyle === 'noBorder',
                        },
                        {
                            [styles.inputFieldShadowBorder]: sProps.borderStyle === 'shadow',
                        },
                        {
                            [styles.inputFieldPrefixPresent]: sProps.prefix !== undefined,
                        },
                        {
                            [styles.inputFieldSuffixPresent]: sProps.suffix !== undefined,
                        },
                    )}
                    disabled={sProps.disabled}
                    placeholder={sProps.placeHolder}
                    type={sProps.type}
                    value={sProps.value}
                    onChange={(event) => sProps.onChange(event.target.value)}
                    style={sProps.style}
                />
                {sProps.suffix ?? false ? (
                    <div
                        className={cn(
                            styles.suffix,
                            { [styles.prefixSuffixCompact]: sProps.size === 'compact' },
                            { [styles.prefixSuffixDisabled]: sProps.disabled },
                            { [styles.prefixSuffixError]: sProps.error?.showError },
                            { [styles.prefixSuffixNoBorder]: sProps.borderStyle === 'noBorder' },
                            { [styles.prefixSuffixShadow]: sProps.borderStyle === 'shadow' },
                        )}
                    >
                        {sProps.suffix}
                    </div>
                ) : null}
            </div>

            {sProps.helperText !== undefined ? (
                <label
                    className={cn(styles.label, styles.helperText, { [styles.hintTextError]: sProps.error?.showError })}
                >
                    {sProps.error?.showError ? sProps.error.errorMessage : sProps.helperText}
                </label>
            ) : null}
        </div>
    );
};
