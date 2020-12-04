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

    renderPaypalButtons(paymentInfo, totalPrice){
        if(paymentInfo === "paypal") return paypal.Buttons({
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: totalPrice
                        }
                    }]
                })
            },
            onApprove: function(data, actions){
                return actions.order.capture().then(function(details){
                    alert("Transaction completed.")
                })
            }
        }).render(
            '#paypalButton',
            
        )
    },

    place(){
        return document.querySelector("#placeOrder")
    }
}