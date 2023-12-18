<template>
  <v-card
    class="pa-8 elevation-6 prize-cart-controls top-shadow border-radius-regular"
  >
    <div class="d-md-block d-flex" style="gap: 6px;">
      <div class="d-flex pa-2 align-center prize-cart-controls__price">
        <div>
          <p class="text-bold total">Price</p>
          <!-- <p class="vat">Inclusive of VAT</p> -->
        </div>
        <v-spacer></v-spacer>
        <div>
          <p class="text-bold total">
            ₱{{
              $numberDisplayFormat(product.price * quantity)
            }}
          </p>
        </div>
      </div>
      <div class="prize-cart-controls__controls mt-2">
        <button
          class="deduct-quantity"
          @click="() => (quantity > 1 ? quantity-- : quantity)"
        >
          -
        </button>
        <button class="quantity">{{ quantity }}</button>
        <button class="add-quantity" @click="quantity++">+</button>
      </div>
    </div>
    <v-hover v-slot:default="{ isHovering, props }" v-if="product.stock > 0">
      <v-btn
        height="50"
        width="100%"
        v-bind="props"
        class="campaign__btn__product mt-2"
        :class="{ bg__blue: isHovering, 'bg-secondary': !isHovering }"
        @click="addToCart(product.id, quantity)"
      >
        <v-icon center icon="mdi-cart"></v-icon>
        <span class="ml-2">Add to cart</span>
      </v-btn>
    </v-hover>
    <v-btn
      v-else
      height="50"
      width="100%"
      class="campaign__btn__product mt-2 bg-secondary"
      disabled
    >
      <span class="ml-2">Out of stock</span>
    </v-btn>
  </v-card>
</template>

<script lang="ts" setup>
defineProps(["product"]);
const { addToCart } = useCart();
const quantity = ref(1);
const {$numberDisplayFormat} = useNuxtApp()
</script>

<style lang="scss" scoped>
.prize-cart-controls {
  &__title {
    font-size: 22px;
  }

  &__price {
    font-size: 15px;
    border: 2px solid $gray;
    color: $primary;
    border-radius: 5px;

    .vat {
      font-size: 12px;
    }

    .total {
      font-size: 22px;
    }
  }

  &__controls {
    display: flex;
    width: 100%;

    button {
      border: 2px solid $gray;
      color: $primary;
      border-radius: 5px;
      height: 56px;

      &:hover {
        background-color: $blue;
        border: 2px solid $blue;
        color: $white;
      }
    }

    .deduct-quantity {
      width: 60px;
      margin-right: 4px;
      font-family: "Montserrat-bold";
    }

    .add-quantity {
      width: 60px;
      margin-left: 4px;
      font-family: "Montserrat-bold";
    }

    .quantity {
      width: 100%;
    }
  }
}

@media screen and (max-width: 959px) {
  .prize-cart-controls {
    &__title {
      font-size: 22px;
    }

    &__price {
        font-size: 16px !important;
        height: 56px !important;
        width: 400px;
      .vat {
      }

      .total {
        font-size: 16px !important;
      }
    }

    &__controls {
        margin-top: 0 !important;
        width: 100%;
      button {
        height: 56px !important;
      }

      .deduct-quantity {
        width: 50%;
      }

      .add-quantity {
        width: 50%;
      }

      .quantity {
        // width: 49.48px;
      }
    }
  }
}
</style>