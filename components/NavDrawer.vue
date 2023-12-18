<template>
  <v-navigation-drawer v-model="props.drawer" temporary style="width: 100%">
    <div class="d-flex flex-column align-center justify-center mb-8" v-if="!isAuthenticated">
      <p class="mt-8 mb-2">New or existing user? Get started.</p>
      <v-btn width="200" size="large" class="bg__primary" to="/login" @click="$emit('toggleDrawer')">Login/Signup</v-btn>
    </div>

    <v-card class="ma-5 elevation-6 border-radius-regular" v-if="isAuthenticated">
      <div class="profile">
        <v-avatar color="primary" size="100">
          <v-icon icon="custom:account" size="80"></v-icon>
        </v-avatar>
        <p class="text-bold">{{ authUser.fname }} {{ authUser.lname }}</p>
        <p class="email">{{ authUser.email }}</p>
      </div>
      <v-list density="comfortable" nav active-class="bg__primary">
        <v-divider></v-divider>
        <v-hover v-slot="{ isHovering, props }">
          <v-list-item v-bind="props" :class="{ bg__primary: isHovering }" @click="$emit('toggleDrawer')"
            prepend-icon="custom:account" to="/my-account/account-details">
            <p>Account Details</p>
          </v-list-item>
        </v-hover>
        <v-divider></v-divider>
        <v-hover v-slot="{ isHovering, props }">
          <v-list-item v-bind="props" :class="{ bg__primary: isHovering }" @click="$emit('toggleDrawer')"
            prepend-icon="custom:ticket" to="/my-account/active-tickets">
            <p>Active Tickets</p>
          </v-list-item>
        </v-hover>
        <v-divider></v-divider>
        <v-hover v-slot="{ isHovering, props }">
          <v-list-item v-bind="props" :class="{ bg__primary: isHovering }" @click="$emit('toggleDrawer')"
            prepend-icon="custom:order" to="/my-account/my-orders">
            <p>My Orders</p>
          </v-list-item>
        </v-hover>
        <v-divider></v-divider>
        <v-hover v-slot="{ isHovering, props }">
          <v-list-item v-bind="props" :class="{ bg__primary: isHovering }" @click="$emit('toggleDrawer')"
            prepend-icon="custom:address" to="/my-account/my-addresses">
            <p>My Addresses</p>
          </v-list-item>
        </v-hover>
        <!-- <v-divider></v-divider>
        <v-hover v-slot="{ isHovering, props }">
          <v-list-item v-bind="props" :class="{ bg__primary: isHovering }" @click="$emit('toggleDrawer')"
            prepend-icon="custom:payment" to="/my-account/payment-options">
            <p>Payment Options</p>
          </v-list-item>
        </v-hover>
        <v-divider></v-divider>
        <v-hover v-slot="{ isHovering, props }">
          <v-list-item v-bind="props" :class="{ bg__primary: isHovering }" prepend-icon="custom:credit"
            to="/my-account/credits" @click="$emit('toggleDrawer')">
            <p>Credits</p>
          </v-list-item>
        </v-hover> -->

        <v-divider></v-divider>
        <v-hover v-slot="{ isHovering, props }">
          <v-list-item v-bind="props" :class="{ bg__primary: isHovering }" @click="$emit('toggleDrawer')"
            prepend-icon="mdi-cog" to="/my-account/change-password">
            <p>Change Password</p>
          </v-list-item>
        </v-hover>

        <v-divider></v-divider>
        <v-hover v-slot="{ isHovering, props }">
          <v-list-item v-bind="props" :class="{ bg__primary: isHovering }" prepend-icon="custom:logout" @click="logoutFn()">
            <p>Logout</p>
          </v-list-item>
        </v-hover>
      </v-list>
    </v-card>

    <p class="text-center text-bold" style="font-size: 30px">Menu</p>
    <v-card class="ma-5 elevation-6 border-radius-regular">
      <v-list class="menu" density="comfortable" nav>
        <v-hover v-slot="{ isHovering, props }">
          <v-list-item v-bind="props" :class="{ bg__primary: isHovering, 'bg__primary v-list-item--active' : setListIsActive('#prizes') }" @click="$emit('toggleDrawer')"
            prepend-icon="custom:prize" to="/#prizes">
            <p>Prizes</p>
          </v-list-item>
        </v-hover>
        <v-divider></v-divider>
        <v-hover v-slot="{ isHovering, props }">
          <v-list-item v-bind="props" :class="{ bg__primary: isHovering, 'bg__primary v-list-item--active' : setListIsActive('#products') }" @click="$emit('toggleDrawer')"
            prepend-icon="custom:product" to="/#products">
            <p>Products</p>
          </v-list-item>
        </v-hover>
        <!-- <v-divider></v-divider>
        <v-hover v-slot="{ isHovering, props }">
          <v-list-item v-bind="props" :class="{ bg__primary: isHovering }" @click="$emit('toggleDrawer')"
            prepend-icon="custom:winner" to="/#winners">
            <p>Winners</p>
          </v-list-item>
        </v-hover> -->
        <v-divider></v-divider>
        <v-hover v-slot="{ isHovering, props }">
          <v-list-item v-bind="props" :class="{ bg__primary: isHovering, 'bg__primary v-list-item--active' : setListIsActive('frequently-asked-questions') }" @click="$emit('toggleDrawer')"
            prepend-icon="custom:faq" to="/frequently-asked-questions">
            <p>FAQs</p>
          </v-list-item>
        </v-hover>
      </v-list>
    </v-card>

    <p class="text-center text-bold" style="font-size: 30px">Information</p>
    <v-card class="ma-5 elevation-6 border-radius-regular">
      <v-list density="comfortable" nav active-class="bg__primary">
        <v-hover v-slot="{ isHovering, props }">
          <v-list-item v-bind="props" :class="{ bg__primary: isHovering }" @click="$emit('toggleDrawer')"
            prepend-icon="custom:contact" to="/contact-us">
            <p>Contact Us</p>
          </v-list-item>
        </v-hover>
        <v-divider></v-divider>
        <v-hover v-slot="{ isHovering, props }">
          <v-list-item v-bind="props" :class="{ bg__primary: isHovering }" @click="$emit('toggleDrawer')"
            prepend-icon="custom:agreement" to="/user-agreement">
            <p>User Agreement</p>
          </v-list-item>
        </v-hover>
        <v-divider></v-divider>
        <v-hover v-slot="{ isHovering, props }">
          <v-list-item v-bind="props" :class="{ bg__primary: isHovering }" @click="$emit('toggleDrawer')"
            prepend-icon="custom:policy" to="/privacy-policy">
            <p>Privacy Policy</p>
          </v-list-item>
        </v-hover>
      </v-list>
    </v-card>
    <div class="d-flex flex-column align-center">
      <NuxtLink class="mt-6 mb-6" to="/"><img width="100" src="/img/Logo-Dark.png" /></NuxtLink>
      <div class="d-flex side-bar-social mb-6" style="gap: 20px">
        <a v-for="(icon, i) in icons" :key="i" :href="icon.link" target="_blank" style="font-size: 18px;">
          <v-icon size="x-large">{{ icon.icon }}</v-icon>
        </a>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
const props = defineProps(["drawer"]);
const { isAuthenticated, authUser, logout } = useAuth();
const icons = [
  {
    icon: 'custom:facebook',
    link: ''
  },
  {
    icon: 'custom:instagram',
    link: ''
  },
  {
    icon: 'custom:youtube',
    link: ''
  },
  {
    icon: 'custom:tiktok',
    link: ''
  },
]


async function logoutFn(){
  await logout();
  window.location.reload()
}

function setListIsActive(path: string) {
  const route = useRoute()
  if (route.hash === path || route.path.includes(path)) {
    return true
  }

  return false
}
</script>

<style lang="scss">
.menu {

  .v-list-item--active>.v-list-item__overlay,
  .v-list-item[aria-haspopup=menu][aria-expanded=true]>.v-list-item__overlay {
    opacity: 0 !important;
  }
}

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
}

.tiktok-icon {
  display: flex;
  align-items: center;

  svg {
    width: 30px;
    fill: $secondary;
    align-self: center;

    &:hover {
      fill: $blue;
    }
  }
}

.side-bar-social {
  a {
    font-size: 13px;
    color: $gray;
    text-decoration: none;
    color: $primary !important;

    &:hover {
      color: $blue;
    }
  }
}</style>