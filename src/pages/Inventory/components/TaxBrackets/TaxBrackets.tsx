import { cssColors } from 'config/cssVariables';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@sellerspot/universal-components';
import { MetaCard } from 'components/MetaCard/MetaCard';
import { Table } from '@sellerspot/universal-components';
import { toggleSliderModal } from 'store/models/sliderModal';
import { getTaxBracketStyles } from './taxBrackets.styles';
import { IGetTaxBracket } from 'typings/ComponentTypings/taxBracket.types';
import {
    compileTaxBracketTableBodyData,
    getTaxBrackets,
    handleTableRowClick,
} from './taxBracket.actions';
import { css } from '@emotion/css';

export const TaxBrackets = (): JSX.Element => {
    // to manage which tab is selected
    const dispatch = useDispatch();
    const styles = getTaxBracketStyles();
    const [taxBracketsData, setTaxBracketsData] = useState<IGetTaxBracket[]>(null);

    useEffect(() => {
        (async () => {
            // to populate the table
            setTaxBracketsData(await getTaxBrackets());
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
                        label="Add Tax Bracket (F4)"
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
                        <p key={'Tax Bracket Name'}>{'Tax Bracket Name'}</p>,
                        <p key={'Tax Bracket Percent'}>{'Tax Bracket Percent'}</p>,
                    ]}
                    rowData={compileTaxBracketTableBodyData(taxBracketsData)}
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
                            handleTableRowClick(taxBracketsData[index]);
                        },
                    }}
                />
            </div>
        </div>
    );
};
