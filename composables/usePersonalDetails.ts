import User from '@/models/user'
export function usePersonalDetails() {
    const {$axios} = useNuxtApp()
    const personalDetailErrors:any = ref({} as any)
    const loading = ref(false)
    const { showSnackBar } = useSnackBar()
    /**
     * Update the personal details of authenticated user
     * @param {User} user
     */
    async function updatePersonalDetails(user: User) {
        try {
            loading.value = true
            await $axios.post('/account/details', user)
            loading.value = false
            personalDetailErrors.value = {}
            showSnackBar('Personal details successfully updated!')
        } catch (error: any) {
            if(error.response.status === 400){
                personalDetailErrors.value = error.response.data.errors
            }
            loading.value = false
        }
    }

    return {
        personalDetailErrors,
        loading,
        updatePersonalDetails
    }
}