import React from 'react';
import styles from './alertmessage.module.css';
import cn from 'classnames';
import { Button } from '../Button/Button';

export interface IAlertMessageProps {
    type: 'success' | 'warning' | 'danger';
    label: string;
    action?: {
        actionLabel: string;
        onClick: () => void;
    };
    style?: React.CSSProperties;
}
const defaultProps: IAlertMessageProps = {
    type: 'success',
    label: 'Sample AlertMessage Message',
    style: {},
};

export const AlertMessage: React.FC<IAlertMessageProps> = (props: IAlertMessageProps): JSX.Element => {
    // seasoning the props
    const sProps: IAlertMessageProps = {
        ...defaultProps,
        ...props,
    };

    return (
        <div
            className={cn(
                styles.alertWrapper,
                { [styles.successAlert]: sProps.type === 'success' },
                { [styles.warningAlert]: sProps.type === 'warning' },
                { [styles.dangerAlert]: sProps.type === 'danger' },
            )}
        >
            <span>{sProps.label}</span>
            {sProps.action !== undefined ? (
                <Button
                    label={sProps.action.actionLabel}
                    onClick={() => sProps.action?.onClick()}
                    variant="link"
                    size="small"
                    labelColor={'--primary-font-color'}
                />
            ) : null}
        </div>
    );
};
