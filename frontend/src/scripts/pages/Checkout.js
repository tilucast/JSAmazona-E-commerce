import Dialog from "../components/Dialog"
import History from "../utils/History"
import { getLocalStorageItem, setLocalStorageItem } from "../utils/localStorageRequests"
import { initiateMaterialMultipleButtons, initiateMaterialRadioButtons, initiateMaterialTabs, initiateMaterialTextField } from "../utils/materialIoScripts"
import {redirectUnauthenticatedUser} from "../utils/protectedRoute"
import {capitalize, reduceStringLength} from '../utils/stringMethods'

const history = new History()

export default class Checkout{

    constructor(){}

    get shippingInfo(){
        return getLocalStorageItem("shippingInfo") || ""
    }

    get paymentInfo(){
        return getLocalStorageItem("paymentOption") || ""
    }

    get cartItems(){
        return getLocalStorageItem("cartItems") || []
    }
    
    renderShippingIntoHTML(){
        const placeorder = document.querySelector("#rerenderPlaceholder")

        return placeorder.innerHTML = `
            <article>
                <span class="generalContentTitle">Shipping</span>

                <div>
                    <span>${this.shippingInfo.address}</span>
                    <span>${this.shippingInfo.city}</span>
                    <span>${this.shippingInfo.postalCode}</span>
                    <span>${this.shippingInfo.country}</span>
                </div>
            </article>

            <article>
                <span class="generalContentTitle">Payment</span>

                <span>Payment Method: ${capitalize(this.paymentInfo)}</span>
            </article>
        `
    }

    handleChangeMaterialCurrentActiveTab(materialTab, tabIndex){
        materialTab.foundation.adapter.setActiveTab(tabIndex)
        materialTab.foundation.adapter.activateTabAtIndex(tabIndex)
        materialTab.foundation.adapter.notifyTabActivated(tabIndex)
    }

    handleActivateMaterialTabs(materialTab){

        const sections = Array.from(document.querySelectorAll(".checkout-section"))

        materialTab.listen("MDCTabBar:activated", (event) => {

            sections.forEach(section => {
                
                if(section.id == event.detail.index){
                    section.classList.remove("desactivate")
                } else{
                    section.classList.add("desactivate")
                }

            })

            this.renderShippingIntoHTML()

        })

        if(this.shippingInfo){
            this.handleChangeMaterialCurrentActiveTab(materialTab, 1)
        }
        
        if(this.shippingInfo && this.paymentInfo){
            this.handleChangeMaterialCurrentActiveTab(materialTab, 2)
        }

    }

    handleFinishPlaceOrder(){
        const placeOrderButton = document.querySelector("#placeOrder")
        
        placeOrderButton.addEventListener("click", () => {
            if(!this.shippingInfo && !this.paymentInfo) return Dialog.instantiateMaterialDialog().open()
        })
    }

    handleFormsValues(materialTab){
        const forms = Array.from(document.querySelectorAll("form"))

        forms[0].addEventListener("submit", (event) => {
            event.preventDefault()

            const shippingInfo = {
                address: forms[0].elements[0].value,
                city: forms[0].elements[1].value,
                postalCode: forms[0].elements[2].value,
                country: forms[0].elements[3].value
            }

            setLocalStorageItem("shippingInfo", shippingInfo)
            this.handleChangeMaterialCurrentActiveTab(materialTab, 1)
        })

        forms[1].addEventListener("submit", (event) => {
            event.preventDefault()

            const firstRadioButton = forms[1].elements[0]
            const secondRadioButton = forms[1].elements[1]

            setLocalStorageItem("paymentOption", firstRadioButton.checked ? firstRadioButton.value : secondRadioButton.value)
            this.handleChangeMaterialCurrentActiveTab(materialTab, 2)
        })
    }

    afterRender(){

        initiateMaterialMultipleButtons()
        initiateMaterialTextField()
        const materialTab = initiateMaterialTabs()

        const [form, radios] = initiateMaterialRadioButtons()

        this.handleActivateMaterialTabs(materialTab)

        this.handleFormsValues(materialTab)

        this.handleFinishPlaceOrder()

        Dialog.insertMaterialDialogIntoDOM(
            document.querySelector("#dialogContainer"),
            "Please, fill shipping and payment informations",
            1,
            "Okay"
        )
    }

