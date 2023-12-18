<template>
    <v-container>
        <v-row class="mb-10">
            <v-col cols="12" md="8">
                <p class="text-bold mt-10 mb-4" style="font-size: 24px;">Cart</p>
                <CartItems v-if="cartItems.length > 0"/>
                <div class="d-flex flex-column align-center justify-center" v-else>
                    <v-img width="100" src="/img/Empty-Cart.png" alt=""></v-img>
                    <h4 class="mt-4 text-bold">Your cart is empty</h4>
                </div>
            </v-col>
            <v-col cols="12" md="4">
                <p class="mt-md-10 mt-1 mb-4" style="font-size: 24px;">
                    <span class="checkout-text text-bold ">Check out</span>
                    <span class="pmethod-text text-bold ">Billing Information</span>
                </p>
                <CartControls v-if="!drawer"/>
            </v-col>
        </v-row>
        <OtherCampaigns/>
    </v-container>
</template>
<script lang="ts" setup>
definePageMeta({middleware: ["auth"]})
const props = defineProps(['drawer'])
const {cartItems} = useCart()
</script>

<style lang="scss">
@media screen and (max-width: 959px) {
    .checkout-text{
        display: none;
    }
    .pmethod-text{
        display: block;
    }
}
@media screen and (min-width: 960px) {
    .checkout-text{
        display: block;
    }
    .pmethod-text{
        display: none;
    }
}
</style>