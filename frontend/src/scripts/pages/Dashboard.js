import changeMainComponentGridLayout from '../utils/changeMainComponent'
import {api} from '../utils/api'
import {getLocalStorageItem} from '../utils/localStorageRequests'
import {Chart} from 'chart.js'

export default class Dashboard{
    constructor(){}

    get signedUserInfo(){
        return getLocalStorageItem("signedUserInfo")
    }

    handleSidebarAnimation(){
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

    async handleDisplayChart(){
        const [, , , mappedProductsCategory] = await this.fetchUsersOrdersSales()

        let chartLabel = []
        let chartData = []
        let colors = []
        for(let [key,value] of mappedProductsCategory){
            chartLabel.push(key)
            chartData.push(value)
            colors.push(`#${Math.random().toString(16).slice(2, 8)}`)
        }

        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: chartLabel ,
                datasets: [{
                    label: '# of Votes',
                    data: chartData,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
            }
        });

        return myChart
    }

    async fetchUsersOrdersSales(){
        try{

            const users = await api.get('/api/find-users')

            const orders = await api.get("api/orders/all", {headers: {'auth-token': this.signedUserInfo.token}})

            const totalSales = orders.data.reduce((accumulator, order) => accumulator + order.totalPrice, 0).toFixed(2)

            const orderItems = orders.data.flatMap(order => order.orderItems)

            const mappedProductsCategory = orderItems.reduce((accumulator, current) => 
                accumulator.set(current.category, (accumulator.get(current.category) || 0) +1), new Map())  
            
            return [users.data.length, orders.data.length, totalSales, mappedProductsCategory]

        }catch(error){
            console.error(error.response)
        }
    }

    async afterRender(){

        this.handleDisplayChart()

        this.handleSidebarAnimation()

    }

    async render(){

        changeMainComponentGridLayout("full-start / full-end")

        const [totalUsers, totalOrders, totalSales] = await this.fetchUsersOrdersSales()

        return `

        <section class="dashboard">

            <aside id="dashboardAside">
                <section class="asideSection">
                    <a href="src/#/dashboard">Dashboard</a>
                    <a href="src/#/admin-orders">Orders</a>
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

            <article class="dashboard__content">
                <h1 class="title">Dashboard</h1>

                <section>
                    
                    <group>
                        <subgroup>
                            <span class="material-icons">
                                group
                            </span>
                            <span>Users</span>
                        </subgroup>
                        <span>${totalUsers}</span>
                    </group>
                
                    
                
                    <group>
                        <subgroup>
                            <span class="material-icons">
                                add_shopping_cart
                            </span>
                            <span>Orders</span>
                        </subgroup>
                        <span>${totalOrders}</span>
                    </group>
                

                
                    <group>
                        <subgroup>
                            <span class="material-icons">
                                attach_money
                            </span>
                            <span>Sales</span>
                        </subgroup>
                        <span>R$${totalSales}</span>
                    </group>
                    
                </section>

                <div>
                    <span>Products sold</span>
                    <article class="canvasContainer">
                        <canvas id="myChart"></canvas>
                    </article>
                </div>
            </article>

        </section>
        `
    }
}