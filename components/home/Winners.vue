<template>
    <div v-if="winnerList.length > 0">
        <div class="text-center w-full">
            <p class="text-bold text-color-secondary text-section-title">WINNERS</p>
        </div>
        <br />
        <div class="draggable-wrapper" v-dragscroll>
            <v-card v-for="(winner, i) in winnerList" :key="i" width="298"
                class="ma-2 pa-2 elevation-2 winners-card">
                <v-img width="250" height="250" :src="winner.order_product.campaign.banner.path + '/' + winner.order_product.campaign.banner.filename" cover />
                <v-card-title class="text-bold text-center">
                    <p class="winners-card__title text-bold text-color-red">Congratulations!</p>
                    <div class="winners-card__subtext">
                        <p class="text-bold">{{ winner.order_product.order.user.fname }} {{ winner.order_product.order.user.lname }}</p>
<!--                        <p><span class="text-bold">{{ winner.order_product.campaign.name }}</span></p>-->
                    </div>
                    <div class="winners-card__subsubtext">
                        <p><span class="text-bold">Ticket no: </span>{{ winner.ticket_no}}</p>
                        <p><span class="text-bold">Announced on: </span>{{ winner.order_product.campaign.draw_date }}</p>
                    </div>
                </v-card-title>
            </v-card>
        </div>
    </div>
</template>


<script lang="ts" setup>
const { winnerList, getWinners } = useWinners()
await getWinners();
</script>

<style lang="scss">
.draggable-wrapper {
    display: flex;
    width: 100%;
    position: relative;
    overflow-x: auto;
    overflow: hidden;
    cursor: grab;

    .winners-card {
        overflow: initial;
        border-radius: 25px;

        &:hover {
            box-shadow: 0 6px 20px rgb(0 0 0 / 0.5) !important;
        }

        .v-card-title {
            line-height: 1.5rem !important;
        }

        border-radius: 25px;

        &__title {
            font-size: 18px;
        }

        &__subtext {
            font-size: 16px;
        }

        &__subsubtext {
            font-size: 11px;
        }

    }
}

@media screen and (max-width: 480px) {
    .draggable-wrapper {
        .winners-card {
            height: 410px !important;
            &__title {
                font-size: 16px;
            }

            &__subtext {
                font-size: 14px;
            }

            &__subsubtext {
                font-size: 11px;
            }
        }
    }
}
</style>