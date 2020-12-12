import React, { ReactElement } from 'react';
import style from './bill.module.css';
import dummyLogo from '../../../../images/logo192.png';
import cn from 'classnames';
import commonStyle from '../../../../styles/common.module.css';

export const Bill = (): ReactElement => {
    return (
        <div className={style.billWrapper}>
            <div className={style.billHeader}>
                <div className={style.storeDetailsWrapper}>
                    <img className={style.storeLogo} src={dummyLogo} alt={'Logo'} />
                    <div className={style.storeDetails}>
                        <div className={style.storeName}>Store Name</div>
                        <div className={style.storeAddress}>
                            <div>12 A, New Raja Colony, Bheemanagar, Balajinagar, Trichy 1</div>
                            <div>0431 2411562 / +91 8903307270</div>
                        </div>
                    </div>
                </div>
                <div className={style.billInvoiceDetailsWrapper}>
                    <div className={style.billInvoiceDetails}>
                        <div className={style.billInvoiceDetailsTitleHolder}>GST No:</div>
                        <div className={style.billInvoiceDetailsValueHolder}>22AAAAA0000A1Z5</div>
                    </div>
                    <div className={style.billInvoiceDetails}>
                        <div className={style.billInvoiceDetailsTitleHolder}>Invoice Date:</div>
                        <div className={style.billInvoiceDetailsValueHolder}>10/11/2020</div>
                    </div>
                    <div className={style.billInvoiceDetails}>
                        <div className={style.billInvoiceDetailsTitleHolder}>Invoice Number:</div>
                        <div className={style.billInvoiceDetailsValueHolder}>IND123</div>
                    </div>
                </div>
            </div>
            <div className={style.billSubTitle}>TAX INVOICE</div>
            <div className={style.dashedBorder}></div>
            <div className={style.customerDetailsWrapper}>
                <div className={style.customerDetail}>
                    <div className={style.customerDetailsTitle}>Customer Name</div>
                    <div className={style.customerDetailsValue}>Rohit Raj</div>
                    <div className={style.customerDetailsTitle}>Customer Name</div>
                    <div className={style.customerDetailsValue}>-</div>
                </div>
                <div className={style.customerDetail}>
                    <div className={style.customerDetailsTitle}>Billing Address</div>
                    <div className={style.customerDetailsValue}>
                        12 A, New Raja Colony, Bheemanagar, Balajinagar, Trichy 1
                    </div>
                </div>
                <div className={style.customerDetail}>
                    <div className={style.customerDetailsTitle}>Shipping Address</div>
                    <div className={style.customerDetailsValue}>
                        12 A, New Raja Colony, Bheemanagar, Balajinagar, Trichy 1
                    </div>
                </div>
            </div>
            <div className={style.billSubTitle}>PURCHASE INVOICE</div>
            <div className={style.dashedBorder}></div>
            <div className={cn(style.billTableWrapper)}>
                <div className={cn(style.billTableNode, style.purchaseInvoiceTable, style.billTableNodeHead)}>
                    <div className={cn(commonStyle.textAlignCenter)}>SNo</div>
                    <div className={cn(commonStyle.textAlignLeft)}>Item</div>
                    <div className={cn(commonStyle.textAlignRight)}>Qty</div>
                    <div className={cn(commonStyle.textAlignRight)}>MRP</div>
                    <div className={cn(commonStyle.textAlignRight)}>Our Price</div>
                    <div className={cn(commonStyle.textAlignRight)}>Discount</div>
                    <div className={cn(commonStyle.textAlignRight)}>Tax</div>
                    <div className={cn(commonStyle.textAlignRight)}>Total</div>
                </div>
                <div className={cn(style.billTableNode, style.purchaseInvoiceTable, style.billTableNodeContent)}>
                    <div className={cn(commonStyle.textAlignCenter)}>1.</div>
                    <div className={cn(commonStyle.textAlignLeft)}>Philips Wireless Bluetooth Speaker</div>
                    <div className={cn(commonStyle.textAlignRight)}>2</div>
                    <div className={cn(commonStyle.textAlignRight)}>₹ 2,000.00</div>
                    <div className={cn(commonStyle.textAlignRight)}>₹ 1,800.00</div>
                    <div className={cn(commonStyle.textAlignRight)}>
                        ₹ 1,44.00 <br />@ 8%
                    </div>
                    <div className={cn(commonStyle.textAlignRight)}>₹ 83.16</div>
                    <div className={cn(commonStyle.textAlignRight)}>₹ 1,739.16</div>
                </div>
                <div className={cn(style.billTableNode, style.purchaseInvoiceTable, style.billTableNodeContent)}>
                    <div className={cn(commonStyle.textAlignCenter)}>2.</div>
                    <div className={cn(commonStyle.textAlignLeft)}>Philips Wireless Bluetooth Speaker</div>
                    <div className={cn(commonStyle.textAlignRight)}>2</div>
                    <div className={cn(commonStyle.textAlignRight)}>₹ 2,000.00</div>
                    <div className={cn(commonStyle.textAlignRight)}>₹ 1,800.00</div>
                    <div className={cn(commonStyle.textAlignRight)}>
                        ₹ 1,44.00 <br />@ 8%
                    </div>
                    <div className={cn(commonStyle.textAlignRight)}>₹ 83.16</div>
                    <div className={cn(commonStyle.textAlignRight)}>₹ 1,739.16</div>
                </div>
            </div>

            <div className={cn(style.advertisementAndGrandTotalWrapper)}>
                <div className={cn(style.advertisementHolder)}>Thanks for Shopping with us!</div>
                <div className={cn(style.grandTotalWrapper)}>
                    <div className={cn(style.grandTotalHolder)}>
                        <div className={cn(style.grandTotalTitle)}>Item Subtotal</div>
                        <div className={cn(style.grandTotalValue)}>₹ 12,600.00</div>
                    </div>
                    <div className={cn(style.grandTotalHolder)}>
                        <div className={cn(style.grandTotalTitle)}>Total Discount</div>
                        <div className={cn(style.grandTotalValue)}>₹ 1,224.00</div>
                    </div>
                    <div className={cn(style.grandTotalHolder)}>
                        <div className={cn(style.grandTotalTitle)}>Diwali Discount</div>
                        <div className={cn(style.grandTotalValue)}>₹ 243.72 @ 2%</div>
                    </div>
                    <div className={cn(style.grandTotalHolder)}>
                        <div className={cn(style.grandTotalTitle)}>Total Tax</div>
                        <div className={cn(style.grandTotalValue)}>₹ 623.16</div>
                    </div>
                    <div className={cn(style.grandTotalHolder, style.grandTotalLarge)}>
                        <div className={cn(style.grandTotalTitle)}>Invoice Total</div>
                        <div className={cn(style.grandTotalValue)}>₹ 11,999.16</div>
                    </div>
                    <div className={cn(style.grandTotalHolder)}>
                        <div className={cn(style.grandTotalTitle)}>Paid</div>
                        <div className={cn(style.grandTotalValue)}>₹ 12,000.00</div>
                    </div>
                    <div className={cn(style.grandTotalHolder)}>
                        <div className={cn(style.grandTotalTitle)}>Balance</div>
                        <div className={cn(style.grandTotalValue)}>₹ 0.84</div>
                    </div>
                    <div className={cn(style.grandTotalHolder)}>
                        <div className={cn(style.grandTotalTitle)}>You Saved</div>
                        <div className={cn(style.grandTotalValue)}>₹ 10,000.84</div>
                    </div>
                </div>
            </div>

            <div className={style.billSubTitle}>TAX SPLIT UP</div>
            <div className={style.dashedBorder}></div>
            <div className={cn(style.billTableWrapper)}>
                <div className={cn(style.billTableNode, style.taxSplitupTable, style.billTableNodeHead)}>
                    <div className={cn(commonStyle.textAlignLeft)}>Tax Brackets</div>
                    <div className={cn(commonStyle.textAlignLeft)}>Items (SNo)</div>
                    <div className={cn(commonStyle.textAlignRight)}>Taxable Value</div>
                    <div className={cn(commonStyle.textAlignRight)}>Tax Amount</div>
                </div>
                <div className={cn(style.billTableNode, style.taxSplitupTable, style.billTableNodeContent)}>
                    <div className={cn(commonStyle.textAlignLeft)}>CGST (5%)</div>
                    <div className={cn(commonStyle.textAlignLeft)}>1, 2</div>
                    <div className={cn(commonStyle.textAlignRight)}>₹ 12,186.00</div>
                    <div className={cn(commonStyle.textAlignRight)}>₹ 609.30</div>
                </div>
                <div className={cn(style.billTableNode, style.taxSplitupTable, style.billTableNodeContent)}>
                    <div className={cn(commonStyle.textAlignLeft)}>CESS (1%)</div>
                    <div className={cn(commonStyle.textAlignLeft)}>1</div>
                    <div className={cn(commonStyle.textAlignRight)}>₹ 10,800.00</div>
                    <div className={cn(commonStyle.textAlignRight)}>₹ 108.30</div>
                </div>
            </div>
            <div className={cn(style.advertisementAndGrandTotalWrapper)}>
                <div></div>
                <div className={cn(style.grandTotalWrapper)}>
                    <div className={cn(style.grandTotalHolder)}>
                        <div className={cn(style.grandTotalTitle)}>Total Tax</div>
                        <div className={cn(style.grandTotalValue)}>₹ 717.30</div>
                    </div>
                </div>
            </div>
            <div className={cn(style.termsAndSignatureWrapper)}>
                <div className={cn(style.termsAreaHolder)}>
                    <div className={cn(style.termsAreaTitle)}>Terms &amp; Conditions</div>
                    <div>1. Bill should be needed for return products.</div>
                    <div>2. Food products can&apos;t be replaced.</div>
                </div>
                <div className={cn(style.signatureAreaHolder)}>
                    <div className={cn(style.termsAreaTitle)}>Signature</div>
                </div>
            </div>
        </div>
    );
};
