import { nanoid } from 'nanoid';
import React from 'react';
import styles from './tabBar.module.css';

export type PropsType = {
    tabs: string[];
    selectedTab: number;
    onClickHandler: (selectedIndex: number) => void;
};

export const TabBar: React.FC<PropsType> = (props: PropsType): JSX.Element => {
    return (
        <div className={styles.tabBar}>
            {props.tabs.map((tab, index) => {
                let tabLineClasses = styles.tabLine;
                if (index !== props.selectedTab) tabLineClasses += ' ' + styles.invisibleTabLine;
                // setting the length of the tabLine based on the length of the string
                const tabLineStyle: React.CSSProperties = {
                    width: tab.length * 9,
                };
                return (
                    <div onClick={() => props.onClickHandler(index)} key={nanoid()} className={styles.tab}>
                        <div>{tab}</div>
                        <div className={tabLineClasses} style={tabLineStyle} />
                    </div>
                );
            })}
        </div>
    );
};
