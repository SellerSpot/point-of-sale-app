import { SliderModalInitialState, toggleSliderModal } from 'store/models/sliderModal';
import { store } from 'store/store';

export const CONFIG = {
    ENV: process.env.ENV, //development | production
    ONLINE_SERVER_URL: 'http://localhost:8000',
};
// for any url do not suffix '/' (standard followd in this project) (nest / at use time if needed )

// used to close the sliderModals
export const handleSliderClose = (sliderModalToClose: keyof SliderModalInitialState): void => {
    switch (sliderModalToClose) {
        case 'addBrandSlider':
            store.dispatch(toggleSliderModal({ sliderName: 'addBrandSlider', active: false }));
            break;
        case 'addCategorySlider':
            store.dispatch(toggleSliderModal({ sliderName: 'addCategorySlider', active: false }));
            break;
        case 'addProductSlider':
            store.dispatch(toggleSliderModal({ sliderName: 'addProductSlider', active: false }));
            break;
        case 'addTaxBracketSlider':
            store.dispatch(toggleSliderModal({ sliderName: 'addTaxBracketSlider', active: false }));
            break;
        case 'checkoutSlider':
            store.dispatch(toggleSliderModal({ sliderName: 'checkoutSlider', active: false }));
            break;
        case 'newSaleSlider':
            store.dispatch(toggleSliderModal({ sliderName: 'newSaleSlider', active: false }));
            break;
    }
};
