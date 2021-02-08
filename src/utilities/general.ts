import {
    ISliderModalInitialState,
    SLIDERS,
    TAutoFillData,
    TCallBackStateTrack,
    closeSliderModal,
    openSliderModal,
    setCallBackStateTrack,
} from 'store/models/sliderModal';
import { store } from 'store/store';

/**
 * Contains all the common symbols used in the app
 */
export const COMMON_SYMBOLS = {
    RUPEE_SYMBOL: '₹',
    PERCENTAGE_SYMBOL: '%',
};

/**
 *
 */
export const COMMON_REGEXPS = {
    ONLY_NUMBERS: new RegExp('^[0-9]*$'),
    STRING_WITH_SPACE_BETWEEN: new RegExp('^[a-zA-Z0-9_][a-zA-Z0-9_ ]*[a-zA-Z0-9_]$'),
};

/**
 * Used to install a delay by awaiting this function
 * @param delay in seconds
 * @default
 * 4000
 */
export const introduceDelay = async (delay = 4000): Promise<boolean> =>
    await new Promise((resolve) =>
        setTimeout(() => {
            resolve(true);
        }, delay),
    );

/**
 * Holds all the keyboard shortcuts mapping used throught the application
 */
export const GLOBAL_KEYBOARD_SHORTCUTS = {
    NEW_SALE: 'F1',
    ADD_PRODUCT: 'F2',
    ADD_CATEGORY: 'F3',
    ADD_BRAND: 'F4',
    ADD_TAXBRACKET: 'F5',
    ADD_STOCKUNIT: 'F6',
    CHECKOUT: 'F9',
    COMPLETE_SALE: 'F10',
};

/**
 * Takes a number and returns the price representation with the symbol and commas
 */
export const formatPriceData = (price: number): string => {
    return `${COMMON_SYMBOLS.RUPEE_SYMBOL}${price.toLocaleString()}`;
};

/**
 * Takes a number and returns the percentage representation with the symbol
 */
export const formatPercentData = (percentage: number): string => {
    return `${percentage}${COMMON_SYMBOLS.PERCENTAGE_SYMBOL}`;
};
/**
 * * Used to handle closing the sliderModal (closes the topmost sliderModal in the queue)
 */
export const handleCloseSlider = (props: {
    sliderState: ISliderModalInitialState;
    callBackStateTrack: TCallBackStateTrack;
    topMostSlider: SLIDERS;
}): void => {
    // closing the topmost slidermodal
    store.dispatch(
        closeSliderModal({
            sliderName: props.topMostSlider,
        }),
    );
    // updating callBackStateTrack
    // creating a copy which we can then edit
    const callBackStateTrack = [...props.callBackStateTrack];
    // removing the top most slider
    callBackStateTrack.pop();
    // updating state
    store.dispatch(
        setCallBackStateTrack({
            callBackStateTrack,
        }),
    );
};

/**
 * * Used to handle opening the sliderModal
 */
export const handleOpenSlider = (props: {
    sliderName: SLIDERS;
    autoFillData: TAutoFillData;
}): void => {
    store.dispatch(
        openSliderModal({
            autoFillData: props.autoFillData,
            sliderName: props.sliderName,
        }),
    );
};

/**
 * * Used to handle adding the slider to the callBackStateTrack
 */
export const addSliderToCallBackStateTrack = (props: {
    sliderName: SLIDERS;
    sliderState: ISliderModalInitialState;
}): void => {
    store.dispatch(
        setCallBackStateTrack({
            callBackStateTrack: [...props.sliderState.callBackStateTrack, props.sliderName],
        }),
    );
};
