import cn from 'classnames';
import React, { ReactElement } from 'react';
import styles from './space.module.scss';
import lodash from 'lodash';

export interface ISpaceProps {
    /**
     * @remarks
     * size: number (in unit pixel)
     * @default
     * `size: 20`
     */
    size?: number;
    /**
     * @remarks
     * used to choose vertical or horizontal space.
     * @default
     * `orientation: 'vertical'`
     */
    orientation?: 'vertical' | 'horizontal';
    style?: React.CSSProperties;
    className?: string;
}

export const Space = (props: ISpaceProps): ReactElement => {
    const defaultProps: ISpaceProps = {
        className: '',
        style: {},
        orientation: 'vertical',
        size: 20,
    };
    const requiredProps = lodash.merge(defaultProps, props);

    return (
        <div
            className={cn(styles.spaceWrapper, requiredProps.className)}
            style={{
                width: `${requiredProps.orientation === 'vertical' ? 0 : requiredProps.size}px`,
                height: `${requiredProps.orientation === 'vertical' ? requiredProps.size : 0}px`,
                ...requiredProps.style,
            }}
        ></div>
    );
};
