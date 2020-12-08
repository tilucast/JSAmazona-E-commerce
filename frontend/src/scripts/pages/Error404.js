import changeMainComponentGridLayout from "../utils/changeMainComponent"

export default class Error404{
    constructor(){}

    render() {

        changeMainComponentGridLayout()

        return `<h1>Error Screen</h1>`
    }
}