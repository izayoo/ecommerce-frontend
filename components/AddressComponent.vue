<template>
    <div>
        <v-row no-gutters>
            <v-col cols="12" md="6" class="row-col-padding-address">
                <v-autocomplete v-model="address.region" :rules="rules?.region" :items="regions" return-object item-value="name" item-title="name"
                    variant="outlined" label="Region" autocomplete="off"></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6" class="row-col-padding-address">
                <v-autocomplete v-model="address.province" :rules="rules?.province" :items="selectedRegionProvinces" return-object item-value="name"
                    item-title="name" variant="outlined" label="Province" autocomplete="off"></v-autocomplete>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="12" md="6" class="row-col-padding-address">
                <v-autocomplete v-model="address.city" :rules="rules?.city" :items="selectedProvinceCities" return-object item-value="name"
                    item-title="name" variant="outlined" label="City" autocomplete="off"></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6" class="row-col-padding-address">
            <v-text-field v-model="address.barangay" :rules="rules?.barangay" label="Barangay"
                    variant="outlined"></v-text-field>

<!--                 <v-autocomplete v-model="address.barangay" :rules="rules?.barangay" :items="selectedCityBarangays" return-object item-value="name"
                    item-title="name" variant="outlined" label="Barangays" autocomplete="off"></v-autocomplete> -->
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col>
                <v-text-field v-model="address.address1" :rules="rules?.address1" label="Address Line 1"
                    variant="outlined"></v-text-field>
            </v-col>
        </v-row>
    </div>
</template>
<script lang="ts" setup>
import {reactive, watch} from 'vue'
const props = defineProps(['addressTypeId', 'modelValue', 'rules'])
const emits = defineEmits(['update:modelValue'])

const {
    getRegions,
    getRegionProvinces,
    getProvinceCities,
    getCityBarangays,
    regions,
    selectedRegionProvinces,
    selectedProvinceCities,
    selectedCityBarangays,
} = usePsgcApi()

const address:any = reactive({})
Object.assign(address, props.modelValue)
watch(address, () => {
    const updateModelValue = {
        region: address.region?.name,
        province: address.province?.name,
        city: address.city?.name,
        barangay: address.barangay,
        address1: address.address1,
        address_type_id: props.modelValue.address_type_id,
    }
    emits('update:modelValue', updateModelValue)
})

watch(() => address.region, async (item) => {
    if(item){
        await getRegionProvinces(item)
        selectedRegionProvinces.value.map((province:any) => {
            if(province.name == address.province){
                address.province = province
            }
        })
    }
})

watch(() => address.province, async (item) => {
    if(item){
        await getProvinceCities(item)
        selectedProvinceCities.value.map((city:any) => {
            if(city.name == address.city){
                address.city = city
            }
        })
    }
})

// watch(() => address.city, async (item) => {
//     if(item){
//         await getCityBarangays(item)
//         selectedCityBarangays.value.map((barangay:any) => {
//             if(barangay.name == address.barangay){
//                 address.barangay = barangay
//             }
//         })
//     }
// })

onMounted(async ()=>{
    await getRegions()
    if(props.modelValue.region){
        regions.value.map((region:any) => {
            if(props.modelValue.region == region.name){
                address.region = region
            }
        })
    }
})
</script>

<style lang="scss">
.row-col-padding-address:nth-child(odd){
    padding-right: 5px !important;
}
.row-col-padding-address:nth-child(even){
    padding-left: 5px !important;
}
@media screen and (max-width: 599px) {
    .row-col-padding-address:nth-child(odd){
        padding-right: 0 !important;
    }
    .row-col-padding-address:nth-child(even){
        padding-left: 0 !important;
    }
}
</style>