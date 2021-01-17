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
