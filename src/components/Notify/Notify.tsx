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

    useEffect(() => {
        dispatch(showNotify({ message: 'Brace for Impact!', type: 'warning' }));
    }, []);

    useEffect(() => {
        let timerReference: ReturnType<typeof setTimeout>;
        const clearNotification = () => dispatch(closeNotify());
        if (active) {
            timerReference = setTimeout(clearNotification, timeout);
        }
        return () => {
            clearTimeout(timerReference);
        };
    }, [active]);
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
            <div>{message}</div>
            <div className={cn(styles.closeIcon)}>
                <AiOutlineCloseCircle color={cssColors['--light-font-color']} />
            </div>
        </div>
    );
};