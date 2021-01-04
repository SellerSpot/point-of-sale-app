import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@sellerspot/universal-components';
import { MetaCard } from 'components/MetaCard/MetaCard';
import { Table } from '@sellerspot/universal-components';
import { toggleSliderModal } from 'store/models/sliderModal';
import { KEYCODES } from 'services/KeyCodeService';

import { cssColors } from 'config/cssVariables';
import { getCategoriesStyles } from './categories.styles';
import { IGetCategory } from 'typings/ComponentTypings/categories.types';
import { compileCategoriesTableBodyData, getCategories } from './categories.actions';

export const Categories = (): JSX.Element => {
    // to manage which tab is selected
    const dispatch = useDispatch();
    const styles = getCategoriesStyles();
    const [categoriesData, setCategoriesData] = useState<IGetCategory[]>(null);

    // to fetch the categories data
    const getCategoriesData = async () => {
        // to populate the table
        setCategoriesData(await getCategories());
    };

    useEffect(() => {
        getCategoriesData();
    }, []);

    return (
        <div className={styles.categoriesWrapper}>
            <MetaCard
                title="Sample Description"
                secondaryText={'Sample Data'}
                buttons={[
                    <Button
                        key={'addCategory'}
                        label={`Add Category (${KEYCODES.ADDCATEGORY})`}
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
                        <p key={'Category Name'}>{'Category Name'}</p>,
                        <p key={'Category ID'}>{'Category ID'}</p>,
                    ]}
                    rowData={compileCategoriesTableBodyData(categoriesData)}
                />
            </div>
        </div>
    );
};
