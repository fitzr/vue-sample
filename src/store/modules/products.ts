import Shop from '../../api/Shop'

// initial state
const state: ProductsState = {
  all: []
}

// getters
const getters = {}

// actions
const actions = {
  async fetchAllProducts ({ commit }: any) {
      const products = await Shop.fetchProducts()
      commit('setProducts', products)
  }
}

// mutations
const mutations = {
  setProducts (state: ProductsState, products: Item[]) {
    state.all = products
  },

  decrementProductInventory (state: ProductsState, { id }: { id: number }) {
    const product = state.all.find(product => product.id === id)
    // @ts-ignore
    product.inventory--
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
