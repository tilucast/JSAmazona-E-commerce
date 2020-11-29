import History from "./History";
import { getLocalStorageItem } from "./localStorageRequests";

const history =  new History()

export function redirectUnauthenticatedUser(){
    if(!getLocalStorageItem("signedUserInfo"))  history.push("/")
}

export function redirectAuthenticatedUser(){
    if(getLocalStorageItem("signedUserInfo"))  history.push("/")
}