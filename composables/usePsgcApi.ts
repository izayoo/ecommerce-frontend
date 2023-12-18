import { ref } from 'vue'


export function usePsgcApi() {
    const { $axios } = useNuxtApp()
    const psgcAPIUrl = 'https://api.lbcx.ph/v1/locations'

    const regions = ref<any[]>([])
    const selectedRegionProvinces = ref<any[]>([])
    const selectedProvinceCities = ref<any[]>([])
    const selectedCityBarangays = ref<any[]>([])

    /**
     * Get all regions
     */
    async function getRegions() {
        try {
            const response = await $axios.get(psgcAPIUrl + '/countries/PH/regions')
            regions.value = response.data.data
        } catch (error) { }
    }

    /**
     * Get region's provinces
     * 
     * @param {Region | null} region
     */
    async function getRegionProvinces(region: any) {
        try {
            const response = await $axios.get(psgcAPIUrl + `/regions/${region.id}/provinces`)
            selectedRegionProvinces.value = response.data.data
        } catch (error) { }
    }

    /**
     * Get region's cities
     * 
     * @param {Region | null} region
     */
    async function getRegionCities(region:any) {
        try {
            const response = await $axios.get(psgcAPIUrl + `/regions/${region.id}/cities`)
            selectedProvinceCities.value = response.data
        } catch (error) { }
    }

    /**
     * Get province's cities
     * 
     * @param {Province | null} province
     */
    async function getProvinceCities(province:any) {
        try {
            const response = await $axios.get(psgcAPIUrl + `/provinces/${province.id}/cities`)
            selectedProvinceCities.value = response.data.data
        } catch (error) { }
    }

    /**
     * Get province's cities
     * 
     * @param {City | null} city
     */
    async function getCityBarangays(city:any) {
        try {
            const response = await $axios.get(psgcAPIUrl + `/cities/${city.id}/districts`)
            selectedCityBarangays.value = response.data.data
        } catch (error) { }
    }

    return {
        getRegions,
        getRegionProvinces,
        getProvinceCities,
        getCityBarangays,
        regions,
        selectedRegionProvinces,
        selectedProvinceCities,
        selectedCityBarangays,
    }
}