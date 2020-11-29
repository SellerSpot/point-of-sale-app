import React from 'react';
import styles from './button.module.css';
import { cssColors, cssVariables } from '../../config/cssVariables';

export interface IButtonProps {
    label: string;
    shape?: 'rectangle' | 'rounded';
    disabled?: boolean;
    size?: 'small' | 'medium';
    variant?: 'solid' | 'outline' | 'link';
    type?: 'button' | 'submit' | 'reset';
    backgroundColor?: keyof typeof cssColors;
    labelColor?: keyof typeof cssColors;
    style?: React.CSSProperties;
    onClick?: () => void;
}

const defaultProps: IButtonProps = {
    label: 'Button',
    shape: 'rectangle',
    disabled: false,
    size: 'medium',
    variant: 'solid',
    backgroundColor: '--success-color',
    labelColor: '--light-font-color',
    type: 'button',
    style: {},
    onClick: () => {
        return null;
    },
};

const getButtonStyle = (sProps: IButtonProps): React.CSSProperties => {
    const cssProps: React.CSSProperties = {};
    switch (sProps.variant) {
        case 'solid':
            // setting the font color
            cssProps.color = cssColors[sProps.labelColor ?? '--light-font-color'];
            cssProps.backgroundColor = cssColors[sProps.backgroundColor ?? '--disabled-color'];
            cssProps.border = '1px solid ' + cssColors[sProps.backgroundColor ?? '--disabled-color'];
            break;
        case 'link':
            cssProps.color = cssColors[sProps.labelColor ?? '--light-font-color'];
            cssProps.border = '1px solid transparent';
            cssProps.backgroundColor = 'transparent';
            break;
        case 'outline':
            cssProps.color = cssColors[sProps.labelColor ?? '--light-font-color'];
            cssProps.border = '1px solid ' + cssColors[sProps.backgroundColor ?? '--disabled-color'];
            cssProps.backgroundColor = 'transparent';
            break;
    }
    cssProps.borderRadius =
        sProps.shape === 'rounded' ? cssVariables['--rounded-border-radius'] : cssVariables['--border-radius'];
    cssProps.fontSize =
        sProps.size === 'small' ? cssVariables['--font-size-tertiary'] : cssVariables['--font-size-secondary'];

    if (sProps.disabled) {
        cssProps.color = cssColors['--light-font-color'];
        cssProps.backgroundColor = cssColors['--disabled-color'];
        cssProps.border = '1px solid --disabled-color';
    }

    return {
        ...cssProps,
        ...sProps.style,
    };
};

export const Button: React.FC<IButtonProps> = (props: IButtonProps): JSX.Element => {
    // seasoning the props
    const sProps: IButtonProps = {
        ...defaultProps,
        ...props,
    };

    return (
        <div>
            <button
                className={styles.button}
                onClick={sProps.onClick}
                disabled={sProps.disabled}
                style={getButtonStyle(sProps)}
            >
                {sProps.label}
            </button>
        </div>
    );
};
