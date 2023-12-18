<template>
    <div class="mt-10">
        <!-- USER DETAILS -->
        <p class="text-bold mb-4" style="font-size: 25px;">User Details</p>
        <v-row>
            <v-col cols="12" md="6">
                <label class="text-default">First Name</label>
                <p><b>{{ userDetails.fname }}</b></p>
            </v-col>
            <v-col cols="12" md="6">
                <label class="text-default">Last Name</label>
                <p><b>{{ userDetails.lname }}</b></p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <label class="text-default">Email</label>
                <p><b>{{ userDetails.email }}</b></p>
            </v-col>
            <v-col cols="12" md="6">
                <label class="text-default">Birth Date</label>
                <p><b>{{ userDetails.birthdate }}</b></p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <label class="text-default">Nationality</label>
                <p><b>{{ userDetails.nationality }}</b></p>
            </v-col>
            <v-col cols="12" md="6">
                <label class="text-default">Mobile No.</label>
                <p><b>({{ userDetails.country_code }}) {{ userDetails.mobile_no }}</b></p>
            </v-col>
        </v-row>
        <v-row class="mb-2">
            <v-col cols="12" md="6">
                <label class="text-default">Gender</label>
                <p><b>{{ userDetails.gender == 'm' ? 'Male' : 'Female' }}</b></p>
            </v-col>
        </v-row>

        <!-- PAYMENT ADDRESS -->
        <div v-for="(address, key) in userDetails.addresses" :key="key" class="mb-4">
            <p class="text-bold mb-4" style="font-size: 25px;">{{ address.address_type.name}} Address</p>
            <v-row>
                <v-col cols="12" md="6">
                    <label class="text-default">Region</label>
                    <p><b>{{ address.region }}</b></p>
                </v-col>

                <v-col cols="12" md="6">
                    <label class="text-default">Province</label>
                    <p><b>{{ address.province }}</b></p>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <label class="text-default">City</label>
                    <p><b>{{ address.city }}</b></p>
                </v-col>

                <v-col cols="12" md="6">
                    <label class="text-default">Barangay</label>
                    <p><b>{{ address.barangay }}</b></p>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <label class="text-default">Address Line 1</label>
                    <p><b>{{ address.address1 }}</b></p>
                </v-col>
            </v-row>
        </div>

        <!-- ORDERS -->
        <p class="text-bold mb-4" style="font-size: 25px;">Orders</p>
        <v-hover v-for="(purchase, i) in userDetails.orders" :key="i" v-slot="{ isHovering, props }">
            <NuxtLink :to="`/admin/orders/${purchase.id}`" style="text-decoration: none;">
                <v-card v-bind="props" :class="{ 'bg__blue': isHovering }" class="elevation-6 purchases mb-4 pa-4"
                    style="cursor:pointer">
                    <div class="purchases__order_id">
                        <div class="d-flex">
                          <p><span class="text-bold">Order ID: {{ purchase.order_no }}</span></p>
                          <v-spacer></v-spacer>
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
                                    <p><span class="text-bold">Donated: </span>{{ product.is_for_donation == 1 ? 'Yes' : 'No' }}</p>
                                </v-col>
                            </v-row>
                        </v-col>
                      <v-divider></v-divider>
                    </v-row>
                    <v-row class="mt-2">
                      <v-col cols="6" class="text-right">
                        <p class="text-bold">
                            Status: <span :class="{ 'text-success': purchase.status === 'Completed', 'text-error': purchase.status === 'Cancelled' }">
                            {{ purchase.status }}
                        </span>
                        </p>
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
import moment from 'moment'

const {
    getUserById,
    userDetails
} = useAdminUsers();


onMounted(() => {
    const route = useRoute()
    getUserById(+route.params.id); 
})





</script>

<style lang="scss" scoped>
.text-default {
    color: #808080;
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