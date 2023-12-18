<template>
    <div>
        <div class="text-center w-full">
            <p class="text-bold text-color-secondary text-section-title mb-4">EXPLORE PROMOTIONS</p>
            <!--            <div class="d-flex overflow-x-auto justify-start justify-sm-center w-full">-->
            <!--                <v-hover v-slot:default="{ isHovering, props }" v-for="(category, i) in campaignCategories" :key="i">-->
            <!--                    <v-btn min-width="100" height="30" v-bind="props" class="mr-2 campaign__btn__home"-->
            <!--                        :class="{ 'bg__blue': isHovering || currentCategory === category.id, 'bg-secondary': !isHovering && currentCategory !== category.id }"-->
            <!--                        @click="filterByCategory(category)">-->
            <!--                        <span class="category-name">{{ category.name }}</span>-->
            <!--                    </v-btn>-->
            <!--                </v-hover>-->
            <!--            </div>-->
        </div>
        <v-card v-for="(campaign, i) in  currentCampaigns " :key="i"
            class="border-radius-regular elevation-6 home-campaign mb-4">
            <v-row no-gutters>
                <v-col cols="12" md="6">
                    <v-img :src="campaign.media?.getFullUrl()" cover width="100%" height="100%">
                        <div class="campaign-count-down hidden">
                            <span class="text-bold">ENDS IN</span>
                            <div class="campaign-count-down__time text-bold" :id="`draw-count-down-${campaign.id}`">
                                {{ $countDown(campaign.end_date, `draw-count-down-${campaign.id}`) }}
                            </div>
                        </div>
                    </v-img>
                </v-col>
                <v-col cols="12" md="6" class="campaign-details-container">
                    <div class="campaign-details pa-4">
                        <div class="d-flex">
                            <div>
                                <p class="campaign-details__header text-bold"> <span
                                        class="text-red-darken-4 text-extra-bold-italic">WIN:</span> {{ campaign.name }}</p>
                                <p class="campaign-details__subtitle">{{ campaign.subtitle }}</p>
                                <p class="campaign-details__price text-bold">₱{{
                                    campaign.product?.formattedPrice() }}</p>
                                <br />
                            </div>
                            <v-spacer></v-spacer>
                            <img class="__product" :src="campaign.product?.media?.getFullUrl()" />
                        </div>
                        <!-- <v-progress-linear :model-value="campaign.max_tickets"
                            :color="100 < 60 ? 'yellow-darken-2' : 'red-darken-3'" height="20" rounded>
                            <span class="campaign-details__percentage"
                                :class="{ 'text-color-white': 100 > 60, 'text-color-primary': 100 < 60 }">
                                100 sold
                            </span>
                        </v-progress-linear> -->
                        <br />
                        <div class="cc-btn-container-home">
                            <div class="cc-btn-container-home__item">
                                <v-hover v-slot:default="{ isHovering, props }">
                                    <v-btn :to="`/promotions/${campaign.slug}`" height="50" width="100%" v-bind="props"
                                        class="campaign__btn__home mr-2 w-full" @click="campaignDetails = campaign"
                                        :class="{ 'bg__blue': isHovering, 'bg-secondary': !isHovering }">
                                        Prize details
                                    </v-btn>
                                </v-hover>
                            </div>
                            <div class="cc-btn-container-home__item">
                                <v-hover v-slot:default="{ isHovering, props }"
                                    v-if="campaign.product && campaign.product.stock > 0">
                                    <v-btn height="50" width="100%" v-bind="props" class="campaign__btn__home mr-2"
                                        @click="addToCart(campaign.product?.id, 1, campaign.id)"
                                        :class="{ 'bg__blue': isHovering, 'bg__primary': !isHovering }">
                                        <v-icon class="mr-1" center icon="custom:cart"></v-icon>
                                        <span>Add to cart</span>
                                    </v-btn>
                                </v-hover>
                                <v-btn v-else height="50" width="100%"
                                    class="campaign__btn__campaign-card mr-2 bg__primary" disabled>
                                    <span>Out of stock</span>
                                </v-btn>
                            </div>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script lang="ts" setup>
import CampaignCategory from "@/models/campaign-category"

const { getCurrentCampaigns, currentCampaigns, campaignDetails, getCampaignCategories, campaignCategories } = useCampaigns()
const { addToCart } = useCart()
const { $countDown } = useNuxtApp()
const currentCategory: any = ref(null)

await getCurrentCampaigns()
await getCampaignCategories()

function filterByCategory(category: CampaignCategory) {
    currentCategory.value = category.id
    getCurrentCampaigns({ category: category.id })
}
</script>

<style lang="scss" scoped>
.home-campaign {
    &:hover {
        box-shadow: 0px 0px 5px 5px rgb(0 0 0 / 0.3) !important;
    }
}

.category-name {
    font-size: 14px;
}

.campaign-details-container {
    display: flex;
    align-items: center;

    .campaign-details {
        color: $secondary;
        padding-bottom: 20px;
        width: 100%;

        .__product {
            border: 2px solid #ededed;
            height: 100px;
            width: 100px;
            border-radius: 5px;
        }

        &__header {
            font-size: 30px;
        }

        &__description {
            font-size: 14px;
        }

        &__subtitle {
            font-size: 14px;
        }

        &__price {
            font-size: 20px;
        }

        &__percentage {
            font-size: 14px;
        }

        .campaign__btn__home {
            font-size: 16px;
            border-radius: 10px !important;
        }

        .cc-btn-container-home {
            display: flex;
            position: relative;
            gap: 4px;
            bottom: 0;
            width: 50%;
            right: 0;
            width: 100%;
            @media screen and (max-width:959px) {
                width: 100%;
            }
            &__item {
                width: 50%;
            }
        }
    }
}

.campaign-count-down {
    position: absolute;
    top: 1rem;
    left: 1rem;
    color: $white;
    background-color: $red;
    padding: 10px;
    border-radius: 5px;
    text-align: center;

    &__time {
        background-color: $white;
        color: $red;
        padding: 10px;
        border-radius: 5px;
        width: 100%;
        white-space: nowrap;
    }
}

@media screen and (max-width: 480px) {
    .text-section-title {
        font-size: 24px !important;
    }

    .category-name {
        font-size: 14px !important;
    }

    .campaign-details-container {
        .campaign-details {
            &__header {
                font-size: 22px !important;
            }

            &__subtitle {
                font-size: 14px !important;
            }

            &__price {
                font-size: 18px !important;
            }

            &__percentage {
                font-size: 12px !important;
            }

            .campaign__btn__home {
                height: 50px !important;
                font-size: 14px !important;
            }

            .__product {
                height: 75px;
                width: 75px;
            }
        }

    }
}
</style>