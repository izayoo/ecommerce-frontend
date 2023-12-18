import ProductCategory from "@/models/product-category"

export function useAdminProductCategory() {
    const { $axios } = useNuxtApp()
    const productCategories: Ref<ProductCategory[]> = ref([]);
    /**
     * Get the product category list
     */
    async function getProductCategory() {
        try {
            const response = await $axios.get('/admin/product-category/list')
            productCategories.value = response.data.data.map((category : ProductCategory) => {
                const productCategoryInstance = new ProductCategory
                Object.assign(productCategoryInstance, category)
                return productCategoryInstance
            })
        } catch (error:any) {
            
        }
    }

    return{
        getProductCategory,
        productCategories
    }
}