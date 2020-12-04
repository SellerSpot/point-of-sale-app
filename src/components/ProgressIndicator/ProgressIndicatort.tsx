import React from 'react';
import styles from './progressindicator.module.css';
import { cssColors } from '../../config/cssVariables';
import cn from 'classnames';

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
                    className={cn(
                        styles.loader,
                        { [styles.loaderExtraSmall]: sProps.size === 'extraSmall' ? true : false },
                        { [styles.loaderSmall]: sProps.size === 'small' ? true : false },
                        { [styles.loaderMedium]: sProps.size === 'medium' ? true : false },
                        { [styles.loaderLarge]: sProps.size === 'large' ? true : false },
                    )}
                >
                    Loading Spinner
                </div>
            ) : null}
        </div>
    );
};
