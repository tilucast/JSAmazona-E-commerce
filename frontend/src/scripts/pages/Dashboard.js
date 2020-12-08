import changeMainComponentGridLayout from '../utils/changeMainComponent'

export default class Dashboard{
    constructor(){}

    afterRender(){

    }

    render(){

        changeMainComponentGridLayout("col-start 2 / full-end")

        return `<h1>Dashboard</h1>`
    }
}