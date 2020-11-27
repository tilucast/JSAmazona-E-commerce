import Header from "../components/Header"
import { api } from "../utils/api"
import { getLocalStorageItem, setLocalStorageItem } from "../utils/localStorageRequests"
import { initiateMaterialButton, initiateMaterialDialog, initiateMaterialSnackbar, initiateMaterialTextField, initiateMaterialTextfieldIcon } from "../utils/materialIoScripts"
import passwordVisibility from "../utils/passwordVisibility"
import protectedRoute from "../utils/protectedRoute"
import rerenderComponent from "../utils/rerenderComponent"

export default class Profile{

    static handleUpdateUserInfo(){
        
        const form = document.querySelector(".profile__userInfo--form")

        form.addEventListener("submit", async event => {
            event.preventDefault()

            try{

                const signedUser = getLocalStorageItem("signedUserInfo")
                let dialog = initiateMaterialDialog()
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

                initiateMaterialSnackbar().open()
                initiateMaterialSnackbar().labelText = "An error occurred. Try again later."
            }
        })
    }

    static afterRender(){

        initiateMaterialButton()
        initiateMaterialTextField()
        const icons = initiateMaterialTextfieldIcon()
        passwordVisibility(icons)

        this.handleUpdateUserInfo()     
        
    }

    static render(){

        protectedRoute()

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
                                value="${getLocalStorageItem('signedUserInfo').name}"
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
                                value="${getLocalStorageItem('signedUserInfo').email}"
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
                                value="${getLocalStorageItem("signedUserInfo").password}"
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
                    <h1>Your boughts history</h1>
                </div>

            </section>

            <div class="mdc-snackbar">
                <div class="mdc-snackbar__surface" role="status" aria-relevant="additions">
                    <div class="mdc-snackbar__label" aria-atomic="false">
                        
                    </div>
                    <div class="mdc-snackbar__actions" aria-atomic="true">
                    <button type="button" class="mdc-button mdc-snackbar__action">
                        <div class="mdc-button__ripple"></div>
                        <span class="mdc-button__label">
                            <span class="material-icons">
                                close
                            </span>
                        </span>
                    </button>
                    </div>
                </div>
            </div>

            <div class="mdc-dialog">
                <div class="mdc-dialog__container">
                    <div 
                        class="mdc-dialog__surface"
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="my-dialog-title"
                        aria-describedby="my-dialog-content"
                    >
                        <div class="mdc-dialog__content" id="my-dialog-content">
                            <span>Update your information?</span>
                        </div>
                        <div class="mdc-dialog__actions">
                            <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="cancel">
                                <div class="mdc-button__ripple"></div>
                                <span class="mdc-button__label">Cancel</span>
                            </button>
                            <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="update">
                                <div class="mdc-button__ripple"></div>
                                <span class="mdc-button__label">Update</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="mdc-dialog__scrim"></div>
            </div>
        `
    }
}