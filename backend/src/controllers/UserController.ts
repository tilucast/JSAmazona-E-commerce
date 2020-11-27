import {Request, Response} from 'express'
import UserModel from '../models/UserModel' 
import generateToken from '../utils/generateToken'
import userView from '../views/userView'

export default class UserController{

    async signin(request: Request, response: Response){
        const {email, password} = request.body

        try{

            const signedUser = await UserModel.findOne({
                email, password
            })

            if(!signedUser?.email) return response.status(401).json({message: 'Invalid email or password.'})

            return response.status(201).json({
                _id: signedUser.id,
                name: signedUser.name,
                email: signedUser.email,
                password: signedUser.password,
                isAdmin: signedUser.isAdmin,
                token: generateToken(signedUser)
            })

        }catch(error){

            return response.status(400).json({message: error})
        }
        
    }

    async create(request: Request, response: Response){
        const {name, email, password, isAdmin} = request.body

        try{

            const user = new UserModel({
                name,
                email,
                password,
                isAdmin
            })

            const result = await user.save()

            return response.status(201).json({result})

        }catch(error){
            console.error(error)

            return response.status(400).json({message: error})
        }
    }

    async index(request: Request, response: Response){
        try{
            const {email} = request.body

            const findOneUser = await UserModel.findOne({email})

            return response.status(200).json(userView.render(findOneUser!))

        }catch(error){
            console.error(error)

            return response.status(400).json({message: error})
        }
    }

    async show(request: Request, response: Response){
        try{

            const findUsers = await UserModel.find()

            return response.status(200).json(userView.renderMany(findUsers))

        }catch(error){
            console.error(error)

            return response.status(400).json({message: error})
        }
    }

    async update(request: Request, response: Response){
        const {_id} = request.params
        const {name, password} = request.body

        try{

            const updatedUser = await UserModel.updateOne(
                {_id}, {name, password}
            )

            return response.status(200).json(updatedUser)

        }catch(error){
            console.error(error)

            return response.status(400).json({message: error})
        }
    }
}