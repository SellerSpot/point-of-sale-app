import React from 'react';
import { getMetaCardStyles, IGetMetaCardStyles } from './metaCard.styles';
import lodash from 'lodash';
import { cx } from '@emotion/css';

export interface IMetaCardProps {
    title?: string | JSX.Element;
    secondaryText?: string | JSX.Element;
    buttons?: JSX.Element[];
    className?: IGetMetaCardStyles;
    style?: {
        cardActions: React.CSSProperties;
        cardSecondaryText: React.CSSProperties;
        cardTitle: React.CSSProperties;
        metaCard: React.CSSProperties;
        pageInformationSection: React.CSSProperties;
    };
}

const defaultProps: IMetaCardProps = {
    title: 'This is sample description',
    secondaryText: 'This is sample secondary text',
    buttons: [],
};

export const MetaCard: React.FC<IMetaCardProps> = (props: IMetaCardProps): JSX.Element => {
    // Seasoning the props
    const requiredProps = lodash.merge(defaultProps, props);
    const styles = getMetaCardStyles();

    return (
        <div
            className={cx(styles.metaCard, requiredProps.className?.metaCard)}
            style={requiredProps.style?.metaCard}
        >
            <div
                className={cx(
                    styles.pageInformationSection,
                    requiredProps.className?.pageInformationSection,
                )}
                style={requiredProps.style?.pageInformationSection}
            >
                <div
                    className={cx(styles.cardTitle, requiredProps.className?.cardTitle)}
                    style={requiredProps.style?.cardTitle}
                >
                    {requiredProps.title}
                </div>
                <div
                    className={cx(
                        styles.cardSecondaryText,
                        requiredProps.className?.cardSecondaryText,
                    )}
                    style={requiredProps.style?.cardSecondaryText}
                >
                    {requiredProps.secondaryText}
                </div>
            </div>
            <div
                className={cx(styles.cardActions, requiredProps.className?.cardActions)}
                style={requiredProps.style?.cardActions}
            >
                {requiredProps.buttons}
            </div>
        </div>
    );
};
