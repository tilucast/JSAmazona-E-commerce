import Rating from '../components/Rating'
import {api} from '../utils/api.js'

export default class HomeScreen{

    static afterRender(){

    }

    static async render (){

        const fetchData = await api.get('/api/products')
       
        const data = fetchData.data

        return `

            <article class="products">
                ${data.map(({_id, name, category, image, price, 
                    brand, rating, numReviews, countInStock}) => `
                    <div class="products__product">

                        <a class="products__product--imageDetails" href="src/#/product/${_id}">
                            <img src="${image}" alt="${name}" />
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
}