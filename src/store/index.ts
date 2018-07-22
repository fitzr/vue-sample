import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import products from './modules/products'
import createLogger from 'vuex/dist/logger'
import { namespace } from 'vuex-class'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const loggerOption = {}

export default new Vuex.Store({
    modules: {
      cart,
      products
    },
    strict: debug,
    plugins: debug ? [createLogger(loggerOption)] : []
})

export const ns = {
    cart: namespace('cart'),
    products: namespace('products'),
}
