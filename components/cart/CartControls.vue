<template>
  <div>
    <CartReceipt class="md-cart-controls top-shadow d-md-none d-block border-radius-tlr-regular" />
    <CartReceipt class="d-md-block d-none mb-4" />
    <v-form ref="addressForm" :disabled="addressFormIsDisabled">
      <v-card class="pa-8 mb-4 elevation-6 payment-methods border-radius-regular">
        <div class="d-flex align-center mb-4">
          <p class="text-bold payment-methods__title">Billing Information</p>
          <v-spacer></v-spacer>
          <v-icon size="x-large" v-if="addressFormIsDisabled && shippingAddress.region"
            @click="addressFormIsDisabled = false">custom:edit</v-icon>
        </div>
        <div v-if="shippingAddress.region || !addressFormIsDisabled">
          <div class="d-flex overflow-x-auto w-full mb-6">
            <v-hover v-slot:default="{ isHovering, props }">
              <v-btn height="30" v-bind="props" class="mr-2"
                :class="{ 'bg__blue': isHovering, 'bg-secondary': !isHovering }">
                My Address
              </v-btn>
            </v-hover>
          </div>
          <AddressComponent v-model="shippingAddress" :rules="shippingAddressRules" />

          <div class="d-flex overflow-x-auto w-full mb-4" v-if="!sameAsShippingAddress">
            <v-hover v-slot:default="{ isHovering, props }">
              <v-btn height="30" v-bind="props" class="mr-2"
                :class="{ 'bg__blue': isHovering, 'bg-secondary': !isHovering }">
                Billing Address
              </v-btn>
            </v-hover>
          </div>

          <v-checkbox v-model="sameAsShippingAddress">
            <template v-slot:label>
              <p class="text-color-secondary">My billing address is the same as my home address</p>
            </template>
          </v-checkbox>

          <AddressComponent v-model="billingAddress" :rules="billingAddressRules" v-if="!sameAsShippingAddress" />

          <div class="d-flex">
            <v-spacer></v-spacer>
            <div v-if="!addressFormIsDisabled">
              <v-btn @click="addressFormIsDisabled = true" class="mr-2">
                Cancel
              </v-btn>
              <v-btn class="bg__primary" @click="updateAddress" :loading="addressUpdating">
                Save changes
              </v-btn>
            </div>
          </div>
        </div>
        <div v-else class="d-flex flex-column justify-center w-full mb-2">
          <p class="mb-2">You must add your addresses in order to proceed on checking out.</p>
          <v-btn class="bg__primary" @click="addressFormIsDisabled = false">Add addresses</v-btn>
        </div>
      </v-card>
    </v-form>

    <v-hover v-slot:default="{ isHovering, props }">
      <v-btn height="50" width="100%" v-bind="props" class="campaign__btn mt-2"
        :disabled="(cartItems.length <= 0) || !shippingAddress.region || !addressFormIsDisabled"
        :class="{ bg__blue: isHovering, 'bg-secondary': !isHovering }" @click="submit" :loading="loading">
        <v-icon center icon="custom:pay"></v-icon>
        <span class="ml-2">Pay Now</span>
      </v-btn>
    </v-hover>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
const { paymentMethod, checkout, cartItems, getShipping } = useCart();
const { required } = useValidation()
const { shippingAddress, billingAddress, getAddresses, sameAsShippingAddress, addOrUpdateAddress } = useAuth()
const addressForm: any = ref(null)
const loading = ref(false)
const addressUpdating = ref(false)
const addressFormIsDisabled = ref(true)

const shippingAddressRules: any = {
  region: [(value: any) => required(value, 'region')],
  province: [(value: any) => required(value, 'province')],
  city: [(value: any) => required(value, 'city')],
  barangay: [(value: any) => required(value, 'barangay')],
  address1: [(value: any) => required(value, 'address1')],
  address2: [(value: any) => required(value, 'address2')],
}


const billingAddressRules: any = {
  region: [(value: any) => required(value, 'region')],
  province: [(value: any) => required(value, 'province')],
  city: [(value: any) => required(value, 'city')],
  barangay: [(value: any) => required(value, 'barangay')],
  address1: [(value: any) => required(value, 'address1')],
  address2: [(value: any) => required(value, 'address2')],
}

async function submit() {
  // const { valid } = await addressForm.value.validate()
  // if (valid && !addressFormIsDisabled) {
    loading.value = true
    await checkout()
    loading.value = false
  // }
}

async function updateAddress() {
  const { valid } = await addressForm.value.validate()
  if (valid) {
    addressUpdating.value = true
    await addOrUpdateAddress()
    await getShipping()
    addressUpdating.value = false
    addressFormIsDisabled.value = true
  }
}

onMounted(function () {
  if (document.body.clientWidth < 800) {
    document.onscroll = function () {
      let difference =
        document.body.clientHeight - (window.innerHeight + window.scrollY);
      const mdCartControls = document.querySelector(".md-cart-controls");
      if (difference < 200) {
        mdCartControls?.classList.remove("d-md-none");
        mdCartControls?.classList.remove("d-block");
        mdCartControls?.classList.add("d-none");
      } else {
        mdCartControls?.classList.add("d-md-none");
        mdCartControls?.classList.add("d-block");
        mdCartControls?.classList.remove("d-none");
      }
    };
  }
});
await getAddresses();
if (
  shippingAddress.value.region === billingAddress.value.region &&
  shippingAddress.value.province === billingAddress.value.province &&
  shippingAddress.value.city === billingAddress.value.city &&
  shippingAddress.value.barangay === billingAddress.value.barangay &&
  (shippingAddress.value.region !== undefined) &&
  (shippingAddress.value.province !== undefined) &&
  (shippingAddress.value.city !== undefined) &&
  (shippingAddress.value.barangay !== undefined) &&
  (billingAddress.value.region !== undefined) &&
  (billingAddress.value.province !== undefined) &&
  (billingAddress.value.city !== undefined) &&
  (billingAddress.value.barangay !== undefined)
) {
  sameAsShippingAddress.value = true
}
</script>
<style lang="scss">
.payment-methods {
  &__title {
    font-size: 24px;
  }
}

@media screen and (max-width: 959px) {
  .md-cart-controls {
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 999;
    left: 0;
  }

  .payment-methods {
    &__title {
      display: none;
    }
  }

  .campaign__btn {
    display: none;
  }
}

.payment-methods {
  position: relative;
  widows: 100%;

  .v-label {
    opacity: 1;
  }

  &__title {
    font-size: 25px;
  }

  &__item {
    border: 2px solid $gray;
    padding: 5px 16px 5px 0;
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    height: 48px;
    width: 100%;

    img {
      height: 34px;
      width: 59px;
    }
  }

  &__text {
    font-size: 15px;
  }
}
</style>