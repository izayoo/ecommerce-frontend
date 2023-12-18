<template>
    <div>
        <v-card class="pl-2 pr-2 pb-10 pt-10 elevation-6 border-radius-regular">
            <div class="d-flex">
                <div class="prize-details d-flex  flex-column align-center">
                    <v-btn width="200" class="bg__gray rounded-pill product-details__label mb-10">Prize Details</v-btn>
                    <div class="img-container">
                        <v-img height="200" width="200" :src="campaignDetails.banner?.getFullUrl()" />
                    </div>
                    <div class="d-flex align-center md-tab-buttons">
                        <button class="rounded-s-pill bg__gray">Prize Details</button>
                        <button class="rounded-e-pill" @click="showProductDetails">Product Details</button>
                    </div>
                    <p class="prize-details__title">
                        <span class="text-bold">Win: </span>
                        {{ campaignDetails.name }}
                    </p>
                    <p class="prize-details__description">
                        {{ campaignDetails.description }}
                    </p>
                </div>
                <div class="divider d-md-flex d-none"></div>
                <div class="product-details d-md-flex d-none flex-column align-center">
                    <v-btn width="200" class="bg__gray rounded-pill product-details__label mb-10">Product Details</v-btn>
                    <div class="img-container">
                        <v-img height="200" width="200" :src="campaignDetails.product?.media?.getFullUrl()" />
                    </div>
                    <div class="d-flex align-center md-tab-buttons">
                        <button class="rounded-s-pill" @click="showPrizeDetails">Prize Details</button>
                        <button class="rounded-e-pill bg__gray">Product Details</button>
                    </div>
                    <p class="product-details__title"> <span class="text-bold">Buy: </span>{{ campaignDetails.product?.name
                    }}</p>
                    <p class="product-details__description">
                        {{ campaignDetails.product?.description }}
                    </p>
                </div>
            </div>

            <div class="mt-8" style="text-align: left !important; padding: 0 20px 0 20px;">
                <p v-html="campaignDetails.draw_mechanics"></p>
            </div>
        </v-card>
        <!--        <v-expansion-panels class="mt-4">-->
        <!--            <v-expansion-panel v-for="(panel, i) in panels" :key="i" class="elevation-6 mb-2 border-radius-regular">-->
        <!--                <v-expansion-panel-title>-->
        <!--                    <p class="text-bold">{{ panel.title }}</p>-->
        <!--                </v-expansion-panel-title>-->
        <!--                <v-expansion-panel-text>-->
        <!--                    <p style="font-size: 14px;">-->
        <!--                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut-->
        <!--                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco-->
        <!--                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in-->
        <!--                        voluptate velit esse cillum dolore eu fugiat nulla pariatur.-->
        <!--                    </p>-->
        <!--                </v-expansion-panel-text>-->
        <!--            </v-expansion-panel>-->
        <!--        </v-expansion-panels>-->
    </div>
</template>
<script lang="ts" setup>
defineProps(['campaignDetails'])

const panels = [
    {
        title: 'Draw Details',
    },
    {
        title: 'How it works',
    },
    {
        title: 'FAQs',
    }
]

function showPrizeDetails() {
    const prizeDetails = document.querySelector('.prize-details')
    const productDetails = document.querySelector('.product-details')

    productDetails?.classList.remove('d-flex')
    productDetails?.classList.add('d-none')

    prizeDetails?.classList.remove('d-none')
    prizeDetails?.classList.add('d-flex')
}

function showProductDetails() {
    const prizeDetails = document.querySelector('.prize-details')
    const productDetails = document.querySelector('.product-details')

    prizeDetails?.classList.remove('d-flex')
    prizeDetails?.classList.add('d-none')

    productDetails?.classList.remove('d-none')
    productDetails?.classList.add('d-flex')

}
</script>

<style lang="scss" scoped>
.divider {
    width: 2px;
    background-color: rgb(146 145 145 / 14%);
    position: relative;
    height: 262px;
}

.product-details {
    text-align: center;
    padding: 10px;
    width: 50%;

    @media screen and (max-width:959.09px) {
        width: 100%;
    }

    &__title {
        font-size: 20px;
    }

    &__label {
        font-size: 14px;
    }

    &__description {
        font-size: 14px;
    }
}

.prize-details {
    text-align: center;
    padding: 10px;
    width: 50%;

    @media screen and (max-width:959.09px) {
        width: 100%;
    }

    &__title {
        font-size: 20px
    }

    &__label {
        font-size: 14px;
    }

    &__description {
        font-size: 14px;
    }
}

.product-details,
.prize-details {
    .md-tab-buttons {
        display: none !important;
        font-size: 16px;
    }

    .img-container {
        width: 200px;
        height: 200px;
    }
}

@media screen and (max-width: 480px) {
    .product-details {
        &__title {
            font-size: 20px;
        }

        &__label {
            font-size: 14px;
        }

        &__description {
            font-size: 14px;
        }
    }

    .prize-details {
        &__title {
            font-size: 20px
        }

        &__label {
            font-size: 14px;
        }

        &__description {
            font-size: 14px;
        }
    }
}

@media screen and (max-width:959.09px) {
    .product-details {
        &__label {
            display: none;
        }
    }

    .prize-details {
        &__label {
            display: none;
        }
    }

    .product-details,
    .prize-details {
        .md-tab-buttons {
            display: block !important;
            margin-bottom: 10px;
            margin-top: 10px;

            button {
                width: 150px;
                padding: 10px;
                border-top: 1px solid $gray !important;
                border-bottom: 1px solid $gray !important;

                &:hover {
                    background-color: $gray;
                }
            }

            :first-child {
                border-left: 1px solid $gray;
            }

            :last-child {
                border-right: 1px solid $gray;
            }
        }
    }
}
</style>
