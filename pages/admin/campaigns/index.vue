<template>
  <div class="mt-10">
    <div class="d-flex flex-column flex-md-row mb-9">
      <p class="text-bold" style="font-size: 25px">Campaigns</p>
      <v-spacer></v-spacer>
    </div>
    <div class="d-flex flex-column flex-md-row mb-4">
      <v-text-field
        class="mr-md-2 mr-0 mb-4 mb-md-0"
        label="Search Campaign"
        append-inner-icon="mdi-magnify"
        variant="solo"
        v-model="search"
      ></v-text-field>
      <v-btn
        height="56"
        class="bg__primary mr-md-2 mr-0 mb-4 mb-md-0"
        @click="paged({ search })"
        >Search</v-btn
      >
      <v-btn height="56" class="bg__primary mr-md-2 mr-0 mb-4 mb-md-0"
      @click="reset"
        >Reset</v-btn
      >
      <v-btn
        height="56"
        class="bg__primary mr-md-2 mr-0 mb-4 mb-md-0"
        :to="'/admin/campaigns/add'"
        >Add</v-btn
      >
      <v-btn height="56" class="bg__primary" @click="exportData">Export</v-btn>
    </div>
    <v-table>
      <thead class="bg__primary">
        <tr>
          <th class="text-left text-white" style="white-space: nowrap">
            Campaign Name
          </th>
          <th class="text-left text-white" style="white-space: nowrap">
            Tickets issued
          </th>
          <th class="text-left text-white" style="white-space: nowrap">
            Max Tickets
          </th>
          <th class="text-left text-white" style="white-space: nowrap">
            Categories
          </th>
          <th class="text-left text-white" style="white-space: nowrap">
            Date Created
          </th>
          <th class="text-left text-white" style="white-space: nowrap">
            Max Draw Date
          </th>
          <th class="text-left text-white" style="white-space: nowrap">
            Linked Product
          </th>
          <th class="text-left text-white" style="white-space: nowrap">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(campaign, i) in pagedCampaigns" :key="i">
          <td style="white-space: nowrap">{{ campaign.name }}</td>
          <td style="white-space: nowrap">{{ campaign.tickets_issued }}</td>
          <td style="white-space: nowrap">{{ campaign.max_tickets }}</td>
          <td style="white-space: nowrap">
            {{ campaign.campaign_category?.name }}
          </td>
          <td style="white-space: nowrap">{{ campaign.createdAt() }}</td>
          <td style="white-space: nowrap">{{ campaign.drawDate() }}</td>
          <td style="white-space: nowrap">{{ campaign.product?.name }}</td>
          <td>
            <div class="d-flex">
              <v-btn
                size="small"
                class="bg__primary mr-2"
                icon="mdi-magnify"
                :to="`/promotions/${campaign.slug}`"
              ></v-btn>
              <v-btn
                size="small"
                class="bg__primary mr-2"
                icon="mdi-ticket"
                :to="'/admin/campaigns/' + campaign.id + '/tickets'"
              ></v-btn>
              <v-btn
                size="small"
                class="bg__primary mr-2"
                icon="mdi-pencil"
                @click="editCampaign(campaign)"
              ></v-btn>
              <DeleteConfirmation
                message="Are you sure you want to delete this campaign?"
                :action="() => softDelete(campaign.id)"
                :loading="loading"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
    <Pagination :paginationMeta="paginationMeta" @changePage="changePage"/>
  </div>
</template>

<script lang="ts" setup>
import Campaign from "@/models/campaign";

const { paged, pagedCampaigns, softDelete, campaignForm, loading, exportData, paginationMeta } =
  useAdminCampaigns();

const search = ref("");

function editCampaign(campaign: Campaign) {
  campaignForm.value = campaign;
  navigateTo(`/admin/campaigns/${campaign.id}`);
}

function reset(){
  search.value = ''
  paged()
}

function changePage(page:number){
  paged({page})
}

paged();
</script>