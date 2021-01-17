import React from 'react';
import { useHistory } from 'react-router-dom';
import { getTabBarStyles, IGetTabBarStyles } from './tabBar.styles';
import { cx } from '@emotion/css';
import lodash from 'lodash';

export interface ITabBarProps {
    tabs: { name: string; route?: string }[];
    selectedIndex: number;
    onSelect: (selectedIndex: number) => void;
    style?: {
        tabBarWrapperStyle?: React.CSSProperties;
        tabStyle?: React.CSSProperties;
        tabTitleStyle?: React.CSSProperties;
        selectedTabStyle?: React.CSSProperties;
    };
    className?: IGetTabBarStyles;
}

export const TabBar: React.FC<ITabBarProps> = (props: ITabBarProps): JSX.Element => {
    const history = useHistory();

    const defaultProps: ITabBarProps = {
        tabs: [],
        selectedIndex: 0,
        style: {},
        onSelect: () => void 0,
    };
    const requiredProps = lodash.merge(defaultProps, props);
    const styles = getTabBarStyles();

    return (
        <div
            className={cx(styles.tabBarWrapper, requiredProps.className?.tabBarWrapper)}
            style={requiredProps.style?.tabBarWrapperStyle}
        >
            {requiredProps.tabs.map((tab, index) => {
                return (
                    <div
                        onClick={() => {
                            requiredProps.onSelect(index);
                            history.push(tab.route ?? '#');
                        }}
                        key={index}
                        className={cx(styles.tab, requiredProps.className?.tab)}
                        style={requiredProps.style?.tabStyle}
                    >
                        <div
                            className={cx(cx(styles.tabTitle, requiredProps.className?.tabTitle), {
                                [cx(styles.selectedTab, requiredProps.className?.tabTitle)]:
                                    index === requiredProps.selectedIndex ? true : false,
                            })}
                            style={
                                index === requiredProps.selectedIndex
                                    ? requiredProps.style?.selectedTabStyle
                                    : null
                            }
                        >
                            {tab.name}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
