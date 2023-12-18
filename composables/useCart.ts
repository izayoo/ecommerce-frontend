import Cart from "@/models/cart";
import { findIndex } from 'lodash'
const paymentMethod:any = ref('Paymaya');
export function useCart() {
    const cartItems: Ref<Cart[]> = useState<Cart[]>('cartItems', () => [])
    const shippingFee:Ref<number> = useState<number>('shippingFee', () => 0)
    const loading = ref(false)
    const {$axios} = useNuxtApp()
    const { showSnackBar } = useSnackBar()
    const vat = 12
    const {isAuthenticated} = useAuth()

    /**
     * Add item to cart
     *
     * @param {number} productId
     * @param {number} quantity
     * @param {number} campaignId
     */
    async function addToCart(productId: number, quantity:number = 1, campaignId:number = 0) {
        if(!isAuthenticated.value){
            const router = useRouter()
            router.push('/login')
            return
        }

        try {
            loading.value = true
            const payload = {product_id: productId, quantity: quantity, campaign_id: campaignId}
            const response = await $axios.post('/add-to-cart', payload)
            const productExists = cartItems.value.some((item: Cart) => {
                if(item.product?.id == response.data.data.product.id){
                    item.quantity += quantity
                    return true
                }
                return false
            })

            if(productExists){
                showSnackBar(`${response.data.data.product.name} has been added to your cart.`)
            } else {
                const cartItemInstance = new Cart()
                Object.assign(cartItemInstance, response.data.data)
                cartItems.value.push(cartItemInstance)
                showSnackBar(`${response.data.data.product.name} has been added to your cart.`)
            }

            loading.value = false
        } catch (error) {
            loading.value = false
        }
    }

    /**
     * Get cart items
     */
    async function getCartItems() {
        try {
            const response = await $axios.get('/cart')
            cartItems.value = response.data.data.map((cart: Cart) => {
                let cartInstance = new Cart()
                Object.assign(cartInstance, cart)
                return cartInstance
            })
        } catch (error) {}
    }

    /**
     * Get cart total
     * 
     * @return {number}
     */
    function getSubtotal() : number{
        return cartItems.value.reduce((accumulator, item) => {
            if(item.product){
                return accumulator + (item.product?.price * item.quantity);
            }
            return 0
        }, 0)
    }

    /**
     * Get vat deduction
     * 
     * @return {number}
     */
    function getVatDeduction(): number{
        return ((vat / 100) * shippingFee.value)
    }

    async function getShipping(){
        try {
            const response = await $axios.get('/fetch-cart-shipping-fee')
            shippingFee.value = response.data.data.shipping_fee
        } catch (error:any) {}
    }

    /**
     * Get sub total
     * 
     * @return {number}
     */
    function getCartTotal() : number {
        return (getSubtotal() + shippingFee.value)
    }

    /**
     * Update item quantity
     * @param {number} itemId
     * @param {Object} payload
     */
    async function updateItem(itemId:number, payload:Object) {
        try {
            await $axios.put(`/cart/${itemId}`, payload)
            cartItems.value.map((item: Cart) => {
                if(item.id === itemId){
                    Object.assign(item, payload)
                }
            })
            await getShipping()
        } catch (error:any) {
            throw error
        }
    }

    /**
     * Remove item
     * @param {number} itemId
     */
    async function removeItem(itemId:number,) {
        try {
            await $axios.delete(`/cart/${itemId}`)
            cartItems.value.map((item: Cart) => {
                if(item.id === itemId){
                    const i = findIndex(cartItems.value, { id: itemId })
                    if (i > -1) {
                        cartItems.value.splice(i, 1)
                    }
                }
            })
        } catch (error:any) {
            throw error
        }
    }

    /**
     * Checkout items
     */
    async function checkout() {
        if(paymentMethod.value){
            try {
                loading.value = true
                const paymentResponse = await $axios.post('/checkout', {payment_method: paymentMethod.value})
                loading.value = false
                cartItems.value = []
                showSnackBar(`Your order has been placed.`)
                if (paymentResponse.data.data.redirectUrl) {
                    location.href = paymentResponse.data.data.redirectUrl;
                }
            } catch (error:any) {
                loading.value = false
            }
        } else {
            showSnackBar(`Please select your payment method.`, 'error')
        }

    }

    return {
        cartItems,
        addToCart,
        getCartItems,
        getCartTotal,
        getSubtotal,
        getShipping,
        vat,
        getVatDeduction,
        updateItem,
        removeItem,
        checkout,
        paymentMethod,
        loading,
        shippingFee,
    }
}