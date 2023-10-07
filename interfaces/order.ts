import { IUser } from './';

export interface IOrder {
    _id?           : string;
    user?          : IUser | string;
    orderItems     : IOrderItem[];
    shippingAddress: ShippingAddress;
    paymentResult? : string;

    numberOfItems: number;
    subTotal     : number;
    tax          : number;
    total        : number;

    isPaid       : boolean;
    paidAt?      : string;

    transactionId?: string;

}


export interface IOrderItem {
    _id       : string;
    title     : string;
    dimensions: string;
    quantity  : number;
    slug      : string;
    image     : string;
    price     : number;
    category  : string;
}


export interface ShippingAddress {
    firstName     : string;
    lastName      : string;
    documentType  : string;
    documentNumber: string;
    country       : string;
    region        : string;
    city          : string;
    address       : string;
    address2?     : string;
    zip           : string;
    phone         : string;
    email         : string;
}