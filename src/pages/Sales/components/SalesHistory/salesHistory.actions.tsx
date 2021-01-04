import { API_ROUTES } from 'config/apiRoutes';
import React from 'react';
import { apiService } from 'services';
import { showNotify } from 'store/models/notify';
import { IGetSales } from './salesHistory.types';

export const getSalesHistory = async (): Promise<IGetSales[]> => {
    // sending API request
    const response = await apiService.get(API_ROUTES.SALES);
    // parsing response
    if (response.status) {
        return (response.data as IGetSales[]).map((sale: IGetSales) => {
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
