<template>
    <v-container>
        <div class="forgot-password d-flex align-center justify-center">
            <v-card class="pa-8 elevation-6 border-radius-regular" width="400">
                <v-alert v-if="alert.message && alert.type" class="mb-4" density="compact" :type="alert.type || 'success'">
                    {{alert.message}}
                </v-alert>
                <h3 class="mb-4">Reset password</h3>
                <v-divider class="mb-4"></v-divider>
                <v-form ref="resetPasswordForm">
                    <v-text-field type="password" v-model="form.password" label="New password" :rules="formRules.password" variant="outlined"></v-text-field>
                    <v-text-field type="password" v-model="form.password_confirmation" label="Confirm new password" :rules="formRules.password_confirmation" variant="outlined"></v-text-field>
                    <div class="d-flex">
                        <v-spacer></v-spacer>
                        <v-btn class="bg__primary self-end" @click="submit" :loading="loading">Reset</v-btn>
                    </div>
                </v-form>
            </v-card>
        </div>
    </v-container>
</template>

<script lang="ts" setup>
    const {required, matches} = useValidation()
    const resetPasswordForm:any = ref(null)
    const route = useRoute()

    const form = reactive({
        password : '', 
        password_confirmation : '',
        email: route.query.email.replace(' ','+'),
        token: route.query.token,
    })
    const loading = ref(false)
    const {$axios} = useNuxtApp()
    const alert:any = ref({message: null, type: null})

    const formRules:any = {
        password:[
            (value:any) => required(value, 'new password'),
        ],
        password_confirmation:[
            (value:any) => matches(value, form.password, 'new password'),
            (value:any) => required(value, 'confirm new password'),
        ]
    }

    async function submit() {
        const { valid } = await resetPasswordForm.value.validate()
        if(valid){
            try{
                loading.value = true
                const response = await $axios.post('/reset-password', form)
                alert.value.message = 'Password successfully reset.'
                alert.value.type = 'success'
                loading.value = false
                setTimeout(() => {
                    navigateTo('/login')
                },2000)
            }catch(error:any){
                loading.value = false
                alert.value.message = error.response.data.message
                alert.value.type = 'error'
            }
        }
    }

useHead({
    title: `Reset password`
})
</script>

<style lang="scss">
.forgot-password{
    height: 90vh;
}
</style>