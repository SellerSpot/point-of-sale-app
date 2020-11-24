import React, { ReactNode } from 'react';
import styles from './table.module.css';
import { nanoid } from 'nanoid';

export type PropsType = {
    sampleValue: string;
    headings: string[];
    values: string[][];
};

// used to generate the table headers
const tableHeaderFactory = (props: PropsType): JSX.Element => {
    return (
        <div className={styles.header}>
            {props.headings.map((heading, index) => {
                return (
                    <div key={heading + index.toString()} className={styles.headerCell}>
                        {heading}
                    </div>
                );
            })}
        </div>
    );
};

// used to generate the table body
const tableBodyFactory = (props: PropsType): ReactNode => {
    return props.values.map((row: string[]) => {
        return (
            <div key={nanoid()} className={styles.row}>
                {row.map((cell: string) => {
                    return (
                        <div key={nanoid()} className={styles.bodyCell}>
                            {cell}
                        </div>
                    );
                })}
            </div>
        );
    });
};

export const Table: React.FC<PropsType> = (props: PropsType): JSX.Element => {
    return (
        <div className={styles.table}>
            {tableHeaderFactory(props)}
            {tableBodyFactory(props)}
        </div>
    );
};
