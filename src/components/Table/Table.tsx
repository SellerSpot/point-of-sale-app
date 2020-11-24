import React, { ReactNode } from 'react';
import styles from './table.module.css';
import { nanoid } from 'nanoid';

export type PropsType = {
    headings: string[];
    values: string[][];
};

// used to generate the table headers
const tableHeaderFactory = (props: PropsType): ReactNode => {
    const rowStyle: React.CSSProperties = {
        gridTemplateColumns: 'repeat(' + props.headings.length + ',1fr)',
        gridTemplateRows: '1fr',
        position: 'sticky',
        top: 0,
        height: '40px',
        fontWeight: 'bold',
    };
    const cellStyle: React.CSSProperties = {
        height: '40px',
    };
    const classNames = styles.row + ' ' + styles.greyBackground;
    return (
        <div key={nanoid()} className={classNames} style={rowStyle}>
            {props.headings.map((heading) => {
                return (
                    <div key={nanoid()} className={styles.bodyCell} style={cellStyle}>
                        {heading}
                    </div>
                );
            })}
        </div>
    );
};

// used to generate the table body
const tableRowFactory = (props: PropsType): ReactNode => {
    const rowStyle: React.CSSProperties = {
        gridTemplateColumns: 'repeat(' + props.headings.length + ',1fr)',
        gridTemplateRows: 'auto',
    };

    return props.values.map((row, index) => {
        let classNames = styles.row;
        if (index % 2 !== 0) {
            classNames += ' ' + styles.greyBackground;
        }
        return (
            <div key={nanoid()} className={classNames} style={rowStyle}>
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
            {tableRowFactory(props)}
        </div>
    );
};
