import { nanoid } from 'nanoid';
import React from 'react';
import styles from './tabBar.module.css';
import { cssColors } from '../../config/cssVariables';

export interface ITabBarProps {
    tabs: string[];
    selectedTab: number;
    selectedColor?: keyof typeof cssColors;
    style?: React.CSSProperties;
    onClick: (selectedIndex: number) => void;
}

const defaultProps: ITabBarProps = {
    tabs: ['Tab 1', 'Tab 2', 'Tab 3'],
    selectedColor: '--sales-color',
    selectedTab: 0,
    style: {},
    onClick: () => void 0,
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
                let tabItemClasses = styles.tabTitle;
                const tabStyle: React.CSSProperties = {};
                if (index === sProps.selectedTab) {
                    tabItemClasses += ' ' + styles.selectedTab;
                    tabStyle.color = cssColors[sProps.selectedColor ?? '--sales-color'];
                }
                return (
                    <div onClick={() => sProps.onClick(index)} key={nanoid()} className={styles.tab}>
                        <div className={tabItemClasses} style={tabStyle}>
                            {tab}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
