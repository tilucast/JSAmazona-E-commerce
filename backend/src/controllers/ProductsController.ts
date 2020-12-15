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

        const {name, category, brand, price, countInStock, rating, numReviews} = request.body
        
        try{

            const path = request.file as Express.Multer.File

            let image = path.filename

            const product = new ProductsModel(
                {name, category, price, brand, countInStock, rating, numReviews, image}
            )

            const result = product.save()

            return response.status(201).json(result)

        }catch(error){
            return response.status(401).json({message: error})
        }
    }

    async delete(request: Request, response: Response){
        try{

            const deleted = await ProductsModel.deleteOne({_id: request.params._id})

            return response.status(201).json(deleted)

        }catch(error){
            return response.status(400).json({message: error})
        }
    }

    async update(request: Request, response: Response){
        const {rating, numReviews} = request.body

        try{

            const updated = await ProductsModel.updateOne({_id: request.params._id}, {rating, numReviews})

            return response.status(201).json(updated)

        }catch(error){
            return response.status(401).json({message: error})
        }
    }
}