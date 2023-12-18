import Product from '@/models/product'
import {ref} from 'vue'
import Ticket from "~/models/ticket";
export function useWinners(){
    const {$axios} = useNuxtApp()
    const winnerList: Ref<Ticket[]> = ref([])

    /**
     * Get winner list
     */
    async function getWinners() {
        const response = await $axios.get('/fetch-campaign-winners')

        winnerList.value = response.data.data.map((ticket: Ticket) => {
            let ticketInstance = new Ticket()
            Object.assign(ticketInstance, ticket)
            return ticketInstance
        })
    }

    return {
        winnerList,
        getWinners
    }
}