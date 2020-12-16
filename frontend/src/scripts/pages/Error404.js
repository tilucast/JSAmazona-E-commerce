import changeMainComponentGridLayout from "../utils/changeMainComponent"

export default class Error404{
    constructor(){}

    render() {

        changeMainComponentGridLayout()

        return `
            <div class="mainContent__singleProduct--goBack">
                <a href="/src/#">
                    <span class="material-icons">
                    
                        first_page
                    </span>

                    Voltar
                </a>
            </div>
            <h1>Error Screen</h1>
        `
    }
}