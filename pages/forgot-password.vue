<template>
    <v-container>
        <div class="forgot-password d-flex align-center justify-center">
            <v-card class="pa-8 elevation-6 border-radius-regular" width="400">
                <v-alert v-if="alert.message && alert.type" class="mb-4" density="compact" :type="alert.type || 'success'">
                    {{alert.message}}
                </v-alert>
                <h3 class="mb-4">Forgot password ?</h3>
                <v-divider class="mb-4"></v-divider>
                <p class="mb-4">Please enter your registered email.</p>
                <v-form ref="forgotPasswordForm">
                    <v-text-field v-model="form.email" label="email" :rules="formRules.email" variant="outlined"></v-text-field>
                    <div class="d-flex">
                        <v-spacer></v-spacer>
                        <v-btn class="bg__primary self-end" @click="submit" :loading="loading">Send</v-btn>
                    </div>
                </v-form>
            </v-card>
        </div>
    </v-container>
</template>

<script lang="ts" setup>
    const {required, email} = useValidation()
    const forgotPasswordForm:any = ref(null)
    const config = useRuntimeConfig()
    const form = reactive({
        email : '',
        redirect_url: `${config.public.baseUrl}/reset-password`
    })
    const loading = ref(false)
    const {$axios} = useNuxtApp()
    const alert:any = ref({message: null, type: null})

    const formRules:any = {
        email:[
            (value:any) => required(value, 'email'),
            (value:any) => email(value, 'email'),
        ]
    }

    async function submit() {
        const { valid } = await forgotPasswordForm.value.validate()
        if(valid){
            try{
                loading.value = true
                const response = await $axios.post('/forgot-password', form)
                alert.value.message = 'Please check your mail inbox, we sent you a link to reset your password.'
                alert.value.type = 'success'
                loading.value = false
            }catch(error:any){
                loading.value = false
                alert.value.message = error.response.data.message
                alert.value.type = 'error'
            }
        }
    }

useHead({
    title: `Forgot password`
})
</script>

<style lang="scss">
.forgot-password{
    height: 90vh;
}
</style>