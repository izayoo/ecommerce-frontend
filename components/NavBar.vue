<template>
    <v-app-bar color="primary" height="80" style="position: fixed;">
        <v-container>
            <!-- large screens navigation -->
            <div class="d-md-flex d-none">
                <div class="d-flex nav-links ">
                    <NuxtLink to="/"><img class="mr-16" width="100" src="/img/Logo-White.png" /></NuxtLink>
                    <div class="menu align-center">
                        <nuxt-link to="/#prizes" class="mr-4 text-bold text-color-white">Prizes</nuxt-link>
                        <nuxt-link to="/#products" class="mr-4 text-bold text-color-white">Products</nuxt-link>
<!--                        <nuxt-link to="/#winners" class="mr-4 text-bold text-color-white">Winners</nuxt-link>-->
                        <nuxt-link to="/frequently-asked-questions" class="mr-4 text-bold text-color-white">FAQ</nuxt-link>
                    </div>
                </div>
                <v-spacer></v-spacer>
                <div class="d-flex align-center" v-if="!isAdminAuthenticated">
                    <v-hover v-slot:default="{ isHovering, props }">
                        <v-btn 
                        v-bind="props"
                        class="rounded-pill mr-2" 
                        :class="{'bg-transparent' : isHovering, 'bg__blue': !isHovering }" 
                        :to="isAuthenticated ? '/my-account/account-details': '/login'">
                            <span v-if="isAuthenticated">My Account</span>
                            <span v-else>Login/Register</span>
                            <v-icon class="ml-2" center icon="custom:account"></v-icon>
                        </v-btn>
                    </v-hover>
                    <v-hover v-slot:default="{ isHovering, props }">
                    <v-btn 
                        :to="isAuthenticated ? '/cart': '/login'" 
                        v-bind="props" class="rounded-pill" 
                        :class="{'bg-transparent' : isHovering, 'bg__blue': !isHovering }">
                        <span>Cart({{ cartItems?.length }})</span>
                        <v-icon center icon="custom:cart"></v-icon>
                    </v-btn>
                    </v-hover>
                </div>
                <div class="d-flex align-center" v-else>
                    <v-hover v-slot:default="{ isHovering, props }">
                        <v-btn 
                        v-bind="props"
                        class="rounded-pill mr-2" 
                        :class="{'bg-transparent' : isHovering, 'bg__blue': !isHovering }" 
                        to="/admin/overview">
                            <span>Admin</span>
                            <v-icon center icon="mdi-account"></v-icon>
                        </v-btn>
                    </v-hover>
                </div>
            </div>

            <!-- small screens navigation -->
            <div class="d-md-none d-flex align-center md-nav">
                <v-btn :to="isAuthenticated ? '/cart': '/login'"  class="text-center" @click="$emit('toggleDrawer', false)">
                    <v-icon center icon="custom:cart" size="40"></v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <NuxtLink to="/" @click="$emit('toggleDrawer',false)"><img width="90" src="/img/Logo-White.png" /></NuxtLink>
                <v-spacer></v-spacer>
                <v-btn @click="$emit('toggleDrawer')" class="text-center">
                    <v-icon center :icon="!drawer ? 'custom:menu' : 'mdi-close'" size="40"></v-icon>
                </v-btn>
            </div>
        </v-container>
    </v-app-bar>
</template>
<script lang="ts" setup>
defineProps(['drawer'])
const {authUser, isAuthenticated} = useAuth()
const {cartItems} = useCart()
const {isAdminAuthenticated} = useAdminAuth()
</script>
<style lang="scss">
.md-nav{
    .v-btn.v-btn--density-default {
        height: auto;
    }
}
.nav-links{

    font-size: 14px !important;
    .menu{
        display: flex;
        gap: 50px;
        font-size: 14px;
        @media screen and (max-width:1279px) {
            gap: 10px;
        }
    }
    a{
        text-decoration: none;
        &:hover{
            color: $blue !important;
        }
    }
}
</style>