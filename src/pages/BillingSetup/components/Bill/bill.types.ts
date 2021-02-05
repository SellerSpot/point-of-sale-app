import { IInitialStateNewSale } from 'store/models/newSale';

/**
 *
 */
export interface IBillProps {
    billReference: React.RefObject<HTMLDivElement>;
    saleData: IInitialStateNewSale['cartData'];
    paymentInformation: {
        balance: number;
        paid: number;
    };
}
