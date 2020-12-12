import React, { ReactElement, useEffect } from 'react';
import cn from 'classnames';
import styles from './notify.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeNotify, notifySelector } from '../../store/models/notify';
import { cssColors } from '../../config/cssVariables';
import { AiOutlineCloseCircle } from 'react-icons/all';
import { utils } from '../../services';

export const Notify = (): ReactElement => {
    const { active, type, message, timeout } = useSelector(notifySelector);
    const dispatch = useDispatch();
    const clearNotification = () => dispatch(closeNotify());

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
                background: cssColors[utils.getColor(type)],
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
