import React, { ReactElement } from 'react';
import styles from './checkout.module.css';
import cn from 'classnames';
import { Button } from '../../../../components/Button/Button';
import { useDispatch } from 'react-redux';
import { toggleSliderModal } from '../../../../store/models/sliderModal';
import { cssColors, cssVariables } from '../../../../config/cssVariables';

export const Checkout = (): ReactElement => {
    const dispatch = useDispatch();
    return (
        <div className={cn(styles.checkoutWrapper)}>
            <div className={cn(styles.checkoutBillPreviewWrapper)}>
                <div className={cn(styles.checkoutBillPreviewHolder)}>Bill Preview</div>
            </div>
            <div className={cn(styles.checkoutBillingDetailsWrapper)}>
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
                    <div style={{ fontSize: cssVariables['--font-size-extra-large'] }}>{'₹ 250.00'}</div>
                </div>
                <div className={styles.calculationEntry}>
                    <div>{'Customer Paid'}</div>
                    <div style={{ fontSize: cssVariables['--font-size-extra-large'] }}>{'₹ 500.00'}</div>
                </div>
                <div className={styles.calculationEntry} style={{ color: cssColors['--danger-color'] }}>
                    <div>{'Balance'}</div>
                    <div style={{ fontSize: cssVariables['--font-size-extra-large'] }}>{'- ₹ 250.00'}</div>
                </div>
                <Button
                    style={{ width: '100%', height: '65px', fontSize: 17 }}
                    label="COMPLETE SALE ( enter )"
                    labelColor="--light-font-color"
                    backgroundColor="--sales-color"
                    onClick={() => dispatch(toggleSliderModal({ sliderName: 'checkoutSlider', active: false }))}
                />
            </div>
        </div>
    );
};
