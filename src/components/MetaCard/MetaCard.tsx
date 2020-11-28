import React from 'react';
import styles from './metacard.module.css';
import { Button } from '../Button/Button';

export type propsType = {
    pageDescription: string;
    shortcuts: {
        name: string;
        keys: string;
    }[];
    primaryButton?: {
        label: string;
        onClickCallback: () => void;
        style: React.CSSProperties;
    };
};

export const MetaCard: React.FC<propsType> = (props: propsType): JSX.Element => {
    return (
        <div className={styles.metaCardWrapper}>
            <div className={styles.metaCard}>
                <div className={styles.pageInformationSection}>
                    <div className={styles.pageDescription}>{props.pageDescription}</div>
                    <div className={styles.pageShortcuts}>
                        {props.shortcuts.map((shortcut) => {
                            return shortcut.name + ' (' + shortcut.keys + ')   ';
                        })}
                    </div>
                </div>
                {props.primaryButton !== undefined ? (
                    <Button
                        label={props.primaryButton?.label}
                        type="line"
                        variant="default"
                        size="default"
                        onClickCallback={props.primaryButton.onClickCallback}
                        style={props.primaryButton.style}
                        shape="default"
                    />
                ) : null}
            </div>
        </div>
    );
};
