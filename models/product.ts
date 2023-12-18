import Campaign from "./campaign"
import Media from "./media"
import ProductCategory from "./product-category"
import { format, parseISO } from "date-fns";

interface Product {
    id: number
    name: string
    description: string
    slug: string
    dimensions: string
    stock: number
    weight_in_grams: number
    price: number
    status: string
    created_at: string
    product_category_id: number | undefined
    media_id: number | undefined
}

class Product {
    private _product_category: ProductCategory | undefined
    private _media: Media | undefined
    private _campaign: Campaign | undefined

    get campaign() : Campaign | undefined{
        return this._campaign
    }

    set campaign(campaign: Media){
        const campaignInstance = new Campaign
        Object.assign(campaignInstance, campaign)
        this._campaign = campaignInstance
    }

    get media() : Media | undefined{
        return this._media
    }

    set media(media: Media){
        const mediaInstance = new Media
        Object.assign(mediaInstance, media)
        this._media = mediaInstance
        this.media_id = media.id
    }

    get product_category() : ProductCategory | undefined{
        return this._product_category
    }

    set product_category(category: ProductCategory){
        const productCategortyInstance = new ProductCategory
        Object.assign(productCategortyInstance, category)
        this._product_category = productCategortyInstance
        this.product_category_id = category.id
    }

    formattedPrice(){
        return Math.trunc(this.price).toLocaleString('en', { });
    }

    createdAt(dateFormat = "P"): string {
        if (this.created_at) {
          return format(parseISO(this.created_at), dateFormat);
        }
        return "";
      }
    
    
}

export default Product