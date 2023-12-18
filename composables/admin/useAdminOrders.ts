import {ref} from 'vue';
import Order from "~/models/order";
import {useDownload} from "~/composables/useDownload";
import User from "~/models/user";

export function useAdminOrders() {
    const {$axios} = useNuxtApp()
    const loading = ref(false)
    const orders: Ref<Order[]> = ref([]);
    const pagedOrders: Ref<Order[]> = ref([]);
    const pageOptions: any = ref({});
    const orderForm = useState<Order>('orderForm', () => new Order)
    const orderUser = useState<User>('orderUser', () => new User)
    const formErrors: any = ref({});
    const urlSegment = '/admin/order'
    const {download} = useDownload()

    async function list() {
        try {
            const response = await $axios.get(urlSegment + '/list');

            orders.value = response.data.data.map((order: Order) => {
                let orderInstance = new Order()
                Object.assign(orderInstance, order)
                return orderInstance
            })
            pageOptions.value = response.data;
        } catch (error: any) {

        }
    }

    async function paged(params: Object = {}) {
        try {
            const response = await $axios.get(urlSegment, {params});
            pagedOrders.value = response.data.data.data.map((order: Order) => {
                let orderInstance = new Order()
                Object.assign(orderInstance, order)
                return orderInstance
            })
        } catch (error: any) {

        }
    }

    async function exportData(params: Object = {}) {
        try {
            const response = await $axios.get(urlSegment + '/export', {responseType: "blob", params});
            download(response);
        } catch (error: any) {

        }
    }

    /**
     * Get order by id
     * @param {number} orderId
     */
    async function getOrderById(orderId: number) {
        try {
            const response = await $axios.get(urlSegment + '/' + orderId);
            Object.assign(orderForm.value, response.data.data)
            Object.assign(orderUser.value, response.data.data.user)
        } catch (error: any) {

        }
    }

    return {
        loading,
        orders,
        pagedOrders,
        pageOptions,
        orderForm,
        orderUser,
        formErrors,
        list,
        paged,
        exportData,
        getOrderById,
    }
}