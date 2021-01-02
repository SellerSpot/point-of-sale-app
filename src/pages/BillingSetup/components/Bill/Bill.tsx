import React, { ReactElement } from 'react';
import dummyLogo from 'images/logo192.png';
import commonStyle from 'styles/common.module.css';
import { getBillStyles } from './bill.styles';
import { cx } from '@emotion/css';
export interface IBillProps {
    billReference: React.RefObject<HTMLDivElement>;
}

export const Bill = (props: IBillProps): ReactElement => {
    const { billReference } = props;

    const styles = getBillStyles();

    return (
        <div ref={billReference} className={styles.billWrapper}>
            <div className={styles.billHeader}>
                <div className={styles.storeDetailsWrapper}>
                    <img className={styles.storeLogo} src={dummyLogo} alt={'Logo'} />
                    <div className={styles.storeDetails}>
                        <div className={styles.storeName}>Store Name</div>
                        <div className={styles.storeAddress}>
                            <div>12 A, New Raja Colony, Bheemanagar, Balajinagar, Trichy 1</div>
                            <div>0431 2411562 / +91 8903307270</div>
                        </div>
                    </div>
                </div>
                <div className={styles.billInvoiceDetailsWrapper}>
                    <div className={styles.billInvoiceDetails}>
                        <div className={styles.billInvoiceDetailsTitleHolder}>GST No:</div>
                        <div className={styles.billInvoiceDetailsValueHolder}>22AAAAA0000A1Z5</div>
                    </div>
                    <div className={styles.billInvoiceDetails}>
                        <div className={styles.billInvoiceDetailsTitleHolder}>Invoice Date:</div>
                        <div className={styles.billInvoiceDetailsValueHolder}>10/11/2020</div>
                    </div>
                    <div className={styles.billInvoiceDetails}>
                        <div className={styles.billInvoiceDetailsTitleHolder}>Invoice Number:</div>
                        <div className={styles.billInvoiceDetailsValueHolder}>IND123</div>
                    </div>
                </div>
            </div>
            <div className={styles.billSubTitle}>TAX INVOICE</div>
            <div className={styles.dashedBorder}></div>
            <div className={styles.customerDetailsWrapper}>
                <div className={styles.customerDetail}>
                    <div className={styles.customerDetailsTitle}>Customer Name</div>
                    <div className={styles.customerDetailsValue}>Rohit Raj</div>
                    <div className={styles.customerDetailsTitle}>Customer Name</div>
                    <div className={styles.customerDetailsValue}>-</div>
                </div>
                <div className={styles.customerDetail}>
                    <div className={styles.customerDetailsTitle}>Billing Address</div>
                    <div className={styles.customerDetailsValue}>
                        12 A, New Raja Colony, Bheemanagar, Balajinagar, Trichy 1
                    </div>
                </div>
                <div className={styles.customerDetail}>
                    <div className={styles.customerDetailsTitle}>Shipping Address</div>
                    <div className={styles.customerDetailsValue}>
                        12 A, New Raja Colony, Bheemanagar, Balajinagar, Trichy 1
                    </div>
                </div>
            </div>
            <div className={styles.billSubTitle}>PURCHASE INVOICE</div>
            <div className={styles.dashedBorder}></div>
            <div className={cx(styles.billTableWrapper)}>
                <div
                    className={cx(
                        styles.billTableNode,
                        styles.purchaseInvoiceTable,
                        styles.billTableNodeHead,
                    )}
                >
                    <div className={cx(commonStyle.textAlignCenter)}>SNo</div>
                    <div className={cx(commonStyle.textAlignLeft)}>Item</div>
                    <div className={cx(commonStyle.textAlignRight)}>Qty</div>
                    <div className={cx(commonStyle.textAlignRight)}>MRP</div>
                    <div className={cx(commonStyle.textAlignRight)}>Our Price</div>
                    <div className={cx(commonStyle.textAlignRight)}>Discount</div>
                    <div className={cx(commonStyle.textAlignRight)}>Tax</div>
                    <div className={cx(commonStyle.textAlignRight)}>Total</div>
                </div>
                <div
                    className={cx(
                        styles.billTableNode,
                        styles.purchaseInvoiceTable,
                        styles.billTableNodeContent,
                    )}
                >
                    <div className={cx(commonStyle.textAlignCenter)}>1.</div>
                    <div className={cx(commonStyle.textAlignLeft)}>
                        Philips Wireless Bluetooth Speaker
                    </div>
                    <div className={cx(commonStyle.textAlignRight)}>2</div>
                    <div className={cx(commonStyle.textAlignRight)}>₹ 2,000.00</div>
                    <div className={cx(commonStyle.textAlignRight)}>₹ 1,800.00</div>
                    <div className={cx(commonStyle.textAlignRight)}>
                        ₹ 1,44.00 <br />@ 8%
                    </div>
                    <div className={cx(commonStyle.textAlignRight)}>₹ 83.16</div>
                    <div className={cx(commonStyle.textAlignRight)}>₹ 1,739.16</div>
                </div>
                <div
                    className={cx(
                        styles.billTableNode,
                        styles.purchaseInvoiceTable,
                        styles.billTableNodeContent,
                    )}
                >
                    <div className={cx(commonStyle.textAlignCenter)}>2.</div>
                    <div className={cx(commonStyle.textAlignLeft)}>
                        Philips Wireless Bluetooth Speaker
                    </div>
                    <div className={cx(commonStyle.textAlignRight)}>2</div>
                    <div className={cx(commonStyle.textAlignRight)}>₹ 2,000.00</div>
                    <div className={cx(commonStyle.textAlignRight)}>₹ 1,800.00</div>
                    <div className={cx(commonStyle.textAlignRight)}>
                        ₹ 1,44.00 <br />@ 8%
                    </div>
                    <div className={cx(commonStyle.textAlignRight)}>₹ 83.16</div>
                    <div className={cx(commonStyle.textAlignRight)}>₹ 1,739.16</div>
                </div>
            </div>

            <div className={styles.pageBreak}></div>
            <div className={cx(styles.advertisementAndGrandTotalWrapper)}>
                <div className={cx(styles.advertisementHolder)}>Thanks for Shopping with us!</div>
                <div className={cx(styles.grandTotalWrapper)}>
                    <div className={cx(styles.grandTotalHolder)}>
                        <div className={cx(styles.grandTotalTitle)}>Item Subtotal</div>
                        <div className={cx(styles.grandTotalValue)}>₹ 12,600.00</div>
                    </div>
                    <div className={cx(styles.grandTotalHolder)}>
                        <div className={cx(styles.grandTotalTitle)}>Total Discount</div>
                        <div className={cx(styles.grandTotalValue)}>₹ 1,224.00</div>
                    </div>
                    <div className={cx(styles.grandTotalHolder)}>
                        <div className={cx(styles.grandTotalTitle)}>Diwali Discount</div>
                        <div className={cx(styles.grandTotalValue)}>₹ 243.72 @ 2%</div>
                    </div>
                    <div className={cx(styles.grandTotalHolder)}>
                        <div className={cx(styles.grandTotalTitle)}>Total Tax</div>
                        <div className={cx(styles.grandTotalValue)}>₹ 623.16</div>
                    </div>
                    <div className={cx(styles.grandTotalHolder, styles.grandTotalLarge)}>
                        <div className={cx(styles.grandTotalTitle)}>Invoice Total</div>
                        <div className={cx(styles.grandTotalValue)}>₹ 11,999.16</div>
                    </div>
                    <div className={cx(styles.grandTotalHolder)}>
                        <div className={cx(styles.grandTotalTitle)}>Paid</div>
                        <div className={cx(styles.grandTotalValue)}>₹ 12,000.00</div>
                    </div>
                    <div className={cx(styles.grandTotalHolder)}>
                        <div className={cx(styles.grandTotalTitle)}>Balance</div>
                        <div className={cx(styles.grandTotalValue)}>₹ 0.84</div>
                    </div>
                    <div className={cx(styles.grandTotalHolder)}>
                        <div className={cx(styles.grandTotalTitle)}>You Saved</div>
                        <div className={cx(styles.grandTotalValue)}>₹ 10,000.84</div>
                    </div>
                </div>
            </div>
            <div className={styles.pageBreak}></div>
            <div className={styles.billSubTitle}>TAX SPLIT UP</div>
            <div className={styles.dashedBorder}></div>
            <div className={cx(styles.billTableWrapper)}>
                <div
                    className={cx(
                        styles.billTableNode,
                        styles.taxSplitupTable,
                        styles.billTableNodeHead,
                    )}
                >
                    <div className={cx(commonStyle.textAlignLeft)}>Tax Brackets</div>
                    <div className={cx(commonStyle.textAlignLeft)}>Items (SNo)</div>
                    <div className={cx(commonStyle.textAlignRight)}>Taxable Value</div>
                    <div className={cx(commonStyle.textAlignRight)}>Tax Amount</div>
                </div>
                <div
                    className={cx(
                        styles.billTableNode,
                        styles.taxSplitupTable,
                        styles.billTableNodeContent,
                    )}
                >
                    <div className={cx(commonStyle.textAlignLeft)}>CGST (5%)</div>
                    <div className={cx(commonStyle.textAlignLeft)}>1, 2</div>
                    <div className={cx(commonStyle.textAlignRight)}>₹ 12,186.00</div>
                    <div className={cx(commonStyle.textAlignRight)}>₹ 609.30</div>
                </div>
                <div
                    className={cx(
                        styles.billTableNode,
                        styles.taxSplitupTable,
                        styles.billTableNodeContent,
                    )}
                >
                    <div className={cx(commonStyle.textAlignLeft)}>CESS (1%)</div>
                    <div className={cx(commonStyle.textAlignLeft)}>1</div>
                    <div className={cx(commonStyle.textAlignRight)}>₹ 10,800.00</div>
                    <div className={cx(commonStyle.textAlignRight)}>₹ 108.30</div>
                </div>
            </div>
            <div className={cx(styles.advertisementAndGrandTotalWrapper)}>
                <div></div>
                <div className={cx(styles.grandTotalWrapper)}>
                    <div className={cx(styles.grandTotalHolder)}>
                        <div className={cx(styles.grandTotalTitle)}>Total Tax</div>
                        <div className={cx(styles.grandTotalValue)}>₹ 717.30</div>
                    </div>
                </div>
            </div>
            <div className={cx(styles.termsAndSignatureWrapper)}>
                <div className={cx(styles.termsAreaHolder)}>
                    <div className={cx(styles.termsAreaTitle)}>Terms &amp; Conditions</div>
                    <div>1. Bill should be needed for return products.</div>
                    <div>2. Food products can&apos;t be replaced.</div>
                </div>
                <div className={cx(styles.signatureAreaHolder)}>
                    <div className={cx(styles.termsAreaTitle)}>Signature</div>
                </div>
            </div>
        </div>
    );
};
