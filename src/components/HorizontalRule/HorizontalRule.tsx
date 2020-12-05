import React, { ReactElement } from 'react';
import { cssColors } from '../../config/cssVariables';
import horizontalRuleStyles from './horizontalRule.module.css';

interface IHorizontalRuleProps {
    // check defaultProps for default values
    alignment?: 'left' | 'center' | 'right';
    ruleColor?: keyof typeof cssColors;
    ruleSize?: number;
    ruleWidth?: '100%' | '75%' | '50%' | '25%';
    style?: {
        paddingTop?: number;
        paddingBottom?: number;
        paddingLeft?: number;
        paddingRight?: number;
    };
    ruleOpacity?: number; // between 0 and 1
}

const defaultProps: IHorizontalRuleProps = {
    alignment: 'center',
    ruleColor: '--border-color',
    ruleSize: 1,
    ruleWidth: '75%',
    style: {
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 0,
        paddingRight: 0,
    },
    ruleOpacity: 0.5,
};

export const HorizontalRule = (props: IHorizontalRuleProps): ReactElement => {
    const { alignment, ruleColor, ruleSize, ruleWidth, style, ruleOpacity } = {
        ...defaultProps,
        ...props,
        style: { ...defaultProps.style, ...props.style },
    };
    return (
        <div
            className={horizontalRuleStyles.horizontalRuleWrapper}
            style={{
                ...style,
                justifyContent: alignment === 'left' ? 'flex-start' : alignment === 'right' ? 'flex-end' : alignment,
            }}
        >
            <div
                className={horizontalRuleStyles.horizontalRule}
                style={{
                    height: ruleSize,
                    borderColor: cssColors[ruleColor ?? '--border-color'],
                    borderWidth: ruleSize,
                    opacity: ruleOpacity,
                    width: ruleWidth,
                }}
            ></div>
        </div>
    );
};
