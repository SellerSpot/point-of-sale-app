import React, { ReactNode } from 'react';
import styles from './table.module.css';
import { nanoid } from 'nanoid';
import { cssColors, cssVariables } from '../../config/cssVariables';
import { HorizontalRule } from '../HorizontalRule/HorizontalRule';

export interface ITableProps {
    headers: string[];
    rowData: string[][];
    style?: React.CSSProperties;
}

const defaultProps: ITableProps = {
    headers: ['Heading 1', 'Heading 2', 'Heading 3', 'Heading 4'],
    rowData: [
        ['Cell 00', 'Cell 01', 'Cell 02', 'Cell 03'],
        ['Cell 10', 'Cell 11', 'Cell 12', 'Cell 13'],
    ],
    style: {},
};

// used to generate the table headers
const tableHeaderFactory = (sProps: ITableProps): ReactNode => {
    const rowStyle: React.CSSProperties = {
        gridTemplateColumns: 'repeat(' + sProps.headers.length + ',1fr)',
        gridTemplateRows: '1fr',
        gap: '5px',
        position: 'sticky',
        top: 0,
        width: '100%',
        height: '35px',
        backgroundColor: cssColors['--tertiary-background-color'],
    };
    const cellStyle: React.CSSProperties = {
        color: cssColors['--primary-font-color'],
        fontWeight: 600,
        fontSize: cssVariables['--font-size-secondary'],
        height: '35px',
    };
    const classNames = styles.row + ' ' + styles.greyBackground;
    return (
        <div key={nanoid()} className={classNames} style={rowStyle}>
            {sProps.headers.map((heading) => {
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
const tableRowFactory = (sProps: ITableProps): ReactNode => {
    const rowStyle: React.CSSProperties = {
        gridTemplateColumns: 'repeat(' + sProps.headers.length + ',1fr)',
        gridTemplateRows: 'auto',
        gap: '5px',
    };
    const cellStyle: React.CSSProperties = {};
    return sProps.rowData.map((row, index) => {
        let classNames = styles.row;
        if (index % 2 !== 0) {
            classNames += ' ' + styles.greyBackground;
        }
        return (
            <div key={nanoid()}>
                <div className={classNames} style={rowStyle}>
                    {row.map((cell: string) => {
                        return (
                            <div key={nanoid()} className={styles.bodyCell} style={cellStyle}>
                                {cell}
                            </div>
                        );
                    })}
                </div>
                <HorizontalRule
                    ruleColor={cssColors['--border-color']}
                    ruleWidth="100%"
                    style={{ paddingBottom: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}
                    alignment="center"
                />
            </div>
        );
    });
};

export const Table: React.FC<ITableProps> = (props: ITableProps): JSX.Element => {
    // seasoning the sProps
    const sProps: ITableProps = {
        ...defaultProps,
        ...props,
    };

    return (
        <div className={styles.table} style={sProps.style}>
            {tableHeaderFactory(sProps)}
            {tableRowFactory(sProps)}
        </div>
    );
};
