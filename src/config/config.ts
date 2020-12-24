import { json } from 'express';

export const CONFIG = {
    ENV: process.env.ENV, //development | production
    ONLINE_SERVER_URL: 'http://localhost:8000',
};

// for any url do not suffix '/' (standard followd in this project) (nest / at use time if needed )

// fieldName constants
export enum inputFieldNames {
    // common to indicate fieldNameLess errors
    COMMONMESSAGE = 'commonMessage',
    // addbrands fields
    ADDBRANDFIELD = 'brandName',
    // category fields
    ADDCATEGORYFIELD = 'categoryName',
    // stockunit fields
    ADDSTOCKUNITFIELD = 'stockUnitName',
    // taxbracket fields
    ADDTAXBRACKETNAMEFIELD = 'addTaxBracketName',
    ADDTAXBRACKETPERCENTFIELD = 'addTaxBracketPercent',
    // product fields
    ADDPRODUCTNAMEFIELD = 'addProductName',
    ADDPRODUCTCATEGORYFIELD = 'addProductCategory',
    ADDPRODUCTBRANDFIELD = 'addProductBrand',
    ADDPRODUCTGTINFIELD = 'addProductGtin',
    ADDPRODUCTMRPFIELD = 'addProductMrp',
    ADDPRODUCTLANDINGPRICEFIELD = 'addProductLandingPrice',
    ADDPRODUCTSELLINGPRICEFIELD = 'addProductSellingPrice',
    ADDPRODUCTAVAILABLESTOCKFIELD = 'addProductAvailableStock',
}
