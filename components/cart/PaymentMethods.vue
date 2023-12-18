<template>
    <v-card class="pa-8 mb-4 elevation-6 payment-methods border-radius-regular">
        <v-radio-group v-model="paymentMethod">
            <v-radio value="Card" color="secondary">
                <template v-slot:label>
                    <div class="payment-methods__item justify-space-between pa-2">
                        <p class="payment-methods__text">Credit / Debit Card</p>
                        <img class="h-auto" src="/img/thirdpartylogos/Visa.png" />
                        <img class="h-auto" src="/img/thirdpartylogos/Mastercard.png" />
                        <v-spacer></v-spacer>
                    </div>
                </template>
            </v-radio>
            <v-radio value="GCash" color="secondary">
                <template v-slot:label>
                    <div class="payment-methods__item justify-space-between pa-2">
                        <p class="payment-methods__text">GCash</p>
                        <img class="h-auto" src="/img/thirdpartylogos/Gcash.png" />
                        <v-spacer></v-spacer>
                    </div>
                </template>
            </v-radio>
            <v-radio value="COD" color="secondary">
                <template v-slot:label>
                    <div class="payment-methods__item justify-space-between pa-2">
                        <p class="payment-methods__text">COD</p>
                    </div>
                </template>
            </v-radio>
        </v-radio-group>
    </v-card>
</template>

<script lang="ts" setup>
const paymentMethod = ref(null)
</script>