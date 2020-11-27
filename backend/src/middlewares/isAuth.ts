import {Request, Response, NextFunction, RequestHandler, } from 'express'
import jwt from 'jsonwebtoken'
import config from '../utils/config'

export default function isAuth(request: Request, response: Response, next: NextFunction){
    const token = request.header('auth-token')

    if(!token) return response.status(401).json({message: "Access denied."})

    try{

        const verifyToken = jwt.verify(token, config.JWT_SECRET)

        request.user = verifyToken

        next()

    }catch(error){
        return response.status(401).json({message: "Invalid token."})
    }
}