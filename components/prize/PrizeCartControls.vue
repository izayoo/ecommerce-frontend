<template>
    <v-card class="pa-8 elevation-6 prize-cart-controls top-shadow border-radius-regular">
        <!--        <p class="prize-cart-controls__title">-->
        <!--            Buy a <span class="text-bold">{{ campaignDetails.product?.name }}</span> and get a change to win an -->
        <!--            <span class="text-bold">{{ campaignDetails.name }}</span>-->
        <!--        </p>-->
        <!--        <br />-->

        <div class="prize-cart">
            <div class="d-flex pa-2 align-center  prize-cart-controls__price">
                <div>
                    <p class="text-bold price-text" style="font-size: 22px;">Price</p>
                    <!-- <p class="vat">Inclusive of VAT</p> -->
                </div>
                <v-spacer></v-spacer>
                <div>
                    <p class="text-bold price-value" style="font-size: 22px;">₱{{ $numberDisplayFormat(campaignDetails.product?.price *
                        quantity) }}</p>
                </div>
            </div>
            <div class="prize-cart-controls__controls">
                <button class="deduct-quantity" @click="() => quantity > 1 ? quantity-- : quantity">-</button>
                <button class="quantity">{{ quantity }}</button>
                <button class="add-quantity" @click="quantity++">+</button>
            </div>
        </div>

        <v-hover v-slot:default="{ isHovering, props }" v-if="campaignDetails.product?.stock > 0">
            <v-btn height="50" width="100%" v-bind="props" class="campaign__btn__prize mt-2"
                :class="{ 'bg__blue': isHovering, 'bg-secondary': !isHovering }"
                @click="addToCart(campaignDetails.product.id, quantity, campaignDetails.id)">
                <v-icon center icon="mdi-cart"></v-icon>
                <span class="ml-2">Add to cart</span>
            </v-btn>
        </v-hover>
        <v-btn v-else height="50" width="100%" class="campaign__btn__prize mt-2 bg-secondary" disabled>
            <span class="ml-2">Out of stock</span>
        </v-btn>
        <v-hover v-slot:default="{ isHovering, props }">
            <v-btn height="50" width="100%" v-bind="props" class="campaign__btn__prize share-btn mt-2"
                :class="{ 'bg__blue': isHovering, 'bg-secondary': !isHovering }" @click="share">
                <v-icon center icon="mdi-send"></v-icon>
                <span class="ml-2">Share</span>
            </v-btn>
        </v-hover>
    </v-card>
</template>

<script lang="ts" setup>
import { Share } from '@capacitor/share';

defineProps(['campaignDetails'])
const { addToCart } = useCart()
const quantity = ref(1)
const {$numberDisplayFormat} = useNuxtApp()

async function share() {
    await Share.share({
        url: location.href,
    });
}
</script>

<style lang="scss" scoped>
.prize-cart {
    display: flex;
    flex-direction: column;
    gap: 6px;

    .prize-cart-controls {
        &__title {
            font-size: 22px;
        }

        &__price {
            font-size: 15px;
            color: $primary;
            border-radius: 5px;
            border: 2px solid $gray;

            .vat {
                font-size: 12px;
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
                font-family: 'Montserrat-bold';
            }

            .add-quantity {
                width: 60px;
                margin-left: 4px;
                font-family: 'Montserrat-bold';
            }

            .quantity {
                width: 100%;
            }
        }
    }
}

@media screen and (max-width: 959px) {
    .prize-cart {
        flex-direction: row;

        .prize-cart-controls {
            &__price {
                gap: 8px;
                width: 500px;
                .price-text,
                .price-value {
                    font-size: 16px !important;
                    white-space: nowrap;
                }

                .vat {
                    font-size: 8px !important;
                    white-space: nowrap;
                }
            }
        }
    }
}

@media screen and (max-width: 480px) {
    .share-btn {
        display: none;
    }

    .prize-cart {
        .prize-cart-controls {
            &__price {
                width: 400px;
            }
            &__controls {
                
            .deduct-quantity {
                width: 50%;
            }

            .add-quantity {
                width: 50%;
            }
            }
        }

    }
}
</style>