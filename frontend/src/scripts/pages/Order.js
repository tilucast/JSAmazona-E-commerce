import {parseRequestUrl} from '../utils/parseRequestUrl'
import {api} from '../utils/api'
import { redirectUnauthenticatedUser } from '../utils/protectedRoute'
import { getLocalStorageItem } from '../utils/localStorageRequests'
import History from '../utils/History'
import { capitalize, reduceStringLength } from '../utils/stringMethods'
import changeMainComponentGridLayout from '../utils/changeMainComponent'
//import {format} from 'date-fns'

const history = new History()

export default class Order{
    constructor(){}

    get url(){
        return parseRequestUrl()
    }

    get signedUserInfo(){
        return getLocalStorageItem("signedUserInfo")
    }

    async orderData(){
        try{

            const {data: 
                {
                    shipping, payment, isPaid, 
                    isDelivered, _id, itemsPrice, orderItems,
                    shippingPrice, taxPrice, totalPrice, user, createdAt, updatedAt
                }
            } = await api.get(`/api/orders/${this.url.id}`, 
                {headers: {'auth-token': this.signedUserInfo.token}
            })

            if(user != this.signedUserInfo._id) history.push("/")

            return {
                shipping, payment, isPaid, isDelivered, _id, 
                itemsPrice, orderItems, shippingPrice, taxPrice, 
                totalPrice, user, createdAt, updatedAt
            }

        }catch(error){
            console.error(error.response)
        }
    }

    async afterRender(){

    }

    async render(){

        redirectUnauthenticatedUser()

        changeMainComponentGridLayout()

        this.afterRender()

        const {
            shipping, payment, isPaid, isDelivered, _id, 
            itemsPrice, orderItems, shippingPrice, taxPrice, 
            totalPrice, user, createdAt, updatedAt
        } = await this.orderData()

        return `

        <section class="order">
            <article>
                <span class="generalContentTitle">Shipping</span>

                <div>
                    ${shipping && 
                        `
                            <span>${shipping.address}</span>
                            <span>${shipping.city}</span>
                            <span>${shipping.postalCode}</span>
                            <span>${shipping.country}</span>
                        `
                    }
                </div>
            </article>

            <article>
                <span class="generalContentTitle">Payment</span>

                <span class="paymentMethod">Payment Method: ${
                    payment.paymentMethod === 'paypal' ? `<img class="paymentMethod__paypal" src="./images/paypal.png"></img>` :
                    capitalize(payment.paymentMethod) || ""
                }</span>
                <span>Is payed: ${
                    isPaid ? `
                        <span class="material-icons success">
                            done_all
                        </span>
                    ` 
                    : `
                        <span class="material-icons error">
                            close
                        </span>
                    `
                }</span>
                <span>Is delivered: ${
                    isDelivered ? `
                        <span class="material-icons success">
                            done_all
                        </span>
                    ` 
                    : `
                        <span class="material-icons error">
                            close
                        </span>
                    `
                }</span>
                <span>Order created at: ${new Date(createdAt)}</span>
            </article>

            <article class="">
                <span class="generalContentTitle">Order Summary</span>
                
                <article>
                    <span>Items:</span> <span><strong>R$${itemsPrice}</strong></span>
                </article>

                <article>
                    <span>Shipping:</span> <span><strong>R$${shippingPrice}</strong></span>
                </article>

                <article>
                    <span>Tax:</span> <span><strong>R$${taxPrice}</strong></span>
                </article>

                <article class="generalImportantMessage">
                    <span>Order Total:</span> <span>R$${totalPrice}</span>
                </article>

            </article>

            <article class="">

                <article>
                    <span class="generalContentTitle">Shopping Cart</span>
                    <span>Price</span>
                </article>
                
                ${orderItems.map(item => 
                    `
                        <div class="order__product">
                            
                                    <img src="http://localhost:3000/uploads/${item.image}" alt="${reduceStringLength(item.name, item.name.length / 2)}" />
                                

                            <div class="holder">

                                <div class="order__product--info">
                                    <span>
                                        <a href="src/#/product/${item.product}">
                                            ${item.name.length > 50 ? reduceStringLength(item.name, item.name.length / 2) : item.name}
                                        </a>
                                    </span>
                                    <span><strong>$${item.price}</strong></span>
                                </div>

                                <span class=""><strong>Qty: ${item.qty}</strong></span>

                            </div>

                        </div>

                    `
                    ).join(" ")}

            </article>
        </section>
        `
    }
}