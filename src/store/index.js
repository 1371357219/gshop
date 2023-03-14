import Vue from 'vue'
import Vuex from 'vuex'
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RECEIVE_INFO,
    RECEIVE_RATINGS,
    RECEIVE_GOODS,
    INCRMENT_FOOD_COUNT,
    DECRMENT_FOOD_COUNT,
    CLEAR_CART,
    RECEIVE_SEARCH_SHOPS,
    RESET_USER_INFO
} from './mutation-types'

import {
    reqAddress,
    reqCategorys,
    reqShops,
    reqUser,
    reqShopGoods,
    reqShopRatings,
    reqShopInfo,
    reqSearchGoods,
    reqLogout
} from '../api'
Vue.use(Vuex)
// 准备actions 用于响应组件中的动作
const actions = {
    // 异步获取地址
    async getAddress({ commit, state }) {
        // 发送异步ajax请求
        const geohash = state.latitude + ',' + state.longitude;
        const result = await reqAddress(geohash)
        // 提交一个mutation
        if (result.code === 0) {
            const address = result.data;
            commit(RECEIVE_ADDRESS, { address })
        }
    },
    // 异步获取食品分类列表
    async getCategorys({ commit, state }) {
        // 发送异步ajax请求
        const result = await reqCategorys()
        // 提交一个mutation
        if (result.code === 0) {
            const categorys = result.data;
            commit(RECEIVE_CATEGORYS, { categorys })
        }
    },
    // 异步获取商家列表
    async getShops({ commit, state }) {
        // 发送异步ajax请求
        const { longitude, latitude } = state;
        const result = await reqShops(longitude, latitude)
        // 提交一个mutation
        if (result.code === 0) {
            const shops = result.data;
            commit(RECEIVE_SHOPS, { shops })
        }
    },

    //异步搜索商家列表
  async searchShop({commit, state}, keyword) {
    const {latitude, longitude} = state
    const result = await reqSearchGoods(latitude+','+longitude, keyword)
    commit(RECEIVE_SEARCH_SHOPS, {searchShops: result.data})
  },

    // 同步记录用户信息
    recordUser({ commit }, userInfo) {
        commit(RECEIVE_USER_INFO, { userInfo })
    },

    // 异步获取用户信息
    async getUserInfo({ commit }) {
        const result = await reqUser()
        if (result.code === 0) {
            const userInfo = result.data
            commit(RECEIVE_USER_INFO, { userInfo })
        }
    },
    // 异步登出
    async logout({ commit }) {
        const result = await reqLogout()
        if (result.code === 0) {
            commit(RESET_USER_INFO)
        }
    },
    // 异步获取商家信息
    async getShopInfo({ commit }, cb) {
        const result = await reqShopInfo()
        if (result.code === 0) {
            const info = result.data
            info.score = 3.5
            commit(RECEIVE_INFO, { info })

            cb && cb()
        }
    },

    // 异步获取商家评价列表
    async getShopRatings({ commit }, cb) {
        const result = await reqShopRatings()
        if (result.code === 0) {
            const ratings = result.data
            commit(RECEIVE_RATINGS, { ratings })

            cb && cb()
        }
    },

    // 异步获取商家商品列表
    async getShopGoods({ commit }, cb) {
        const result = await reqShopGoods()
        if (result.code === 0) {
            const goods = result.data
            commit(RECEIVE_GOODS, { goods })
            // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
            cb && cb()
        }
    },

    // 增加/减少指定食物的数量
    updateFoodCount({ commit }, { food, isAdd }) {
        if (isAdd) {
            commit(INCRMENT_FOOD_COUNT, { food })
        } else {
            commit(DECRMENT_FOOD_COUNT, { food })
        }
    },

    // 清空购物车
    clearCart({ commit }, foods) {
        commit(CLEAR_CART, { foods })
    },
}


// 准备mutations 用于操作数据（state）
const mutations = {
    [RECEIVE_ADDRESS](state, { address }) {
        state.address = address
    },
    [RECEIVE_CATEGORYS](state, { categorys }) {
        state.categorys = categorys
    },
    [RECEIVE_SHOPS](state, { shops }) {
        state.shops = shops
    },
    [RECEIVE_USER_INFO](state, { userInfo }) {
        state.userInfo = userInfo
    },
    [RESET_USER_INFO](state) {
        state.userInfo = {}
    },

    [RECEIVE_INFO](state, { info }) {
        state.info = info
    },

    [RECEIVE_RATINGS](state, { ratings }) {
        state.ratings = ratings
    },

    [RECEIVE_GOODS](state, { goods }) {
        state.goods = goods
    },

    [INCRMENT_FOOD_COUNT](state, { food }) {
        if (food.count) {
            food.count++
        } else {
            // food.count = 1 //给food添加属性count, 值为1    没有数据绑定
            // 添加一个带数据绑定的属性
            Vue.set(food, 'count', 1)
            state.cartFoods.push(food)
        }
    },

    [DECRMENT_FOOD_COUNT](state, { food }) {
        if (food.count) {
            food.count--
            if (food.count === 0) {
                const index = state.cartFoods.indexOf(food)
                state.cartFoods.splice(index, 1)
            }
        }
    },

    [CLEAR_CART](state, { foods }) {
        foods.forEach(food => food.count = 0)
        foods.splice(0,foods.length)
       
        // state.cartFoods=[]
        
    },

    [RECEIVE_SEARCH_SHOPS](state, { searchShops }) {
        state.searchShops = searchShops
    },


}
// 准备state 用于存储数据
const state = {
    latitude: 40.10038, // 纬度
    longitude: 116.36867, // 经度
    address: {}, // 地址信息对象
    categorys: [], // 食品分类数组
    shops: [], //商家数组
    userInfo: {}, // 用户信息
    goods: [], // 商品列表
    ratings: [], // 商家评价列表
    info: {}, // 商家信息
    cartFoods: [], // 购物车
    searchShops: []
}
// 准备getters 用于将state中的数据进行加工

const getters = {
    totalCount (state) {
        return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
      },
    
      totalPrice (state) {
        return state.cartFoods.reduce((preTotal, food) => preTotal + food.count * food.price, 0)
      }
}
// 创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})