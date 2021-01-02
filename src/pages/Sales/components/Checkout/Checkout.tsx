import React, { ReactElement, useRef } from 'react';
import { Button } from '@sellerspot/universal-components';
import { useDispatch } from 'react-redux';
import { toggleSliderModal } from 'store/models/sliderModal';
import { cssColors, cssVariables } from 'config/cssVariables';
import { Bill } from '../../../BillingSetup/components/Bill/Bill';
import { useReactToPrint } from 'react-to-print';
import { cx } from '@emotion/css';
import { getCheckoutStyles } from './checkout.styles';

export const Checkout = (): ReactElement => {
    const dispatch = useDispatch();
    const billReference = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => billReference.current,
        onAfterPrint: () =>
            new Promise(() =>
                dispatch(toggleSliderModal({ sliderName: 'checkoutSlider', active: false })),
            ),
    });

    const styles = getCheckoutStyles();

    return (
        <div className={cx(styles.checkoutWrapper)}>
            <div className={cx(styles.checkoutBillPreviewWrapper)}>
                <div className={cx(styles.checkoutBillPreviewHolder)}>
                    <Bill billReference={billReference} />
                </div>
            </div>
            <div className={cx(styles.checkoutBillingDetailsWrapper)}>
                <div className={styles.calculationEntry}>
                    <div>{'Sub-Total'}</div>
                    <div>{'₹ 200.00'}</div>
                </div>
                <div className={styles.calculationEntry}>
                    <div>{'Add Taxes'}</div>
                    <div>{'₹ 50.00'}</div>
                </div>
                <div className={styles.calculationEntry}>
                    <div>{'Total Discount'}</div>
                    <div>{'- ₹ 20.00'}</div>
                </div>
                <div className={styles.calculationEntry}>
                    <div>{'Order Total'}</div>
                    <div style={{ fontSize: cssVariables['--font-size-extra-large'] }}>
                        {'₹ 250.00'}
                    </div>
                </div>
                <div className={styles.calculationEntry}>
                    <div>{'Customer Paid'}</div>
                    <div style={{ fontSize: cssVariables['--font-size-extra-large'] }}>
                        {'₹ 500.00'}
                    </div>
                </div>
                <div
                    className={styles.calculationEntry}
                    style={{ color: cssColors['--danger-color'] }}
                >
                    <div>{'Balance'}</div>
                    <div style={{ fontSize: cssVariables['--font-size-extra-large'] }}>
                        {'- ₹ 250.00'}
                    </div>
                </div>
                <Button
                    label="COMPLETE SALE ( enter )"
                    style={{
                        width: '100%',
                        height: '65px',
                        fontSize: 17,
                        color: cssColors['--light-font-color'],
                        backgroundColor: cssColors['--sales-color'],
                    }}
                    onClick={handlePrint}
                />
            </div>
        </div>
    );
};
