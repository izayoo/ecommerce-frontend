import {ref} from 'vue';
import Ticket from "~/models/ticket";
import {useDownload} from "~/composables/useDownload";

export function useAdminTickets() {
    const {$axios} = useNuxtApp()
    const loading = ref(false)
    const tickets: Ref<Ticket[]> = ref([]);
    const pagedTickets: Ref<Ticket[]> = ref([]);
    const ticketForm = useState<Ticket>('ticketForm', () => new Ticket)
    const formErrors: any = ref({});
    const urlSegment = '/admin/campaign/'
    const {download} = useDownload()
    const route = useRoute()
    const id = Number(route.params.id);
    const paginationMeta:any = ref({})

    async function list(id: number) {
        try {
            const response = await $axios.get(urlSegment + id + '/ticket/list');

            tickets.value = response.data.data.map((ticket: Ticket) => {
                let ticketInstance = new Ticket()
                Object.assign(ticketInstance, ticket)
                return ticketInstance
            })
        } catch (error: any) {

        }
    }

    async function paged(id: any, params: Object = {}) {
        try {
            const response = await $axios.get(urlSegment + id + '/ticket', {params});
            pagedTickets.value = response.data.data.data.map((ticket: Ticket) => {
                let ticketInstance = new Ticket()
                Object.assign(ticketInstance, ticket)
                return ticketInstance
            })
            let pagintationMeta = response.data.data
            pagintationMeta.data.delete
            paginationMeta.value = pagintationMeta
        } catch (error: any) {

        }
    }

    async function exportData() {
        try {
            const response = await $axios.get(urlSegment + id + '/ticket/export', {responseType: "blob"});
            download(response);
        } catch (error: any) {

        }
    }

    /**
     * Get ticket by id
     * @param id
     * @param {number} ticketId
     */
    async function getTicketById(id: number, ticketId: number) {
        try {
            const response = await $axios.get(urlSegment + id + '/ticket/' + ticketId);
            Object.assign(ticketForm.value, response.data.data)
        } catch (error: any) {

        }
    }

    async function setAsWinner(ticketId: number) {
        try {
            const response = await $axios.post(urlSegment + id + '/ticket/' + ticketId, []);
            paged(id);
        } catch (error: any) {

        }
    }

    return {
        loading,
        tickets,
        pagedTickets,
        ticketForm,
        formErrors,
        list,
        paged,
        exportData,
        setAsWinner,
        getTicketById,
        paginationMeta,
    }
}