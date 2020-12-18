import Header from './scripts/components/Header.js'
import ProgressIndicator from './scripts/components/ProgressIndicator.js'
import { parseRequestUrl } from './scripts/utils/parseRequestUrl.js'
const progressIndicator = new ProgressIndicator()

const router = async () => {

    const routes = {
        "/": () => import('./scripts/pages/HomeScreen').then(module => new module.default),
        "/product/:id": () => import('./scripts/pages/Product').then(module => new module.default),
        "/products": () => import('./scripts/pages/Products').then(module => new module.default),
        "/orders": () => import('./scripts/pages/Orders').then(module => new module.default),
        "/dashboard": () => import('./scripts/pages/Dashboard').then(module => new module.default),
        "/cart/:id": () => import('./scripts/pages/Cart').then(module => new module.default),
        "/cart": () => import('./scripts/pages/Cart').then(module => new module.default),
        "/signin": () => import('./scripts/pages/SignIn').then(module => new module.default),
        "/signup": () => import('./scripts/pages/SignUp').then(module => new module.default),
        "/profile": () => import('./scripts/pages/Profile').then(module => new module.default),
        "/checkout": () => import('./scripts/pages/Checkout').then(module => new module.default),
        "/order/:id": () => import('./scripts/pages/Order').then(module => new module.default)
    }

    progressIndicator.open()

    const request = parseRequestUrl()

    const parseUrl = (request.resource ? `/${request.resource}` : '/')
        + (request.id ? '/:id' : '') + 
        (request.action ? `/${request.action}` : '')

    const screen = routes[parseUrl] ? await routes[parseUrl]() 
    : await import('./scripts/pages/Error404').then(module => new module.default)

    new Header().insertIntoHtml()

    const main = document.querySelector('#mainContent')

    window.scroll(0,0)
    
    main.innerHTML = await screen.render()

    if(screen.afterRender && typeof await screen.render() !== 'undefined') await screen.afterRender()

    progressIndicator.close()
}

window.addEventListener('load', router)
window.addEventListener('hashchange', router)
