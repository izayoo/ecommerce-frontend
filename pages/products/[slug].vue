<template>
    <v-container>
        <v-row class="mt-10 mb-10">
            <v-col cols="12" md="8">
                <v-card class="pa-10 elevation-6 border-radius-regular">
                    <div class="product-details d-flex flex-column align-center">
                        <v-btn width="200" class="bg__gray rounded-pill product-details__label mb-10">Product Details</v-btn>
                        <v-img height="200" width="200" :src="selectedProduct.media?.getFullUrl()" />
                        <p class="product-details__title"> <span class="text-bold">Buy: </span>{{ selectedProduct.name }}</p>
                        <p class="product-details__description">
                            {{ selectedProduct.description }}
                        </p>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" class="d-md-block d-none">
                <ProductCartControls :product="selectedProduct" />
            </v-col>
        </v-row>
        <AvailablePromotions />
        <ProductCartControls :product="selectedProduct"
            class="md-cart-controls d-md-none d-block border-radius-tlr-regular" />
    </v-container>
</template>

<script lang="ts" setup>

import { onMounted } from "vue";
const { selectedProduct, getProuctBySlug } = useProducts()
if (!selectedProduct.value.id) {
    const route = useRoute()
    await getProuctBySlug(route.params.slug)
}

onMounted(function () {
    if (document.body.clientWidth < 800) {
        document.onscroll = function () {
            let difference =
                document.body.clientHeight - (window.innerHeight + window.scrollY);
            const mdCartControls = document.querySelector(".md-cart-controls")
            if (difference < 200) {
                mdCartControls?.classList.remove('d-md-none')
                mdCartControls?.classList.remove('d-block')
                mdCartControls?.classList.add('d-none')
            } else {
                mdCartControls?.classList.add('d-md-none')
                mdCartControls?.classList.add('d-block')
                mdCartControls?.classList.remove('d-none')
            }
        };
    }
});

useHead({
    title: `${selectedProduct.value.name}`
})
</script>

<style lang="scss">
@media screen and (max-width: 959px) {
    .md-cart-controls {
        position: fixed;
        width: 100%;
        bottom: 0;
        z-index: 999;
        left: 0;
    }
}

.product-details {
    text-align: center;
    padding: 10px;

    &__title {
        font-size: 20px;
    }

    &__description {
        font-size: 15px;
    }
}
</style>