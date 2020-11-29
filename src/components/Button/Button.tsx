import React from 'react';
import styles from './button.module.css';
import { cssColors } from '../../config/cssVariables';

export interface IButtonProps {
    label: string;
    shape?: 'rectangle' | 'rounded';
    disabled?: boolean;
    size?: 'small' | 'medium';
    variant?: 'solid' | 'line' | 'link';
    type?: 'button' | 'submit' | 'reset';
    color?: keyof typeof cssColors;
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
    color: '--success-color',
    labelColor: '--light-font-color',
    type: 'button',
    style: {},
    onClick: () => {
        return null;
    },
};

const getButtonStyle = (sProps: IButtonProps): React.CSSProperties => {
    return {
        backgroundColor: sProps.color,
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
