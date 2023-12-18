<template>
    <div class="mt-10">
        <div class="d-flex flex-column flex-md-row mb-9">
            <p class="text-bold" style="font-size: 25px;">Orders</p>
            <v-spacer></v-spacer>
        </div>
        <div class="d-flex flex-column flex-md-row mb-4">
            <v-text-field
                class="mr-md-2 mr-0 mb-4 mb-md-0"
                label="Search order"
                append-inner-icon="mdi-magnify"
                variant="solo"
                v-model="search">
            </v-text-field>
            <v-select v-model="status"
                :items="orderStatuses" 
                variant="solo" 
                label="Status" 
                item-title="title"
                item-value="status_id"   
                class="mr-md-2 mr-0 mb-4 mb-md-0">
            </v-select>
          <v-btn height="56" class="bg__primary mr-md-2 mr-0 mb-4 mb-md-0" @click="searchFn">Search</v-btn>
          <v-btn height="56" class="bg__primary mr-md-2 mr-0 mb-4 mb-md-0" @click="reset">Reset</v-btn>
          <v-btn height="56" class="bg__primary mr-md-2 mr-0 mb-4 mb-md-0" @click="exportFn">Export</v-btn>
        </div>

        <div class="d-flex flex-column flex-md-row mb-4">
            <div class="d-flex date-range mb-4 mb-md-0">
                <div class="date-range__text rounded-s-pill">
                    <p>Date range</p>
                </div>
                <VueDatePicker v-model="date" 
                    @update:model-value="filterProductsByDate"
                    @range-start="setStartDateRange"
                    @range-end="setEndDateRange"
                    :enable-time-picker="false"
                    range>
                </VueDatePicker>
            </div>
            <v-spacer></v-spacer>
            <p class="text-bold" style="font-size: 25px;">{{ pageOptions.total }} Orders</p>
        </div>
        <v-hover v-for="(purchase, i) in pagedOrders" :key="i" v-slot="{ isHovering, props }">
            <NuxtLink :to="`/admin/orders/${purchase.id}`" style="text-decoration: none;">
                <v-card v-bind="props" :class="{ 'bg__blue': isHovering }" class="elevation-6 purchases mb-4 pa-4"
                    style="cursor:pointer">
                    <div class="purchases__order_id">
                        <div class="d-flex">
                          <p><span class="text-bold">Order ID: {{ purchase.order_no }}</span></p>
                          <v-spacer></v-spacer>
<!--                          <p><span class="text-bold">User: {{ purchase.user.fname }} {{ purchase.user.lname }}</span></p>-->
<!--                          <v-spacer></v-spacer>-->
                          <p><span class="text-bold">Purchased on: {{ moment(purchase.created_at).format("HH:mm DD MMM YYYY")  }}</span></p>
                        </div>
                    </div>
                    <v-row class="mt-8" v-for="(product, j) in purchase.order_products" :key="j">
                        <v-col cols="12" md="3" class="d-flex align-center">
                            <v-img width="200" height="200" :src="product.product.media.path + '/' + product.product.media.filename" />
                        </v-col>
                        <v-col cols="12" md="9">
                            <v-row class="mb-2" v-if="purchase.order_products">
                                <v-col cols="12" md="6">
                                    <p><span class="text-bold" v-if="product.campaign != null">Campaign: </span>
                                      {{ product.campaign ? product.campaign.name : '' }}</p>
                                    <p><span class="text-bold">Product: </span>{{ product.product.name }}</p>
                                    <p><span class="text-bold">Price: </span>₱{{ product.product.price }}</p>
                                    <p><span class="text-bold">Quantity: </span>{{ product.quantity }}</p>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <p v-if="product.campaign"><span class="text-bold">No. of tickets issued: </span>{{ product.quantity }}</p>
                                    <p><span class="text-bold">Payment Method: </span>{{ purchase.payment_method }}</p>
                                    <p><span class="text-bold">Shipping Fee: </span>₱{{ purchase.shipping }}</p>
                                    <p><span class="text-bold">Donated: </span>{{ product.is_for_donation == 1 ? 'Yes' : 'No'}}</p>
                                </v-col>
                            </v-row>
                        </v-col>
                      <v-divider></v-divider>
                    </v-row>
                    <v-row class="mt-2">
                      <v-col cols="6" class="text-right">
                        <p class="text-bold">Status: <span
                            :class="{ 'text-success': purchase.status === 'Completed', 'text-error': purchase.status === 'Cancelled' }">{{
                            purchase.status }}</span></p>
                      </v-col>
                      <v-col cols="6" class="text-right">
                        <p class="text-bold">Order Total: ₱{{ purchase.total }}</p>
                      </v-col>
                    </v-row>
                </v-card>
            </NuxtLink>
        </v-hover>

    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Order from "@/models/order";
import moment from 'moment'

import orderStatuses from '~/assets/js/order-statuses.json'
import { start } from 'repl';

const date = ref()
const search = ref("");
const status = ref("");

let filter = {
    paginate: true,
    search: '',
    status: '',
    date_from: '',
    date_to: ''
}

const {
  paged,
  pagedOrders,
  pageOptions,
  orderForm,
  loading,
  exportData
} = useAdminOrders();

onMounted(() => {
    const startDate = new Date()
    const endDate = new Date()
    // const endDate = new Date(new Date().setDate(startDate.getDate() + 7))
    date.value = [startDate, endDate]

    filter.date_from = startDate.toISOString()
    filter.date_to = endDate.toISOString()

    paged(filter) 
})





function editOrder(order: Order) {
  orderForm.value = order;
  navigateTo(`/admin/orders/${order.order_no}`);
}

function reset() {
    const startDate = new Date()
    const endDate = new Date()

    filter.search = ''
    filter.status = ''
    search.value = ""
    status.value = ""
    filter.date_from = startDate.toISOString()
    filter.date_to = endDate.toISOString()
    date.value = [startDate, endDate]
    
    paged(filter)
}


const setStartDateRange = (ModelData: any) => {
    filter.date_from = ModelData
}

const setEndDateRange = (ModelData: any) => {
    filter.date_to = ModelData
}

const filterProductsByDate = (ModelData: any) => {
    date.value = ModelData
    paged(filter)
}

const searchFn = () => {
    filter.search = search.value
    filter.status = status.value

    paged(filter)
}

const exportFn = () => {
    exportData(filter)
}

// paged();
</script>

<style lang="scss">
.date-range {
    &__text {
        background-color: $primary;
        color: $gray;
        white-space: nowrap;
        padding: 2px 20px 2px 20px;
        display: flex;
        align-items: center;
        font-size: 15px;
    }

    .dp__input {
        border-radius: 0;
        border: 1px solid $secondary;
        height: 37.5px;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
    }
}

.purchases {
    position: relative;

    &__order_id {
        background-color: $primary;
        position: absolute;
        padding: 5px 10px 5px 10px;
        color: $white;
        top: 0;
        left: 0;
        width: 100%;
    }
}
</style>