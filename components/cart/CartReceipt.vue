<template>
    <v-card class="pa-8 elevation-6 border-radius-regular receipt-card">
        <div class="tip text-center text-green" style="font-size: 11px;">
            Tip: Avoid shipping fees, donate your product instead.
        </div>
        
        <div class="d-flex align-center receipt">
            <div class="receipt__header">
                <p class="text-bold total">Total</p>
                <!-- <p class="vat">Inclusive of VAT</p> -->
            </div>
            <v-spacer></v-spacer>
            <div class="text-bold receipt__total">
                ₱{{ $numberDisplayFormat(getCartTotal()) }}
            </div>
        </div>

        <div class="subtotal-vat" v-if="shippingFee != 0">
<!--            <hr class="mt-2 mb-2">-->
            <div class="d-flex">
                <p class="subtotal-text">Shipping</p>
                <v-spacer></v-spacer>
                <p class="subtotal">₱{{ $numberDisplayFormat(shippingFee) }}</p>
            </div>

<!--            <hr class="mt-2 mb-2">-->

            <div class="d-flex">
                <p class="subtotal-text">Subtotal</p>
                <v-spacer></v-spacer>
                <p class="subtotal">₱{{ $numberDisplayFormat(getSubtotal()) }}</p>
            </div>
        </div>

        <v-hover v-slot:default="{ isHovering, props }">
            <v-btn height="50" width="100%" v-bind="props" class="campaign__btn  d-md-none d-block"
                :class="{ 'bg__blue': isHovering, 'bg-secondary': !isHovering }" @click="checkout" :loading="loading">
                <v-icon center icon="custom:pay"></v-icon>
                <span class="ml-2">Pay Now</span>
            </v-btn>
        </v-hover>
    </v-card>
</template>

<script lang="ts" setup>
const { getCartTotal, getSubtotal, getShipping, shippingFee, vat, getVatDeduction, checkout, loading } = useCart()
const {$numberDisplayFormat} = useNuxtApp()

getShipping()
</script>

<style lang="scss">
.receipt-card {
    .receipt {
        &__header {
            .total {
                font-size: 25px;
            }

            .vat {
                font-size: 12px;
            }
        }

        &__total {
            font-size: 25px;
        }
    }

    .subtotal-vat {
        font-size: 11px;
    }
}

@media screen and (max-width: 480px) {
    .receipt-card {
        // padding-top: 8px !important;

        .receipt {
            margin-bottom: 10px !important;
            border: 2px solid $gray !important;
            padding: 5px 20px;
            border-radius: 5px;

            &__header {
                .total {
                    font-size: 18px;
                }

                .vat {
                    font-size: 12px;
                }
            }

            &__total {
                font-size: 18px;
                align-self: self-start !important;
            }
        }

        .subtotal-vat {
            margin: 5px 20px;
        }

        .tip{
            margin-bottom: 8px;
        }
    }
}

</style>