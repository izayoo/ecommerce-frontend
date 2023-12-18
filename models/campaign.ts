import CampaignCategory from "./campaign-category"
import Media from "./media"
import Product from "./product"
import { format, parseISO } from "date-fns";

interface Campaign {
    id: number
    name: string
    subtitle: string
    slug: string
    description: string
    max_tickets:string
    start_date: string
    end_date: string
    draw_date: string
    is_featured: number
    status: number
    created_at: string
    product_id: number | undefined
    draw_mechanics: string
    campaign_category_id: number | undefined
    media_id: number | undefined
    banner_id: number | undefined
}

class Campaign {
    private _product: Product | undefined
    private _campaign_category: CampaignCategory | undefined
    private _media: Media | undefined
    private _banner: Media | undefined

    constructor(){
        this.is_featured = 0
    }

    /**
     * Checks if campaign is featured
     * 
     * @return {boolean}
     */
    isFeatured() : boolean {
        return this.is_featured === 1
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

    get banner() : Media | undefined{
        return this._banner
    }

    set banner(banner: Media){
        const mediaInstance = new Media
        Object.assign(mediaInstance, banner)
        this._banner = mediaInstance
        this.banner_id = banner?.id
    }

    get product() : Product | undefined{
        return this._product
    }

    set product(product: Product){
        const productInstance = new Product
        Object.assign(productInstance, product)
        this._product = productInstance
        this.product_id = product.id
    }

    get campaign_category() : CampaignCategory | undefined{
        return this._campaign_category
    }

    set campaign_category(campaignCategory: CampaignCategory){
        const campaignCategoryInstance = new CampaignCategory
        Object.assign(campaignCategoryInstance, campaignCategory)
        this._campaign_category = campaignCategoryInstance
        this.campaign_category_id = campaignCategory.id
    }

    createdAt(dateFormat = "P"): string {
        if (this.created_at) {
          return format(parseISO(this.created_at), dateFormat);
        }
        return "";
    }

    drawDate(dateFormat = "P"): string {
        if (this.draw_date) {
          return format(parseISO(this.draw_date), dateFormat);
        }
        return "";
    }
}

export default Campaign