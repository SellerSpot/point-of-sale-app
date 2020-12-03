import React, { ReactElement, ReactNode } from 'react';
import styles from './slidermodal.module.css';
import cn from 'classnames';

interface ISliderModalProps {
    active: boolean;
    children: ReactNode;
    sliderSize?: '10%' | '20%' | '30%' | '40%' | '50%' | '60%' | '70%' | '80%' | '90%' | '100%'; // on small screeen by default slider width will span to entire width
}

const defaultProps: ISliderModalProps = {
    active: false,
    children: null,
    sliderSize: '40%',
};

export const SliderModal = (props: ISliderModalProps): ReactElement => {
    const { active, children, sliderSize } = { ...defaultProps, ...props };

    return (
        <div className={cn(styles.sliderModalWrapper, { [styles.sliderModalWrapperBackdrop]: active })}>
            <div
                style={{ width: sliderSize }}
                className={cn(styles.sliderContentWrapper, { [styles.sliderContentActive]: active })}
            >
                {children}
            </div>
        </div>
    );
};
