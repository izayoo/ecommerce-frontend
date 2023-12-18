import Campaign from "./campaign"
import Product from "./product"

interface Cart {
    id:number
    quantity: number
created_at: string
    is_for_donation: number
}

class Cart{
    private _product: Product | undefined
    private _campaign: Campaign | undefined

    get product() : Product | undefined{
        return this._product
    }

    set product(product: Product){
        const productInstance = new Product
        Object.assign(productInstance, product)
        this._product = productInstance
    }

    get campaign() : Campaign | undefined{
        return this._campaign
    }

    set campaign(campaign: Campaign){
        const campaignInstance = new Campaign
        Object.assign(campaignInstance, campaign)
        this._campaign = campaignInstance
    }
}

export default Cart