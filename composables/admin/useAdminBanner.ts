import Banner from "@/models/banner";
import { findIndex } from 'lodash';

export function useAdminBanner() {
    const {$axios} = useNuxtApp()
    const carousels: Ref<Banner[]> = useState<Banner[]>('carousels', () => []);
    const subBanners: Ref<Banner[]> = useState<Banner[]>('subBanners', () => []);
    const loading = ref(false)
    const bannerForm = useState<Banner>('bannerForm', () => new Banner)
    const { showSnackBar } = useSnackBar()

    /**
     * Create or update carousel banner
     */
    async function createOrUpdateCarousel() {
        try{
            loading.value = true
            carousels.value.push(bannerForm.value)
            await $axios.post('/admin/banner/carousel', carousels.value)
            bannerForm.value = new Banner
            loading.value = false
            showSnackBar(`Carousel successfully added.`)
        }catch(error:any){
            loading.value = false
        }
    }

    /**
     * Create or update sub banner
     */
    async function createOrUpdateSubbanner() {
        try{
            loading.value = true
            let filtered = subBanners.value.filter((banner:Banner) => {
                return banner.media_id !== undefined && bannerForm.value.banner_type_id !== banner.banner_type_id
            }).concat([bannerForm.value])

            await $axios.post('/admin/banner/sub-banner', filtered)
            bannerForm.value = new Banner
            getSubBanners()

            loading.value = false
            showSnackBar(`Banner successfully updated.`)
        }catch(error:any){
            loading.value = false
        }
    }

    /**
     * Get carousel items
     */
    async function getCarousels() {
        try {
            const response = await $axios.get('/admin/banner/carousel')
            carousels.value = response.data.data.banner.map((banner: Banner) => {
                let bannerInstance = new Banner()
                Object.assign(bannerInstance, banner)
                return bannerInstance
            })
        } catch (error:any) {
            
        }
    }

    /**
     * Get carousel items
     */
    async function getSubBanners() {
        try {
            const response = await $axios.get('/admin/banner/sub-banner')
            subBanners.value = []
            response.data.data.forEach((object: any) => {
                let bannerInstance = new Banner()
                Object.assign(bannerInstance, object.banner)
                subBanners.value.push(bannerInstance)
            });
        } catch (error:any) {
            
        }
    }

    /**
     * Delete carousel
     */
    async function deleteCarousel(index:number) {
        try{
        carousels.value.splice(index, 1)
        loading.value = true
        await $axios.post('/admin/banner/carousel', carousels.value)
        loading.value = true
        showSnackBar(`Carousel successfully deleted.`)
        }catch(error:any){
            loading.value = false
        }
    }

    /**
     * Delete Sub banner
     */
    async function deleteSubBanner(index:number) {
        try{
        subBanners.value.splice(index, 1)
        loading.value = true
        await $axios.post('/admin/banner/sub-banner', subBanners.value)
        loading.value = true
        showSnackBar(`Carousel successfully deleted.`)
        }catch(error:any){
            loading.value = false
        }
    }

    return {
        carousels,
        loading,
        bannerForm,
        createOrUpdateCarousel,
        getCarousels,
        deleteCarousel,
        subBanners,
        createOrUpdateSubbanner,
        getSubBanners,
        deleteSubBanner,
    }
}