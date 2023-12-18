import {ref, reactive} from 'vue'
import User from '@/models/user'
import Address from '@/models/address'
import Tickets from "~/models/ticket";
import Ticket from "~/models/ticket";
import Product from "~/models/product";
import Order from "~/models/order";
const authUser = reactive(new User)
const isAuthenticated = ref(false)
const newUser:any = ref(null)

export function useAuth(){
    const {$axios} = useNuxtApp()
    const loading = ref(false)
    const credentials = reactive({email: '', password: ''})
    const registerErrors:any = ref({} as any)
    const invalidCredentials = ref(false)
    const route  = useRouter()
    const changePasswordErrors:any = ref({} as any)
    const {showSnackBar} = useSnackBar()
    const shippingAddress: Ref<Address> = useState<Address>('shippingAddress', () => new Address)
    const billingAddress: Ref<Address> = useState('billingAddress', ()=> new Address)
    shippingAddress.value.address_type_id = 4
    billingAddress.value.address_type_id = 3
    const sameAsShippingAddress = ref(true)
    const activeTickets: Ref<Ticket> = useState('activeTickets', () => new Ticket())
    const orderHistory: Ref<Order> = useState('orderHistory', () => new Order())
    let verification = false

    /**
     * Authenticated user
     */
    async function login(){
        try{
            loading.value = true
            const response = await $axios.post('/login', credentials)
            Object.assign(authUser, response.data.data)
            loading.value = true
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('role', 'user')
            isAuthenticated.value = true
            route.push({path:'/'})
        }catch(error:any){
            if(error.response.status === 401){
                invalidCredentials.value = true
            }
            loading.value = false
        }
    }

    async function loginWithFB() {
        try{
            loading.value = true
            const response = await $axios.get('/login/facebook')
        }catch(error:any){

        }
    }

    async function loginWithGoogle() {
        try{
            loading.value = true
            const response = await $axios.get('/login/google')
        }catch(error:any){

        }
    }

    /**
     * Fetch the details of authenticated user
     */
    async function me(){
        try{
            const response = await $axios.get('/account/details')
            Object.assign(authUser, response.data.data)
            isAuthenticated.value = true
        }catch(error:any){
            if(error.response.status === 401){
                localStorage.removeItem('token')
            }
        }
    }

    /**
     * Logout the authenticated user
     */
    async function logout() {
        try{
            await $axios.post('/logout')
            Object.assign(authUser, {} as User)
            isAuthenticated.value = false
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            route.push({path:'/'})
        }catch(error:any){}
    }

    /**
     * Register user
     * @param {User} user
     */
    async function register(user: User) {
        try{
            loading.value = true
            const payload: any = user;
            payload.verification_url = useRequestURL().host + '/verify-account';
            const response = await $axios.post('/register', payload)
            Object.assign(authUser, response.data.data)
            loading.value = false
            newUser.value = user
            route.push({path:'/login'})
        }catch(error:any){
            if(error.response.status === 422){
                registerErrors.value = error.response.data.errors
            }
            loading.value = false
        }
    }

    /**
     * Changes password
     * @param {Object} payload
     */
    async function changePassword(payload:Object) {
        try {
            changePasswordErrors.value = {}
            loading.value = true
            await $axios.post('/account/password', payload)
            loading.value = false
            showSnackBar('Password successfully changed.')
        } catch (error:any) {
            if(error.response.status === 422){
                changePasswordErrors.value = {}
                changePasswordErrors.value = error.response.data.errors
            }
            loading.value = false
        }
    }

    /**
     * Add or update address
     */
    async function addOrUpdateAddress() {
        try {
            loading.value = true

            if(sameAsShippingAddress.value){
                billingAddress.value = shippingAddress.value
            }

            const payload = {
                shipping_address: shippingAddress.value,
                billing_address: billingAddress.value,
            }

            await $axios.put('/account/address', payload)

            loading.value = false
            showSnackBar('Address successfully updated.')
        } catch (error:any) {
            loading.value = false
        }
    }

    /**
     * Get user addresses
     */
    async function getAddresses(){
        try {
            const response = await $axios.get('/account/address')
            response.data.data.forEach((address: Address) => {
                if(address.address_type_id === 4){
                    shippingAddress.value = address as Address
                }

                if(address.address_type_id === 3){
                    billingAddress.value = address as Address
                }
            })
        } catch (error: any) {}
    }

    /**
     * Get active tickets
     */
    async function getActiveTickets(){
        try {
            const response = await $axios.get('/account/active-tickets')
            activeTickets.value = response.data.data.map((ticket: Ticket) => {
                let ticketInstance = new Ticket()
                Object.assign(ticketInstance, ticket)
                return ticketInstance
            })
        } catch (error: any) {}
    }

    /**
     * Get active tickets
     */
    async function getPurchaseHistory(){
        try {
            const response = await $axios.get('/account/purchase-history')
            orderHistory.value = response.data.data.map((ticket: Order) => {
                let orderInstance = new Order()
                Object.assign(orderInstance, ticket)
                return orderInstance
            })
        } catch (error: any) {}
    }

    async function verifyAccount(email: string, token: string)
    {
        try {
            const payload: any = {
                email: email,
                token: token
            }
            const response = await $axios.post('/verify-account', payload)
            if (response) {
                verification = true
            }
        } catch (error: any) {}
    }

    return {
        authUser,
        loading,
        login,
        loginWithFB,
        loginWithGoogle,
        credentials,
        register,
        registerErrors,
        invalidCredentials,
        isAuthenticated,
        me,
        logout,
        newUser,
        changePassword,
        changePasswordErrors,
        addOrUpdateAddress,
        shippingAddress,
        billingAddress,
        sameAsShippingAddress,
        getAddresses,
        activeTickets,
        getActiveTickets,
        orderHistory,
        getPurchaseHistory,
        verifyAccount,
        verification
    }
}