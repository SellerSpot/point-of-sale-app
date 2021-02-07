import { last } from 'lodash';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SLIDERS, sliderModalSelector } from 'store/models/sliderModal';
import { handleCloseSlider } from 'utilities/general';
import styles from './cartItemDetail.module.scss';

export const CartItemDetail = (): JSX.Element => {
    // getting slider state from redux store
    const sliderState = useSelector(sliderModalSelector);

    //* used to handle the closing operations of the sliderModel
    useEffect(() => {
        if (sliderState.callBackStateTrack.includes(SLIDERS.itemDetailSlider)) {
            // getting the topmost slider
            const topMostSlider = last(sliderState.openSliders);
            // only executing action if the top most slider is the current slider
            if (topMostSlider === SLIDERS.itemDetailSlider) {
                handleCloseSlider({
                    callBackStateTrack: sliderState.callBackStateTrack,
                    sliderState,
                    topMostSlider,
                });
            }
        }
    }, [sliderState.callBackStateTrack]);

    return <div className={styles.pageWrapper}>Sample Content</div>;
};
