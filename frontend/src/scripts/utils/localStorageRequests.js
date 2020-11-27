export function setLocalStorageItem(itemName, itemObject){
    return localStorage.setItem(itemName, JSON.stringify(itemObject))
}

export function getLocalStorageItem(itemName){
    return JSON.parse(localStorage.getItem(itemName))
}