import cn from 'classnames';
import { ICallBackStateTrack } from 'layouts/Dashboard/components/Sliders/Sliders';
import { Bill } from 'pages/BillingSetup/components/Bill/Bill';
import React, { ReactElement, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { toggleSliderModal } from 'store/models/sliderModal';
import { Button } from '@sellerspot/universal-components';
import styles from './checkout.module.scss';

export interface ICheckoutProps {
    callBackStateTrack: [
        ICallBackStateTrack,
        React.Dispatch<React.SetStateAction<ICallBackStateTrack>>,
    ];
}
export const Checkout = (props: ICheckoutProps): ReactElement => {
    const dispatch = useDispatch();
    const billReference = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => billReference.current,
        onAfterPrint: () =>
            new Promise(() =>
                dispatch(
                    toggleSliderModal({
                        sliderName: 'checkoutSlider',
                        active: false,
                        autoFillData: null,
                    }),
                ),
            ),
    });

    // used to handle the closing of the sliderModal
    const handleCloseSlider = () => {
        dispatch(
            toggleSliderModal({
                sliderName: 'checkoutSlider',
                active: false,
                autoFillData: null,
            }),
        );
        props.callBackStateTrack[1]({
            ...props.callBackStateTrack[0],
            checkoutSlider: false,
        });
    };

    useEffect(() => {
        if (props.callBackStateTrack[0].checkoutSlider) {
            handleCloseSlider();
        }
    }, [props.callBackStateTrack[0].checkoutSlider]);

    return (
        <div className={cn(styles.checkoutWrapper)}>
            <div className={cn(styles.checkoutBillPreviewWrapper)}>
                <div className={cn(styles.checkoutBillPreviewHolder)}>
                    <Bill billReference={billReference} />
                </div>
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
                    <div className={styles.orderTotal}>{'₹ 250.00'}</div>
                </div>
                <div className={styles.calculationEntry}>
                    <div>{'Customer Paid'}</div>
                    <div className={styles.customerPaid}>{'₹ 500.00'}</div>
                </div>
                <div className={styles.calculationEntry}>
                    <div>{'Balance'}</div>
                    <div className={styles.balance}>{'- ₹ 250.00'}</div>
                </div>
                <Button
                    style={{ width: '100%', height: '65px', fontSize: 17 }}
                    label="COMPLETE SALE ( enter )"
                    onClick={handlePrint}
                />
            </div>
        </div>
    );
};
