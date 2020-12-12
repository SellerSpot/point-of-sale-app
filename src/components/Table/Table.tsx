import React, { ReactNode } from 'react';
import styles from './table.module.css';

import { cssColors, cssVariables } from '../../config/cssVariables';
import { HorizontalRule } from '../HorizontalRule/HorizontalRule';
import cn from 'classnames';

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
        height: '40px',
        zIndex: parseInt(cssVariables['--z-index-table-header']), // to keep the header above from all the body comps
        boxShadow: '0px 0px 5px 0px var(--shadow-color)',
        backgroundColor: cssColors['--tertiary-background-color'],
    };
    const cellStyle: React.CSSProperties = {
        color: cssColors['--primary-font-color'],
        fontWeight: 600,
        fontSize: cssVariables['--font-size-secondary'],
        height: '40px',
    };
    return (
        <div className={cn(styles.row, styles.greyBackground)} style={rowStyle}>
            {sProps.headers.map((heading, index) => {
                return (
                    <div key={index} className={styles.bodyCell} style={cellStyle}>
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
        return (
            <div key={index}>
                <div
                    className={cn(styles.row, { [styles.greyBackground]: index % 2 !== 0 ? true : false })}
                    style={rowStyle}
                >
                    {row.map((cell: string, cellKey) => {
                        return (
                            <div key={cellKey} className={styles.bodyCell} style={cellStyle}>
                                {cell}
                            </div>
                        );
                    })}
                </div>
                <HorizontalRule
                    ruleColor={'--border-color'}
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
