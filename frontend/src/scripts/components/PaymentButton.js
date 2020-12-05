export default {
    
    insertButtonIntoDOM(DOMElement, buttonMessage, paymentInfo){
        return DOMElement.innerHTML =   `
            ${paymentInfo === "stripe" ? `
                <button type="button" id="placeOrder" class="mdc-button mdc-button--raised">
                    <div class="mdc-button__ripple"></div>  
                    <span class="mdc-button__label">${buttonMessage}</span>
                </button>
                <section id="paypalButton"></section>
            ` : ` <button type="button" id="placeOrder" class="mdc-button mdc-button--raised disabled desactivate">
                    <div class="mdc-button__ripple"></div>  
                    <span class="mdc-button__label">${buttonMessage}</span>
                </button>
                <section id="paypalButton"></section> 
        ` }

            
        `                           
    },

    renderPaypalButtons(paymentInfo, paypalConfig){
        if(paymentInfo === "paypal") return paypal.Buttons(paypalConfig).render(
            '#paypalButton',
        )
    },

    place(){
        return document.querySelector("#placeOrder")
    }
}