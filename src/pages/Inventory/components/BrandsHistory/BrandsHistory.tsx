import { AgGridReact } from 'ag-grid-react';
import classNames from 'classnames';
import { MetaCard } from 'components/MetaCard/MetaCard';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { brandRequests } from 'requests';
import { openSliderModal } from 'store/models/sliderModal';
import { generalUtilities } from 'utilities/utilities';
import { Button } from '@sellerspot/universal-components';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import { IAddBrandFormSchema } from '../AddBrand/addBrand.types';
import {
    compileCategoriesHistoryTableBodyData,
    getBrandsHistoryTableColDef,
} from './brandsHistory.actions';
import styles from './brandsHistory.module.scss';

export const BrandsHistory = (): JSX.Element => {
    // To manage which tab is selected
    const dispatch = useDispatch();
    const [brandsData, setBrandsData] = useState<
        pointOfSaleTypes.brandResponseTypes.IGetAllBrands['data']
    >(null);

    useEffect(() => {
        (async () => {
            // To populate the table
            const brandsData = await brandRequests.getAllBrands();
            setBrandsData(brandsData);
        }).call(null);
    }, []);

    return (
        <div className={styles.brandWrapper}>
            <MetaCard
                title="Sample Description"
                secondaryText={'Sample Data'}
                buttons={[
                    <Button
                        key={'addBrand'}
                        label={`Add Brand (${generalUtilities.GLOBAL_KEYBOARD_SHORTCUTS.ADD_BRAND})`}
                        onClick={() =>
                            dispatch(
                                openSliderModal({
                                    autoFillData: null,
                                    sliderName: 'addBrandSlider',
                                }),
                            )
                        }
                    />,
                ]}
            />
            <div className={classNames('ag-theme-alpine')}>
                <AgGridReact
                    columnDefs={getBrandsHistoryTableColDef()}
                    rowData={compileCategoriesHistoryTableBodyData(brandsData)}
                    suppressCellSelection
                    onRowClicked={(event) => {
                        // compiling data for autofill
                        const autoFillData: IAddBrandFormSchema = {
                            name: brandsData[event.rowIndex].name,
                        };
                        dispatch(
                            openSliderModal({
                                autoFillData,
                                sliderName: 'addBrandSlider',
                            }),
                        );
                    }}
                />
            </div>
        </div>
    );
};
