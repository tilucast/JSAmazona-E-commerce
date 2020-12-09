import mongoose, {Document} from 'mongoose'

export interface IOrderSchema extends Document{
    orderItems: {
            name: string,
            image: string,
            price: number,
            category: string,
            qty: number,
            product: mongoose.Schema.Types.ObjectId
    }[],
    user: mongoose.Schema.Types.ObjectId | string | string[] | undefined,
    shipping: {
        address:  string,
        city:  string,
        postalCode:  string,
        country:  string,    
    },
    payment: {
        paymentMethod:  string,
        /* paymentResult: {
            orderID:  string,
            payerID:  string,
            paymentID:  string,        
        } */
    },
    itemsPrice: number,
    taxPrice: number,
    shippingPrice: number,
    totalPrice: number,
    isPaid: boolean,
    paidAt: Date,
    isDelivered: boolean,
    deliveredAt: Date,
    createdAt: Date, 
    updatedAt: Date
}

export interface OrderInterface{
    orderItems: {
            name: string,
            image: string,
            price: number,
            category: string,
            qty: number,
            product: string
    }[],
    user: string,
    shipping: {
        address:  string,
        city:  string,
        postalCode:  string,
        country:  string,    
    },
    payment: {
        paymentMethod:  string,
        /* paymentResult: {
            orderID:  string,
            payerID:  string,
            paymentID:  string,        
        } */
    },
    itemsPrice: number,
    taxPrice: number,
    shippingPrice: number,
    totalPrice: number,
    isPaid: boolean,
    paidAt: Date,
    isDelivered: boolean,
    deliveredAt: Date,
    createdAt: Date, 
    updatedAt: Date
}