<template>
  <div class="mt-10">
    <div class="d-flex flex-column flex-md-row mb-2">
      <p class="text-bold" style="font-size: 25px;">Add Campaign</p>
    </div>
    <CampaignForm/>
  </div>
</template>

<script lang="ts" setup>
import Campaign from '@/models/campaign';

const {campaignForm} = useAdminCampaigns()
campaignForm.value = new Campaign
</script>