import { api } from "../utils/api"
import changeMainComponentGridLayout from "../utils/changeMainComponent"
import History from "../utils/History"
import { getLocalStorageItem, setLocalStorageItem } from "../utils/localStorageRequests"
import { initiateMaterialButton, initiateMaterialSnackbar, initiateMaterialTextField, initiateMaterialTextfieldIcon } from "../utils/materialIoScripts"
import passwordVisibility from "../utils/passwordVisibility"
import { redirectAuthenticatedUser } from "../utils/protectedRoute"

const history = new History()

export default class SignIn{

    get redirect(){
        return getLocalStorageItem("redirectToPage") || '/'
    }

    constructor(){}

    handleSignin(){

        const form = document.querySelector('.signIn__box--form')
        
        form.addEventListener('submit', async (event) => {
            event.preventDefault()

            try{
                const signedUserInfo = await api.post('/api/user-signin', {
                    email: form.elements[0].value,
                    password: form.elements[1].value
                })
                
                setLocalStorageItem('signedUserInfo', signedUserInfo.data)

                if(this.redirect){
                    history.push(this.redirect) 
                    return localStorage.removeItem("redirectToPage")
                } else{
                    return history.push("/")
                }
            
            }catch(error){

                initiateMaterialSnackbar().open()
                initiateMaterialSnackbar().labelText = error.response.data.message
            }

        })

    }

    afterRender(){

        initiateMaterialTextField()
        initiateMaterialButton()
        const icons = initiateMaterialTextfieldIcon()
        passwordVisibility(icons)

        this.handleSignin()
    }

    render(){
        
        if(getLocalStorageItem("signedUserInfo")) return redirectAuthenticatedUser()

        changeMainComponentGridLayout()

        return `
            <section class="signIn">
                <div class="signIn__box">
                    <h1>Sign in</h1>

                    <form class="signIn__box--form">

                        <label class="mdc-text-field mdc-text-field--outlined">
                            <span class="mdc-notched-outline">
                                <span class="mdc-notched-outline__leading"></span>
                                <span class="mdc-notched-outline__notch">
                                <span class="mdc-floating-label" id="my-label-id">Email</span>
                                </span>
                                <span class="mdc-notched-outline__trailing"></span>
                            </span>
                            <input 
                                type="email" required 
                                class="mdc-text-field__input" 
                                aria-labelledby="my-label-id"
                                aria-describedby="email-helper-text"
                                aria-controls="email-helper-text"
                            >
                        </label>
                        <div class="mdc-text-field-helper-line">
                            <div 
                                id="email-helper-text" 
                                class="mdc-text-field-helper-text" 
                                aria-hidden="true"
                            >
                                Type a valid email.
                            </div>
                        </div>

                        <label class="mdc-text-field mdc-text-field--outlined">
                            <span class="mdc-notched-outline">
                                <span class="mdc-notched-outline__leading"></span>
                                <span class="mdc-notched-outline__notch">
                                <span class="mdc-floating-label" id="my-label-id">Password</span>
                                </span>
                                <span class="mdc-notched-outline__trailing"></span>
                            </span>
                            <input 
                                type="password"
                                id="password"
                                required 
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
                                Type a valid password.
                            </div>
                        </div>
                        

                        <button type="submit" id="cartButton" class="mdc-button mdc-button--raised">
                            <div class="mdc-button__ripple"></div>  
                            <span class="mdc-button__label">Sign In</span>
                        </button>

                    </form>

                    <span>New user? <a href="src/#/signup">Create Account</a></span>

                </div>

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
                
            </section>
        `
    }
}