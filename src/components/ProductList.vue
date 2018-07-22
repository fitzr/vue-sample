<template>
  <ul>
    <li v-for="product in products" :key="product.id">
      {{ product.title }} - {{ product.price | currency }}
      <br>
      <button
        :disabled="!product.inventory"
        @click="addProductToCart(product)">
        Add to cart
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import currency from '../filters/currency'
import { ns } from '../store'

@Component({
  filters: { currency }
  })
export default class ProductList extends Vue {
  created () {
    this.fetchAllProducts()
  }

  @ns.products.Action
  fetchAllProducts: Function

  @ns.products.Getter('getAll')
  products: Item[]

  @ns.cart.Action
  addProductToCart: Function
}
</script>
