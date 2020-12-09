import mongoose, {Schema} from 'mongoose'
import { IOrderSchema } from './OrderInterface'

const OrderSchema = new Schema({

    orderItems: [
        {
            name: {type: String, required: true},
            image: {type: String, required: true},
            price: {type: Number, required: true},
            category: {type: String, required: true},
            qty: {type: Number, required: true},
            product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
        }
    ],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    shipping: {
        address: {type: String, required: true},
        city: {type: String, required: true},
        postalCode: {type: String, required: true},
        country: {type: String, required: true}
    },
    payment: {
        paymentMethod: {type: String, required: true},
        /* paymentResult: {
            orderID: {type: String, required: true},
            payerID: {type: String, required: true},
            paymentID: {type: String, required: true}
        } */
    },
    itemsPrice: {type: Number, required: true},
    taxPrice: {type: Number, required: true},
    shippingPrice: {type: Number, required: true},
    totalPrice: {type: Number, required: true},
    isPaid: {type: Boolean, required: true, default: false},
    paidAt: Date,
    isDelivered: {type: Boolean, required: true, default: false},
    deliveredAt: Date,
    createdAt: Date, 
    updatedAt: Date

}, {timestamps: true})

const OrderModel = mongoose.model<IOrderSchema>('Order', OrderSchema)

export default OrderModel