<template>
    <v-container>
        <v-row v-if="isAdminAuthenticated">
            <v-col cols="12" md="4" xl="3" class="d-md-block d-none">
                <v-card class="mt-10 elevation-6 border-radius-regular">
                    <div class="profile">
                        <v-avatar color="primary" size="100">
                            <v-icon icon="mdi-account" size="80"></v-icon>
                        </v-avatar>
                        <p class="text-bold">Administrator</p>
                        <!-- <p class="email">testemail@gmail.com</p> -->
                    </div>
                    <v-list density="comfortable" nav active-class="bg__primary">
                        <v-divider></v-divider>
                        <v-hover v-slot="{ isHovering, props }">
                            <v-list-item v-bind="props" :class="{ 'bg__primary': isHovering }" prepend-icon="mdi-home"
                                to="/admin/overview">
                                <p>Overview</p>
                            </v-list-item>
                        </v-hover>
                        <v-divider></v-divider>
                        <v-hover v-slot="{ isHovering, props }">
                            <v-list-item v-bind="props" :class="{ 'bg__primary': isHovering, 'bg__primary v-list-item--active' : setListIsActive('/admin/banners') }" prepend-icon="mdi-card"
                                to="/admin/banners">
                                <p>Banners</p>
                            </v-list-item>
                        </v-hover>
                        <v-divider></v-divider>
                        <v-hover v-slot="{ isHovering, props }">
                            <v-list-item v-bind="props" :class="{ 'bg__primary': isHovering, 'bg__primary v-list-item--active' : setListIsActive('/admin/products') }" prepend-icon="mdi-cart"
                                to="/admin/products">
                                <p>Products</p>
                            </v-list-item>
                        </v-hover>
                        <v-divider></v-divider>
                        <v-hover v-slot="{ isHovering, props }">
                            <v-list-item v-bind="props" :class="{ 'bg__primary': isHovering, 'bg__primary v-list-item--active' : setListIsActive('/admin/campaigns') }" prepend-icon="mdi-diamond-stone"
                                to="/admin/campaigns">
                                <p>Campaigns</p>
                            </v-list-item>
                        </v-hover>
                        <v-divider></v-divider>
                        <v-hover v-slot="{ isHovering, props }">
                            <v-list-item v-bind="props" :class="{ 'bg__primary': isHovering, 'bg__primary v-list-item--active' : setListIsActive('/admin/orders') }" prepend-icon="mdi-currency-usd"
                                to="/admin/orders">
                                <p>Orders</p>
                            </v-list-item>
                        </v-hover>
                        <v-divider></v-divider>
                        <v-hover v-slot="{ isHovering, props }">
                            <v-list-item v-bind="props" :class="{ 'bg__primary': isHovering, 'bg__primary v-list-item--active' : setListIsActive('/admin/users') }"
                                prepend-icon="mdi-account" to="/admin/users">
                                <p>Users</p>
                            </v-list-item>
                        </v-hover>
                        <v-divider></v-divider>
                        <v-hover v-slot="{ isHovering, props }">
                            <v-list-item v-bind="props" :class="{ 'bg__primary': isHovering }" prepend-icon="mdi-cog"
                                to="/admin/change-password">
                                <p>Change Password</p>
                            </v-list-item>
                        </v-hover>
                        <v-divider></v-divider>
                        <v-hover v-slot="{ isHovering, props }">
                            <v-list-item v-bind="props" :class="{ 'bg__primary': isHovering }" prepend-icon="mdi-logout" @click="logout">
                                <p>Logout</p>
                            </v-list-item>
                        </v-hover>
                    </v-list>
                </v-card>
            </v-col>
            <v-col cols="12" md="8" xl="9">
                <NuxtPage />
            </v-col>
        </v-row>
        <v-row v-else>
          <NuxtPage />
        </v-row>
    </v-container>
</template>
<script lang="ts" setup>
definePageMeta({middleware: ["auth"]})

const { isAdminAuthenticated, logout } = useAdminAuth();

function setListIsActive(path:string){
  const route = useRoute()
  if(route.path.includes(path)) {
      return true
  }

  return false
}
</script>