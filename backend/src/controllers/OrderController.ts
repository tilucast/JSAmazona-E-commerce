import {Request, Response} from 'express'
import OrderModel from '../models/OrderModel'
import config from '../utils/config'
import OrdersView from '../views/OrdersView'
import mongoose from 'mongoose'

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

            return response.status(400).json({message: error})
        }
    }

    async update(request: Request, response: Response){
        const {_id} = request.params
        const {orderItems} = request.body

        try{

            const updatedOrder = await OrderModel.updateOne(
                {_id}, {orderItems}
            )

            return response.status(201).json(updatedOrder)
        
        }catch(error){
            console.error(error)

            return response.status(400).json({message: error})
        }
    }

    async show(request: Request, response: Response){
        const {id} = request.headers

        try{

            const orders = await OrderModel.find({user: id})
            
            return response.status(200).json(OrdersView.renderMany(orders))

        }catch(error){
            console.error(error)

            return response.status(400).json({message: error})
        }
    }

    async index(request: Request, response: Response){
        try{

            const order = await OrderModel.findById(request.params.id)

            return response.status(200).json(OrdersView.render(order!))
            
        }catch(error){
            console.error(error)

            return response.status(400).json({message: error})
        }
    }

    async paypal(request: Request, response: Response){
        return response.status(200).json({clientId: config.PAYPAL_SECRET})
    }

    async getOrders(request: Request, response: Response){
    
        try{

            const orders = await OrderModel.find()
            
            return response.status(200).json(OrdersView.renderMany(orders))

        }catch(error){
            console.error(error)

            return response.status(400).json({message: error})
        }
    }
}