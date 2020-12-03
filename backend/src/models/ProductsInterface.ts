import mongoose, {Document} from 'mongoose'

export interface ProductsInterface{
    _id: number | string,
    name: string,
    category: string,
    image: string,
    price: number,
    brand: string,
    rating: number,
    numReviews: number,
    countInStock: number
}

export interface IProductsSchema extends Document{
    name:  string,
    category:  string,
    image:  string,
    price:  number,
    brand:  string,
    rating:  number,
    numReviews:  number,
    countInStock:  number,
}