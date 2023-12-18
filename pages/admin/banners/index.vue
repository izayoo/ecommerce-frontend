<template>
    <div class="mt-10">
        <div class="d-flex flex-column flex-md-row mb-9">
            <p class="text-bold" style="font-size: 25px">Banners</p>
            <v-spacer></v-spacer>
        </div>
        <div>
            <v-tabs v-model="tab" color="primary" align-tabs="start">
                <v-tab :value="1">Carousel</v-tab>
                <v-tab :value="2">Banner</v-tab>
            </v-tabs>
            <v-window v-model="tab">
                <v-window-item :value="1">
                    <BannerForm class="mt-8 mb-8" label="Add Carousel" @action="createOrUpdateCarousel" />
                    <v-row>
                        <v-col cols="12" md="4" v-for="(carousel, i) in carousels" :key="i" class="mt-8 banner-container">
                            <v-img :src="carousel.media?.getFullUrl()" aspect-ratio="1">
                                <v-btn icon="mdi-delete" color="error" class="rounded-pill banner-remove"
                                    @click="deleteCarousel(i)"></v-btn>
                            </v-img>
                        </v-col>
                    </v-row>
                </v-window-item>
                <v-window-item :value="2">
                    <BannerForm @click="bannerForm.banner_type_id = 2" class="mt-8 mb-8" label="Add Left Banner"
                        @action="createOrUpdateSubbanner" v-if="subBanners.length === 0" />
                    <BannerForm @click="bannerForm.banner_type_id = 3" class="mt-8 mb-8" label="Add Right Banner"
                        @action="createOrUpdateSubbanner" v-if="subBanners.length === 1" />
                    <v-row>
                        <v-col cols="12" md="4" v-for="(subBanner, i) in subBanners" :key="i" class="mt-8">
                            <BannerForm @click="bannerForm.banner_type_id = subBanner.banner_type_id" class="mt-8 mb-8"
                                label="Update" @action="createOrUpdateSubbanner" />
                            <v-img :src="subBanner.media?.getFullUrl()" aspect-ratio="1">
                            </v-img>
                        </v-col>
                    </v-row>
                </v-window-item>
            </v-window>
        </div>
    </div>
</template>

<script lang="ts" setup>
const tab = ref(null);
const {
    getCarousels,
    carousels,
    createOrUpdateCarousel,
    createOrUpdateSubbanner,
    deleteCarousel,
    getSubBanners,
    deleteSubBanner,
    subBanners,
    bannerForm,
} = useAdminBanner();


getCarousels();
getSubBanners();
</script>
