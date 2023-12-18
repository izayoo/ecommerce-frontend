import {Ref, ref} from 'vue';
import Campaign from "~/models/campaign";
import { findIndex } from 'lodash'

export function useAdminCampaigns() {
    const { $axios } = useNuxtApp()
    const loading = ref(false)
    const campaigns: Ref<Campaign[]> = ref([]);
    const pagedCampaigns: Ref<Campaign[]> = ref([]);
    const campaignForm = useState<Campaign>('campaignForm', () => new Campaign)
    const formErrors:any = ref({});
    const urlSegment = '/admin/campaign'
    const savingCampaign = ref(false)
    const { download } = useDownload()
    const paginationMeta:any = ref({})

    const { showSnackBar } = useSnackBar()

    async function list() {
        try {
            const response = await $axios.get(urlSegment + '/list');
        } catch (error: any) {

        }
    }

    async function paged(params: Object = {}) {
        try {
            const response = await $axios.get(urlSegment,  {params});
            pagedCampaigns.value = response.data.data.data.map((campaign: Campaign) => {
                let campaignInstance = new Campaign()
                Object.assign(campaignInstance, campaign)
                return campaignInstance
            })
            let pagintationMeta = response.data.data
            pagintationMeta.data.delete
            paginationMeta.value = pagintationMeta
        } catch (error: any) {
            throw  error
        }
    }

    async function details() {
        try {
            const response = await $axios.get(urlSegment + '/list');
            campaignForm.value = response.data.data;
        } catch (error: any) {

        }
    }

    async function exportData() {
        try {
            const response = await $axios.get(urlSegment + '/export', { responseType: "blob" });
            download(response);
        } catch (error: any) {

        }
    }

    async function create() {
        try {
            savingCampaign.value = true
            await $axios.post(urlSegment, campaignForm.value);
            campaignForm.value = new Campaign
            showSnackBar(`Campaign successfully added.`)
            savingCampaign.value = false
        } catch (error: any) {
            if(error.response.status === 400){
                formErrors.value = error.response.data.errors;
            }
            
            savingCampaign.value = false
        }
    }

    async function update(id: number) {
        try {
            savingCampaign.value = true
            const response = await $axios.put(urlSegment + '/' + id, campaignForm.value);
            showSnackBar(`Campaign successfully updated.`)
            savingCampaign.value = false
        } catch (error: any) {
            savingCampaign.value = false
        }
    }

    async function softDelete(id: number) {
        try {
            loading.value = true
            const response = await $axios.delete(urlSegment + '/' + id);            
            const i = findIndex(pagedCampaigns.value, { id: id })
            if (i > -1) {
                pagedCampaigns.value.splice(i, 1)
            }
            loading.value = false
            showSnackBar(`Campaign successfully deleted.`)
        } catch (error: any) {
            loading.value = true
        }
    }

    /**
     * Get product by id
     * @param {number} campaignId
     */
    async function getCampaignById(campaignId: number) {
        try {
            const response = await $axios.get(urlSegment + '/' + campaignId);
            Object.assign(campaignForm.value, response.data.data)
        } catch (error: any) {

        }
    }

    return {
        loading,
        campaigns,
        pagedCampaigns,
        campaignForm,
        formErrors,
        list,
        paged,
        details,
        exportData,
        create,
        update,
        softDelete,
        savingCampaign,
        getCampaignById,
        paginationMeta,
    }
}