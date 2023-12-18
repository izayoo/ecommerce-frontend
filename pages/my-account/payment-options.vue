<template>
  <div>
    <p class="text-bold mt-10 mb-4 title" style="font-size: 25px">
      Credit / Debit Card
    </p>
    <v-card
      v-for="(paymentOption, i) in paymentOptions"
      :key="i"
      class="elevation-6 pa-2 mb-4 border-radius-medium"
    >
      <div class="d-flex align-center flex-column flex-sm-row">
        <div class="d-flex justify-start align-center" style="width: 100%">
          <img width="120" height="60" :src="paymentOption.img" />
          <p>**** **** **** 1234</p>
        </div>
        <v-spacer></v-spacer>
        <div class="d-flex justify-sm-end justify-start" style="width: 100%">
          <v-hover v-slot:default="{ isHovering, props }">
            <v-btn
              v-bind="props"
              height="35"
              class="mr-4"
              :class="{
                bg__blue: isHovering || paymentOption.is_default,
                bg__primary: !isHovering && !paymentOption.is_default,
              }"
              >{{
                paymentOption.is_default ? "Default" : "Set As Default"
              }}</v-btn
            >
          </v-hover>
          <v-hover v-slot:default="{ isHovering, props }">
            <v-btn
              v-bind="props"
              height="35"
              class="mr-4"
              :class="{ bg__blue: isHovering, bg__red: !isHovering }"
              >Remove</v-btn
            >
          </v-hover>
        </div>
      </div>
    </v-card>
    <v-card
      class="add-card-btn elevation-6 pa-2 mb-4 d-flex justify-start align-center border-radius-medium"
      height="60"
    >
      <div class="d-flex align-center">
        <v-icon size="30" icon="mdi-plus-thick" class="mr-2"></v-icon>
        <p>Add new card</p>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
const paymentOptions = [
  {
    img: "/img/thirdpartylogos/Mastercard.png",
    is_default: true,
  },
  {
    img: "/img/thirdpartylogos/Visa.png",
    is_default: false,
  },
  {
    img: "/img/thirdpartylogos/Gcash.png",
    is_default: false,
  },
];
</script>

<style lang="scss">
.add-card-btn {
  cursor: pointer;

  &:hover {
    color: $white;
    background-color: $primary;
  }
}

@media screen and (max-width:480px){
    .title{
        font-size: 24px !important;
    }
}
</style>

