import React from 'react';
import { merge } from 'lodash';
import styles from './metaCard.module.scss';

export interface IMetaCardProps {
    title?: string | JSX.Element;
    secondaryText?: string | JSX.Element;
    buttons?: JSX.Element[];
}

const defaultProps: IMetaCardProps = {
    title: 'This is sample description',
    secondaryText: 'This is sample secondary text',
    buttons: [],
};

export const MetaCard: React.FC<IMetaCardProps> = (props: IMetaCardProps): JSX.Element => {
    // Seasoning the props
    const requiredProps = merge(defaultProps, props);

    return (
        <div className={styles.metaCard}>
            <div className={styles.pageInformationSection}>
                <div className={styles.cardTitle}>{requiredProps.title}</div>
                <div className={styles.cardSecondaryText}>{requiredProps.secondaryText}</div>
            </div>
            <div className={styles.cardActions}>{requiredProps.buttons}</div>
        </div>
    );
};
