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
};
