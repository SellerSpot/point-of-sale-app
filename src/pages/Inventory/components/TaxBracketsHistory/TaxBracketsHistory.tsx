import { css } from '@emotion/css';
import { Button, Table } from '@sellerspot/universal-components';
import { MetaCard } from 'components/MetaCard/MetaCard';
import { cssColors } from 'config/cssVariables';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTaxBrackets } from 'requests/taxBracket';
import { toggleSliderModal } from 'store/models/sliderModal';
import { IGetTaxBracketFromServer } from 'typings/components/taxBracket.types';
import { GLOBAL_KEYBOARD_SHORTCUTS } from 'utils/keyboardShortcuts';
import {
    compileTaxBracketsTableBodyData,
    handleTaxBracketsHistoryTableRowClick,
} from './taxBracketsHistory.actions';
import styles from './taxBracketsHistory.module.css';

export const TaxBracketsHistory = (): JSX.Element => {
    // To manage which tab is selected
    const dispatch = useDispatch();
    const [taxBracketsData, setTaxBracketsData] = useState<IGetTaxBracketFromServer[]>(null);

    useEffect(() => {
        (async () => {
            // To populate the table
            const taxBracketsData = await getTaxBrackets();
            setTaxBracketsData(taxBracketsData.data as IGetTaxBracketFromServer[]);
        }).call(null);
    }, []);

    return (
        <div className={styles.taxBracketsWrapper}>
            <MetaCard
                title="Sample Description"
                secondaryText={'Sample Data'}
                buttons={[
                    <Button
                        key={'addTaxBracket'}
                        label={`Add Tax-Bracket (${GLOBAL_KEYBOARD_SHORTCUTS.ADD_TAXBRACKET})`}
                        style={{
                            color: cssColors['--inventory-color'],
                            backgroundColor: cssColors['--primary-background-color'],
                            borderColor: cssColors['--inventory-color'],
                        }}
                        onClick={() =>
                            dispatch(
                                toggleSliderModal({
                                    sliderName: 'addTaxBracketSlider',
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
                        <p key={'taxBracketName'}>{'Tax-Bracket Name'}</p>,
                        <p key={'taxBracketPercent'}>{'Tax-Bracket Percent'}</p>,
                    ]}
                    rowData={compileTaxBracketsTableBodyData(taxBracketsData)}
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
                            handleTaxBracketsHistoryTableRowClick(taxBracketsData[index]);
                        },
                    }}
                />
            </div>
        </div>
    );
};
