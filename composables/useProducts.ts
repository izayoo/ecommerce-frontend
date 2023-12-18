import Product from '@/models/product'
import {ref} from 'vue'
export function useProducts(){
    const {$axios} = useNuxtApp()
    const productList: Ref<Product[]> = ref([])
    const selectedProduct = useState<Product>('selectedProduct', () => new Product)

    /**
     * Get product list
     */
    async function getProducts() {
        const response = await $axios.get('/fetch-products')
        
        productList.value = response.data.data.map((product: Product) => {
            let productInstance = new Product()
            Object.assign(productInstance, product)
            return productInstance
        })
        
    }

    /**
     * Get product by id
     * 
     * @param {number} productId
     */
    async function getProuctById(productId:number) {
        try {
            const response = await $axios.get(`/product/${productId}`)
            let productInstance = new Product()
            Object.assign(productInstance, response.data.data)
            selectedProduct.value = productInstance
        } catch (error) { }
    }

    /**
     * Get product by id
     * 
     * @param {string} slug
     */
        async function getProuctBySlug(slug:string) {
            try {
                const response = await $axios.get(`/product/slug/${slug}`)
                let productInstance = new Product()
                Object.assign(productInstance, response.data.data)
                selectedProduct.value = productInstance
            } catch (error) { }
        }

    return {
        productList,
        getProducts,
        selectedProduct,
        getProuctById,
        getProuctBySlug,
    }
}