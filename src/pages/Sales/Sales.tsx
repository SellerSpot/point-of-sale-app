import React, { useState } from 'react';
import styles from './sales.module.css';
import { TabBar } from '../../components/TabBar/TabBar';
import { MetaCard } from '../../components/MetaCard/MetaCard';
import { Table } from '../../components/Table/Table';
import { Button } from '../../components/Button/Button';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { toggleSliderModal } from '../../store/models/sliderModal';
import { openConfirmDialog } from '../../store/models/confirmDialogModal';
import { InputField } from '../../components/InputField/InputField';

export const Sales = (): JSX.Element => {
    // to manage which tab is selected
    const disptach = useDispatch();
    const [currTab, setcurrTab] = useState(0);
    return (
        <div className={styles.salesPage}>
            <div className={styles.tabBarWrapper}>
                <TabBar tabs={['Current Sales', 'Other Tabs']} onClick={setcurrTab} selectedTab={currTab} />
            </div>
            <MetaCard
                title="Sample Description"
                secondaryText={'Sample Data'}
                buttons={[
                    <Button
                        key={nanoid()}
                        label="New Sale (F3)"
                        variant="outline"
                        backgroundColor="--sales-color"
                        labelColor="--sales-color"
                        onClick={() => disptach(toggleSliderModal({ sliderName: 'newSaleSlider', active: true }))}
                    />,
                    <Button
                        key={nanoid()}
                        label="Open Modal"
                        variant="outline"
                        backgroundColor="--sales-color"
                        labelColor="--sales-color"
                        onClick={() =>
                            disptach(
                                openConfirmDialog({
                                    active: true,
                                    title: 'This is sample confirm dialog header?',
                                    successActionLabel: 'Agree 1',
                                    failureActionLabel: 'Disagree',
                                    description:
                                        'This is sample confirm dialog description. This is sample confirm dialog description. This is sample confirm dialog description.',
                                    onFailure: () => void 0,
                                    onSuccess: () => void 0,
                                    inputFields: (
                                        <InputField
                                            key={nanoid()}
                                            label={'Sample Label'}
                                            placeHolder={'Sample Field'}
                                            onChange={() => void 0}
                                            helperText={'Sample Helper Text'}
                                        />
                                    ),
                                }),
                            )
                        }
                    />,
                ]}
            />
            <div className={styles.tableWrapper}>
                <Table
                    headers={['S.No', 'Created At', 'Status', 'Sub-Total', 'Taxation', 'Amount Paid']}
                    rowData={[
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                        ['value 1', 'value 2', 'value 3', 'value 4', 'value 5', 'value 6'],
                    ]}
                />
            </div>
        </div>
    );
};
