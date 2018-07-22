import Shop from '../../api/Shop'

// initial state
// shape: [{ id, quantity }]
const state: CartState = {
  items: [],
  checkoutStatus: null
}

// getters
const getters = {
    cartProducts: (state: CartState, getters: any, rootState: any): any => {
        return state.items.map(({id, quantity}) => {
            const product = rootState.products.all.find((product: Item) => product.id === id)
            return {
                // @ts-ignore
                title: product.title,
                // @ts-ignore
                price: product.price,
                quantity
            }
        })
    },

    cartTotalPrice: (state: CartState, getters: any): number => {
        return getters.cartProducts.reduce((total: number, product: { price: number, quantity: number }) => {
            return total + product.price * product.quantity
        }, 0)
    },

    checkoutStatus: (state: CartState) => state.checkoutStatus
}

// actions
const actions = {
  async checkout ({ commit, state }: { state: CartState, commit: any }, products: Item[]) {
    const savedCartItems = [...state.items]
    commit('setCheckoutStatus', null)
    // empty cart
    commit('setCartItems', { items: [] })
    try {
      await Shop.buyProducts(products)
      commit('setCheckoutStatus', 'successful')
    } catch {
      commit('setCheckoutStatus', 'failed')
      // rollback to the cart saved before sending the request
      commit('setCartItems', { items: savedCartItems })
    }
  },

  addProductToCart ({ state, commit }: { state: CartState, commit: any }, product: Item) {
    commit('setCheckoutStatus', null)
    if (product.inventory > 0) {
      const cartItem = state.items.find(item => item.id === product.id)
      if (!cartItem) {
        commit('pushProductToCart', { id: product.id })
      } else {
        commit('incrementItemQuantity', cartItem)
      }
      // remove 1 item from stock
      commit('products/decrementProductInventory', { id: product.id }, { root: true })
    }
  }
}

// mutations
const mutations = {
  pushProductToCart (state: CartState, { id }: Item) {
    state.items.push({
      id,
      quantity: 1
    })
  },

  incrementItemQuantity (state: CartState, { id }: Item) {
    const cartItem = state.items.find(item => item.id === id)
    // @ts-ignore
    cartItem.quantity++
  },

  setCartItems (state: CartState, { items }: CartState) {
    state.items = items
  },

  setCheckoutStatus (state: CartState, status: string) {
    state.checkoutStatus = status
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
