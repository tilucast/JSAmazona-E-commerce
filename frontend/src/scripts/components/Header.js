import History from "../utils/History"
import { getLocalStorageItem, setDataOnLocalStorage } from "../utils/localStorageRequests"

const history = new History()

export default class Header{

    constructor(){}

    get signedUser(){
        return getLocalStorageItem("signedUserInfo") || ""
    }
    
    afterRender(){
        this.signedUser && document.querySelector("#logoutButton").addEventListener("click", () => {
            localStorage.removeItem("signedUserInfo")

            history.push("")
        })

        const input = document.querySelector("input")
        input.addEventListener("input", function(){
            setDataOnLocalStorage(this.value)
        })
    }

    render(){

        const {_id, name, isAdmin} = this.signedUser
        
        return `
            <div class="header__menu">
                <span class="material-icons">
                    menu
                </span>
                <a class="header__menu--title" href="src/#/">JS Amazona</a>
            </div>

            <section class="searchBar">
                <input type="text" placeholder="Search for an item ..." />
                <span class="material-icons">
                    search
                </span>     
            </section>

            <div>
                ${name ? `<a href="src/#/profile">${name}</a>` : '<a href="src/#/signin">Sign In</a>'}
                |
                <a href="src/#/cart">Cart</a>

                ${isAdmin ? ` | <a href="src/#/dashboard">Dashboard</a>` : ""}

                ${this.signedUser ? 
                   `
                   | 
                    <span id="logoutButton" class="material-icons">
                        exit_to_app
                    </span> 
                    `

                    :

                    ""
                }
                
            </div>
        `
    }

    insertIntoHtml(){
        const header = document.querySelector(".header")
        header.innerHTML = this.render()
        this.afterRender()
    }
}