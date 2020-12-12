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
