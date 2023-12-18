<template>
    <div class="mt-10">
        <p class="text-bold mb-4 title" style="font-size: 25px;">Addresses</p>
        <div class="d-flex overflow-x-auto w-full mb-8">
            <v-hover v-slot:default="{ isHovering, props }">
                <v-btn height="30" v-bind="props" class="mr-2 campaign__btn"
                    :class="{ 'bg__blue': isHovering, 'bg-secondary': !isHovering }">
                    My Address
                </v-btn>
            </v-hover>
        </div>
        <v-form ref="addressForm">
            <AddressComponent v-model="shippingAddress" :rules="shippingAddressRules" />

            <div class="d-flex overflow-x-auto w-full mt-4 mb-4">
                <v-hover v-slot:default="{ isHovering, props }">
                    <v-btn height="30" v-bind="props" class="mr-2 campaign__btn"
                        :class="{ 'bg__blue': isHovering, 'bg-secondary': !isHovering }">
                        Billing Address
                    </v-btn>
                </v-hover>
            </div>

            <v-checkbox v-model="sameAsShippingAddress">
                <template v-slot:label>
                    <p class="text-color-secondary">My billing address is the same as my home address</p>
                </template>
            </v-checkbox>

            <AddressComponent v-model="billingAddress" :rules="billingAddressRules" v-if="!sameAsShippingAddress" />

            <v-hover v-slot:default="{ isHovering, props }">
                <v-btn v-bind="props" width="100" size="large"
                    :class="{ 'bg__blue': isHovering, 'bg__primary': !isHovering }" class="mt-2" :loading="loading"
                    @click="submit">Save</v-btn>
            </v-hover>
        </v-form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const { addOrUpdateAddress, shippingAddress, billingAddress, loading, sameAsShippingAddress, getAddresses } = useAuth()
const { required } = useValidation()
const addressForm: any = ref(null)

const shippingAddressRules: any = {
    region: [(value: any) => required(value, 'region')],
    province: [(value: any) => required(value, 'province')],
    city: [(value: any) => required(value, 'city')],
    barangay: [(value: any) => required(value, 'barangay')],
    address1: [(value: any) => required(value, 'address1')],
    address2: [(value: any) => required(value, 'address2')],
}


const billingAddressRules: any = {
    region: [(value: any) => required(value, 'region')],
    province: [(value: any) => required(value, 'province')],
    city: [(value: any) => required(value, 'city')],
    barangay: [(value: any) => required(value, 'barangay')],
    address1: [(value: any) => required(value, 'address1')],
    address2: [(value: any) => required(value, 'address2')],
}

async function submit() {
    const { valid } = await addressForm.value.validate()
    if (valid) {
        addOrUpdateAddress()
    }
}

await getAddresses()
if(
    shippingAddress.value.region === billingAddress.value.region && 
    (shippingAddress.value.region !== undefined) && 
    (billingAddress.value.region !== undefined)
){
    sameAsShippingAddress.value = true
}

useHead({
    title: `My Addresses`
})
</script>

<style lang="scss">
@media screen and (max-width: 480px) {
    .title {
        font-size: 24px !important;
    }
}

@media screen and (max-width: 477px) {
    .v-selection-control {
        align-items: start !important;
    }
}
</style>