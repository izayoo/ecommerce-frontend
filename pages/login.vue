<template>
    <v-container>
        <div class="d-flex align-center justify-center login-form-container">
            <div class="login-form">
                <p class="text-bold text-center mb-4" style="font-size: 28px;">
                    Welcome {{ newUser ? newUser.fname : 'back' }}!
                </p>
                <v-alert v-if="newUser" class="mb-6" density="compact" type="success">
                    Kindly activate your account through the email we have sent you. Please check your inbox and junk folder.
                </v-alert>
                <v-alert v-if="invalidCredentials" class="mb-6" density="compact" type="error"
                    title="Invalid credentials"></v-alert>
                <v-form ref="form">
                    <v-text-field v-model="credentials.email" :rules="formRules.email" label="Email"
                        variant="outlined"></v-text-field>
                    <v-text-field v-model="credentials.password" :rules="formRules.password"
                        :type="visible ? 'text' : 'password'" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append-inner="visible = !visible" label="Password" variant="outlined"></v-text-field>
                    <div class="d-flex align-center rember-me-forgot-pass">
                        <v-checkbox v-model="remberMe" class="d-flex">
                            <template v-slot:label>
                                <p class="text-color-secondary">Remember me</p>
                            </template>
                        </v-checkbox>
                        <v-spacer></v-spacer>
                        <NuxtLink to="/forgot-password">Forgot password?</NuxtLink>
                    </div>
                    <v-btn @click="submit" height="56px" size="large" width="100%" class="bg__primary mt-2"
                        :loading="loading">Login</v-btn>
                </v-form>
                <!-- <p class="social-login-text mt-8">or login using</p>

                <div class="d-flex justify-center mt-8">
                    <SocialLogins />
                </div> -->
                <p class="mt-8 text-center">Don't have an account? <NuxtLink class="text-bold" to="/register">Register here
                    </NuxtLink>
                </p>
            </div>
        </div>
    </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const remberMe = ref(false)
const visible = ref(false)
const { login, credentials, loading, invalidCredentials, isAuthenticated, newUser } = useAuth()
const { getCartItems } = useCart()

if (newUser.value) {
    credentials.email = newUser.value.email
}
watch(isAuthenticated, () => {
    getCartItems()
})

const formRules = {
    email: [
        (value: any) => {
            if (value) return true
            return 'The email field is required.'
        },
        (value: any) => {
            if (/.+@.+\..+/.test(value)) return true

            return 'E-mail must be valid.'
        },
    ],
    password: [
        (value: any) => {
            if (value) return true
            return 'The email field is required.'
        },
    ]
}

const form: any = ref(null)

async function submit() {
    const { valid } = await form.value.validate()
    if (valid) {
        login()
    }
}

onBeforeMount(() => {
    if (localStorage.getItem('token')) {
        navigateTo('/')
    }
    
})

useHead({
    title: `Login`,
})
</script>

<style lang="scss">
.login-form-container {
    height: 90vh;

    .login-form {
        width: 400px;

        a {
            text-decoration: none;
            color: $primary;
        }

        .rember-me-forgot-pass {
            .v-label {
                opacity: 1;
            }

            .v-input--density-default {
                --v-input-control-height: 0;
                --v-input-padding-top: 0;
            }
        }
    }

    .social-login-text {
        display: flex;
        flex-direction: row;
        color: $secondary;

        &::after,
        &::before {
            content: "";
            flex: 1 1;
            border-bottom: 1px solid;
            margin: auto;
        }

        &::after {
            margin-left: 10px
        }

        &::before {
            margin-right: 10px
        }
    }
}
</style>