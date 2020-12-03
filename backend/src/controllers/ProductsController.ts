import {Request, Response} from 'express'
import productsView from '../views/ProductsView'
import ProductsModel from '../models/ProductsModel'

export default class ProductsController{
    
    async index(request: Request, response: Response){
        try{

            const productsResponse = await ProductsModel.find()

            return response.status(201).json(productsView.renderMany(productsResponse))

        }catch(error){
            return response.status(401).json({message: error})
        }
    }

    async show(request: Request, response: Response){
        try{

            const productResponse = await ProductsModel.findById(request.params.id)

            return response.status(201).json(productsView.render(productResponse!))

        }catch(error){
            return response.status(401).json({message: error})
        }
    }

    async create(request: Request, response: Response){
        

        try{

            const product = new ProductsModel(request.body)

            const result = product.save()

            return response.status(201).json(result)

        }catch(error){
            return response.status(401).json({message: error})
        }
    }
}