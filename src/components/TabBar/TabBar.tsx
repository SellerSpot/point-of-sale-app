import React from 'react';
import styles from './tabBar.module.css';
import { cssColors } from '../../config/cssVariables';
import cn from 'classnames';
import { Link } from 'react-router-dom';

export interface ITabBarProps {
    tabs: { name: string; route?: string }[];
    selectedTab: number;
    selectedColor?: keyof typeof cssColors;
    style?: React.CSSProperties;
    onSelect: (selectedIndex: number) => void;
}

const defaultProps: ITabBarProps = {
    tabs: [],
    selectedColor: '--sales-color',
    selectedTab: 0,
    style: {},
    onSelect: () => void 0,
};

export const TabBar: React.FC<ITabBarProps> = (props: ITabBarProps): JSX.Element => {
    // seasoning the props
    const sProps: ITabBarProps = {
        ...defaultProps,
        ...props,
    };

    return (
        <div
            className={styles.tabBar}
            style={{
                ...sProps.style,
            }}
        >
            {sProps.tabs.map((tab, index) => {
                const tabStyle: React.CSSProperties = {};
                if (index === sProps.selectedTab) {
                    tabStyle.color = cssColors[sProps.selectedColor ?? '--sales-color'];
                }
                return (
                    <div onClick={() => sProps.onSelect(index)} key={index} className={styles.tab}>
                        <Link
                            to={tab.route ?? ''}
                            className={cn(styles.tabTitle, {
                                [styles.selectedTab]: index === sProps.selectedTab ? true : false,
                            })}
                            style={tabStyle}
                        >
                            {tab.name}
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};
