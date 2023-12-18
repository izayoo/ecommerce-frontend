import { h } from "vue";
import type { IconSet, IconProps } from "vuetify";
import instagram from "./instagram.vue"
import facebook from "./facebook.vue"
import youtube from "./youtube.vue"
import tiktok from "./tiktok.vue"
import account from "./account.vue"
import cart from "./cart.vue"
import pay from "./pay.vue"
import ticket from "./ticket.vue"
import order from "./order.vue"
import address from "./address.vue"
import payment from "./payment.vue"
import credit from "./credit.vue"
import logout from "./logout.vue"
import menu from "./menu.vue"
import prize from "./prize.vue"
import product from "./product.vue"
import winner from "./winner.vue"
import faq from "./faq.vue"
import contact from "./contact.vue"
import agreement from "./agreement.vue"
import policy from "./policy.vue"
import edit from "./edit.vue"

const customSvgNameToComponent: any = {
    instagram,
    facebook,
    youtube,
    tiktok,
    account,
    cart,
    pay,
    ticket,
    order,
    address,
    payment,
    credit,
    logout,
    menu,
    prize,
    product,
    winner,
    faq,
    contact,
    agreement,
    policy,
    edit,
};

const customSVGs: IconSet = {
  component: (props: IconProps) => h(customSvgNameToComponent[props.icon]),
};

export { customSVGs /* aliases */ };