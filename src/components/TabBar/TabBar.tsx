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

                return (
                    <div onClick={() => props.onClickHandler(index)} key={nanoid()} className={styles.tab}>
                        <div className={styles.tabTitle}>{tab}</div>
                        <div className={styles.tabLineHolder}>
                            <div className={tabLineClasses} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
