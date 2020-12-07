import { IOrderSchema } from "../models/OrderInterface"

export default {
    render({shipping, payment, isPaid, isDelivered, _id, 
        itemsPrice, orderItems, shippingPrice, taxPrice, 
        totalPrice, user, createdAt, updatedAt}: IOrderSchema
        ){
            return {
                shipping, payment, isPaid, isDelivered, _id, 
                itemsPrice, orderItems, shippingPrice, taxPrice, 
                totalPrice, user, createdAt, updatedAt
            }
    },

    renderMany(orders: IOrderSchema[]){
        return orders.map(order => this.render(order))
    }
}