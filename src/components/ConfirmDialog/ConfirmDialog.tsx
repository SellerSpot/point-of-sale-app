import React, { ReactElement } from 'react';
import styles from './confirmdialog.module.css';
import cn from 'classnames';
import { Button } from '../Button/Button';
import { cssColors } from '../../config/cssVariables';
import { MdClose } from 'react-icons/md';

export interface IConfirmDialogProps {
    active: boolean;
    title?: string;
    description?: string;
    successActionLabel?: string;
    failureActionLabel?: string;
    onSuccess?: () => void;
    onFailure?: () => void;
    style?: React.CSSProperties;
}

const defaultProps: IConfirmDialogProps = {
    active: false,
    title: 'This is sample confirm dialog header?',
    successActionLabel: 'Agree',
    failureActionLabel: 'Disagree',
    description:
        'This is sample confirm dialog description. This is sample confirm dialog description. This is sample confirm dialog description.',
    onFailure: () => void 0,
    onSuccess: () => void 0,
};

export const ConfirmDialog = (props: IConfirmDialogProps): ReactElement => {
    // seasoning the props
    const sProps: IConfirmDialogProps = {
        ...defaultProps,
        ...props,
    };

    return (
        <div className={cn(styles.confirmDialogWrapper, { [styles.confirmDialogWrapperBackdrop]: sProps.active })}>
            <div
                className={cn(styles.confirmDialogContentWrapper, {
                    [styles.confirmDialogContentActive]: sProps.active,
                })}
            >
                <div className={styles.content}>
                    <div className={styles.dialogClose}>
                        <MdClose color={cssColors['--border-darker-color']} size={'20px'} />
                    </div>
                    <div className={styles.contentTitle}>{sProps.title}</div>
                    <div className={styles.contentDescription}>{sProps.description}</div>
                    <div className={styles.contentActions}>
                        <Button
                            label={sProps.failureActionLabel ?? ''}
                            variant={'link'}
                            backgroundColor={'--transparent-color'}
                            labelColor={'--danger-color'}
                        />
                        <Button
                            label={sProps.successActionLabel ?? ''}
                            variant={'link'}
                            backgroundColor={'--transparent-color'}
                            labelColor={'--success-color'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
