<template>
    <div class="mt-10">
        <p class="text-bold mb-4" style="font-size: 25px;">User Details</p>
        <v-row>
            <v-col cols="12" md="6">
                <v-text-field label="First Name" model-value="Francis" variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
                <v-text-field label="Last Name" model-value="Eisma" variant="outlined"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <v-text-field label="Email" model-value="test@test.com" variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
                <InputCalendar/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <v-text-field label="Nationality" model-value="Filipino" variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
                <PhoneNumber/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <v-text-field label="Gender" model-value="Male" variant="outlined"></v-text-field>
            </v-col>
        </v-row>

        <p class="text-bold mb-4" style="font-size: 25px;">Shipping Address</p>
        <AddressComponent/>

        <p class="text-bold mb-4" style="font-size: 25px;">Billing Address</p>
        <AddressComponent/>

        <p class="text-bold mt-10 mb-4" style="font-size: 25px;">Credit / Debit Card</p>
        <v-card v-for="(paymentOption, i) in paymentOptions" :key="i" class="elevation-6 pa-2 mb-4">
            <div class="d-flex">
                <div class="d-flex">
                    <v-img width="79px" height="34px" :src="paymentOption.img" />
                    <p>**** **** **** 1234</p>
                </div>
                <v-spacer></v-spacer>
                <div class="d-flex">
                    <v-hover v-slot:default="{ isHovering, props }">
                        <v-btn v-bind="props" height="35" class="mr-4"
                            :class="{ 'bg__blue': isHovering, 'bg__primary': !isHovering }">Default</v-btn>
                    </v-hover>
                    <v-hover v-slot:default="{ isHovering, props }">
                        <v-btn v-bind="props" height="35" class="mr-4"
                            :class="{ 'bg__blue': isHovering, 'bg__red': !isHovering }">Delete</v-btn>
                    </v-hover>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script lang="ts" setup>
const paymentOptions = [
    {
        img: '/img/thirdpartylogos/Mastercard.png'
    },
    {
        img: '/img/thirdpartylogos/Visa.png'
    },
    {
        img: '/img/thirdpartylogos/Gcash.png'
    }
]
</script>