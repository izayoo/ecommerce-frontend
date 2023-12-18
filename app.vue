<template>
  <v-layout>
    <v-app>
      <NavBar @toggleDrawer="toggleDrawer" :drawer="drawer" />
      <NavDrawer @toggleDrawer="toggleDrawer" :drawer="drawer" />
      <v-main v-if="!drawer">
        <NuxtPage />
        <AppFooter />
      </v-main>
      <v-snackbar v-if="snackBarState" location="top right" :color="snackBarState.color" v-model="snackBarState.show">
        {{ snackBarState.message }}
        <template v-slot:actions>
          <v-btn icon @click="closeSnackBar">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>

    </v-app>
    <!-- <div v-if="!$route.path.includes('cart')" id="fb-root"></div>
    <div v-if="!$route.path.includes('cart')" class="fb-customerchat" attribution="install_email" attribution_version="biz_inbox" page_id="102436435777339">
    </div> -->
  </v-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const drawer = ref(false)
const { me } = useAuth()
const { snackBarState, closeSnackBar } = useSnackBar()
const { getCartItems } = useCart()
const { $isRole, $isAuthenticated } = useNuxtApp()

if ($isRole('user') && $isAuthenticated()) {
  await me()
  await getCartItems()
}

function toggleDrawer(drawerValue = null) {
  if (drawerValue !== null) {
    drawer.value = drawerValue
  } else {
    drawer.value = !drawer.value
  }
}


// useHead({
//   script: [
//     {
//       children: "window.fbAsyncInit = function() {FB.init({xfbml: true,version: 'v18.0'});};(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));",
//     }
//   ]
// })
</script>