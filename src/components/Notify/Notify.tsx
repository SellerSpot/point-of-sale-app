import React, { ReactElement, useEffect } from 'react';
import cn from 'classnames';
import styles from './notify.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeNotify, notifySelector, showNotify } from '../../store/models/notify';
import { cssColors } from '../../config/cssVariables';
import { Utils } from '../../services/Utils';
import { AiOutlineCloseCircle } from 'react-icons/all';

export const Notify = (): ReactElement => {
    const { active, type, message, timeout } = useSelector(notifySelector);
    const dispatch = useDispatch();
    const clearNotification = () => dispatch(closeNotify());
    useEffect(() => {
        dispatch(
            showNotify({
                message: 'Brace for Impact!',
                type: 'success',
            }),
        );
    }, []);

    useEffect(() => {
        let timerReference: ReturnType<typeof setTimeout>;

        if (active) {
            timerReference = setTimeout(clearNotification, timeout);
        }
        return () => {
            clearTimeout(timerReference);
        };
    }, [active, message, type]);
    return (
        <div
            className={cn(styles.notifyWrapper, {
                [styles.notifyActive]: active,
            })}
            style={{
                background: cssColors[Utils.getColor(type)],
                color: cssColors['--light-font-color'],
            }}
        >
            <div className={cn(styles.messageHolder)}>{message}</div>
            <div onClick={clearNotification} className={cn(styles.closeIcon)}>
                <AiOutlineCloseCircle color={cssColors['--light-font-color']} />
            </div>
        </div>
    );
};
