<template>
    <div>
        <v-carousel class="desktop-carousel" style="max-height: 400px;" cycle hide-delimiter-background :show-arrows="false"
            :hide-delimiters="true">
            <v-carousel-item v-for="(carousel, i) in carousels" :key="i" style="max-height: 400px;">
                <div class="carousel-item-content">
                    <img class="carousel-item-content-img" :src="carousel.media?.getFullUrl()" />
                </div>
            </v-carousel-item>
        </v-carousel>
        <v-carousel class="mobile-carousel" cycle hide-delimiter-background :show-arrows="false" :hide-delimiters="true"
            height="300px">
            <v-carousel-item v-for="(carousel, i) in carousels" :key="i">
                <div class="citem-mobile" :style="{ 'background-image': 'url(' + carousel.media?.getFullUrl() + ')' }"></div>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script lang="ts" setup>
const { getCarousels, carousels } = useBanner()
const showArrows: any = ref('hover')
getCarousels()
onMounted(() => {
    if (document.body.clientWidth <= 480) {
        showArrows.value = false
    }
})
</script>

<style lang="scss" scoped>
.mobile-carousel {
    display: none;
}

@media screen and (max-width:786px) {
    .mobile-carousel {
        display: block;
    }

    .desktop-carousel {
        display: none;
    }
}

.citem-mobile {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    height: 300px;
    border-radius: 25px !important;
}

.v-window__controls {
    display: none !important;
}

.carousel-item-content {
    height: 400px;
    border-radius: 25px;

    .carousel-item-content-img {
        z-index: -1;
        width: 100%;
        height: 400px;
        border-radius: 25px;

        @media screen and (max-width:1366px) {
            height: 400px;
        }
    }

    .carousel-item-content-details {
        z-index: 99999;
        position: absolute;
        bottom: 8rem;
        right: 50px;

        @media screen and (max-width:1088px) {
            right: 0;
            left: 50px;
        }

        .carousel-item-content-details-header {
            font-family: 'Montserrat-extra-bold-italic';
            color: $red;
            font-size: 55px;
        }

        .carousel-item-content-details-subheader {
            font-family: 'Montserrat-bold';
            color: $white;
            font-size: 1.5rem;
        }

        .carousel-item-content-details-description {
            color: $white;
            font-size: 1.125rem;
        }
    }
}</style>