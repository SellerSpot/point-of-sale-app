import { merge } from 'lodash';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './tabBar.module.scss';
import cn from 'classnames';

export interface ITabBarProps {
    tabs: { name: string; route?: string }[];
    selectedIndex: number;
    onSelect: (selectedIndex: number) => void;
}

export const TabBar: React.FC<ITabBarProps> = (props: ITabBarProps): JSX.Element => {
    const history = useHistory();

    const defaultProps: ITabBarProps = {
        tabs: [],
        selectedIndex: 0,
        onSelect: () => void 0,
    };
    const requiredProps = merge(defaultProps, props);

    return (
        <div className={styles.tabBarWrapper}>
            {requiredProps.tabs.map((tab, index) => {
                return (
                    <div
                        onClick={() => {
                            requiredProps.onSelect(index);
                            history.push(tab.route ?? '#');
                        }}
                        key={index}
                        className={styles.tab}
                    >
                        <div
                            className={cn(styles.tabTitle, {
                                [styles.selectedTab]: index === requiredProps.selectedIndex,
                            })}
                        >
                            {tab.name}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
