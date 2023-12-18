import CampaignCategory from "@/models/campaign-category";

export function useAdminCampaignCategory() {
    const { $axios } = useNuxtApp()
    const campaignCategories: Ref<CampaignCategory[]> = ref([]);
    /**
     * Get the campaign category list
     */
    async function getCampaignCategory() {
        try {
            const response = await $axios.get('/admin/campaign-category/list')
            campaignCategories.value = response.data.data.map((category : CampaignCategory) => {
                const campaignCategoryInstance = new CampaignCategory
                Object.assign(campaignCategoryInstance, category)
                return campaignCategoryInstance
            })
        } catch (error:any) {
            
        }
    }

    return{
        getCampaignCategory,
        campaignCategories
    }
}