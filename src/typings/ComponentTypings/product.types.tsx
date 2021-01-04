export interface IGetProduct {
    _id: string;
    name: string;
    category: string;
    brand: string;
    gtinNumber: string;
    mrpPrice: number;
    landingPrice: number;
    sellingPrice: number;
    stockInformation: {
        availableStock: number;
        stockUnit: string;
    };
    profitPercent: number;
    taxBracket: string[];
}
