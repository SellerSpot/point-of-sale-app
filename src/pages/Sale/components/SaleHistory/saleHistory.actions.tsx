import React from 'react';
import lodash from 'lodash';
import services from 'services/services';
import { IGetSale } from 'typings/components/sale.types';
import requests from 'requests/requests';

// To get the sales history data
export const getSaleHistoryData = async (): Promise<IGetSale[]> => {
    try {
        const salesHistoryData = await requests.sale.getSales();
        if (salesHistoryData.status) {
            return salesHistoryData.data;
        } else {
            throw Error;
        }
    } catch {
        console.log('Error Occurred');
    }
    return null;
};

// Compile data to show in table
export const compileSaleTableBodyData = (salesHistoryData: IGetSale[]): JSX.Element[][] => {
    if (!lodash.isNull(salesHistoryData) && salesHistoryData.length > 0) {
        // To hold the compiled table data
        const compiledData: JSX.Element[][] = [];
        salesHistoryData.map((sale, index) => {
            compiledData.push([
                <p key={index}>{index + 1}</p>,
                <p key={sale.createdAt}>
                    {services.ComputeOps.convertEpochTime(parseInt(sale.createdAt))}
                </p>,
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
