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
import ProgressIndicator from './scripts/components/ProgressIndicator.js'
import Order from './scripts/pages/Order.js'
import Dashboard from './scripts/pages/Dashboard.js'
import Products from './scripts/pages/Products.js'

const progressIndicator = new ProgressIndicator()
const header = new Header()

const routes = {
    "/": HomeScreen,
    "/product/:id": Product,
    "/products": Products,
    "/cart/:id": Cart,
    "/cart": Cart,
    "/signin": SignIn,
    "/signup": SignUp,
    "/profile": Profile,
    "/checkout": Checkout,
    "/order/:id": Order,
    "/dashboard": Dashboard
}

const router = async () => {
    progressIndicator.render()
    initiateMaterialProgressIndicator().open()

    const request = parseRequestUrl()

    const parseUrl = (request.resource ? `/${request.resource}` : '/')
        + (request.id ? '/:id' : '') + 
        (request.action ? `/${request.action}` : '')

    const screen = routes[parseUrl] ? new routes[parseUrl] : new Error404

    header.insertIntoHtml()

    const main = document.querySelector('#mainContent')
    
    main.innerHTML = await screen.render()

    if(screen.afterRender) await screen.afterRender()

    initiateMaterialProgressIndicator().close()
}

window.addEventListener('load', router)
window.addEventListener('hashchange', router)
