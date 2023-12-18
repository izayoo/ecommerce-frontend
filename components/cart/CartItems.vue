<template>
  <div>
    <div v-for="(item, i) in cartItems" :key="i" style="position: relative" class="mb-6">
      <v-tooltip location="left">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" class="remove-item-btn bg__red rounded-pill" icon="mdi-close"
            @click="removeItem(item.id)"></v-btn>
        </template>
        <span>Remove item</span>
      </v-tooltip>
      <v-card class="pt-8 pb-8 pl-2 pr-2 elevation-6 mb-md-4 mb-1 border-radius-regular">
        <v-row>
          <v-col cols="12" sm="6">
            <div class="d-flex align-center justify-center item">
              <v-spacer class=" d-md-block d-none"></v-spacer>
              <div class="item__img">
                <v-img width="100" :src="item.product?.media?.getFullUrl()" />
              </div>
              <div class="item__description">
                <p v-if="item.campaign?.hasOwnProperty('name')">
                  <span class="text-bold" v-if="item.campaign">
                    Promo:
                  </span>
                  {{ item.campaign.name }}
                </p>
                <p>
                  <span class="text-bold">Product:</span>
                  {{ item.product?.name }}
                </p>
                <p>
                  <span class="text-bold">Price:</span>
                  ₱{{ item.product?.formattedPrice() }}
                </p>
                <p class="tickets-per-unit" v-if="item.campaign?.hasOwnProperty('name')">
                  No. of entries: <span class="text-bold text-green">{{ item.quantity }}</span>
                </p>
              </div>
              <v-spacer class="d-md-block d-none"></v-spacer>
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="controls-wrapper">
              <div class="controls">
                <button class="deduct-quantity" @click="deductQuantity(item)">
                  -
                </button>
                <button class="quantity">{{ item.quantity }}</button>
                <button class="add-quantity" @click="addQuantity(item)">
                  +
                </button>
              </div>
              <div class="donate-to-charity mt-2">
                <p class="donate-to-charity__text">
                  Donate this item to charity?
                </p>
                <v-switch inset v-model="item.is_for_donation" :label="item.is_for_donation ? 'Yes' : 'No'" color="green"
                  :update:modelValue="updateItem(item.id, {
                    quantity: item.quantity,
                    is_for_donation: item.is_for_donation,
                  })
                    " :true-value="1" :false-value="0" hide-details></v-switch>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Cart from "@models/cart";

const { cartItems, getCartItems, updateItem, removeItem, getShipping } = useCart();

function addQuantity(item: Cart) {
  const payload = {
    quantity: item.quantity + 1,
    is_for_donation: item.is_for_donation,
  }
  updateItem(item.id, payload)
}

function deductQuantity(item: Cart) {
  if (item.quantity > 1) {
    const payload = {
      quantity: item.quantity - 1,
      is_for_donation: item.is_for_donation,
    }
    updateItem(item.id, payload)
  }

}

await getCartItems();
</script>

<style lang="scss">
.remove-item-btn {
  position: absolute;
  z-index: 999;
  right: -10px;
  top: -10px;
}

.v-selection-control__wrapper,
.v-switch__thumb {
  color: $red;
}

.controls-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.donate-to-charity {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &__text {
    font-size: 14px;
  }
}

.item {
  position: relative;
  width: 100%;

  &__img {
    margin-right: 10px;
    border: 1px solid $gray;
    border-radius: 10px;
  }

  &__description {
    font-size: 14px !important;
    word-break: break-all;

    .prize-name,
    .product-price {
      font-family: "Montserrat-bold";
    }

    .tickets-per-unit {
      font-size: 12px;
    }
  }
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    border: 2px solid $gray;
    color: $primary;
    border-radius: 5px;
    height: 40px;

    &:hover {
      background-color: $blue;
      border: 2px solid $blue;
      color: $white;
    }
  }

  .deduct-quantity {
    width: 100px;
    margin-right: 10px;
    font-family: "Montserrat-bold";
  }

  .add-quantity {
    width: 100px;
    margin-left: 10px;
    font-family: "Montserrat-bold";
  }

  .quantity {
    width: 100%;
    height: 50px !important;
  }
}

@media screen and (max-width: 480px) {
  .remove-item-btn {
    width: calc(var(--v-btn-height) + 1px) !important;
    height: calc(var(--v-btn-height) + 1px) !important;
    right: -7px;
    top: -14px;
  }
}
</style>