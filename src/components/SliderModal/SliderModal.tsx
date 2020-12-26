import React, { ReactElement, ReactNode } from 'react';
import styles from './slidermodal.module.css';
import cn from 'classnames';
import { merge } from 'lodash';

interface ISliderModalProps {
    active: boolean;
    children: ReactNode;
    sliderSize?: '10%' | '20%' | '30%' | '40%' | '50%' | '60%' | '70%' | '80%' | '90%' | '100%'; // on small screeen by default slider width will span to entire width
    onClickBackdrop?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const defaultProps: ISliderModalProps = {
    active: false,
    children: null,
    sliderSize: '40%',
    onClickBackdrop: () => void 0,
};

export const SliderModal = (props: ISliderModalProps): ReactElement => {
    const { active, children, sliderSize, onClickBackdrop } = merge(defaultProps, props);

    return (
        <div
            className={cn(styles.sliderModalWrapper, {
                [styles.sliderModalWrapperBackdrop]: active,
                [styles.sliderModalWrapperBackdropInActive]: !active,
            })}
        >
            <div className={styles.backdropOverlay} onClick={onClickBackdrop} />
            <div
                style={{ width: sliderSize }}
                className={cn(styles.sliderContentWrapper, {
                    [styles.sliderContentActive]: active,
                    [styles.sliderContentInActive]: !active,
                })}
            >
                {children}
            </div>
        </div>
    );
};
