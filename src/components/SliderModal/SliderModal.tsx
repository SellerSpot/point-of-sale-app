import React, { ReactElement, ReactNode } from 'react';
import styles from './slidermodal.module.css';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { SliderModalInitialState, toggleSliderModal } from '../../store/models/sliderModal';
import { closeConfirmDialog, openConfirmDialog } from '../../store/models/confirmDialog';

interface ISliderModalProps {
    active: boolean;
    children: ReactNode;
    sliderSize?: '10%' | '20%' | '30%' | '40%' | '50%' | '60%' | '70%' | '80%' | '90%' | '100%'; // on small screeen by default slider width will span to entire width
    sliderName: keyof SliderModalInitialState;
    confirmSliderClose?: {
        show: boolean;
        message?: string;
    };
}

const defaultProps: ISliderModalProps = {
    active: false,
    children: null,
    sliderSize: '40%',
    sliderName: 'addCategorySlider',
    confirmSliderClose: {
        show: false,
        message: 'Are you sure you want to go back to previous page?',
    },
};

export const SliderModal = (props: ISliderModalProps): ReactElement => {
    const { active, children, sliderSize, confirmSliderClose } = { ...defaultProps, ...props };
    const dispatch = useDispatch();

    // used to close the slider on keydown
    const handleSliderClose = () => {
        if (confirmSliderClose?.show) {
            dispatch(
                openConfirmDialog({
                    title: 'Are you sure?',
                    description: confirmSliderClose?.message ?? '',
                    failureActionLabel: 'Close',
                    successActionLabel: 'Cancel',
                    actionOrder: 'reverse',
                    onFailure: () => {
                        dispatch(toggleSliderModal({ sliderName: props.sliderName, active: false }));
                    },
                    onSuccess: () => {
                        dispatch(closeConfirmDialog());
                    },
                }),
            );
        } else {
            dispatch(toggleSliderModal({ sliderName: props.sliderName, active: false }));
        }
    };

    return (
        <div
            className={cn(styles.sliderModalWrapper, {
                [styles.sliderModalWrapperBackdrop]: active,
                [styles.sliderModalWrapperBackdropInActive]: !active,
            })}
        >
            <div className={styles.backdropOverlay} onClick={() => handleSliderClose()}></div>
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
