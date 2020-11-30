import React, { ReactNode } from 'react';
import styles from './metacard.module.css';

export interface IMetaCardProps {
    title?: string;
    secondaryText?: string;
    buttons?: ReactNode[];
    style?: React.CSSProperties;
}

const defaultProps: IMetaCardProps = {
    title: 'This is sample description',
    secondaryText: 'This is sample secondary text',
    buttons: [],
    style: {},
};

export const MetaCard: React.FC<IMetaCardProps> = (props: IMetaCardProps): JSX.Element => {
    // seasoning the props
    const sProps: IMetaCardProps = {
        ...defaultProps,
        ...props,
    };

    return (
        <div className={styles.metaCard} style={sProps.style}>
            <div className={styles.pageInformationSection}>
                <div className={styles.cardTitle}>{sProps.title}</div>
                <div className={styles.cardSecondaryText}>{sProps.secondaryText}</div>
            </div>
            <div className={styles.cardActions}>{sProps.buttons}</div>
        </div>
    );
};
