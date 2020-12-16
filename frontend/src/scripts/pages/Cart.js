import { initiateMaterialMultipleButtons, initiateMaterialSelect} from '../utils/materialIoScripts.js'
import {parseRequestUrl} from '../utils/parseRequestUrl.js'
import rerenderComponent from '../utils/rerenderComponent.js'
import {getLocalStorageItem, setLocalStorageItem} from '../utils/localStorageRequests.js'
import History from '../utils/History.js'
import { reduceStringLength } from '../utils/stringMethods.js'
import { api } from "../utils/api"
import changeMainComponentGridLayout from '../utils/changeMainComponent.js'

const history = new History()

export default class Cart{

    constructor(){}

    get cartItems(){
        return getLocalStorageItem("cartItems") || []
    }

    get productId(){
        return parseRequestUrl()
    }

    async getProduct(id){
        
        try{
            const response = await api.get(`/api/products/${id}`)
    
            return response.data
    
        }catch(error){
            console.error(error)
            
        }
    }

    handleSelectStateChange(selects){
        selects.map((select, index) => {
            
            const cartItems = this.cartItems

            select.listen('MDCSelect:change', () => {
                
                cartItems[index].qty = Number(select.value)

                setLocalStorageItem('cartItems', cartItems)
                
                rerenderComponent(Cart, '#mainContent')
                
              });
        })
    }

    deleteProductCart(){
        const buttons = Array.from(document.querySelectorAll("#cartButton"))

        buttons.forEach(button => {
            button.addEventListener('click', (event) => {

                let cartItems = this.cartItems

                const filteredCart = cartItems.filter(product => {
                   return product.product !== String(button.dataset.value)
                })

                filteredCart.length === 0 ? localStorage.removeItem('cartItems') 
                    : setLocalStorageItem('cartItems', filteredCart) 
                
                if(parseRequestUrl().id == button.dataset.value){
                    history.push('/cart')
                } else{
                    rerenderComponent(Cart, "#mainContent")
                }
                
            })
        })
    }

    sumOfItems(){

        return this.cartItems.reduce((acc, value) => acc + value.price * value.qty, 0).toFixed(2)
        
    }

    addToCart(item, forceUpdate = false){

        let cartItems = this.cartItems

        const checkForItem = cartItems.find(value => value.product === item.product)

        if(checkForItem) {

            /* cartItems = cartItems.map(value => 
                value.product === checkForItem.product ? item : value) */

        } else{
            cartItems = [...cartItems, item]
        }

        setLocalStorageItem("cartItems", cartItems)
    }

    afterRender(){
        
        const selects = initiateMaterialSelect()

        initiateMaterialMultipleButtons()
        
        this.handleSelectStateChange(selects)

        this.deleteProductCart()

        const checkoutButton = document.querySelector('#checkoutButton')
        
        checkoutButton && checkoutButton.addEventListener('click', () => {

            if(getLocalStorageItem("signedUserInfo")){
                return history.push("/checkout")
            } else{
                setLocalStorageItem("redirectToPage", "/checkout")
                return history.push('/signin')
            }
            
        })
    }

    async render(){

        changeMainComponentGridLayout()

        if(this.productId.id){
            const {_id, name, image, price, category, countInStock} = await this.getProduct(this.productId.id)

            this.addToCart({
                product: _id,
                name,
                image,
                category,
                price,
                countInStock,
                qty: 1
            })

        }

        return `
            <section class="productsCart">

                <div class="productsCart__productsList">
                    <article>
                        <h2>Shopping Cart</h2>
                        <span>Price</span>
                    </article>

                    ${this.cartItems.length ? 
                        this.cartItems.map(item => 
                            `
                                <div class="productsCart__productsList--product">
                                    <img src="http://localhost:3000/uploads/${item.image}" alt="${item.name}" />

                                    <div class="holder">

                                        <div class="productInfo">
                                            <span>
                                                <a href="src/#/product/${item.product}">
                                                    ${item.name.length > 50 ? reduceStringLength(item.name, item.name.length / 2) : item.name}
                                                </a>
                                            </span>
                                            <span><strong>$${item.price}</strong></span>
                                        </div>

                                        <section class="quantity">

                                            <div class="mdc-select mdc-select--filled demo-width-class">
                                                <div class="mdc-select__anchor">
                                                    <span class="mdc-select__ripple"></span>
                                                    <span class="mdc-floating-label mdc-floating-label--float-above">Qty</span>
                                                    <span class="mdc-select__selected-text-container">
                                                    <span id="quantityChange" class="mdc-select__selected-text">${item.qty}</span>
                                                    </span>
                                                    <span class="mdc-select__dropdown-icon">
                                                    <svg
                                                        class="mdc-select__dropdown-icon-graphic"
                                                        viewBox="7 10 10 5" focusable="false">
                                                        <polygon
                                                            class="mdc-select__dropdown-icon-inactive"
                                                            stroke="none"
                                                            fill-rule="evenodd"
                                                            points="7 10 12 15 17 10">
                                                        </polygon>
                                                        <polygon
                                                            class="mdc-select__dropdown-icon-active"
                                                            stroke="none"
                                                            fill-rule="evenodd"
                                                            points="7 15 12 10 17 15">
                                                        </polygon>
                                                    </svg>
                                                    </span>
                                                    <span class="mdc-line-ripple"></span>
                                                </div>

                                                <div class="mdc-select__menu demo-width-class mdc-menu mdc-menu-surface">
                                                    <ul class="mdc-list">
                                                    ${[1,2,3].map((value, index) => `
                                                        <li 
                                                            class="${item.qty === value ? 'mdc-list-item mdc-list-item--selected' : 'mdc-list-item'}" 
                                                            data-value="${value}"
                                                        >
                                                            <span class="mdc-list-item__ripple"></span>
                                                            <span class="mdc-list-item__text">${value}</span>
                                                        </li>
                                                        
                                                    `).join(' ')}
                                                        
                                                    </ul>
                                                </div>
                                            </div>
                                        
                                            <button id="cartButton" class="mdc-button mdc-button--raised" data-value="${item.product}">
                                                <div class="mdc-button__ripple"></div>  
                                                
                                                <span class="mdc-button__label">Delete</span>
                                            </button>

                                        </section>

                                    </div>

                                </div>
                            `
                        ).join(' ') : '<h3>Cart is empty /:</h3>'}
                </div>

                ${this.cartItems.length ?
                    `
                        <div class="productsCart__checkout">

                            <span>
                                Total: (${this.cartItems.reduce((acc, value) => acc + value.qty, 0)}) 
                                item(s): <strong>$${this.sumOfItems()}</strong>
                            </span>

                            <button id="checkoutButton" class="mdc-button mdc-button--raised">
                                <div class="mdc-button__ripple"></div>  
                                <span class="material-icons">
                                    shopping_cart
                                </span>
                                <span class="mdc-button__label">Proceed to checkout</span>
                            </button>

                        </div>
                    `
                : ''}
                
            </section>
        `
    }
}