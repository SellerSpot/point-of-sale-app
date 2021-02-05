import { AgGridReact } from 'ag-grid-react';
import classNames from 'classnames';
import { MetaCard } from 'components/MetaCard/MetaCard';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { categoryRequests } from 'requests';
import { toggleSliderModal } from 'store/models/sliderModal';
import { generalUtilities } from 'utilities/utilities';
import { Button, Table } from '@sellerspot/universal-components';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import { IAddCategoryFormSchema } from '../AddCategory/addCategory.types';
import {
    compileCategoriesHistoryTableBodyData,
    getCategoriesHistoryTableColDef,
} from './categoriesHistory.actions';
import styles from './categoriesHistory.module.scss';

export const CategoriesHistory = (): JSX.Element => {
    // To manage which tab is selected
    const dispatch = useDispatch();
    const [categoriesData, setCategoriesData] = useState<
        pointOfSaleTypes.categoryResponseTypes.IGetAllCategories['data']
    >([]);

    useEffect(() => {
        (async () => {
            // To populate the table
            const categoriesData = await categoryRequests.getAllCategories();
            setCategoriesData(categoriesData);
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
                        label={`Add Category (${generalUtilities.GLOBAL_KEYBOARD_SHORTCUTS.ADD_CATEGORY})`}
                        onClick={() =>
                            dispatch(
                                toggleSliderModal({
                                    sliderName: 'addCategorySlider',
                                    active: true,
                                    autoFillData: null,
                                }),
                            )
                        }
                    />,
                ]}
            />
            <div className={classNames('ag-theme-alpine')}>
                <AgGridReact
                    suppressCellSelection
                    columnDefs={getCategoriesHistoryTableColDef()}
                    rowData={compileCategoriesHistoryTableBodyData(categoriesData)}
                    onRowClicked={(event) => {
                        // compiling data to push to page
                        const autoFillData: IAddCategoryFormSchema = {
                            name: categoriesData[event.rowIndex].name,
                        };
                        dispatch(
                            toggleSliderModal({
                                sliderName: 'addCategorySlider',
                                active: true,
                                autoFillData,
                            }),
                        );
                    }}
                />
                s
            </div>
        </div>
    );
};
