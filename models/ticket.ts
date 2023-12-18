import OrderProduct from "~/models/order-product";

interface Ticket {
    ticket_no: string,
    order_product: OrderProduct,
    status: string,
    created_at: string
}

class Ticket {

}

export default Ticket;