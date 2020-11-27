import { getLocalStorageItem } from "./localStorageRequests";

export default function(){
    if(!getLocalStorageItem("signedUserInfo")) document.location.hash = "/"
}