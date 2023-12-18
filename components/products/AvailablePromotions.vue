<template>
    <div>
        <p class="text-bold text-color-secondary" style="font-size: 24px;">Available Promotions for this Product</p>
        <br />
        <v-row>
            <v-col v-for="(campaign, i) in currentCampaigns" :key="i" cols="12" md="4">
                <CampaignCard :campaign="campaign"/>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
const { getCurrentCampaigns, currentCampaigns } = useCampaigns()
await getCurrentCampaigns()
</script>
