import DashboardAside from "../components/DashboardAside"
import changeMainComponentGridLayout from "../utils/changeMainComponent"
import { initiateMaterialButton, initiateMaterialSelect, initiateMaterialTextField } from "../utils/materialIoScripts"
import {api} from '../utils/api'
import { adminProtected } from "../utils/protectedRoute"
import { getLocalStorageItem } from "../utils/localStorageRequests"

const dashboardAside = new DashboardAside()

export default class Products{
    constructor(){}

    get signedUserInfo(){
        return getLocalStorageItem("signedUserInfo")
    }

    createPreviewImage(img){
        const preview = document.querySelector("#previewImage")
        return preview.innerHTML = `<img src="${img}" alt="${preview}"></img>`
    }

    insertBlobImageIntoHTML(){
        const file = document.querySelector("#file")

        file.addEventListener("change", event => {
            const previewImage = this.createPreviewImage(
                URL.createObjectURL(event.explicitOriginalTarget.files[0]
            ))
        })
    }

    async handleCreateProduct(materialSelect){
        const form = document.querySelector("form")

        form.addEventListener("submit", async (event) => {
            event.preventDefault()
            
            let formData = new FormData()
            
            formData.append('name', form.elements[0].value)
            formData.append('brand', form.elements[1].value)
            formData.append('price', form.elements[2].value)
            formData.append('countInStock', form.elements[3].value)
            formData.append('path', form.elements[4].files[0])
            formData.append('category', materialSelect[0].value)
            formData.append('rating', 0)
            formData.append('numReviews', 0)
            
            try{
                const createdProduct = await api.post("/api/product", formData)

                console.log(createdProduct)
            }catch(error){
                console.error(error.response)


            }
        })
        
    }

    async afterRender(){
        const dashboardAsidePlaceholder = document.querySelector(".dashboardAsidePlaceholder")
        dashboardAside.render(dashboardAsidePlaceholder)

        initiateMaterialTextField()
        initiateMaterialButton()
        const selects = initiateMaterialSelect()

        this.handleCreateProduct(selects)

        this.insertBlobImageIntoHTML()
        
    }

