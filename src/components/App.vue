<template lang="pug">
#app
  h1 Shopping Cart Example
  hr
  h2 Products
  ProductList
  hr
  ShoppingCart
</template>

<script lang="ts">
import ProductList from './ProductList.vue'
import ShoppingCart from './ShoppingCart.vue'

export default {
  components: { ProductList, ShoppingCart }
}
</script>
