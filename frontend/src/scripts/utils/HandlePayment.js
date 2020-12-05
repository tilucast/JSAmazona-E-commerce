import Snackbar from "../components/Snackbar";
import { api } from "./api";
import History from "./History";

const history = new History()

export default class HandlePayment{
    constructor(){}

    async pay(paymentData, userData){

        const {itemsPrice, orderItems, payment, shipping, shippingPrice, taxPrice, totalPrice, user} = paymentData

        try{

            const order = await api.post("/api/orders", {
                itemsPrice, orderItems, payment, shipping, shippingPrice, taxPrice, totalPrice, user
            }, {headers: {'auth-token': userData} });

            localStorage.removeItem("cartItems")
            localStorage.removeItem("shippingInfo")
            localStorage.removeItem("paymentOption")

            history.push(`/order/${order.data._id}`)

        }catch(error){

            console.error(error.response.data.message)

            Snackbar.instantiateMaterialSnackbar().open()
            Snackbar.instantiateMaterialSnackbar().labelText = "An error has occurred. Try again later."

        }
        
    }
}