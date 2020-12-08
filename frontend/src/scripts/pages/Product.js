import {parseRequestUrl} from '../utils/parseRequestUrl.js'
import Rating from '../components/Rating.js'
import { initiateMaterialButton } from '../utils/materialIoScripts.js'
import History from '../utils/History.js'
import { api } from "../utils/api"
import changeMainComponentGridLayout from '../utils/changeMainComponent.js'

const history = new History()

export default class Product{

    constructor(){}

    get productId(){
        return parseRequestUrl()
    }

    async getProduct(id){
        
        try{
            const response = await api.get(`/api/products/${id}`)
    
            return response.data
    
        }catch(error){
            
            
        }
    }

    afterRender(){

        const cartButton = document.querySelector('#cartButton')

        cartButton && (initiateMaterialButton(), cartButton.addEventListener('click', () => {
            history.push(`/cart/${this.productId.id}`)
        }))

    }

    async render() {    

        changeMainComponentGridLayout()

        const product = await this.getProduct(this.productId.id)

        if(!product){
            return `<h1>Product not found :/</h1>`

        } else{
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
        }

    }
}