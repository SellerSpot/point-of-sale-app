import { API_ROUTES } from 'config/apiRoutes';
import lodash from 'lodash';
import React from 'react';
import { apiService } from 'services';
import { convertEpochTime } from 'services/Utils';
import { showNotify } from 'store/models/notify';
import { IGetSales } from 'typings/ComponentTypings/sales.types';

// to get all sales data from server
export const getSalesHistory = async (): Promise<IGetSales[]> => {
    // sending API request
    const response = await apiService.get(API_ROUTES.SALES);
    // parsing response
    if (response.status) {
        return (response.data as IGetSales[]).map((sale) => {
            const {
                _id,
                status,
                createdAt,
                discountPercent,
                grandTotal,
                products,
                subTotal,
                totalTax,
            } = sale;
            return {
                _id,
                status,
                createdAt,
                discountPercent,
                grandTotal,
                products,
                subTotal,
                totalTax,
            };
        });
    } else {
        showNotify({
            content: <p>Unable to fetch sales data</p>,
            timeout: 3000,
        });
        return null;
    }
};

// compile data to show in table
export const compileSalesTableBodyData = (salesHistoryData: IGetSales[]): JSX.Element[][] => {
    if (!lodash.isNull(salesHistoryData) && salesHistoryData.length > 0) {
        // to hold the compiled table data
        const compiledData: JSX.Element[][] = [];
        salesHistoryData.map((sale, index) => {
            compiledData.push([
                <p key={index}>{index + 1}</p>,
                <p key={sale.createdAt}>{convertEpochTime(parseInt(sale.createdAt))}</p>,
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
