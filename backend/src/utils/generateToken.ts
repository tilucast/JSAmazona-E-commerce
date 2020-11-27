import jwt from 'jsonwebtoken'
import { UserInterface } from '../models/UserInterface'
import config from './config'

export default function generateToken({_id, name, email, isAdmin}: UserInterface){
    return jwt.sign({
        _id,
        name,
        email,
        isAdmin
    },
    config.JWT_SECRET
    )
}