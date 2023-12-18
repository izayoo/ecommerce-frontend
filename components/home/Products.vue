<template>
    <div>
        <div class="text-center w-full">
            <p class="text-bold text-color-secondary text-section-title">OUR PRODUCTS</p>
        </div>
        <br />
        <div class="draggable-wrapper" v-dragscroll>
            <v-card v-for="(product, i) in productList" :key="i" width="298"
                class="ma-2 pa-2 elevation-2 product-carousel__card" @click="selectProduct(product)">
                <div class="w-full d-flex justify-center">
                    <v-img width="250" height="250" :src="product.media?.getFullUrl()" cover></v-img>
                </div>
                <v-card-title class="text-bold text-center">
                    <span class="product-carousel__card__name text-bold">{{ product.name }}</span> <br />
                    <span class="product-carousel__card__price text-bold text-color-red">
                        ₱{{ product.formattedPrice() }}
                    </span>
                </v-card-title>
            </v-card>
        </div>
    </div>
</template>


<script lang="ts" setup>
import Product from "@/models/product"

const { productList, getProducts, selectedProduct } = useProducts()

function selectProduct(product: Product) {
    selectedProduct.value = product
    navigateTo(`products/${product.slug}`)
}
await getProducts()
</script>

<style lang="scss">
.draggable-wrapper {
    display: flex;
    width: 100%;
    position: relative;
    overflow-x: auto;
    overflow: hidden;
    cursor: grab;

    .product-carousel__card {
        overflow: initial;

        &:hover {
            box-shadow: 0px 0px 5px 5px rgb(0 0 0 / 0.3) !important;
        }

        .v-card-title {
            line-height: 1.5rem !important;
        }

        border-radius: 25px;

        &__name {
            font-size: 18px;
        }

        &__price {
            font-size: 16px;
        }

    }
}

@media screen and (max-width: 480px) {
    .draggable-wrapper {
        .product-carousel{
            &__card {
                height: 350px !important;

                &__name {
                    font-size: 16px;
                }

                &__price {
                    font-size: 14px;
                }
            }
        }
    }
}
</style>