import React, { ReactNode } from 'react';
import styles from './alertmessage.module.css';
import cn from 'classnames';
import { Button } from '../Button/Button';
import {
    AiOutlineCheckCircle,
    AiOutlineCloseCircle,
    AiOutlineInfoCircle,
    AiOutlineWarning,
} from 'react-icons/ai';
import { cssColors } from '../../config/cssVariables';

export interface IAlertMessageProps {
    type: 'success' | 'warning' | 'danger' | 'info';
    label: string;
    action?: {
        actionLabel: string;
        onClick: () => void;
    };
    showIcon?: boolean;
    style?: React.CSSProperties;
}
const defaultProps: IAlertMessageProps = {
    type: 'info',
    label: 'Sample AlertMessage Message',
    showIcon: true,
    style: {},
};

// used to get the right icon to show
const getIcon = (sProps: IAlertMessageProps): ReactNode => {
    switch (sProps.type) {
        case 'warning':
            return <AiOutlineWarning size={'18px'} />;
        case 'success':
            return <AiOutlineCheckCircle size={'18px'} />;
        case 'danger':
            return <AiOutlineCloseCircle size={'18px'} />;
        case 'info':
            return <AiOutlineInfoCircle size={'18px'} />;
    }
};

// used to get the icon and button label color
const getPrimaryColor = (sProps: IAlertMessageProps): keyof typeof cssColors => {
    switch (sProps.type) {
        case 'warning':
            return '--warning-color';
        case 'success':
            return '--success-color';
        case 'danger':
            return '--danger-color';
        case 'info':
            return '--info-color';
    }
};

/**
 *
 * This feature is not yet available for server-side rendering.
 * Suspense support will be added in a later release.
 */

export const AlertMessage: React.FC<IAlertMessageProps> = (
    props: IAlertMessageProps,
): JSX.Element => {
    // seasoning the props
    const sProps: IAlertMessageProps = {
        ...defaultProps,
        ...props,
    };

    return (
        <div
            className={cn(
                styles.alertMessageWrapper,
                { [styles.infoAlert]: sProps.type === 'info' },
                { [styles.successAlert]: sProps.type === 'success' },
                { [styles.warningAlert]: sProps.type === 'warning' },
                { [styles.dangerAlert]: sProps.type === 'danger' },
            )}
        >
            <div>
                <div
                    className={cn(styles.alertContentItem)}
                    style={{ color: cssColors[getPrimaryColor(sProps)] }}
                >
                    {sProps.showIcon ? getIcon(sProps) : null}
                </div>
                <div className={cn(styles.alertContentItem)}>{sProps.label}</div>
            </div>
            {sProps.action !== undefined ? (
                <div className={cn(styles.alertActionButton)}>
                    <Button
                        label={sProps.action.actionLabel}
                        onClick={() => sProps.action?.onClick()}
                        variant="link"
                        size="small"
                        labelColor={getPrimaryColor(sProps)}
                    />
                </div>
            ) : null}
        </div>
    );
};
