import React from 'react';
import styles from './table.module.css';

export type PropsType = {
    sampleValue: string;
    headings: string[];
    values: string[][];
    tableHeight?: React.CSSProperties;
    tableWidth?: React.CSSProperties;
    fullSizedTable?: boolean;
};

export const Table: React.FC<PropsType> = (): JSX.Element => {
    return (
        <div className={styles.table}>
            <div className={styles.tableHeader}>Table Header</div>
            <div>Sample</div>
            <div>Sample</div>
        </div>
    );
};
