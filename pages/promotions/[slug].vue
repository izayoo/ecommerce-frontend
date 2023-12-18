<template>
    <v-container>
        <v-row class="mt-10 mb-10">
            <v-col cols="12" md="8">
                <PrizeDetails :campaignDetails="campaignDetails"/>
            </v-col>
            <v-col cols="12" md="4" class="d-md-block d-none">
                <PrizeCartControls :campaignDetails="campaignDetails"/>
            </v-col>
        </v-row>
        <PrizeCartControls :campaignDetails="campaignDetails" v-if="!drawer" class="md-cart-controls d-md-none d-block border-radius-tlr-regular"/>
    </v-container>
</template>

<script lang="ts" setup>
const { campaignDetails, getCampaignBySlug } = useCampaigns()

import { onMounted } from "vue";

const props = defineProps(['drawer'])

onMounted(async () => {
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

  if (!campaignDetails.value.id) {
        const route = useRoute()
        await getCampaignBySlug(route.params.slug)
        useHead({
          title: `${campaignDetails.value.name}`
      })
    }
});

useHead({
    title: `${campaignDetails.value.name}`
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
</style>
