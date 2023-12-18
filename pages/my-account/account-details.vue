<template>
    <div class="mt-10">
        <p class="text-bold mb-4 title" style="font-size: 25px;">Account Details</p>
        <v-row no-gutters>
            <v-col cols="12" md="6" class="row-col-padding-account">
                <v-text-field v-model="authUser.fname" label="First Name" variant="outlined" :error-messages="personalDetailErrors.fname"></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="row-col-padding-account">
                <v-text-field v-model="authUser.lname" label="Last Name" variant="outlined" :error-messages="personalDetailErrors.lname"></v-text-field>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="12" md="6" class="row-col-padding-account">
                <v-text-field v-model="authUser.email" label="Email" variant="outlined" :error-messages="personalDetailErrors.email"></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="row-col-padding-account">
                <v-text-field type="date" v-model="authUser.birthdate" label="Birthdate" :error-messages="personalDetailErrors.birthdate" variant="outlined"/>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="12" md="6" class="row-col-padding-account">
                <v-select v-model="authUser.nationality" :items="nationalities" item-value="nationality" item-title="nationality" variant="outlined"
                        label="Nationality" :error-messages="personalDetailErrors.nationality"></v-select>
            </v-col>
            <v-col cols="12" md="6" class="row-col-padding-account">
                <PhoneNumber
                v-model="phoneNumber"
                :default-country-code="authUser.country_code"
                :default-phone-number="authUser.mobile_no"
                :phone-number-error-messages="personalDetailErrors.mobile_no"
                />
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="12" md="6">
                <v-select
                    v-model="authUser.gender"
                    :items="genders"
                    item-value="code"
                    item-title="name"
                    variant="outlined"
                    :error-messages="personalDetailErrors.gender"
                    label="Gender"></v-select>
            </v-col>
        </v-row>

        <v-hover v-slot:default="{ isHovering, props }">
            <v-btn 
                v-bind="props" 
                width="100" 
                size="large"
                :class="{ 'bg__blue': isHovering, 'bg__primary': !isHovering }"
                :loading="loading"
                @click="updatePersonalDetails(authUser)"
                >Update</v-btn>
        </v-hover>
    </div>
</template>

<script lang="ts" setup>
import nationalities from '~/assets/js/nationalities.json'

const { authUser } = useAuth()
const {updatePersonalDetails, loading, personalDetailErrors} = usePersonalDetails()
const phoneNumber = ref<any>(null)

watch(phoneNumber, (item) => {
    authUser.country_code = item?.country_code
    authUser.mobile_no = item?.phone_number
})

const genders = [
    {
        name: 'Male',
        code: 'm'
    },
    {
        name: 'Female',
        code: 'f'
    },
]

useHead({
    title: `Account Details`
})
</script>

<style lang="scss">
.row-col-padding-account:nth-child(odd) {
    padding-right: 5px !important;
}

.row-col-padding-account:nth-child(even) {
    padding-left: 5px !important;
}

@media screen and (max-width: 599px) {
    .row-col-padding-account:nth-child(odd) {
        padding-right: 0 !important;
    }

    .row-col-padding-account:nth-child(even) {
        padding-left: 0 !important;
    }
}

@media screen and (max-width:480px){
    .title{
        font-size: 24px !important;
    }
}
</style>