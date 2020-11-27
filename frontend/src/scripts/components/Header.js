import { getLocalStorageItem } from "../utils/localStorageRequests"

export default class Header{
    
    static afterRender(){
        getLocalStorageItem("signedUserInfo") && document.querySelector("#logoutButton").addEventListener("click", () => {
            localStorage.removeItem("signedUserInfo")

            document.location.hash = ""
        })
    }

    static render(){

        const {_id, name} = getLocalStorageItem('signedUserInfo') || ''
        
        return `
            <div class="header__menu">
                <span class="material-icons">
                    menu
                </span>
                <a class="header__menu--title" href="src/#/">JS Amazona</a>
            </div>

            <div>
                ${name ? `<a href="src/#/profile">${name}</a>` : '<a href="src/#/signin">Sign In</a>'}
                |
                <a href="src/#/cart">Cart</a>

                ${getLocalStorageItem('signedUserInfo') ? 
                   `
                   | 
                   <span id="logoutButton" class="material-icons">
                        exit_to_app
                    </span> `

                    :

                    ""
                }
                
            </div>
        `
    }

    static insertIntoHtml(){
        const header = document.querySelector(".header")
        header.innerHTML = this.render()

        this.afterRender()
    }
}