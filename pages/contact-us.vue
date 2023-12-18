<template>
    <v-container>
        <p class="text-bold mt-10 mb-4" style="font-size: 25px;">Contact Us</p>
        <v-row>
            <v-col cols="12" md="6">
                <v-form ref="contactFormRef">
                    <v-row no-gutters>
                        <v-col cols="12" md="6" class="row-col-padding-contact-us">
                            <v-text-field v-model="contactForm.fname" :rules="formRules.fname" label="First Name"
                                variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" class="row-col-padding-contact-us">
                            <v-text-field v-model="contactForm.lname" :rules="formRules.lname" label="Last Name"
                                variant="outlined"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="12" md="6" class="row-col-padding-contact-us">
                            <v-text-field v-model="contactForm.email" :rules="formRules.email" label="Email"
                                variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" class="row-col-padding-contact-us">
                            <v-select v-model="contactForm.topic" :items="topics" :rules="formRules.topic"
                                variant="outlined" label="Topic"></v-select>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col>
                            <v-textarea v-model="contactForm.message" :rules="formRules.message" variant="outlined"
                                label="Message"></v-textarea>
                        </v-col>
                    </v-row>

                    <v-btn size="large" class="bg__primary" @click="submit" :loading="loading">Send</v-btn>
                </v-form>
            </v-col>
            
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
const loading = ref(false)
const { $axios } = useNuxtApp()
const contactFormRef: any = ref(null)
const contactForm: any = ref({})
const { required, email } = useValidation()
const { showSnackBar } = useSnackBar()

const topics = [
    'General Inquiries',
    'Technical Support',
    'Marketing Inquiries'
]

const formRules: any = {
    fname: [(value: any) => required(value, 'first name')],
    lname: [(value: any) => required(value, 'last name')],
    email: [
        (value: any) => required(value, 'email'),
        (value: any) => email(value, 'email'),
    ],
    topic: [(value: any) => required(value, 'topic')],
    message: [(value: any) => required(value, 'message')],
}

async function submit() {
    const { valid } = await contactFormRef.value.validate()
    if (valid) {
        try {
            loading.value = true
            await $axios.post('/contact-us', contactForm.value)
            loading.value = false
            contactForm.value = {}
            showSnackBar('Successfully submitted.')
        } catch (error: any) {
            loading.value = false
        }
    }
}

</script>

<style lang="scss">
.gmap_canvas {
    overflow: hidden;
    background: none !important;
    height: 510px;
    width: 100%;

    #gmap_canvas {
        height: 510px;
    }
}


.mapouter {
    position: relative;
    text-align: right;
    height: 510px;
    width: 100%;
}

.row-col-padding-contact-us:nth-child(odd) {
    padding-right: 5px !important;
}

.row-col-padding-contact-us:nth-child(even) {
    padding-left: 5px !important;
}

@media screen and (max-width: 599px) {
    .row-col-padding-contact-us:nth-child(odd) {
        padding-right: 0 !important;
    }

    .row-col-padding-contact-us:nth-child(even) {
        padding-left: 0 !important;
    }
}


</style>