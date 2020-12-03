import {Request, Response} from 'express'
import OrderModel from '../models/OrderModel'
import config from '../utils/config'

export default class OrderController{
    
    async create(request: Request, response: Response){

        const {orderItems, user, shipping, payment, 
            itemsPrice, shippingPrice, taxPrice, totalPrice
        } = request.body

        try{

            const createdOrder = new OrderModel(request.body)

            const save = await createdOrder.save()

            return response.status(201).json(save)
        
        }catch(error){
            console.error(error)

            return response.status(401).json({message: error})
        }
    }

    async show(request: Request, response: Response){
        try{

            const orders = await OrderModel.find()

            return response.status(200).json(orders)
            
        }catch(error){
            console.error(error)

            return response.status(401).json({message: error})
        }
    }

    async index(request: Request, response: Response){
        try{

            const orders = await OrderModel.findById(request.params.id)

            return response.status(200).json(orders)
            
        }catch(error){
            console.error(error)

            return response.status(401).json({message: error})
        }
    }

    async paypal(request: Request, response: Response){
        return response.status(200).json({clientId: config.PAYPAL_SECRET})
    }
}