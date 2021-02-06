import cn from 'classnames';
import { TCallBackStateTrack } from 'layouts/Dashboard/components/Sliders/Sliders';
import { Bill } from 'pages/BillingSetup/components/Bill/Bill';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { SLIDERS, closeSliderModal } from 'store/models/sliderModal';
import { RootState, store } from 'store/store';
import { GLOBAL_KEYBOARD_SHORTCUTS } from 'utilities/general';
import { generalUtilities } from 'utilities/utilities';
import { Button, HorizontalRule, InputField } from '@sellerspot/universal-components';
import styles from './checkout.module.scss';

export interface ICheckoutProps {
    callBackStateTrack: [
        TCallBackStateTrack,
        React.Dispatch<React.SetStateAction<TCallBackStateTrack>>,
    ];
}
export const Checkout = (props: ICheckoutProps): ReactElement => {
    const dispatch = useDispatch();
    const billReference = useRef<HTMLDivElement>(null);
    // getting sliderState to listen to when the slider is invoked to autopopulate
    const sliderState = useSelector((state: RootState) => state.sliderModal);
    // newSale store selector to fetch data about the current sale
    const newSaleState = useSelector((state: RootState) => state.newSale);
    // state to handle the focus state of the paidField
    const [paidFieldFocused, setPaidFieldFocused] = useState(false);
    // holds the value of amount paid by the customer
    const [amountPaid, setAmountPaid] = useState(0);
    // used to handle printing process of the bill
    const handlePrint = useReactToPrint({
        content: () => billReference.current,
        onAfterPrint: () =>
            new Promise(() =>
                dispatch(
                    closeSliderModal({
                        sliderName: SLIDERS.checkoutSlider,
                    }),
                ),
            ),
    });

    // used to calculate the balance owed to the customer
    const calculateBalanceOwed = (): number => {
        if (amountPaid > newSaleState.cartData.totals.grandTotal) {
            return amountPaid - newSaleState.cartData.totals.grandTotal;
        }
        return 0;
    };

    // used to handle the closing of the sliderModal
    const handleCloseSlider = () => {
        dispatch(
            closeSliderModal({
                sliderName: SLIDERS.checkoutSlider,
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

    //* used to handle searchbar refocussing procedure
    useEffect(() => {
        // calling default focus
        if (sliderState.openSliders.includes(SLIDERS.checkoutSlider)) {
            // setting focus towards the searchBar
            setPaidFieldFocused(true);
        }
    }, [sliderState.openSliders]);

    return (
        <div className={cn(styles.checkoutWrapper)}>
            <div className={cn(styles.checkoutBillPreviewWrapper)}>
                <div className={cn(styles.checkoutBillPreviewHolder)}>
                    <Bill
                        billReference={billReference}
                        saleData={newSaleState.cartData}
                        paymentInformation={{
                            balance: calculateBalanceOwed(),
                            paid: amountPaid,
                        }}
                    />
                </div>
            </div>
            <div className={cn(styles.checkoutBillingDetailsWrapper)}>
                <div className={styles.calculationEntry}>
                    <div>{'Total Taxes'}</div>
                    <div>{`${generalUtilities.COMMON_SYMBOLS.RUPEE_SYMBOL} ${newSaleState.cartData.totals.grandTotalTax}`}</div>
                </div>

                <div className={styles.calculationEntry}>
                    <div>{'Total Discount'}</div>
                    <div>{`${generalUtilities.COMMON_SYMBOLS.RUPEE_SYMBOL} ${newSaleState.cartData.totals.grandTotalDiscount}`}</div>
                </div>
                <div className={styles.calculationEntry}>
                    <div>{'Order Total'}</div>
                    <div>{`${generalUtilities.COMMON_SYMBOLS.RUPEE_SYMBOL} ${newSaleState.cartData.totals.grandTotal}`}</div>
                </div>
                <HorizontalRule
                    ruleWidth={'100%'}
                    style={{
                        horizontalRuleWrapperStyle: {
                            padding: 0,
                            margin: 0,
                        },
                        horizontalRuler: {
                            padding: 0,
                            margin: 0,
                        },
                    }}
                />
                <div className={styles.calculationEntry}>
                    <div>{'Paid'}</div>
                    <div className={styles.paidField}>
                        <InputField
                            focus={paidFieldFocused}
                            setFocus={setPaidFieldFocused}
                            type="number"
                            prefix={<p>{generalUtilities.COMMON_SYMBOLS.RUPEE_SYMBOL}</p>}
                            selectTextOnFocus
                            size={'compact'}
                            style={{
                                prefixWrapper: {
                                    height: '50px',
                                },
                                input: {
                                    height: '50px',
                                    width: '150px',
                                    fontSize: '18px',
                                    textAlign: 'end',
                                },
                            }}
                            onChange={(event) => setAmountPaid(parseInt(event.target.value))}
                        />
                    </div>
                </div>
                <div className={styles.calculationEntry}>
                    <div>{'Balance'}</div>
                    <div className={styles.balance}>{`- ${
                        generalUtilities.COMMON_SYMBOLS.RUPEE_SYMBOL
                    } ${calculateBalanceOwed().toString()}`}</div>
                </div>
                <Button
                    style={{ width: '100%', height: '50px', fontSize: 16 }}
                    label={`COMPLETE SALE (${GLOBAL_KEYBOARD_SHORTCUTS.COMPLETE_SALE})`}
                    onClick={handlePrint}
                />
            </div>
        </div>
    );
};
