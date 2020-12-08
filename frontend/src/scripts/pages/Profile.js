import Dialog from "../components/Dialog"
import Header from "../components/Header"
import Snackbar from "../components/Snackbar"
import { api } from "../utils/api"
import { getLocalStorageItem, setLocalStorageItem } from "../utils/localStorageRequests"
import { initiateMaterialButton, initiateMaterialSnackbar, initiateMaterialTextField, initiateMaterialTextfieldIcon } from "../utils/materialIoScripts"
import passwordVisibility from "../utils/passwordVisibility"
import {redirectUnauthenticatedUser} from "../utils/protectedRoute"
import rerenderComponent from "../utils/rerenderComponent"
import {format} from 'date-fns'
import changeMainComponentGridLayout from "../utils/changeMainComponent"

export default class Profile{

    constructor(){}

    get signedUser(){
        return getLocalStorageItem("signedUserInfo") || []
    }

    async ordersData(){
        try{

            const {data} = await api.get(`/api/orders`, 
                {headers: {'auth-token': this.signedUser.token, id: this.signedUser._id}}
            )


            console.log(data)
            return data

        }catch(error){
            console.error(error.response)
        }
    }

    handleUpdateUserInfo(){
        
        const form = document.querySelector(".profile__userInfo--form")

        form.addEventListener("submit", async event => {
            event.preventDefault()

            try{

                const signedUser = this.signedUser

                const dialog = Dialog.instantiateMaterialDialog()
                dialog.open()

                dialog.listen('MDCDialog:closed', async event => {
                    if(event.detail.action === "update"){

                        const updatedUser = await api.put(`/api/update-user/${signedUser._id}`, {
                            name: form.elements[0].value,
                            password: form.elements[2].value
                        }, {headers: {'auth-token': signedUser.token}})
        
                        let updatedInfo = JSON.parse(updatedUser.config.data)
                        let local = getLocalStorageItem("signedUserInfo")
                        
                        local.name = updatedInfo.name
                        local.password = updatedInfo.password
        
                        setLocalStorageItem("signedUserInfo", local)

                        initiateMaterialSnackbar().open()
                        initiateMaterialSnackbar().labelText = "Informations were updated."

                        rerenderComponent(Header, ".header")

                    }
                })

            }catch(error){

                Snackbar.instantiateMaterialSnackbar().open()
                Snackbar.instantiateMaterialSnackbar().labelText = "An error occurred. Try again later."
            }
        })
    }

    afterRender(){

        initiateMaterialButton()
        initiateMaterialTextField()
        const icons = initiateMaterialTextfieldIcon()
        passwordVisibility(icons)

        this.handleUpdateUserInfo()

        Dialog.insertMaterialDialogIntoDOM(
            document.querySelector("#dialogContainer"),
            "Update your personal informations?",
            2,
            "update",
            "cancel"
        )

        Snackbar.insertMaterialSnackbarIntoDOM(
            document.querySelector("#snackbarContainer")
        )
        
    }

