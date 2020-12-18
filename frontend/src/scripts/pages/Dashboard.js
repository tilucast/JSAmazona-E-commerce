import changeMainComponentGridLayout from '../utils/changeMainComponent'
import {api} from '../utils/api'
import {getLocalStorageItem} from '../utils/localStorageRequests'
import {Chart} from 'chart.js'
import DashboardAside from '../components/DashboardAside'
import { adminProtected } from '../utils/protectedRoute'

const dashboardAside = new DashboardAside()

export default class Dashboard{
    constructor(){}

    get signedUserInfo(){
        return getLocalStorageItem("signedUserInfo")
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
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: chartLabel ,
                datasets: [{
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

        const dashboardAsidePlaceholder = document.querySelector(".dashboardAsidePlaceholder")
        dashboardAside.render(dashboardAsidePlaceholder)
    }

    async render(){

        if(!this.signedUserInfo.isAdmin) return adminProtected()

        changeMainComponentGridLayout("full-start / full-end")

        const [totalUsers, totalOrders, totalSales] = await this.fetchUsersOrdersSales()

        this.handleDisplayChart()

        return `

        <section class="dashboard">

            <section class="dashboardAsidePlaceholder"></section>

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
                        <span>$${totalSales}</span>
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