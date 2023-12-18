import Product from "~/models/product";
import Order from "~/models/order";
import Campaign from "~/models/campaign";

interface OrderProduct {
    order: Order,
    product: Product,
    campaign: Campaign,
    quantity: number,
    is_for_donation: number
}

class OrderProduct {

}

export default OrderProduct;