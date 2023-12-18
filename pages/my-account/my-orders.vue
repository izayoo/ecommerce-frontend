<template>
  <div>
    <p class="text-bold mt-10 mb-4 title" style="font-size: 25px">My Orders</p>
    <v-card v-for="(order, i) in orderHistory" :key="i" class="elevation-6 purchases mb-4 pa-4">
      <div class="purchases__order_id">
        <p>
          <span class="text-bold">Order ID: {{ order.order_no }}</span>
        </p>
        <p class="text-bold">Purchased on: {{ $dateDisplayFormat(order.created_at) }}</p>
      </div>
      <div class="mt-12"></div>
      <v-row class="pt-4" v-for="(product, j) in order.order_products" style="font-size: 14px" no-gutters>
        <v-col cols="12" md="3" class="d-md-flex justify-start d-none">
          <img width="100" height="100" :src="product.product.media.path + '/' + product.product.media.filename
            " />
        </v-col>
        <v-col cols="12" md="9">
          <v-row class="mb-2" no-gutters>
            <v-col cols="12" md="6">
              <div class="d-flex">
                <div>
                  <p v-if="product.campaign != null">
                    <span class="text-bold">Promo: </span>{{ product.campaign ? product.campaign.name : "" }}
                  </p>
                  <p class="text-bold">
                    <span class="text-bold">Product: </span>{{ product.product.name }}
                  </p>
                  <p>
                    <span class="text-bold">Price: </span>₱{{
                      $numberDisplayFormat(product.product.price)
                    }}
                  </p>
                  <p>
                    <span class="text-bold">Quantity: </span>{{ product.quantity }}
                  </p>
                  <div class="d-md-none d-block">
                    <p>
                      <span class="text-bold">No. of tickets issued: </span>{{ product.campaign ? product.quantity : 0 }}
                    </p>
                    <p>
                      <span class="text-bold">Payment Method: </span>{{ order.payment_method }}
                    </p>
                    <p><span class="text-bold">Shipping Fee: </span>₱{{ order.shipping }}</p>
                    <p>
                      <span class="text-bold">Donated: </span>{{ product.is_for_donation ? "Yes" : "No" }}
                    </p>
                  </div>
                </div>
                <v-spacer></v-spacer>
                <img class="d-block d-md-none" width="100" height="100" :src="product.product.media.path +
                  '/' +
                  product.product.media.filename
                  " />
              </div>
            </v-col>
            <v-col cols="12" md="6" class="d-md-block d-none">
              <p>
                <span class="text-bold">No. of tickets issued: </span>{{ product.campaign ? product.quantity : 0 }}
              </p>
              <p>
                <span class="text-bold">Payment Method: </span>{{ order.payment_method }}
              </p>
              <p><span class="text-bold">Shipping Fee: </span>₱{{ order.shipping }}</p>
              <p>
                <span class="text-bold">Donated: </span>{{ product.is_for_donation ? "Yes" : "No" }}
              </p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <div class="d-flex mt-3">
        <p class="text-bold" style="font-size: 14px; text-transform: capitalize">
          Status:
          <span class="text-bold" :class="{
            'text-success': order.status === 'completed',
            'text-error': order.status === 'payment failed',
          }">{{ order.status }}</span>
        </p>
        <v-spacer></v-spacer>
        <p class="text-bold" style="font-size: 14px">
          Total: ₱{{
            $numberDisplayFormat(order.total)
          }}
        </p>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { useAuth } from "~/composables/useAuth";
import order from "~/models/order";

const { orderHistory, getPurchaseHistory } = useAuth();
const { $numberDisplayFormat, $dateDisplayFormat } = useNuxtApp()

await getPurchaseHistory();

useHead({
    title: `My Orders`
})
</script>

<style lang="scss">
.purchases {
  position: relative;

  &__order_id {
    background-color: $primary;
    position: absolute;
    padding: 15px 10px 15px 10px;
    color: $white;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 585px) {
      flex-direction: column;
      justify-items: start;
      align-items: start;
    }
  }
}

@media screen and (max-width: 480px) {
  .title {
    font-size: 24px !important;
  }

  .purchases {
    p {
      font-size: 14px !important;
    }
  }
}
</style>