<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <p v-show="!cartProducts.length"><i>Please add some products to cart.</i></p>
    <ul>
      <li v-for="product in cartProducts" :key="product.key">
        {{ product.title }} - {{ product.price | currency }} x {{ product.quantity }}
      </li>
    </ul>
    <p>Total: {{ cartTotalPrice | currency }}</p>
    <p><button :disabled="!cartProducts.length" @click="checkout(cartProducts)">Checkout</button></p>
    <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ns } from '../store'
import currency from '../filters/currency'

@Component({
  filters: { currency }
  })
export default class ShoppingCart extends Vue {
  @ns.cart.Action
  checkout: (products: Item[]) => {}

  @ns.cart.Getter
  cartProducts: any[]

  @ns.cart.Getter
  cartTotalPrice: number

  @ns.cart.Getter
  checkoutStatus: string
}
</script>
