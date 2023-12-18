import OrderProduct from "~/models/order-product";

interface Order {
    order_no: string,
    total: number,
    payment_method: string,
    status: string,
    created_at: string
}

class Order {

}

export default Order;