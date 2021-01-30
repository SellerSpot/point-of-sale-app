import { DebouncedFunc } from 'lodash';
import { productRequests } from 'requests/requests';
import { toggleSliderModal } from 'store/models/sliderModal';
import { store } from 'store/store';
import { pointOfSaleTypes } from '@sellerspot/universal-types';

// used to handle the closing of the sliderModal
export const handleCloseSlider = (
    setCallBackStateTrack: React.Dispatch<React.SetStateAction<boolean>>,
): void => {
    store.dispatch(
        toggleSliderModal({
            sliderName: 'newSaleSlider',
            active: false,
        }),
    );
    setCallBackStateTrack(false);
};
