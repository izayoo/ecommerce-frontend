<template>
    <div class="mt-10">
        <v-card class="bg__primary pa-4 mb-8">
            <div class="d-flex title" style="font-size: 25px;">
                <p class=" text-bold">My Credits</p>
                <v-spacer></v-spacer>
                <p class="text-bold">₱5,000.00</p>
            </div>
        </v-card>

        <v-row>
            <v-col cols="12" xl="6" lg="6">
                <div class="d-flex flex-column align-center" style="width: 100%;">
                    <p class="text-bold vc-text">Voucher Code</p>
                    <v-text-field size="sm" variant="outlined" class="bg__transparent pa-1"
                        style="font-size: 12px; width: 100%;"></v-text-field>
                </div>
            </v-col>
            <!-- <v-col cols="12" xl="3" lg="4">
                <v-hover v-slot:default="{ isHovering, props }">
                    <v-card v-bind="props" class="pa-4 d-flex align-center justify-center border-radius-regular"
                        :class="{ 'bg__blue': !isHovering, 'bg__primary': isHovering }" height="120px">
                        <div class="d-flex flex-column align-center" style="width: 100%;">
                            <p class="text-bold">₱100 Credits</p>
                        </div>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col cols="12" xl="3" lg="4">
                <v-hover v-slot:default="{ isHovering, props }">
                    <v-card v-bind="props" class="pa-4 d-flex align-center justify-center border-radius-regular"
                        :class="{ 'bg__blue': !isHovering, 'bg__primary': isHovering }" height="120px">
                        <div class="d-flex flex-column align-center" style="width: 100%;">
                            <p class="text-bold">₱300 Credits</p>
                        </div>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col cols="12" xl="3" lg="4">
                <v-hover v-slot:default="{ isHovering, props }">
                    <v-card v-bind="props" class="pa-4 d-flex align-center justify-center border-radius-regular"
                        :class="{ 'bg__blue': !isHovering, 'bg__primary': isHovering }" height="120px">
                        <div class="d-flex flex-column align-center" style="width: 100%;">
                            <p class="text-bold">₱500 Credits</p>
                        </div>
                    </v-card>
                </v-hover>
            </v-col> -->
        </v-row>

        <v-hover v-slot:default="{ isHovering, props }">
            <v-btn size="large" v-bind="props" class="campaign__btn mt-8 mr-2"
                :class="{ 'bg__blue': isHovering, 'bg-secondary': !isHovering }">
                <v-icon center icon="mdi-send"></v-icon>
                <span class="ml-2">Submit</span>
            </v-btn>
        </v-hover>
    </div>
</template>

<style lang="scss">
@media screen and (max-width:480px){
    .title{
        font-size: 24px !important;
    }
    .vc-text{
        align-self: start;
    }
}
</style>