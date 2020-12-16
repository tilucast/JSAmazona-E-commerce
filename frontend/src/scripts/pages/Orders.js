import DashboardAside from "../components/DashboardAside"
import changeMainComponentGridLayout from "../utils/changeMainComponent"
import {api} from '../utils/api'
import {getLocalStorageItem} from '../utils/localStorageRequests'

const dashboardAside = new DashboardAside()

export default class Orders{
    constructor(){}

    get signedUserInfo(){
        return getLocalStorageItem("signedUserInfo")
    }

    async handleDisplayChart(){

        const [tax, shipping, items, total] = await this.getOrders()

        let x = (tax * 100 / total).toFixed(2)
        let y = (shipping * 100 / total).toFixed(2)
        let z = (items * 100 / total).toFixed(2)

        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [`Taxes: ${x}%`,`Shipping: ${y}%`,`Items: ${z}%`] ,
                datasets: [{
                    data: [tax, shipping, items],
                    label: ['Taxes','Shipping','Items'],
                    backgroundColor: ["rgb(255, 99, 132)","rgb(54, 162, 235)","rgb(255, 205, 86)"],
                    borderColor: ['#fff', '#fff', '#fff'],
                    borderWidth: 3

                }]
            },
            options: {
                responsive: true,
                tooltips: {
                    callbacks: {
                        label: (event, legend) => {
                            return `${legend.datasets[0].label[event.index]}: $${legend.datasets[0].data[event.index]}`
                        },
                        title: (event, legend) => {
                            
                        }
                    }
                }
            }
        });

        return myChart
    }

    async getOrders(){
        const {data} = await api.get("/api/orders/all", {headers: {'auth-token': this.signedUserInfo.token}})
        
        let tax = 0
        let shipping = 0
        let items = 0

        for(let item of data){
            tax += item.taxPrice
            shipping += item.shippingPrice
            items += item.itemsPrice
        }

        let total = (tax + shipping + items).toFixed(2)
        
        return [tax, shipping, items, total]

    }

    async afterRender(){
        this.handleDisplayChart()

        const dashboardAsidePlaceholder = document.querySelector(".dashboardAsidePlaceholder")
        dashboardAside.render(dashboardAsidePlaceholder)

    }

    async render(){
        changeMainComponentGridLayout("full-start / full-end")

        const [tax, shipping, items, total] = await this.getOrders()

        return `

            <section id="orders">
                <section class="dashboardAsidePlaceholder"></section>

                <article class="">
                    <h1 class="title">Orders detail</h1>

                    <section>
                    
                        <group>
                            <subgroup>
                                <span class="material-icons">
                                    group
                                </span>
                                <span>Taxes</span>
                            </subgroup>
                            <span>$${tax}</span>
                        </group>
                    
                        
                    
                        <group>
                            <subgroup>
                                <span class="material-icons">
                                    add_shopping_cart
                                </span>
                                <span>Shipping</span>
                            </subgroup>
                            <span>$${shipping}</span>
                        </group>
                    

                    
                        <group>
                            <subgroup>
                                <span class="material-icons">
                                    attach_money
                                </span>
                                <span>Items</span>
                            </subgroup>
                            <span>$${items}</span>
                        </group>
                        
                    </section>

                    <div>
                        <span>Sales details</span>
                        <article class="canvasContainer">
                            <canvas id="myChart"></canvas>
                        </article>
                    </div>

                </article>
                
            </section>
            
            
        `
    }
}