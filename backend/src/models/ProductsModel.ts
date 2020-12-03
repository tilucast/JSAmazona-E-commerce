import mongoose, {Schema} from 'mongoose'
import { IProductsSchema } from './ProductsInterface'

const ProductsSchema = new Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    brand: {type: String, required: true},
    rating: {type: Number, required: true},
    numReviews: {type: Number, required: true},
    countInStock: {type: Number, required: true},
})

const ProductsModel = mongoose.model<IProductsSchema>('Products', ProductsSchema)

export default ProductsModel