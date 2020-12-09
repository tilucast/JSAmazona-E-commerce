import { getLocalStorageItem } from "./localStorageRequests"

export default class History {

    constructor(){

    }

    push(url){
        document.location.hash = url
    }
    
}