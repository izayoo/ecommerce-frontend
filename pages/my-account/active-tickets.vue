<template>
    <div class="mt-10 active-tickets">
        <p class="text-bold mb-4 title" style="font-size: 25px;">Active Tickets</p>
        <v-expansion-panels>
            <v-expansion-panel v-for="(campaign, i) in activeTickets" :key="i" class="elevation-6 mb-2">
                <v-expansion-panel-title>
                    <div class="d-flex" style="width: 100%;">
                        <p class="ticket-title">{{ campaign.name }}</p>
                        <v-spacer></v-spacer>
                        <p class="mr-2 ticket-count ">{{ campaign.tickets.length }} Ticket(s)</p>
                    </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-row class="mt-2 mb-1">
                        <v-col v-for="ticket in campaign.tickets" :key="i" cols="12" md="12" xl="6">
                            <v-card class="pa-4 elevation-4">
                                <div class="d-flex align-center mb-2" style="font-size: 12px;">
                                    <div>
                                        <img class="mr-16" width="80" src="/img/Logo-Dark.png" />
                                        <NuxtLink :to="`/promotions/${campaign.slug}`">
                                            <p> <span class="text-bold">Promo: </span>{{ ticket.order_product.campaign.name }}</p>
                                        </NuxtLink>
                                        <NuxtLink to="/products/1">
                                            <p><span class="text-bold">Product:</span>
                                              {{ ticket.order_product.product.name }}</p>
                                        </NuxtLink>
                                        <p><span class="text-bold">Issued on:</span>
                                          {{ $dateDisplayFormat(ticket.order_product.order.created_at) }}</p>
                                        <p><span class="text-bold">Max. draw date:</span> {{ $dateDisplayFormat(ticket.order_product.campaign.draw_date) }}</p>
                                    </div>
                                    <v-spacer></v-spacer>
                                    <div>
                                        <v-img height="100" width="100" :src="campaign.banner.path + '/' + campaign.banner.filename" cover></v-img>
                                    </div>
                                </div>
                                <v-divider></v-divider>
                                <v-row class="mt-2">
                                    <!-- <v-col class="d-flex flex-column align-center">
                                        <v-progress-linear width="100%" model-value="10" color="primary" height="10"
                                            rounded></v-progress-linear>
                                        <p style="font-size: 12px; white-space: nowrap;">769 sold out of 1200</p>
                                    </v-col> -->
                                    <v-col class="d-flex align-center justify-center">
                                        <p style="font-size: 14px; white-space: nowrap;">Ticket Number: <span
                                                class="text-bold">{{ ticket.ticket_no }}</span></p>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>
<script lang="ts" setup>
import {useAuth} from "~/composables/useAuth";

const { activeTickets, getActiveTickets } = useAuth()
const {$dateDisplayFormat} = useNuxtApp()

await getActiveTickets()

useHead({
    title: `Active Tickets`
})
</script>

<style lang="scss">
.active-tickets {
    .v-expansion-panel {
        background-color: $primary;
        color: $white;

        .v-expansion-panel-text__wrapper {
            background-color: $white;
        }
        a{
            text-decoration: none;
            color: $secondary;
            &:hover{
                color: $blue;
            }
        }
    }

    .ticket-count{
        white-space: nowrap;
    }
}

@media screen and (max-width:480px){
    .active-tickets{
        .title{
            font-size: 24px !important;
        }
        .ticket-title{
            font-size: 14px;
            line-height: normal;
            width: 75%;
            flex-wrap: wrap;
        }
        .ticket-count{
            font-size: 14px;
            line-height: normal;
            width: 25%;
        }
    }
}
</style>
