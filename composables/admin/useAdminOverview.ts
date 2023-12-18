

export function useAdminOverview() {
    const { $axios } = useNuxtApp()
    const generalInfo: any = ref({});
    const transactions: any = ref({});

    async function getGeneralInfo(filter: any) {
        try {
            const response = await $axios.get('/admin/overview/general-info', {params: filter})
            generalInfo.value = response.data.data;
        } catch (error:any) {
            
        }
    }

    async function getTransactions(filter: any) {
        try {
            const response = await $axios.get('/admin/overview/transactions', {params: filter})
            transactions.value = response.data.data;
        } catch (error:any) {

        }
    }

    return{
        getGeneralInfo,
        generalInfo,
        getTransactions,
        transactions
    }
}