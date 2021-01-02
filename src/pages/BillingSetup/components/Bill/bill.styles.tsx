import { css } from '@emotion/css';

interface IGetBillStyles {
    billWrapper: string;
    billHeader: string;
    storeDetailsWrapper: string;
    storeLogo: string;
    storeDetails: string;
    storeName: string;
    storeAddress: string;
    billInvoiceDetailsWrapper: string;
    billInvoiceDetails: string;
    billInvoiceDetailsTitleHolder: string;
    billInvoiceDetailsValueHolder: string;
    dashedBorder: string;
    billSubTitle: string;
    customerDetailsWrapper: string;
    customerDetail: string;
    customerDetailsTitle: string;
    customerDetailsValue: string;
    billTableWrapper: string;
    billTableNode: string;
    billTableNodeHead: string;
    billTableNodeContent: string;
    purchaseInvoiceTable: string;
    taxSplitupTable: string;
    advertisementAndGrandTotalWrapper: string;
    advertisementHolder: string;
    grandTotalWrapper: string;
    grandTotalHolder: string;
    grandTotalTitle: string;
    grandTotalValue: string;
    grandTotalLarge: string;
    termsAndSignatureWrapper: string;
    termsAreaHolder: string;
    termsAreaTitle: string;
    signatureAreaHolder: string;
    pageBreak: string;
}

export const getBillStyles = (): IGetBillStyles => {
    const billWrapper = css`
        width: 100%;
        height: auto;
        background: white;
        box-shadow: 0 0 10px 0 gray;
        padding: 25px;
        border-radius: 3px;

        @media print {
            -webkit-print-color-adjust: exact;
            box-shadow: none;
            border-radius: 0;
            padding: 0;
        }

        @page {
            size: auto;
            margin: 40px;
        }
    `;

    const billHeader = css`
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 20px;
    `;

    const storeDetailsWrapper = css`
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const storeLogo = css`
        width: 60px;
        height: auto;
        filter: grayscale(100%);
    `;

    const storeDetails = css`
        margin-left: 20px;
        max-width: 250px;
    `;

    const storeName = css`
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 2px;
    `;

    const storeAddress = css`
        font-size: 13px;
        line-height: 22px;
    `;

    const billInvoiceDetailsWrapper = css`
        width: 220px;
    `;

    const billInvoiceDetails = css`
        width: 100%;
        height: auto;
        padding: 5px 0;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        font-size: 13px;
    `;

    const billInvoiceDetailsTitleHolder = css`
        text-align: left;
    `;

    const billInvoiceDetailsValueHolder = css`
        text-align: right;
    `;

    const dashedBorder = css`
        width: 100%;
        height: 1px;
        border-bottom: 1px dotted black;
    `;

    const billSubTitle = css`
        font-size: 14px;
        font-weight: bold;
        padding: 8px 0;
    `;

    const customerDetailsWrapper = css`
        margin-top: 5px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
    `;

    const customerDetail = css`
        width: 150px;
        height: auto;
    `;

    const customerDetailsTitle = css`
        font-size: 12px;
        padding: 6px 0;
    `;

    const customerDetailsValue = css`
        font-size: 11px;
        line-height: 18px;
    `;

    const billTableWrapper = css`
        margin: 8px 0;
    `;

    const billTableNode = css`
        display: grid;
        align-items: center;
        gap: 8px;
        padding: 10px 0;
    `;

    const billTableNodeHead = css`
        font-size: 12px;
        font-weight: bold;
        border-bottom: 1px solid rgba(0, 0, 0, 0.8);
    `;

    const billTableNodeContent = css`
        font-size: 11px;
        font-weight: normal;
        border-bottom: 1px solid rgba(128, 128, 128, 0.3);
    `;

    const purchaseInvoiceTable = css`
        grid-template-columns: 30px 180px repeat(6, 1fr);
    `;

    const taxSplitupTable = css`
        grid-template-columns: 1fr 200px repeat(2, 1fr);
    `;

    /* adverts and thank message - subtotal section */

    const advertisementAndGrandTotalWrapper = css`
        display: grid;
        grid-template-columns: 1fr 250px;
        gap: 20px;
        margin: 20px 0;
    `;

    const advertisementHolder = css`
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(128, 128, 128, 0.3);
        border-radius: 5px;
        font-size: 12px;
        font-weight: 600;
    `;

    const grandTotalWrapper = css`
        display: block;
    `;

    const grandTotalHolder = css`
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 3px 0;
        font-size: 11px;
    `;

    const grandTotalTitle = css`
        font-weight: bold;
        text-align: left;
    `;

    const grandTotalValue = css`
        font-weight: normal;
        text-align: right;
    `;

    const grandTotalLarge = css`
        font-size: 14px;
    `;

    /* terms and conditions / signature area */
    const termsAndSignatureWrapper = css`
        display: grid;
        grid-template-columns: 1fr 200px;
        gap: 10px;
    `;

    const termsAreaHolder = css`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border: 1px solid rgba(128, 128, 128, 0.3);
        font-size: 11px;
        padding: 10px;
        line-height: 20px;
    `;

    const termsAreaTitle = css`
        font-size: 12px;
        font-weight: bold;
    `;

    const signatureAreaHolder = css`
        height: 100px;
        padding: 10px 0;
        border: 1px solid rgba(128, 128, 128, 0.3);
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    `;

    const pageBreak = css`
        @media all {
            display: none;
            display: block;
            page-break-before: auto;
        }

        @media print {
            display: block;
            page-break-before: auto;
        }
    `;

    return {
        billWrapper,
        billHeader,
        storeDetailsWrapper,
        storeLogo,
        storeDetails,
        storeName,
        storeAddress,
        billInvoiceDetailsWrapper,
        billInvoiceDetails,
        billInvoiceDetailsTitleHolder,
        billInvoiceDetailsValueHolder,
        dashedBorder,
        billSubTitle,
        customerDetailsWrapper,
        customerDetail,
        customerDetailsTitle,
        customerDetailsValue,
        billTableWrapper,
        billTableNode,
        billTableNodeHead,
        billTableNodeContent,
        purchaseInvoiceTable,
        taxSplitupTable,
        advertisementAndGrandTotalWrapper,
        advertisementHolder,
        grandTotalWrapper,
        grandTotalHolder,
        grandTotalTitle,
        grandTotalValue,
        grandTotalLarge,
        termsAndSignatureWrapper,
        termsAreaHolder,
        termsAreaTitle,
        signatureAreaHolder,
        pageBreak,
    };
};
