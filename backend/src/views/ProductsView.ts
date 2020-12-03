import {IProductsSchema} from '../models/ProductsInterface'

export default {
    render({_id, name, category, image, price, brand, rating, numReviews, countInStock}: IProductsSchema){
        return {
            _id, name, category, image, price,
            brand, rating, numReviews, countInStock
        }
    },

    renderMany(products: IProductsSchema[]){
        return products.map(product => this.render(product))
    }
}