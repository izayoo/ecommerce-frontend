import {ref, reactive} from 'vue'
const isAdminAuthenticated = ref((localStorage.getItem('token') && (localStorage.getItem('role') == 'admin')))
export function useAdminAuth(){
    const {$axios} = useNuxtApp()
    const authAdmin = ref({})
    const loading = ref(false)
    const credentials = reactive({email: '', password: ''})
    const invalidCredentials = ref(false)
    const route  = useRouter()

    /**
     * Authenticated user
     */
    async function login(){
        try {
            loading.value = true;
            const response = await $axios.post('/admin/login', credentials);
            loading.value = true;
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', 'admin');
            isAdminAuthenticated.value = true
            route.push({path: '/admin/overview'});
        } catch(error:any) {
            if(error.response.status === 401){
                invalidCredentials.value = true;
            }
            loading.value = false;
        }
    }

    
    /**
     * Logout the authenticated user
     */
    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        isAdminAuthenticated.value = false
        route.push({path: '/admin-login'});
    }

    return {
        isAdminAuthenticated,
        authAdmin,
        logout,
        loading,
        login,
        credentials,
        invalidCredentials
    }
}