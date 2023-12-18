<template>
    <div class="mt-10">
        <div class="d-flex flex-column flex-md-row mb-2">
            <p class="text-bold" style="font-size: 25px;">Edit Campaign</p>
        </div>
        <CampaignForm />
    </div>
</template>
  
<script lang="ts" setup>
const { getCampaignById, campaignForm } = useAdminCampaigns();
if (!campaignForm.value.id) {
    const route = useRoute()
    getCampaignById(+route.params.id)
}

</script>