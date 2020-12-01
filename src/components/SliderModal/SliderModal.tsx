import React, { ReactElement, ReactNode } from 'react';
import styles from './slidermodal.module.css';
import cn from 'classnames';

interface ISliderModalProps {
    active: boolean;
    children: ReactNode;
}

export const SliderModal = (props: ISliderModalProps): ReactElement => {
    const { active, children } = props;

    return (
        <div className={cn(styles.sliderModalWrapper, { [styles.sliderModalWrapperBackdrop]: active })}>
            <div className={cn(styles.sliderContentWrapper, { [styles.sliderContentActive]: active })}>{children}</div>
        </div>
    );
};
