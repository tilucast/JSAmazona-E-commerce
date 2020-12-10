export function setLocalStorageItem(itemName, itemObject){
    return localStorage.setItem(itemName, JSON.stringify(itemObject))
}

export function getLocalStorageItem(itemName){
    return JSON.parse(localStorage.getItem(itemName))
}

export function setDataOnLocalStorage(value){
    localStorage.setItem("inputValue", value)
}

export function getDataFromLocalStorage(itemName){
    return localStorage.getItem(itemName)
}