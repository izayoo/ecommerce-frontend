<template>
    <v-container>
        
    </v-container>
</template>

<script lang="ts" setup>
useHead({
    title: `Frequently Asked Questions`
})
</script>

<style lang="scss">
.row-col-padding:nth-child(odd){
    padding-right: 10px !important;
}
.row-col-padding:nth-child(even){
    padding-left: 10px !important;
}
@media screen and (max-width: 599px) {
    .row-col-padding:nth-child(odd){
        padding-right: 0 !important;
    }
    .row-col-padding:nth-child(even){
        padding-left: 0 !important;
    }
}

@media screen and (max-width: 480px) {
    .v-expansion-panel-title{
        font-size: 16px !important;
    }
    .v-expansion-panel-text{
        font-size: 14px !important;
    }
}
</style>