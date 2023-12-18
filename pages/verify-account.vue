<template>
  <v-container class="pp d-flex flex-column align-center justify-center">
      <p class="text-bold mt-10 mb-4 title" style="font-size: 25px;">VERIFY ACCOUNT</p>
      <div class="content">
        <p>
          Your account has been successfully verified. Please
          <NuxtLink to="/login">login</NuxtLink> to continue.
        </p>
      </div>
  </v-container>
</template>
<style lang="scss">
@media screen and (max-width:480px){
  .pp {
    .title {
      font-size: 24px !important;
    }

    .content {
      font-size: 14px !important;
    }
  }
}
.pp{
  height: 80vh;
}
</style>
<script lang="ts" setup>
const { verification, verifyAccount } = useAuth();

const route = useRoute()
verifyAccount(route.query.email, route.query.token);
</script>