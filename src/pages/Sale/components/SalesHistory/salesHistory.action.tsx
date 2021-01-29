import React from 'react';
import { pointOfSaleTypes } from '@sellerspot/universal-types';

// Compile data to show in table
export const compileSaleHistoryTableData = (
    salesHistoryData: pointOfSaleTypes.saleResponseTypes.IGetSales['data'],
): JSX.Element[][] => {
    // eslint-disable-next-line no-magic-numbers
    if (salesHistoryData?.length > 0) {
        // To hold the compiled table data
        const compiledData: JSX.Element[][] = [];
        salesHistoryData.map((sale, index) => {
            // value to offset the sNo so that it is human readable
            const sNoIndexOffset = 1;
            compiledData.push([
                <p key={index}>{index + sNoIndexOffset}</p>,
                <p key={sale.createdAt}>{'2 days ago'}</p>,
                <p key={sale.status}>{sale.status}</p>,
                <p key={sale.subTotal}>{sale.subTotal}</p>,
                <p key={sale.totalTax}>{sale.totalTax}</p>,
                <p key={sale.grandTotal}>{sale.grandTotal}</p>,
            ]);
        });
        return compiledData;
    } else {
        return [];
    }
};
