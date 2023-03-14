/*
 路由器对象模块
 */

 import Vue from 'vue'
 import VueRouter from 'vue-router'


//  import Home from '../pages/Home/Home.vue'
//  import Search from '../pages/Search/Search.vue'
//  import Order from '../pages/Order/Order.vue'
//  import Profile from '../pages/Profile/Profile.vue'
const Home=()=>import('../pages/Home/Home.vue')
const Search=()=>import('../pages/Search/Search.vue')
const Order=()=>import('../pages/Order/Order.vue')
const Profile=()=>import('../pages/Profile/Profile.vue')

 import Login from '../pages/Login/Login.vue'
 import Shop from '../pages/Shop/Shop.vue'
 import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
 import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
 import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'

 Vue.use(VueRouter)
// 解决路由重复跳转报错
 const originalreplace = VueRouter.prototype.replace
 VueRouter.prototype.replace = function replace(location) {
  return originalreplace.call(this, location).catch(err => err)
 }

// const routerPush = VueRouter.prototype.push;

// VueRouter.prototype.push = function (location) {

//     return routerPush.call(this, location).catch(err => {})

// };

 export default new VueRouter({
    routes:[
        {
            path:'/home',
            component:Home,
            meta: {
                showFooter: true
            }
        },
        {
            path:'/search',
            component:Search,
            meta: {
                showFooter: true
            }
        },
        {
            path:'/order',
            component:Order,
            meta: {
                showFooter: true
            }
        },
        {
            path:'/profile',
            component:Profile,
            meta: {
                showFooter: true
            }
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/shop',
            component:Shop,
            children:[
                {
                    path:'goods',
                    component:ShopGoods
                },
                {
                    path:'ratings',
                    component:ShopRatings
                },
                {
                    path:'info',
                    component:ShopInfo
                },
                {
                    path:'',
                    redirect:'goods'
                },
            ]
        },
        {
            path:'/',
            redirect:'/home'
        }
    ]
 })