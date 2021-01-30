import ms from 'ms';

/**
 * To convert epoch time to human readable format
 */
export const convertEpochTime = (epochTime: number): string => {
    const currEpoch = Date.now();
    // To find the milliseconds elapsed
    const millSecsElapsed = currEpoch - epochTime;
    return `${ms(millSecsElapsed, { long: true })} ago`;
};
