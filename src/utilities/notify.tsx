import React from 'react';
import { showNotify } from 'store/models/notify';
import { store } from 'store/store';
import styles from '../styles/notify.module.scss';

export const showMessage = (
    message: string | JSX.Element,
    type: 'success' | 'danger' | 'info' | 'warning' | 'default' = 'default',
    timeOut = 3000,
): void => {
    let colorProfile = '';
    switch (type) {
        case 'danger':
            colorProfile = styles.danger;
            break;
        case 'info':
            colorProfile = styles.info;
            break;
        case 'warning':
            colorProfile = styles.warning;
            break;
        case 'success':
            colorProfile = styles.success;
            break;
        default:
            colorProfile = styles.info;
            break;
    }
    store.dispatch(
        showNotify({
            content: (
                <div
                    className={colorProfile}
                    style={{
                        width: '100%',
                        height: '100%',
                        padding: 10,
                        wordBreak: 'keep-all',
                        lineHeight: '18px',
                    }}
                >
                    {message}
                </div>
            ),
            timeOut,
            styles: {
                padding: 0,
                margin: 0,
                height: 'auto',
                minHeight: 'auto',
            },
        }),
    );
};
