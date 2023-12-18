<template>
    <div class="d-flex">
        <div class="mr-2" style="width: 120px;">
            <v-autocomplete v-model="phonenumberCode" :items="countrycodes" return-object item-title="dial_code"
                :custom-filter="filterCountryCode" item-value="code" variant="outlined" label="Country Code">
                <template v-slot:selection="{ item }">
                    <div class="d-flex align-center">
                        <img v-if="item.raw.code != ''" width="25" height="25"
                            :src="'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/' + item.raw.code + '.svg'" />
                        <p class="text-bold" style="font-size: 15px;">{{ item.raw.dial_code }}</p>
                    </div>
                </template>
                <template v-slot:item="{ props, item }">
                    <div v-bind="props" class="d-flex align-center ml-2">
                        <img width="40" height="40"
                            :src="'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/' + item.raw.code + '.svg'" />
                        <p class="ml-2">{{ item.raw.dial_code }}</p>
                    </div>
                </template>
            </v-autocomplete>
        </div>
        <v-text-field v-model="phoneNumber" width="200" label="Phone number" variant="outlined"
            :error-messages="phoneNumberErrorMessages" :rules="phoneNumberRules"></v-text-field>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import cCodes from '~/assets/js/country-codes.json'

const props = defineProps([
    'modelValue',
    'countryCodeErrorMessages',
    'phoneNumberErrorMessages',
    'defaultCountryCode',
    'defaultPhoneNumber',
    'phoneNumberRules'
])
const emits = defineEmits(['update:modelValue'])

const countrycodes = cCodes

const phonenumberCode = ref({
    name: '',
    dial_code: '',
    code: '',
})

const phoneNumber = ref(null)

countrycodes.map(item => {
    if (item.dial_code == props.defaultCountryCode) {
        phonenumberCode.value = item
    }
})
phoneNumber.value = props.defaultPhoneNumber

countrycodes.map(item => {
    if (item.code == 'PH') {
        phonenumberCode.value = item
    }
})

watch(phonenumberCode, () => {
    emits('update:modelValue', {
        country_code: phonenumberCode.value.dial_code,
        phone_number: phoneNumber.value,
    })
})

watch(phoneNumber, () => {
    emits('update:modelValue', {
        country_code: phonenumberCode.value.dial_code,
        phone_number: phoneNumber.value,
    })
})

function filterCountryCode(itemTitle: any, queryText: any, item: any) {
    const textOne = item.value.name.toLowerCase()
    const textTwo = item.value.code.toLowerCase()
    const textThree = item.value.code.toLowerCase()
    const searchText = queryText.toLowerCase()
    return textOne.indexOf(searchText) > -1 ||
        textTwo.indexOf(searchText) > -1 || textThree.indexOf(searchText) > -1
}

</script>