    async render(){

        if(!this.signedUserInfo.isAdmin) return adminProtected()

        changeMainComponentGridLayout("full-start / full-end")

        return `

            <section id="products">
                
                <article class="dashboardAsidePlaceholder"></article>

                <article class="registerProducts">
                    
                    <form>
                        <span class="title">Register a new product</span>
                        
                        <label class="mdc-text-field mdc-text-field--outlined">
                            <span class="mdc-notched-outline">
                                <span class="mdc-notched-outline__leading"></span>
                                <span class="mdc-notched-outline__notch">
                                    <span class="mdc-floating-label" id="my-label-id">Product name</span>
                                </span>
                                <span class="mdc-notched-outline__trailing"></span>
                            </span>
                            <input 
                                type="text" required
                                minlength="8"
                                class="mdc-text-field__input" 
                                aria-labelledby="my-label-id"
                                aria-describedby="product-name-helper-text"
                                aria-controls="product-name-helper-text"
                            >
                        </label>

                        <div class="mdc-select mdc-select--outlined demo-width-class">
                            <div class="mdc-select__anchor" aria-labelledby="outlined-select-label">
                                <span class="mdc-notched-outline">
                                <span class="mdc-notched-outline__leading"></span>
                                <span class="mdc-notched-outline__notch">
                                    <span id="outlined-select-label" class="mdc-floating-label">Category</span>
                                </span>
                                <span class="mdc-notched-outline__trailing"></span>
                                </span>
                                <span class="mdc-select__selected-text-container">
                                <span id="demo-selected-text" class="mdc-select__selected-text"></span>
                                </span>
                                <span class="mdc-select__dropdown-icon">
                                <svg
                                    class="mdc-select__dropdown-icon-graphic"
                                    viewBox="7 10 10 5" focusable="false">
                                    <polygon
                                        class="mdc-select__dropdown-icon-inactive"
                                        stroke="none"
                                        fill-rule="evenodd"
                                        points="7 10 12 15 17 10">
                                    </polygon>
                                    <polygon
                                        class="mdc-select__dropdown-icon-active"
                                        stroke="none"
                                        fill-rule="evenodd"
                                        points="7 15 12 10 17 15">
                                    </polygon>
                                </svg>
                                </span>
                            </div>

                            <div class="mdc-select__menu demo-width-class mdc-menu mdc-menu-surface">
                                <ul class="mdc-list">
                                
                                    <li 
                                        class="mdc-list-item" 
                                        data-value="Shirt"
                                    >
                                        <span class="mdc-list-item__ripple"></span>
                                        <span class="mdc-list-item__text">Shirt</span>
                                    </li>

                                    <li 
                                        class="mdc-list-item" 
                                        data-value="Pants"
                                    >
                                        <span class="mdc-list-item__ripple"></span>
                                        <span class="mdc-list-item__text">Pants</span>
                                    </li>

                                    <li 
                                        class="mdc-list-item" 
                                        data-value="Shorts"
                                    >
                                        <span class="mdc-list-item__ripple"></span>
                                        <span class="mdc-list-item__text">Shorts</span>
                                    </li>

                                    <li 
                                        class="mdc-list-item" 
                                        data-value="Dress"
                                    >
                                        <span class="mdc-list-item__ripple"></span>
                                        <span class="mdc-list-item__text">Dress</span>
                                    </li>

                                    <li 
                                        class="mdc-list-item" 
                                        data-value="Skirt"
                                    >
                                        <span class="mdc-list-item__ripple"></span>
                                        <span class="mdc-list-item__text">Skirt</span>
                                    </li>

                                    <li 
                                        class="mdc-list-item" 
                                        data-value="Shoes"
                                    >
                                        <span class="mdc-list-item__ripple"></span>
                                        <span class="mdc-list-item__text">Shoes</span>
                                    </li>
                                    
                                </ul>
                            </div>
                        </div>

                        <label class="mdc-text-field mdc-text-field--outlined">
                            <span class="mdc-notched-outline">
                                <span class="mdc-notched-outline__leading"></span>
                                <span class="mdc-notched-outline__notch">
                                    <span class="mdc-floating-label" id="my-label-id">Product brand</span>
                                </span>
                                <span class="mdc-notched-outline__trailing"></span>
                            </span>
                            <input 
                                type="text" required
                                class="mdc-text-field__input" 
                                aria-labelledby="my-label-id"
                                aria-describedby="productbrand-helper-text"
                                aria-controls="productbrand-helper-text"
                            >
                        </label>

                        <fieldset class="numberFieldset">
                            <label class="mdc-text-field mdc-text-field--outlined">
                                <span class="mdc-notched-outline">
                                    <span class="mdc-notched-outline__leading"></span>
                                    <span class="mdc-notched-outline__notch">
                                        <span class="mdc-floating-label" id="my-label-id">Product price</span>
                                    </span>
                                    <span class="mdc-notched-outline__trailing"></span>
                                </span>
                                <input 
                                    type="text" required
                                    placeholder="Ex: 28.99"
                                    class="mdc-text-field__input" 
                                    aria-labelledby="my-label-id"
                                    aria-describedby="product-price-helper-text"
                                    aria-controls="product-price-helper-text"
                                >
                            </label>

                            <label class="mdc-text-field mdc-text-field--outlined">
                                <span class="mdc-notched-outline">
                                    <span class="mdc-notched-outline__leading"></span>
                                    <span class="mdc-notched-outline__notch">
                                        <span class="mdc-floating-label" id="my-label-id">Count in stock</span>
                                    </span>
                                    <span class="mdc-notched-outline__trailing"></span>
                                </span>
                                <input 
                                    type="number" required
                                    class="mdc-text-field__input" 
                                    aria-labelledby="my-label-id"
                                    aria-describedby="count-helper-text"
                                    aria-controls="count-helper-text"
                                >
                            </label>
                        </fieldset>
                        
                        <fieldset class="photoFieldset">
                            <input id="file" type="file" accept="image/jpeg, image/png, image/webp"></input>

                            <label for="file">
                                Choose a photo
                                <span class="material-icons">
                                    insert_photo
                                </span>
                            </label>
                            

                            <section id="previewImage"></section>
                        </fieldset>

                        <button type="submit" class="mdc-button mdc-button--raised">
                            <div class="mdc-button__ripple"></div>  
                            <span class="mdc-button__label">Create Product</span>
                        </button>
                    
                    </form>
                </article>
            
            </section>

            
        `
    }
}