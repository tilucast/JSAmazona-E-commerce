import History from "../utils/History"
import { getLocalStorageItem, setDataOnLocalStorage } from "../utils/localStorageRequests"
import { initiateMaterialNavigationDrawer } from "../utils/materialIoScripts"
import { parseRequestUrl } from "../utils/parseRequestUrl"

const history = new History()

export default class Header{

    constructor(){}

    get signedUser(){
        return getLocalStorageItem("signedUserInfo") || ""
    }

    renderSearchBar(){
        const searchbarPlaceholder = document.getElementById("searchbarPlaceholder")
        searchbarPlaceholder.innerHTML = `
            <section class="searchBar">
                <input type="text" placeholder="Search for an item ..." />
                <span class="material-icons">
                    search
                </span>     
            </section>
        `
    }
    
    afterRender(){
        
        const logoutButton = document.querySelectorAll(".logoutButton")
        this.signedUser && logoutButton.forEach(button => 
            button.addEventListener("click", () => {
            localStorage.removeItem("signedUserInfo")

            history.push("")
        }))

        let {resource} = parseRequestUrl()
        
        if(!resource){ 
            this.renderSearchBar()

            const input = document.querySelector("input")
                input.addEventListener("input", function(){
                    setDataOnLocalStorage(this.value)
            })
        }

        const menu = document.getElementById("menu")
        const drawer = initiateMaterialNavigationDrawer()

        menu.addEventListener("click", () => {
            drawer.open = true
        })
        
    }

    render(){

        const {_id, name, isAdmin} = this.signedUser
        
        return `

            <div class="header__menu">
                <section>
                    <span id="menu" class="material-icons">
                        menu
                    </span>
                    <a class="header__menu--title" href="src/#/">JS Amazona</a>
                </section>

            </div>

            <section id="searchbarPlaceholder"></section>
            
            <div>
                ${name ? `<a href="src/#/profile">${name}</a>` : `<a href="src/#/signin">Sign In</a>`}
                |
                <a href="src/#/cart">Cart</a>

                ${isAdmin ? ` | <a href="src/#/dashboard">Dashboard</a>` : ""}

                ${this.signedUser ? 
                   `
                   | 
                    <span class="material-icons logoutButton">
                        exit_to_app
                    </span> 
                    `

                    :

                    ""
                }
            </div>

            <aside class="mdc-drawer mdc-drawer--modal">
                <div class="mdc-drawer__content">
                <nav class="mdc-list">

                    <a class="mdc-list-item " 
                        href="${name ? `src/#/profile` : 'src/#/signin'}" aria-current="page" tabindex="0"
                    >
                        <span class="mdc-list-item__ripple"></span>
                        <i class="material-icons mdc-list-item__graphic" aria-hidden="true">perm_identity</i>
                        <span class="mdc-list-item__text">
                            ${name ? `${name}` : 'Sign in'}
                        </span>
                    </a>

                    <a class="mdc-list-item" href="src/#/cart">
                        <span class="mdc-list-item__ripple"></span>
                        <i class="material-icons mdc-list-item__graphic" aria-hidden="true">add_shopping_cart</i>
                        <span class="mdc-list-item__text">
                            Cart
                        </span>
                    </a>

                    ${ isAdmin ? 
                        `   <a class="mdc-list-item" href="src/#/dashboard">
                                <span class="mdc-list-item__ripple"></span>
                                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">leaderboard</i>
                                <span class="mdc-list-item__text">
                                    Dashboard
                                </span>
                            </a>
                        ` : ""
                    }

                    ${ this.signedUser ?
                        `<a class="mdc-list-item logoutButton" >
                            <span class="mdc-list-item__ripple"></span>
                            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">exit_to_app</i>
                            <span class="mdc-list-item__text">
                                Logout
                            </span>
                        </a>` : ""
                    }
                </nav>
                </div>
            </aside>
            <div class="mdc-drawer-scrim"></div>
            
        `
    }

    insertIntoHtml(){
        const header = document.querySelector(".header")
        header.innerHTML = this.render()
        this.afterRender()
    }
}