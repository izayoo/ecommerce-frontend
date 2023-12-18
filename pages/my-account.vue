<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="4" xl="3" class="d-md-block d-none">
                <v-card class="mt-10 elevation-6 border-radius-regular">
                    <div class="profile">
                        <v-avatar color="primary" size="100">
                            <v-icon icon="mdi-account" size="80"></v-icon>
                        </v-avatar>
                        <p class="text-bold">{{ authUser.fname }} {{ authUser.lname }}</p>
                        <p class="email">{{ authUser.email }}</p>
                    </div>
                    <v-list density="comfortable" nav active-class="bg__primary">
                        <v-divider></v-divider>
                        <v-hover v-slot="{ isHovering, props }">
                            <v-list-item v-bind="props" :class="{ 'bg__primary': isHovering }" prepend-icon="custom:account"
                                to="/my-account/account-details">
                                <p>Account Details</p>
                            </v-list-item>
                        </v-hover>
                        <v-divider></v-divider>
                        <v-hover v-slot="{ isHovering, props }">
                            <v-list-item v-bind="props" :class="{ 'bg__primary': isHovering }" prepend-icon="custom:ticket"
                                to="/my-account/active-tickets">
                                <p>Active Tickets</p>
                            </v-list-item>
                        </v-hover>
                        <v-divider></v-divider>
                        <v-hover v-slot="{ isHovering, props }">
                            <v-list-item v-bind="props" :class="{ 'bg__primary': isHovering }" prepend-icon="custom:order"
                                to="/my-account/my-orders">
                                <p>My Orders</p>
                            </v-list-item>
                        </v-hover>
                        <v-divider></v-divider>
                        <v-hover v-slot="{ isHovering, props }">
                            <v-list-item v-bind="props" :class="{ 'bg__primary': isHovering }" prepend-icon="custom:address"
                                to="/my-account/my-addresses">
                                <p>My Addresses</p>
                            </v-list-item>
                        </v-hover>
                        <!-- <v-divider></v-divider>
                        <v-hover v-slot="{ isHovering, props }">
                            <v-list-item v-bind="props" :class="{ 'bg__primary': isHovering }"
                                prepend-icon="custom:payment" to="/my-account/payment-options">
                                <p>Payment Options</p>
                            </v-list-item>
                        </v-hover>
                        <v-divider></v-divider>
                        <v-hover v-slot="{ isHovering, props }">
                            <v-list-item v-bind="props" :class="{ 'bg__primary': isHovering }" prepend-icon="custom:credit"
                                to="/my-account/credits">
                                <p>Credits</p>
                            </v-list-item>
                        </v-hover> -->
                        <v-divider></v-divider>
                        <v-hover v-slot="{ isHovering, props }">
                            <v-list-item v-bind="props" :class="{ 'bg__primary': isHovering }" prepend-icon="mdi-cog"
                                to="/my-account/change-password">
                                <p>Change Password</p>
                            </v-list-item>
                        </v-hover>
                        <v-divider></v-divider>
                        <v-hover v-slot="{ isHovering, props }">
                            <v-list-item v-bind="props" :class="{ 'bg__primary': isHovering }" prepend-icon="custom:logout" @click="logoutUser">
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
    </v-container>
</template>

<script lang="ts" setup>
definePageMeta({middleware: ["auth"]})
const {logout, authUser} = useAuth()
const {cartItems} = useCart()
function logoutUser(){
    cartItems.value = []
    logout()
}
</script>