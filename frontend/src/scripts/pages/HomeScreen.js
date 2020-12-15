import Rating from '../components/Rating'
import {api} from '../utils/api.js'
import changeMainComponentGridLayout from '../utils/changeMainComponent'
import { getDataFromLocalStorage } from '../utils/localStorageRequests'

export default class HomeScreen{

    constructor(){}

    async products(){
        return await api.get('/api/products')
    }

    async renderProducts(data){
        const productsPlaceholder = document.getElementById("productsPlaceholder")

        return productsPlaceholder.innerHTML = `
            <article class="products">
                ${data.map(({_id, name, category, image, price, 
                    brand, rating, numReviews, countInStock}) => `
                    <div class="products__product">

                        <a class="products__product--imageDetails" href="src/#/product/${_id}">
                            <img src="http://localhost:3000/uploads/${image}" alt="${name}" />
                        </a>

                        <a class="products__product--productName" href="src/#/product/${_id}">${name}</a>

                        <span>
                            ${Rating.render({numOfStars: rating, textStar: `${numReviews} reviews`})}
                        </span>

                        <span class="products__product--brandName">
                            ${brand}
                        </span>

                        <span class="products__product--productPrice">
                            $${price}
                        </span>

                    </div>
                `).join(' ')}
            </article>
        `
    }

    async searchbarValue(value){
        const {data} = await this.products()

        const products = data.filter(product => {
            const regex = new RegExp(value, 'i')

            return regex.test(product.name) ? product.name : ""
        })

        return products
    }

    async afterRender(){

        let {data} = await this.products()

        this.renderProducts(data)

        const input = document.querySelector("input")
        input.addEventListener("input", async () => {
            const productsFound = await this.searchbarValue(getDataFromLocalStorage("inputValue"))

            this.renderProducts(productsFound)
        })
        
    }

    async render (){

        changeMainComponentGridLayout()

        this.afterRender()

        return `
            <section id="productsPlaceholder"></section>
            
        `
    }
}