    async render(){

        redirectUnauthenticatedUser()

        changeMainComponentGridLayout()

        const orderData = await this.ordersData()

        const {name, password, email} = this.signedUser

        return `
            <section class="profile">
            
                <div class="profile__userInfo">

                    <h1>Your Information</h1>

                    <form class="profile__userInfo--form">

                        <label class="mdc-text-field mdc-text-field--outlined mdc-text-field--label-floating">
                            <span class="mdc-notched-outline">
                                <span class="mdc-notched-outline__leading"></span>
                                <span class="mdc-notched-outline__notch">
                                    <span class="mdc-floating-label mdc-floating-label--float-above" id="my-label-id">Your Name</span>
                                </span>
                                <span class="mdc-notched-outline__trailing"></span>
                            </span>
                            <input 
                                type="text" required
                                minlength="8"
                                value="${name}"
                                class="mdc-text-field__input" 
                                aria-labelledby="my-label-id"
                                aria-describedby="name-helper-text"
                                aria-controls="name-helper-text"
                            >
                        </label>
                        <div class="mdc-text-field-helper-line">
                            <div 
                                id="email-helper-text" 
                                class="mdc-text-field-helper-text" 
                                aria-hidden="true"
                            >
                                Update your name.
                            </div>
                        </div>

                        <label class="mdc-text-field mdc-text-field--outlined mdc-text-field--disabled mdc-text-field--label-floating">
                            <span class="mdc-notched-outline">
                                <span class="mdc-notched-outline__leading"></span>
                                <span class="mdc-notched-outline__notch">
                                    <span class="mdc-floating-label mdc-floating-label--float-above" id="my-label-id">Your email</span>
                                </span>
                                <span class="mdc-notched-outline__trailing"></span>
                            </span>
                            <input 
                                type="email"
                                disabled
                                value="${email}"
                                class="mdc-text-field__input" 
                                aria-labelledby="my-label-id"
                                aria-describedby="name-helper-text"
                                aria-controls="name-helper-text"
                            >
                        </label>
                        <div class="mdc-text-field-helper-line">
                            <div 
                                id="email-helper-text" 
                                class="mdc-text-field-helper-text" 
                                aria-hidden="true"
                            >
                                Your email is unique, you can't update it.
                            </div>
                        </div>

                        <label class="mdc-text-field mdc-text-field--outlined mdc-text-field--label-floating">
                            <span class="mdc-notched-outline">
                                <span class="mdc-notched-outline__leading"></span>
                                <span class="mdc-notched-outline__notch">
                                    <span class="mdc-floating-label mdc-floating-label--float-above" id="my-label-id">Password</span>
                                </span>
                                <span class="mdc-notched-outline__trailing"></span>
                            </span>
                            <input 
                                id="password"
                                type="password"
                                minlength="5"
                                required
                                value="${password}"
                                class="mdc-text-field__input" 
                                aria-labelledby="my-label-id"
                                aria-describedby="password-helper-text"
                                aria-controls="password-helper-text"
                            >
                            <i 
                                id="visibility"
                                class="material-icons mdc-text-field__icon mdc-text-field__icon--trailing" 
                                tabindex="0" 
                                role="button"
                            >
                                visibility
                            </i>
                        </label>
                        <div class="mdc-text-field-helper-line">
                            <div 
                                id="password-helper-text" 
                                class="mdc-text-field-helper-text" 
                                aria-hidden="true"
                            >
                                Update your password.
                            </div>
                        </div>
                        

                        <button type="submit" id="cartButton" class="mdc-button mdc-button--raised">
                            <div class="mdc-button__ripple"></div>  
                            <span class="mdc-button__label">Update Information</span>
                        </button>

                    </form>

                </div>

                <div class="profile__userHistory">
                    ${orderData.length ? 
                        `
                            <table>
                                <thead>
                                    <tr>
                                        <th><strong>ID</strong></th>
                                        <th><strong>Date</strong></th>
                                        <th><strong>Total</strong></th>
                                        <th><strong>Paid</strong></th>
                                        <th><strong>Delivered</strong></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    ${orderData.map(({_id, createdAt, totalPrice, isPaid, isDelivered}) => `

                                        <tr>
                                            <td><a href="src/#/order/${_id}">${_id}</a></td>
                                            <td>${format(new Date(createdAt), "MM/dd/yyyy - H:mm:SS") }</td>
                                            <td class="totalPrice">${totalPrice}</td>
                                            <td>
                                            ${
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
                                            }
                                            </td>
                                            <td>
                                            ${
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
                                            }
                                            </td>
                                        </tr>

                                    `).join(" ")}
                                </tbody>
                            </table>
                        `
                    : `<span>Nothing to show here.</span>`}
                </div>

            </section>

            <article id="dialogContainer">
            
            </article>

            <article id="snackbarContainer">
            
            </article>
        `
    }
}