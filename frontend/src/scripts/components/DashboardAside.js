export default class DashboardAside{
    constructor(){}

    afterRender(){
        const ctaClose = document.getElementById("ctaClose")
        const ctaSpan = document.getElementById("ctaSpan")
        const asideSection = document.querySelector(".asideSection")
        const aside = document.querySelector("#dashboardAside")
        const cta = document.getElementById("cta")

        ctaSpan.addEventListener("click", () => {
            aside.classList.remove("open")
            aside.classList.add("close")
            aside.style.width = "0vw"
            asideSection.style.display = "none"
            ctaSpan.style.display = "none"
        })

        ctaClose.addEventListener("click", () => {
            aside.classList.remove("close")
            aside.classList.add("open")
            aside.style.width = "30vw"
            asideSection.style.display = "grid"
            ctaSpan.style.display = "grid"
            cta.style.display = "grid"
        })
    }

    insertDashboardAsideIntoDOM(DOMElement){
        return DOMElement.innerHTML = `
        
        <aside id="dashboardAside">
            <section class="asideSection">
                <a href="src/#/dashboard">Dashboard</a>
                <a href="src/#/orders">Orders</a>
                <a href="src/#/products">Products</a>
            </section>

            <cta id="cta" data-open="false">
                <span id="ctaSpan" class="material-icons">
                    skip_previous
                </span>
            </cta>
        </aside>

        <cta id="cta2" data-open="false">
            <span id="ctaClose" class="material-icons">
                skip_next
            </span>
        </cta>
        
        `
    }

    render(DOMElement){
        this.insertDashboardAsideIntoDOM(DOMElement)
        this.afterRender()
    }
}