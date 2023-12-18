<template>
  <div class="mt-10">
    <div class="d-flex flex-column flex-md-row mb-9">
      <p class="text-bold" style="font-size: 25px;">Campaigns / {{ campaignForm.name }}</p>
      <v-spacer></v-spacer>
    </div>
    <div class="d-flex flex-column flex-md-row mb-4">
      <v-text-field
          class="mr-md-2 mr-0 mb-4 mb-md-0"
          label="Search Ticket"
          append-inner-icon="mdi-magnify"
          variant="solo"
          v-model="search"
      ></v-text-field>
      <v-btn
          height="56"
          class="bg__primary mr-md-2 mr-0 mb-4 mb-md-0"
          @click="paged(campaignId,{ search })"
      >Search
      </v-btn
      >
      <v-btn height="56" class="bg__primary mr-md-2 mr-0 mb-4 mb-md-0"
             @click="reset"
      >Reset
      </v-btn
      >
      <v-btn height="56" class="bg__primary" @click="exportData">Export</v-btn>
    </div>
    <v-table>
      <thead class="bg__primary">
      <tr>
        <th class="text-left text-white" style="white-space: nowrap;">
          Ticket Number
        </th>
        <th class="text-left text-white" style="white-space: nowrap;">
          Owner
        </th>
        <th class="text-left text-white" style="white-space: nowrap;">
          First Name
        </th>
        <th class="text-left text-white" style="white-space: nowrap;">
          Last Name
        </th>
        <th class="text-left text-white" style="white-space: nowrap;">
          Date Created
        </th>
        <th class="text-left text-white" style="white-space: nowrap;">
          Status
        </th>
        <th class="text-left text-white" style="white-space: nowrap;">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="ticket in pagedTickets" :key="ticket.ticket_no">
        <td style="white-space: nowrap;">{{ ticket.ticket_no }}</td>
        <td style="white-space: nowrap;">{{ ticket.order_product.order.user.email }}</td>
        <td style="white-space: nowrap;">{{ ticket.order_product.order.user.fname }}</td>
        <td style="white-space: nowrap;">{{ ticket.order_product.order.user.lname }}</td>
        <td style="white-space: nowrap;">{{ ticket.created_at }}</td>
        <td style="white-space: nowrap;">{{ ticket.status }}</td>
        <td style="white-space: nowrap;">
          <div class="d-flex">
            <v-btn size="small" class="bg__primary" icon="mdi-crown"
             v-if="ticket.status == 'pending'" @click="setAsWinner(ticket.id)"></v-btn>
          </div>
        </td>
      </tr>
      </tbody>
    </v-table>
    <Pagination :paginationMeta="paginationMeta" @changePage="changePage"/>
  </div>
</template>

<script lang="ts" setup>
import Ticket from "@/models/ticket";

const {
  paged,
  pagedTickets,
  ticketForm,
  loading,
  exportData,
  setAsWinner,
  paginationMeta,
} = useAdminTickets();

const {
  campaignForm, getCampaignById
} = useAdminCampaigns()

const route = useRoute()
const campaignId = Number(route.params.id);

const search = ref("");

function reset() {
  search.value = ''
  paged(campaignId)
}

function changePage(page:number){
  paged(campaignId, {page})
}

paged(campaignId);
getCampaignById(campaignId)
</script>