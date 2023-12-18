import Campaign from "@/models/campaign"
import CampaignCategory from "@/models/campaign-category"
export function useCampaigns() {
    const featuredCapmpaigns: Ref<Campaign[]> = ref([])
    const currentCampaigns: Ref<Campaign[]> = ref([])
    const suggestedCampaigns: Ref<Campaign[]> = ref([])
    const campaignCategories: Ref<CampaignCategory[]> = ref([])
    const campaignDetails = useState<Campaign>('campaignDetails', () => new Campaign)
    const { $axios } = useNuxtApp()

    /**
     * Get featured campaigns
     */
    async function getFeaturedCapmaigns() {
        try {
            const response = await $axios.get('/fetch-featured-campaigns')

            featuredCapmpaigns.value = response.data.data.map((campaign: Campaign) => {
                let campaignInstance = new Campaign()
                Object.assign(campaignInstance, campaign)
                return campaignInstance
            })
        } catch (error) { }
    }

    /**
     * Get current campaigns
     * @param {Object} params
     */
    async function getCurrentCampaigns(params: Object = {}) {

        try {
            const response = await $axios.get('/fetch-current-campaigns', {params})
            currentCampaigns.value = response.data.data.map((campaign: Campaign) => {
                let campaignInstance = new Campaign()
                Object.assign(campaignInstance, campaign)
                return campaignInstance
            })
        } catch (error) { }
    }

    /**
     * Get current campaigns
     * @param {Object} params
     */
    async function getSuggestedCampaigns(params: Object = {}) {

        try {
            const response = await $axios.get('/cart/suggested-campaigns', {params})
            suggestedCampaigns.value = response.data.data.map((campaign: Campaign) => {
                let campaignInstance = new Campaign()
                Object.assign(campaignInstance, campaign)
                return campaignInstance
            })
        } catch (error) { }
    }

    /**
     * Get campaign by id
     * 
     * @param {number} campaignId
     */
    async function getCampaignByid(campaignId:number) {
        try {
            const response = await $axios.get(`/campaign/${campaignId}`)
            let campaignInstance = new Campaign()
            Object.assign(campaignInstance, response.data.data)
            campaignDetails.value = campaignInstance
        } catch (error) { }
    }

    /**
     * Get campaign by id
     * 
     * @param {string} slug
     */
        async function getCampaignBySlug(slug:string) {

            try {
                const response = await $axios.get(`/campaign/slug/${slug}`)
                let campaignInstance = new Campaign()
                Object.assign(campaignInstance, response.data.data)
                campaignDetails.value = campaignInstance
            } catch (error) { }
        }

    /**
     * Get campaign categories
     */
    async function getCampaignCategories() {
        try {
            const response = await $axios.get(`/cart/list`)
            campaignCategories.value = response.data.data.map((category: CampaignCategory) => {
                let campaignCategoryInstance = new CampaignCategory()
                Object.assign(campaignCategoryInstance, category)
                return campaignCategoryInstance
            })
        } catch (error) { }
    }

    return {
        featuredCapmpaigns,
        getFeaturedCapmaigns,
        currentCampaigns,
        getCurrentCampaigns,
        getCampaignByid,
        campaignDetails,
        getCampaignCategories,
        campaignCategories,
        suggestedCampaigns,
        getSuggestedCampaigns,
        getCampaignBySlug,
    }
}