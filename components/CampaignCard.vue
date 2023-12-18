<template>
    <v-card class="border-radius-regular elevation-6">
        <v-img :src="campaign.media?.getFullUrl()" width="100%" height="100%">
            <div class="campaign-count-down hidden">
                <span class="text-bold">ENDS IN</span>
                <div class="campaign-count-down__time text-bold" :id="`draw-count-down-${campaign.id}`">
                    {{ $countDown(campaign.end_date, `draw-count-down-${campaign.id}`) }}
                </div>
            </div>
        </v-img>
        <div class="campaign-details pa-4">
            <p class="campaign-details__header text-bold"><span class="text-red-darken-4 text-extra-bold-italic">WIN:</span>
                {{ campaign.name }}</p>
            <p class="campaign-details__description">{{ campaign.subtitle }}</p>
            <p class="campaign-details__price text-bold">₱ {{ campaign.product?.formattedPrice() }}</p>
            <br />
            <br />
            <!-- <v-progress-linear :model-value="100" :color="100 < 60 ? 'yellow-darken-2' : 'red-darken-3'" height="20"
                rounded>
                <span class="campaign-details__percentage"
                    :class="{ 'text-color-white': 100 > 50, 'text-color-primary': 100 < 50 }">
                    100 sold
                </span>
            </v-progress-linear>
            <br /> -->

            <div class="cc-btn-container">
                <div class="cc-btn-container__item">
                    <v-hover v-slot:default="{ isHovering, props }">
                        <v-btn :to="`/promotions/${campaign.slug}`" height="50" width="100%" v-bind="props" class="campaign__btn__campaign-card"
                            :class="{ 'bg__blue': isHovering, 'bg-secondary': !isHovering }"
                            @click="campaignDetails = campaign">
                            Prize details
                        </v-btn>
                    </v-hover>
                </div>
                <div class="cc-btn-container__item">
                    <v-hover v-slot:default="{ isHovering, props }" v-if="campaign.product && campaign.product.stock > 0">
                        <v-btn height="50" width="100%" v-bind="props" class="campaign__btn__campaign-card"
                            :class="{ 'bg__blue': isHovering, 'bg__primary': !isHovering }"
                            @click="addToCart(campaign.product?.id, 1, campaign.id)">
                            <v-icon class="mr-1" center icon="custom:cart"></v-icon>
                            <span>Add to cart</span>
                        </v-btn>
                    </v-hover>
                    <v-btn v-else height="50" width="100%" class="campaign__btn__campaign-card">
                        <span>Out of stock</span>
                    </v-btn>
                </div>
            </div>
        </div>
    </v-card>
</template>

<script lang="ts" setup>
defineProps(['campaign'])
const { campaignDetails } = useCampaigns()
const { addToCart } = useCart()
</script>

<style lang="scss" scoped>
.cc-btn-container {
    display: flex;
    gap: 4px;
    position: relative;
    bottom: 0;
    width: 100%;    
    left: 0;
    &__item {
        width: 50%;
    }
}

.campaign__btn__campaign-card {
    font-size: 12px;
}

.campaign-details {
    color: $secondary;
    padding-bottom: 20px;
    width: 100%;

    &__header {
        font-size: 24px;
    }

    &__description {
        font-size: 14px;
    }

    &__price {
        font-size: 18px;
    }

    &__percentage {
        font-size: 12px;
    }

    .campaign__btn__campaign-card {
        font-size: 14px;
        border-radius: 10px !important;
    }
}

.campaign-count-down {
    position: absolute;
    top: 1rem;
    left: 1rem;
    color: $white;
    background-color: $red;
    padding: 5px;
    border-radius: 5px;
    text-align: center;
    font-size: 12px;

    &__time {
        background-color: $white;
        color: $red;
        padding: 2px;
        border-radius: 5px;
        width: 150px;
    }
}
</style>