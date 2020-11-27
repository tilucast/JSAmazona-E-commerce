export function capitalize(string){
    return string.replace(string[0], string[0].toUpperCase())
}

export function reduceStringLength(string, index){
    return string.slice(0, index) + '...'
}