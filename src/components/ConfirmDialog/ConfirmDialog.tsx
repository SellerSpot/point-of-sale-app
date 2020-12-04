import React, { ReactElement, ReactNode } from 'react';
import styles from './confirmdialog.module.css';
import cn from 'classnames';
import { Button } from '../Button/Button';
import { cssColors } from '../../config/cssVariables';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { closeConfirmDialog, confirmDialogSelector } from '../../store/models/confirmDialogModal';

export interface IConfirmDialogProps {
    active: boolean;
    title: string;
    description: string;
    successActionLabel: string;
    failureActionLabel: string;
    onSuccess: () => void;
    onFailure: () => void;
    inputFields?: ReactNode;
    style?: React.CSSProperties;
}

export const ConfirmDialog = (): ReactElement => {
    const confirmDialogProps = useSelector(confirmDialogSelector);
    // to manage which tab is selected
    const disptach = useDispatch();
    // used to find if input fields need to be shown in the dialog box
    const showInputFields = confirmDialogProps.inputFields !== undefined;

    return (
        <div
            className={cn(styles.confirmDialogWrapper, {
                [styles.confirmDialogWrapperBackdrop]: confirmDialogProps.active,
            })}
        >
            <div
                className={cn(styles.confirmDialogContentWrapper, {
                    [styles.confirmDialogContentActive]: confirmDialogProps.active,
                })}
            >
                <div className={cn(styles.content, { [styles.contentWithInputFields]: showInputFields })}>
                    <div className={styles.dialogClose}>
                        <MdClose
                            style={{
                                cursor: 'pointer',
                            }}
                            color={cssColors['--border-darker-color']}
                            size={'16px'}
                            onClick={() => disptach(closeConfirmDialog())}
                        />
                    </div>
                    <div className={styles.contentTitle}>{confirmDialogProps.title}</div>
                    <div className={styles.contentDescription}>{confirmDialogProps.description}</div>
                    {showInputFields ? (
                        <div className={styles.inputFields}>{confirmDialogProps.inputFields}</div>
                    ) : null}
                    <div className={styles.contentActions}>
                        <Button
                            label={confirmDialogProps.failureActionLabel ?? ''}
                            variant={'link'}
                            backgroundColor={'--transparent-color'}
                            labelColor={'--danger-color'}
                            onClick={() => {
                                confirmDialogProps.onFailure();
                                disptach(closeConfirmDialog());
                            }}
                        />
                        <Button
                            label={confirmDialogProps.successActionLabel ?? ''}
                            variant={'link'}
                            backgroundColor={'--transparent-color'}
                            labelColor={'--success-color'}
                            onClick={() => {
                                confirmDialogProps.onSuccess();
                                disptach(closeConfirmDialog());
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
