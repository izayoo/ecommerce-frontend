<template>
    <v-footer class="footer bg-primary pt-8 pb-8">
        <v-container>
            <v-row>
                <v-col cols="12" lg="3" md="6" class="socials">
                    <v-img width="150" class="mx-auto" src="/img/Logo-White.png" />
                    <!-- <div class="d-flex mt-4 app-logos" style="gap: 4px;">
                        <v-img src="/img/App-Store.png" width="100" height="50" class="app-logo"/>
                        <v-img src="/img/Google-Play.png" width="100" height="50" class="app-logo"/>
                    </div> -->
                </v-col>
                <v-col cols="12" lg="4" md="6" class="socials">
                    <v-row>
                        <v-col>
                            <p class="text-bold text-color-white mb-2" style="font-size: 20px;white-space: nowrap;">Quick Links</p>
                            <div class="d-flex flex-column" style="gap: 16px;">
                                <NuxtLink to="/about-us">About Us</NuxtLink>
                                <NuxtLink to="/contact-us">Contact Us</NuxtLink>
                                <NuxtLink :to="isAuthenticated ? '/my-account/account-details' : '/login'">My Account</NuxtLink>
                                <NuxtLink :to="isAuthenticated ? '/my-account/active-tickets' : '/login'">Active Tickets</NuxtLink>
                            </div>
                        </v-col>
                        <v-col>
                            <p class="text-bold text-color-white mb-2" style="font-size: 20px;">Information</p>
                            <div class="d-flex flex-column" style="gap: 16px;">
                                <NuxtLink to="/frequently-asked-questions">FAQ</NuxtLink>
                                <!-- <NuxtLink to="/about-us/#how-it-works">How it works</NuxtLink> -->
                                <NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink>
                                <NuxtLink to="/user-agreement">User Agreement</NuxtLink>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" lg="2" md="12" class="socials">
                    <p class="text-bold text-color-white mb-2" style="margin-left: 12px; font-size: 20px;">Socials</p>
                    <div class="d-flex" style="gap: 10px;">
                        <a v-for="(icon, i) in icons" :key="i" :href="icon.link" target="_blank" style="font-size: 18px;">
                            <v-icon size="x-large">{{ icon.icon }}</v-icon>
                        </a>
                    </div>
                </v-col>
                <v-col cols="12" lg="3" md="12" class="socials">

                    <a class="mb-2">We Accept</a>
                    <v-row no-gutters>
                        <v-col>
                            <v-img width="79px" height="34px" src="/img/thirdpartylogos/Visa.png" class="payment-methods" />
                        </v-col>
                        <v-col>
                            <v-img width="79px" height="34px" src="/img/thirdpartylogos/Mastercard.png"
                                class="payment-methods" />
                        </v-col>
                        <v-col>
                            <v-img width="79px" height="34px" src="/img/thirdpartylogos/Gcash.png"
                                class="payment-methods" />
                        </v-col>
                    </v-row>
                    <br />
                    <a class="mb-2">Regulated by</a>
                    <v-img width="79px" height="34px" src="/img/thirdpartylogos/DTI.png" />

                </v-col>
            </v-row>
            <div class="text-center mt-8" style="font-size: 13px;">
                &copy 2023 All rights reserved
            </div>
        </v-container>
    </v-footer>
</template>
<script lang="ts" setup>
const {isAuthenticated} = useAuth()
const icons = [
    {
        icon:'custom:facebook',
        link :''
    },
    {
        icon:'custom:instagram',
        link :''
    },
    {
        icon:'custom:youtube',
        link :''
    },
    {
        icon:'custom:tiktok',
        link :''
    },
]
</script>

<style lang="scss">
.footer {
    margin-top: 50px;

    a {
        font-size: 13px;
        color: $gray;
        text-decoration: none;

        &:hover {
            color: $blue;
        }
    }

    .tiktok-icon {
        display: flex;
        align-items: center;
        svg {
            width: 27px;
            fill: #fff;
            align-self: center;

            &:hover {
                fill: $blue;
            }
        }
    }

}

@media screen and (max-width:1279px) {
    .footer {
        .socials {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .payment-methods {
                margin-right: 4px;
            }
        }
    }
}
@media screen and (max-width:480px) {
    .footer{
        .app-logos{
            gap: 2px !important;
            .app-logo{
                width: 140px !important;
                height: 56px;
            }
        }
    }
}
</style>