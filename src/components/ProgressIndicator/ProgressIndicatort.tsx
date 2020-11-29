import React from 'react';
import styles from './progressindicator.module.css';
import { cssColors } from '../../config/cssVariables';

export interface IProgressIndicatorProps {
    size?: 'extraSmall' | 'small' | 'medium' | 'large';
    showLoading: boolean;
    indicatorColor?: keyof typeof cssColors;
    trackColor?: keyof typeof cssColors;
    style?: React.CSSProperties;
}

const defaultProps: IProgressIndicatorProps = {
    showLoading: true,
    indicatorColor: '--border-darker-color',
    trackColor: '--border-color',
    size: 'extraSmall',
    style: {},
};

// used to assemble the class names
const getClassNames = (sProps: IProgressIndicatorProps): string => {
    let classNames = styles.loader;
    switch (sProps.size) {
        case 'extraSmall':
            classNames += ' ' + styles.loaderExtraSmall;
            break;
        case 'small':
            classNames += ' ' + styles.loaderSmall;
            break;
        case 'medium':
            classNames += ' ' + styles.loaderMedium;
            break;
        case 'large':
            classNames += ' ' + styles.loaderLarge;
            break;
    }
    return classNames;
};

export const ProgressIndicator: React.FC<IProgressIndicatorProps> = (props: IProgressIndicatorProps): JSX.Element => {
    // seasoning the props
    const sProps: IProgressIndicatorProps = {
        ...defaultProps,
        ...props,
    };

    return (
        <div>
            {sProps.showLoading ? (
                <div
                    style={{
                        borderColor: cssColors[sProps.trackColor ?? '--border-darker-color'],
                        borderLeftColor: cssColors[sProps.indicatorColor ?? '--border-color'],
                        ...sProps.style,
                    }}
                    className={getClassNames(sProps)}
                >
                    Loading Spinner
                </div>
            ) : null}
        </div>
    );
};
