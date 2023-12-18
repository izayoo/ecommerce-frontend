import { ref } from 'vue';
import Product from "~/models/product";
import { findIndex } from 'lodash'
import {useDownload} from "~/composables/useDownload";

export function useAdminProducts() {
    const { $axios } = useNuxtApp()
    const loading = ref(false)
    const products: Ref<Product[]> = ref([]);
    const pagedProducts: Ref<Product[]> = ref([]);
    const productForm = useState<Product>('productForm', () => new Product)
    const formErrors: any = ref({});
    const urlSegment = '/admin/product'
    const { showSnackBar } = useSnackBar()
    const { download } = useDownload()
    const paginationMeta:any = ref({})

    async function list() {
        try {
            const response = await $axios.get(urlSegment + '/list');

            products.value = response.data.data.map((product: Product) => {
                let productInstance = new Product()
                Object.assign(productInstance, product)
                return productInstance
            })
        } catch (error: any) {

        }
    }

    async function paged(params: Object = {}) {
        try {
            const response = await $axios.get(urlSegment, {params});
            pagedProducts.value = response.data.data.data.map((product: Product) => {
                let productInstance = new Product()
                Object.assign(productInstance, product)
                return productInstance
            })
            let pagintationMeta = response.data.data
            pagintationMeta.data.delete
            paginationMeta.value = pagintationMeta
        } catch (error: any) {

        }
    }

    async function details() {
        try {
            const response = await $axios.get(urlSegment + '/list');
            productForm.value = response.data.data;
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
            loading.value = true
            await $axios.post(urlSegment, productForm.value);
            productForm.value = new Product
            showSnackBar(`Product successfully added.`)
            loading.value = false
        } catch (error: any) {
            formErrors.value = error.response.data.errors;
            loading.value = false
        }
    }

    async function update(id: number) {
        try {
            loading.value = true
            const response = await $axios.put(urlSegment + '/' + id, productForm.value);
            showSnackBar(`Product successfully updated.`)
            loading.value = false
        } catch (error: any) {
            formErrors.value = error.data.errors;
            loading.value = false
        }
    }

    async function softDelete(id: number) {
        try {
            loading.value = true
            const response = await $axios.delete(urlSegment + '/' + id);
            const i = findIndex(pagedProducts.value, { id: id })
            if (i > -1) {
                pagedProducts.value.splice(i, 1)
            }
            loading.value = false
            showSnackBar(`Product successfully deleted.`)
        } catch (error: any) {
            loading.value = false
        }
    }

    /**
     * Get product by id
     * @param {number} productId
     */
    async function getProductById(productId: number) {
        try {
            const response = await $axios.get(urlSegment + '/' + productId);
            Object.assign(productForm.value, response.data.data)
        } catch (error: any) {

        }
    }

    return {
        loading,
        products,
        pagedProducts,
        productForm,
        formErrors,
        list,
        paged,
        details,
        exportData,
        create,
        update,
        softDelete,
        getProductById,
        paginationMeta,
    }
}