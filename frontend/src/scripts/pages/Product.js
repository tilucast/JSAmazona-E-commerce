import {parseRequestUrl} from '../utils/parseRequestUrl.js'
import { getProduct } from '../utils/serverRequests.js'
import Rating from '../components/Rating.js'
import { initiateMaterialButton } from '../utils/materialIoScripts.js'

export default class Product{

    static afterRender(){

        const parseRequest = parseRequestUrl()

        initiateMaterialButton()

        document.querySelector('#cartButton').addEventListener('click', () => {
            document.location.hash = `/cart/${parseRequest.id}`
        })

    }

    static async render() {    

        try{

            const request = parseRequestUrl()

            const product = await getProduct(request.id)

            return `

                <section class="mainContent__singleProduct" >

                    <div class="mainContent__singleProduct--goBack">
                        <a href="/src/#">
                            <span class="material-icons">
                            
                                first_page
                            </span>

                            Voltar
                        </a>
                    </div>

                    <div class="container">
                        <img src="${product.image}"></img>
                        

                        <div class="mainContent__singleProduct--productInfo">
                            <span class="mainContent__singleProduct--productInfo-productName">${product.name}</span>

                            ${Rating.render({numOfStars: product.rating, textStar: `${product.numReviews} reviews`})}

                            <span class="mainContent__singleProduct--productInfo-productPrice">
                                Price: <strong>$${product.price}</strong>
                            </span>

                            <span>Description: <strong>${product.description}</strong></span>
                        </div>

                        <div class="mainContent__singleProduct--cart">
                            <span>Price: <strong>$${product.price}</strong></span>
                            <span>Status: <strong>${product.countInStock > 0 ? 'In Stock' : 'Not in stock'}</strong></span>

                            <button id="cartButton" class="mdc-button mdc-button--raised">
                                <div class="mdc-button__ripple"></div>  
                                <span class="material-icons">
                                    shopping_cart
                                </span>
                                <span class="mdc-button__label">Add to cart</span>
                            </button>
                        </div>
                    </div>

                </section>

            `

        }catch(error){
            return `<h1>${error.message}</h1>`
        }

    }
}