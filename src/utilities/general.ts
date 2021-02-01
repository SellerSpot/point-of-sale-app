/**
 * Contains all the common symbols used in the app
 */
export const COMMON_SYMBOLS = {
    RUPEE_SYMBOL: '₹',
    PERCENTAGE_SYMBOL: '%',
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
    ADD_PRODUCT: 'ALT+P',
    ADD_CATEGORY: 'ALT+C',
    ADD_BRAND: 'ALT+B',
    ADD_TAXBRACKET: 'ALT+T',
    ADD_STOCKUNIT: 'ALT+S',
};
