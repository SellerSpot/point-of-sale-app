import ms from 'ms';
import { cssColors, TMajorColors } from '../config/cssVariables';

export default class Utils {
    public getColor(majorColor: TMajorColors): keyof typeof cssColors {
        let color: keyof typeof cssColors;
        switch (majorColor) {
            case 'success':
                color = '--success-color';
                break;
            case 'danger':
                color = '--danger-color';
                break;
            case 'info':
                color = '--info-color';
                break;
            case 'warning':
                color = '--warning-color';
                break;
        }
        return color;
    }
}

// to convert epoch time to human readable format
export const convertEpochTime = (epochTime: number): string => {
    const currEpoch = Date.now();
    // to find the milliseconds elapsed
    const millSecsElapsed = currEpoch - epochTime;
    return ms(millSecsElapsed, { long: true }) + ' ago';
};
