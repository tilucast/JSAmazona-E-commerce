import HomeScreen from './scripts/pages/HomeScreen.js'
import Product from './scripts/pages/Product.js'
import Error404 from './scripts/pages/Error404.js'
import { parseRequestUrl } from './scripts/utils/parseRequestUrl.js'
import Cart from './scripts/pages/Cart.js'
import SignIn from './scripts/pages/SignIn.js'
import Header from './scripts/components/Header.js'
import { initiateMaterialProgressIndicator } from './scripts/utils/materialIoScripts.js'
import SignUp from './scripts/pages/SignUp.js'
import Profile from './scripts/pages/Profile.js'
import Checkout from './scripts/pages/Checkout.js'

const routes = {
    "/": HomeScreen,
    "/product/:id": Product,
    "/cart/:id": Cart,
    "/cart": Cart,
    "/signin": SignIn,
    "/signup": SignUp,
    "/profile": Profile,
    "/checkout": Checkout
}

const router = async () => {
    initiateMaterialProgressIndicator()

    const request = parseRequestUrl()

    const parseUrl = (request.resource ? `/${request.resource}` : '/')
        + (request.id ? '/:id' : '') + 
        (request.action ? `/${request.action}` : '')
    
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404

    Header.insertIntoHtml()

    const main = document.querySelector('#mainContent')
    
    main.innerHTML = await screen.render()

    if(screen.afterRender) await screen.afterRender()

    initiateMaterialProgressIndicator().close()

}

window.addEventListener('load', router)
window.addEventListener('hashchange', router)
