// denotes the two statuses for any sale
enum ESaleStatus {
    COMPLETED = 'COMPLETED',
    PENDING = 'PENDING',
}

// interface of the sale product information
interface ISaleItem {
    _id: string;
    product: string;
    quantity: number;
    discountPercent?: number;
}

export interface ISale {
    status: ESaleStatus;
    products?: ISaleItem[];
    subTotal?: number;
    discountPercent?: number;
    totalTax?: number;
    grandTotal?: number;
}

// response type for GET request to fetch all sales data
export interface IGetSale {
    _id: string;
    createdAt: string;
    status: ESaleStatus;
    products: ISaleItem[];
    subTotal: number;
    discountPercent: number;
    totalTax: number;
    grandTotal: number;
}