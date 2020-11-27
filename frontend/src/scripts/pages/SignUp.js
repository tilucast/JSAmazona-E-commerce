import { api } from "../utils/api"
import { initiateMaterialButton, initiateMaterialProgressIndicator, initiateMaterialSnackbar, initiateMaterialTextField } from "../utils/materialIoScripts"

export default class SignUp{

    static handleSignUp(){

        const form = document.querySelector('.signUp__box--form')

        form.addEventListener('submit', async event => {
            event.preventDefault()

            try{

                if(form.elements[2].value !== form.elements[3].value){
                    initiateMaterialSnackbar().open()
                    initiateMaterialSnackbar().labelText = 'Passwords must be equal to one another.'
                    return
                }

                const signUp = await api.post("/api/create-user", {
                    name: form.elements[0].value,
                    email: form.elements[1].value,
                    password: form.elements[2].value
                })

                document.location.hash = '/signin'

            }catch(error){

                initiateMaterialSnackbar().open()
                initiateMaterialSnackbar().labelText = 'Email already taken.'
            }
        })
        
    }

    static afterRender(){
        initiateMaterialTextField()
        initiateMaterialButton()
        this.handleSignUp()
    }

    static render(){
        return `
            <section class="signUp">
                <div class="signUp__box">
                    <h1>Sign up</h1>

                    <form class="signUp__box--form">

                        <label class="mdc-text-field mdc-text-field--outlined">
                            <span class="mdc-notched-outline">
                                <span class="mdc-notched-outline__leading"></span>
                                <span class="mdc-notched-outline__notch">
                                <span class="mdc-floating-label" id="my-label-id">Name</span>
                                </span>
                                <span class="mdc-notched-outline__trailing"></span>
                            </span>
                            <input 
                                type="text" required 
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
                                Your full name.
                            </div>
                        </div>

                        <label class="mdc-text-field mdc-text-field--outlined">
                            <span class="mdc-notched-outline">
                                <span class="mdc-notched-outline__leading"></span>
                                <span class="mdc-notched-outline__notch">
                                <span class="mdc-floating-label" id="my-label-id">Email</span>
                                </span>
                                <span class="mdc-notched-outline__trailing"></span>
                            </span>
                            <input 
                                type="email" 
                                required 
                                class="mdc-text-field__input" 
                                aria-labelledby="my-label-id"
                                aria-describedby="email-helper-text"
                                aria-controls="email-helper-text"
                            >
                        </label>
                        <div class="mdc-text-field-helper-line">
                            <div 
                                id="password-helper-text" 
                                class="mdc-text-field-helper-text" 
                                aria-hidden="true"
                            >
                                Enter a email you have access to.
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
                                type="text" 
                                required 
                                class="mdc-text-field__input" 
                                aria-labelledby="my-label-id"
                                aria-describedby="password-helper-text"
                                aria-controls="password-helper-text"
                            >
                        </label>
                        <div class="mdc-text-field-helper-line">
                            <div 
                                id="password-helper-text" 
                                class="mdc-text-field-helper-text" 
                                aria-hidden="true"
                            >
                                Enter your password.
                            </div>
                        </div>

                        <label class="mdc-text-field mdc-text-field--outlined">
                            <span class="mdc-notched-outline">
                                <span class="mdc-notched-outline__leading"></span>
                                <span class="mdc-notched-outline__notch">
                                <span class="mdc-floating-label" id="my-label-id">Re-enter Password</span>
                                </span>
                                <span class="mdc-notched-outline__trailing"></span>
                            </span>
                            <input 
                                type="text" 
                                required 
                                class="mdc-text-field__input" 
                                aria-labelledby="my-label-id"
                                aria-describedby="password-helper-text"
                                aria-controls="password-helper-text"
                            >
                        </label>
                        <div class="mdc-text-field-helper-line">
                            <div 
                                id="password-helper-text" 
                                class="mdc-text-field-helper-text" 
                                aria-hidden="true"
                            >
                                Re-enter your password.
                            </div>
                        </div>
                        

                        <button type="submit" id="cartButton" class="mdc-button mdc-button--raised">
                            <div class="mdc-button__ripple"></div>  
                            <span class="mdc-button__label">Sign Up</span>
                        </button>

                    </form>

                    <span>Already have an account? <a href="src/#/signin">Sign In</a></span>

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