<template>
    <div class="mt-10">
        <p class="text-bold mb-4" style="font-size: 25px;">Order Details / {{ orderForm.order_no }}</p>
        <v-card class="elevation-6 orderForms mb-4 pa-4">
            <div class="orderForms__order_id">
                <div class="d-flex">
                    <p><span class="text-bold">Order ID: {{ orderForm.order_no }}</span></p>
                    <v-spacer></v-spacer>
                    <p><span class="text-bold">Purchased on: {{ moment(orderForm.created_at).format("HH:mm DD MMM YYYY")  }}</span></p>
                </div>
            </div>

            <div class="mt-8">
                <p><span class="text-bold">Account ID: </span>{{ orderUser.email }}</p>
                <p><span class="text-bold">Account holder: </span>{{ orderUser.fname }} {{ orderUser.lname }}</p>
                <div v-for="address in orderUser.fname">
                  <p v-if="address.address_type == 3">
                    <span class="text-bold">Billing address: </span>
                    {{ address.address1 }} {{ address.address2 }}, {{ address.barangay }}, {{ address.city }},
                    {{ address.province }}, {{ address.region }}
                  </p>
                  <p v-if="address.address_type == 4">
                    <span class="text-bold">Shipping address: </span>
                    {{ address.address1 }} {{ address.address2 }}, {{ address.barangay }}, {{ address.city }},
                    {{ address.province }}, {{ address.region }}
                  </p>
                </div>
            </div>
            <v-row class="mt-8" v-for="(product, j) in orderForm.order_products">
                <v-col cols="12" md="3" class="d-flex align-start">
                    <v-img width="200" height="200" :src="product.product.media.path + '/' + product.product.media.filename" />
                </v-col>
                <v-col cols="12" md="9">
                    <v-row class="mb-2">
                        <v-col cols="12" md="6">
                          <p><span class="text-bold" v-if="product.campaign != null">Campaign: </span>
                            {{ product.campaign ? product.campaign.name : '' }}</p>
                          <p><span class="text-bold">Product: </span>{{ product.product.name }}</p>
                          <p><span class="text-bold">Price: </span>₱{{ product.product.price }}</p>
                          <p><span class="text-bold">Quantity: </span>{{ product.quantity }}</p>
                        </v-col>
                        <v-col cols="12" md="6">
                          <p v-if="product.campaign"><span class="text-bold">No. of tickets issued: </span>{{ product.quantity }}</p>
                          <p><span class="text-bold">Payment Method: </span>{{ orderForm.payment_method }}</p>
                          <p><span class="text-bold">Shipping Fee: </span>₱{{ orderForm.shipping }}</p>
                          <p><span class="text-bold">Donated: </span>{{ product.is_for_donation }}</p>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row class="mt-2 mb-2" v-if="product.tickets.length > 0">
                        <v-col>
                            <div>
                              <p class="text-bold">Tickets issued:</p>
                              <span>
                                <p v-for="ticket in product.tickets">{{ ticket.ticket_no }}</p>
                              </span>
                            </div>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                </v-col>
            </v-row>
            <v-col cols="12" md="9">
              <v-row class="mb-2">

              </v-row>
            </v-col>
            <v-row class="mt-2">
              <v-col cols="3"></v-col>
              <v-col cols="12" md="6">
                <p class="text-bold">Status: <span
                      :class="{ 'text-success': orderForm.status === 'Completed', 'text-error': orderForm.status === 'Cancelled' }">{{
                      orderForm.status }}</span></p>
                </v-col>
                <v-col cols="12" md="6">

                <p class="text-bold">Order Total: ₱{{ orderForm.total }}</p>
              </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script lang="ts" setup>
import order from "~/models/order";
import moment from 'moment'

const route = useRoute()
const orderId = Number(route.params.id);

const {
  orderForm,
  orderUser,
  loading,
  getOrderById
} = useAdminOrders();

getOrderById(orderId);
</script>