    render(){

        redirectUnauthenticatedUser()

        if(this.cartItems.length === 0) history.push("/cart")

        const sumOfItems = Number(this.cartItems.reduce((acc, value) => acc + value.price * value.qty, 0).toFixed(2))
        const shippingPrice = Number(sumOfItems > 150 ? 10 : 25)
        const taxPrice = Number((sumOfItems * 5.5 / 100).toFixed(2))
        const totalOrderPrice = (sumOfItems + shippingPrice + taxPrice).toFixed(2)
        
        
        return `
            <section class="checkout">
            
                <div class="mdc-tab-bar" role="tablist">
                    <div class="mdc-tab-scroller">
                        <div class="mdc-tab-scroller__scroll-area">
                            <div class="mdc-tab-scroller__scroll-content">

                                <button class="mdc-tab mdc-tab--active" role="tab" aria-selected="true" tabindex="0">
                                    <span class="mdc-tab__content">
                                        <span class="mdc-tab__text-label">Shipping</span>
                                    </span>
                                    <span class="mdc-tab-indicator mdc-tab-indicator--active">
                                        <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                                    </span>
                                    <span class="mdc-tab__ripple"></span>
                                </button>

                                <button class="mdc-tab mdc-tab--active" role="tab" tabindex="1">
                                    <span class="mdc-tab__content">
                                        <span class="mdc-tab__text-label">Payment</span>
                                    </span>
                                    <span class="mdc-tab-indicator">
                                        <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                                    </span>
                                    <span class="mdc-tab__ripple"></span>
                                </button>

                                <button class="mdc-tab mdc-tab--active" role="tab" tabindex="2">
                                    <span class="mdc-tab__content">
                                        <span class="mdc-tab__text-label">Place Order</span>
                                    </span>
                                    <span class="mdc-tab-indicator">
                                        <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                                    </span>
                                    <span class="mdc-tab__ripple"></span>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>

                <container id="container" class="checkout__container">

                    <section id="0" class="checkout__container--shipping checkout-section">

                        <form id="shippingForm" class="shippingForm">

                            <span class="generalContentTitle">Shipping</span>

                            <label class="mdc-text-field mdc-text-field--outlined">
                                <span class="mdc-notched-outline">
                                    <span class="mdc-notched-outline__leading"></span>
                                    <span class="mdc-notched-outline__notch">
                                    <span class="mdc-floating-label" id="my-label-id">Address</span>
                                    </span>
                                    <span class="mdc-notched-outline__trailing"></span>
                                </span>
                                <input 
                                    type="text" required 
                                    class="mdc-text-field__input"
                                    value="${this.shippingInfo.address}"
                                    aria-labelledby="my-label-id"
                                    aria-describedby="address-helper-text"
                                    aria-controls="address-helper-text"
                                >
                            </label>
                            <div class="mdc-text-field-helper-line">
                                <div 
                                    id="address-helper-text" 
                                    class="mdc-text-field-helper-text" 
                                    aria-hidden="true"
                                >
                                    Type a valid address.
                                </div>
                            </div>

                            <label class="mdc-text-field mdc-text-field--outlined">
                                <span class="mdc-notched-outline">
                                    <span class="mdc-notched-outline__leading"></span>
                                    <span class="mdc-notched-outline__notch">
                                    <span class="mdc-floating-label" id="my-label-id">City</span>
                                    </span>
                                    <span class="mdc-notched-outline__trailing"></span>
                                </span>
                                <input 
                                    type="text"
                                    id="city"
                                    value="${this.shippingInfo.city}"
                                    required 
                                    class="mdc-text-field__input" 
                                    aria-labelledby="my-label-id"
                                    aria-describedby="city-helper-text"
                                    aria-controls="city-helper-text"
                                >
                            </label>
                            <div class="mdc-text-field-helper-line">
                                <div 
                                    id="password-helper-text" 
                                    class="mdc-text-field-helper-text" 
                                    aria-hidden="true"
                                >
                                    Enter the shipping city.
                                </div>
                            </div>

                            <label class="mdc-text-field mdc-text-field--outlined">
                                <span class="mdc-notched-outline">
                                    <span class="mdc-notched-outline__leading"></span>
                                    <span class="mdc-notched-outline__notch">
                                    <span class="mdc-floating-label" id="my-label-id">Postal Code</span>
                                    </span>
                                    <span class="mdc-notched-outline__trailing"></span>
                                </span>
                                <input 
                                    type="text"
                                    id="postalCode"
                                    value="${this.shippingInfo.postalCode}"
                                    required 
                                    class="mdc-text-field__input" 
                                    aria-labelledby="my-label-id"
                                    aria-describedby="postalcode-helper-text"
                                    aria-controls="postalcode-helper-text"
                                >
                            </label>
                            <div class="mdc-text-field-helper-line">
                                <div 
                                    id="postalcode-helper-text" 
                                    class="mdc-text-field-helper-text" 
                                    aria-hidden="true"
                                >
                                    Enter shipping address postal code.
                                </div>
                            </div>

                            <label class="mdc-text-field mdc-text-field--outlined">
                                <span class="mdc-notched-outline">
                                    <span class="mdc-notched-outline__leading"></span>
                                    <span class="mdc-notched-outline__notch">
                                    <span class="mdc-floating-label" id="my-label-id">Country</span>
                                    </span>
                                    <span class="mdc-notched-outline__trailing"></span>
                                </span>
                                <input 
                                    type="text"
                                    id="country"
                                    value="${this.shippingInfo.country}"
                                    required 
                                    class="mdc-text-field__input" 
                                    aria-labelledby="my-label-id"
                                    aria-describedby="country-helper-text"
                                    aria-controls="country-helper-text"
                                >
                            </label>
                            <div class="mdc-text-field-helper-line">
                                <div 
                                    id="country-helper-text" 
                                    class="mdc-text-field-helper-text" 
                                    aria-hidden="true"
                                >
                                    Enter the shipping address country.
                                </div>
                            </div>
                            

                            <button type="submit" id="shippingButton" class="mdc-button mdc-button--raised">
                                <div class="mdc-button__ripple"></div>  
                                <span class="mdc-button__label">Continue</span>
                            </button>

                        </form>

                    </section>

                    <section id="1" class="checkout__container--paymentOptions checkout-section desactivate">

                        <span class="generalContentTitle">Payment</span>

                        <form id="paymentForm" class="paymentForm">
                            
                            <div class="mdc-form-field">
                                <div class="mdc-radio mdc-radio--touch">
                                    <input 
                                        class="mdc-radio__native-control" 
                                        value="stripe" 
                                        type="radio"
                                        required
                                        id="radio-1" 
                                        name="radios" 
                                        ${this.paymentInfo === "stripe" ? "checked" : false}
                                    >
                                    <div class="mdc-radio__background">
                                        <div class="mdc-radio__outer-circle"></div>
                                        <div class="mdc-radio__inner-circle"></div>
                                    </div>
                                    <div class="mdc-radio__ripple"></div>
                                    <label for="radio-1">Stripe</label>
                                </div>
                                

                                <div class="mdc-radio mdc-radio--touch">
                                    <input 
                                        class="mdc-radio__native-control" 
                                        value="paypal" 
                                        type="radio"
                                        required
                                        id="radio-2" 
                                        name="radios"
                                        ${this.paymentInfo === "paypal" ? "checked" : false}
                                    >
                                    <div class="mdc-radio__background">
                                        <div class="mdc-radio__outer-circle"></div>
                                        <div class="mdc-radio__inner-circle"></div>
                                    </div>
                                    <div class="mdc-radio__ripple"></div>
                                    <label for="radio-2">Paypal</label>
                                </div>
                                
                            </div>

                            <button type="submit" id="shippingButton" class="mdc-button mdc-button--raised">
                                <div class="mdc-button__ripple"></div>  
                                <span class="mdc-button__label">Continue</span>
                            </button>

                        </form>

                    </section>

                    <section id="2" class="checkout__container--placeOrder checkout-section desactivate">

                        <div class="holderDiv">

                            <div class="shippingInfo">

                                <section id="rerenderPlaceholder">

                                </section>

                                <article class="shippingInfo__shoppingCartList">

                                    <article>
                                        <span class="generalContentTitle">Shopping Cart</span>
                                        <span>Price</span>
                                    </article>
                                    
                                    ${this.cartItems.map(item => 
                                        `
                                            <div class="shippingInfo__shoppingCartList--product">
                                                <img src="${item.image}" alt="${item.name}" />

                                                <div class="holder">

                                                    <div class="productInfo">
                                                        <span>
                                                            <a href="src/#/product/${item.product}">
                                                                ${item.name.length > 50 ? reduceStringLength(item.name, item.name.length / 2) : item.name}
                                                            </a>
                                                        </span>
                                                        <span><strong>$${item.price}</strong></span>
                                                    </div>

                                                    <span class="quantity">Qty: ${item.qty}</span>

                                                </div>

                                            </div>

                                        `
                                        ).join(" ")}

                                </article>

                            </div>

                            <div class="placeOrderInfo">
                                <span class="generalContentTitle">Order Summary</span>
                                
                                <article>
                                    <span>Items:</span> <span>R$${sumOfItems}</span>
                                </article>

                                <article>
                                    <span>Shipping:</span> <span>R$${shippingPrice}</span>
                                </article>

                                <article>
                                    <span>Tax:</span> <span>R$${taxPrice}</span>
                                </article>

                                <article class="generalImportantMessage">
                                    <span>Order Total:</span> <span>R$${totalOrderPrice}</span>
                                </article>

                                <button type="button" id="placeOrder" class="mdc-button mdc-button--raised">
                                    <div class="mdc-button__ripple"></div>  
                                    <span class="mdc-button__label">Place Order</span>
                                </button>
                            </div>

                        </div>

                    </section>

                </container>

            </section>

            <article id="dialogContainer">
            
            </article>
        `
    }
}