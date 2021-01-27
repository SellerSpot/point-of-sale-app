import { css } from '@emotion/css';
import { Button, Table } from '@sellerspot/universal-components';
import { MetaCard } from 'components/MetaCard/MetaCard';
import { cssColors } from 'config/cssVariables';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCategories } from 'requests/category';
import { toggleSliderModal } from 'store/models/sliderModal';
import { IGetCategoryFromServer } from 'typings/components/category.types';
import { GLOBAL_KEYBOARD_SHORTCUTS } from 'utilities/keyboardShortcuts';
import {
    compileCategoriesTableBodyData,
    handleCategoriesHistoryTableRowClick,
} from './categoriesHistory.actions';
import styles from './categoriesHistory.module.css';

export const CategoriesHistory = (): JSX.Element => {
    // To manage which tab is selected
    const dispatch = useDispatch();
    const [categoriesData, setCategoriesData] = useState<IGetCategoryFromServer[]>(null);

    useEffect(() => {
        (async () => {
            // To populate the table
            const categoriesData = await getCategories();
            setCategoriesData(categoriesData.data as IGetCategoryFromServer[]);
        }).call(null);
    }, []);

    return (
        <div className={styles.categoriesWrapper}>
            <MetaCard
                title="Sample Description"
                secondaryText={'Sample Data'}
                buttons={[
                    <Button
                        key={'addCategory'}
                        label={`Add Category (${GLOBAL_KEYBOARD_SHORTCUTS.ADD_CATEGORY})`}
                        style={{
                            color: cssColors['--inventory-color'],
                            backgroundColor: cssColors['--primary-background-color'],
                            borderColor: cssColors['--inventory-color'],
                        }}
                        onClick={() =>
                            dispatch(
                                toggleSliderModal({
                                    sliderName: 'addCategorySlider',
                                    active: true,
                                }),
                            )
                        }
                    />,
                ]}
            />
            <div className={styles.tableWrapper}>
                <Table
                    headers={[
                        <p key={'S.No'}>{'S.No'}</p>,
                        <p key={'Brand Name'}>{'Brand Name'}</p>,
                    ]}
                    rowData={compileCategoriesTableBodyData(categoriesData)}
                    className={{
                        bodyRow: css`
                            :hover {
                                cursor: pointer;
                                background-color: ${cssColors['--secondary-background-color']};
                            }
                        `,
                    }}
                    onClick={{
                        rowClick: (index: number) => {
                            handleCategoriesHistoryTableRowClick(categoriesData[index]);
                        },
                    }}
                />
            </div>
        </div>
    );
};
