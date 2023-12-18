<template>
    <div>
        <p class="text-bold text-color-secondary" style="font-size: 24px;">Other campaigns you might be interested in...</p>
        <br />
        <v-row>
            <v-col v-for="(campaign, i) in suggestedCampaigns" :key="i" cols="12" md="4">
                <CampaignCard :campaign="campaign"/>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
const { getSuggestedCampaigns, suggestedCampaigns } = useCampaigns()
await getSuggestedCampaigns()
</script>
