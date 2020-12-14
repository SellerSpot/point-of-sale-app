import React, { ReactElement, useState } from 'react';
import styles from './togglebutton.module.css';
import cn from 'classnames';

export interface IToggleButtonProps {
    active: boolean;
    toggleCallback: (activeStatus: boolean) => void;
}

export const ToggleButton = (props: IToggleButtonProps): ReactElement => {
    const [active, setActive] = useState(props.active);
    const onClick = (isActive: boolean) => {
        setActive(isActive);
        props.toggleCallback(isActive);
    };
    return (
        <div className={cn(styles.toggleButtonWrapper)}>
            <input type="checkbox" className={cn(styles.toggleButtonInput)} checked={active} />
            <div
                className={cn(styles.actionBlockHolder, {
                    [styles.sliderHandleActive]: active,
                })}
            >
                <div
                    onClick={() => onClick(!active)}
                    className={cn(styles.sliderHandle, {
                        [styles.sliderActive]: active,
                    })}
                ></div>
                <div onClick={() => onClick(false)} className={cn(styles.actionClickBlock)}></div>
                <div onClick={() => onClick(true)} className={cn(styles.actionClickBlock)}></div>
            </div>
        </div>
    );
};
