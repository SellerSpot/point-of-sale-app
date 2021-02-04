import { apiService } from 'services';
import { pointOfSaleTypes } from '@sellerspot/universal-types';
import { IAddProductFormSchema } from 'pages/Inventory/components/AddProduct/addProduct.types';

/**
 * Used to get all products from database
 */
export const getAllProducts = async (): Promise<
    pointOfSaleTypes.productResponseTypes.IGetAllProducts['data']
> => {
    const response = await apiService.post(
        `${pointOfSaleTypes.ROUTES.PROUDCT}/${pointOfSaleTypes.ROUTES.PRODUCT_GET_ALL_PRODUCTS}`,
    );
    const responseData = response.data as pointOfSaleTypes.productResponseTypes.IGetAllProducts;
    if (responseData.status) {
        return responseData.data;
    }
    return null;
};

/**
 * Used to search the database for products
 */
export const searchProduct = async (
    query: string,
): Promise<pointOfSaleTypes.productResponseTypes.ISearchProduct['data']> => {
    const response = await apiService.post(
        `${pointOfSaleTypes.ROUTES.PROUDCT}/${pointOfSaleTypes.ROUTES.PRODUCT_SEARCH_PRODUCT}`,
        {
            query,
        },
    );
    const responseData = response.data as pointOfSaleTypes.productResponseTypes.ISearchProduct;
    if (responseData.status) {
        return responseData.data;
    }
    return {
        queryType: 'name',
        results: [],
    };
};

/**
 * Used to create a new product
 */
export const createProduct = async (
    data: IAddProductFormSchema,
): Promise<pointOfSaleTypes.productResponseTypes.ICreateProduct> => {
    const response = await apiService.post(
        `${pointOfSaleTypes.ROUTES.PROUDCT}/${pointOfSaleTypes.ROUTES.PRODUCT_CREATE_PRODUCT}`,
        <pointOfSaleTypes.productRequestTypes.ICreateProduct>{
            brand: data.brand,
            category: data.category,
            name: data.name,
            sellingPrice: data.sellingPrice,
            stockInformation: {
                availableStock: data.availableStock,
                stockUnit: data.stockUnit,
            },
            taxBracket: data.taxBrackets,
            gtinNumber: data.gtinNumber,
            landingPrice: data.landingPrice,
            mrpPrice: data.mrpPrice,
            profitPercent: data.profitPercent,
        },
    );
    const responseData = response.data as pointOfSaleTypes.productResponseTypes.ICreateProduct;
    console.log(responseData);

    // if (responseData.status) {
    //     return responseData.data;
    // } else {
    //     return {

    //     }
    // }
    return null;
};
