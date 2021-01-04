import { IGetProduct } from './product.types';

export interface ICartItem {
    productInformation: IGetProduct;
    quantity: number;
    subTotal: number;
    discount: number;
}
