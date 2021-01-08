import ms from 'ms';

export default class ComputeOps {
    // To convert epoch time to human readable format
    public convertEpochTime = (epochTime: number): string => {
        const currEpoch = Date.now();
        // To find the milliseconds elapsed
        const millSecsElapsed = currEpoch - epochTime;
        return `${ms(millSecsElapsed, { long: true })} ago`;
    };
}
