import Banner from "@/models/banner";

export function useBanner() {
    const {$axios} = useNuxtApp()
    const carousels: Ref<Banner[]> = useState<Banner[]>('carousels', () => []);
    const subBanners: Ref<Banner[]> = useState<Banner[]>('subBanners', () => []);

    /**
     * Get carousel items
     */
    async function getCarousels() {
        try {
            const response = await $axios.get('/fetch-carousel-banners')
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
            const response = await $axios.get('/fetch-sub-banners')
            subBanners.value = []
            response.data.data.forEach((object: any) => {
                let bannerInstance = new Banner()
                Object.assign(bannerInstance, object.banner)
                subBanners.value.push(bannerInstance)
            });
        } catch (error:any) {
            
        }
    }

    return {
        carousels,
        getCarousels,
        subBanners,
        getSubBanners,
    }
}