<template>
    <div class="mt-10">
        <div class="d-flex flex-column flex-md-row mb-4">
            <p class="text-bold" style="font-size: 25px;">Overview</p>
            <v-spacer></v-spacer>
            <div class="d-flex date-range">
                <div class="date-range__text rounded-s-pill">
                    <p>Date range</p>
                </div>
                <VueDatePicker :model-value="date" 
                    @update:model-value="filterDashboardbyDate" 
                    @range-start="onRangeStart" 
                    @range-end="onRangeEnd"
                    :enable-time-picker="false"
                    range >
                </VueDatePicker>
            </div>
        </div>

        <div class="mb-4">
            <p class="text-bold mb-4" style="font-size: 18px;">General Information</p>
            <v-row>
                <v-col cols="12" md="4">
                    <v-card class="stat-card">
                        <div class="stat-card__wrapper">
                            <p class="stat-card__text">Active products</p>
                            <p class="stat-card__number">{{ generalInfo.active_products }}</p>
                        </div>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card class="stat-card">
                        <div class="stat-card__wrapper">
                            <p class="stat-card__text">Active campaigns</p>
                            <p class="stat-card__number">{{ generalInfo.active_campaigns }}</p>
                        </div>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card class="stat-card">
                        <div class="stat-card__wrapper">
                            <p class="stat-card__text">Total users</p>
                            <p class="stat-card__number">{{ generalInfo.total_users }}</p>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </div>

        <div class="mb-4">
            <p class="text-bold mb-4" style="font-size: 18px;">Orders</p>
            <v-row>
                <v-col cols="12" md="4">
                    <v-card class="stat-card">
                        <div class="stat-card__wrapper">
                            <p class="stat-card__text">Orders in cart</p>
                            <p class="stat-card__number">{{ transactions.cart_count }}</p>
                        </div>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card class="stat-card">
                        <div class="stat-card__wrapper">
                            <p class="stat-card__text">Completed orders</p>
                            <p class="stat-card__number">{{ transactions.orders_completed }}</p>
                        </div>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card class="stat-card">
                        <div class="stat-card__wrapper">
                            <p class="stat-card__text">Cancelled orders</p>
                            <p class="stat-card__number">{{ transactions.orders_cancelled }}</p>
                        </div>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card class="stat-card">
                        <div class="stat-card__wrapper">
                            <p class="stat-card__text">To-ship Orders</p>
                            <p class="stat-card__number">{{ transactions.orders_for_shipping }}</p>
                        </div>
                    </v-card>
                </v-col>
<!--                <v-col cols="12" md="4">-->
<!--                    <v-card class="stat-card">-->
<!--                        <div class="stat-card__wrapper">-->
<!--                            <p class="stat-card__text">For pickup Orders</p>-->
<!--                            <p class="stat-card__number">{{ transactions.total_sales }}</p>-->
<!--                        </div>-->
<!--                    </v-card>-->
<!--                </v-col>-->
                <v-col cols="12" md="4">
                    <v-card class="stat-card">
                        <div class="stat-card__wrapper">
                            <p class="stat-card__text">For donation Orders</p>
                            <p class="stat-card__number">{{ transactions.orders_for_donation }}</p>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </div>

        <div class="mb-4">
            <p class="text-bold mb-4" style="font-size: 18px;">Sales</p>
            <v-row>
                <v-col cols="12" md="4">
                    <v-card class="stat-card">
                        <div class="stat-card__wrapper">
                            <p class="stat-card__text">Total Sales</p>
                            <p class="stat-card__number">₱{{ generalInfo.total_sales }}</p>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {useAdminOverview} from "~/composables/admin/useAdminOverview";

definePageMeta({middleware: ["auth"]})

import { ref, onMounted } from 'vue'

const date = ref()
const {
  getGeneralInfo,
  generalInfo,
  getTransactions,
  transactions
} = useAdminOverview()


let filter = ref({date_from: '', date_to: ''})

onMounted(() => {
    const startDate = new Date()
    startDate.setDate(1)
    // const endDate = new Date(new Date().setDate(startDate.getDate() + 7))

    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // Move to the first day of the next month
    endDate.setDate(0); // Subtract one day to get the last day of the current month
    date.value = [startDate, endDate]

    filter.value.date_from = startDate.toISOString()
    filter.value.date_to = endDate.toISOString()

    getGeneralInfo(filter.value);
    getTransactions(filter.value);
})


const onRangeStart = (value: any) => {
    filter.value.date_from = value;
}

const onRangeEnd = (value: any) => {
    filter.value.date_to = value;
}

const filterDashboardbyDate = (dateModel: any) => {
    date.value = dateModel;
    getGeneralInfo(filter.value);
    getTransactions(filter.value);
}

</script>

<style lang="scss">
.stat-card {
    background-color: $primary !important;
    padding: 20px;

    &__wrapper {
        width: 100%;
    }

    &__text {
        font-size: 12px;
        color: $gray;
    }

    &__number {
        font-size: 30px;
        font-family: 'Montserrat-bold';
        color: $white;
    }
}

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
</style>