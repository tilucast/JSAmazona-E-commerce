import {Document} from 'mongoose'

export interface UserInterface{
    _id: string,
    name: string,
    email: string,
    isAdmin: boolean
}

export interface IUserSchema extends Document {
    name: string
    email: string
    password: string
    isAdmin: boolean
}