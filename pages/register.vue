<template>
    <v-container>
        <div class="d-flex align-center justify-center register-form-container">
            <div class="register-form">
                <p class="text-bold text-center mb-4" style="font-size: 28px;">Register</p>
                <v-form ref="registerform">
                    <v-text-field v-model="form.fname" label="First Name" variant="outlined"
                        :error-messages="registerErrors.fname" :rules="formRules.fname"></v-text-field>

                    <v-text-field v-model="form.lname" label="Last Name" variant="outlined"
                        :error-messages="registerErrors.lname" :rules="formRules.lname"></v-text-field>

                    <v-text-field v-model="form.email" type="email" label="Email" variant="outlined"
                        :error-messages="registerErrors.email" :rules="formRules.email"></v-text-field>

                    <PhoneNumber v-model="phoneNumber" :phone-number-error-messages="registerErrors.mobile_no"
                        :phone-number-rules="formRules.mobile_no" />

                    <v-text-field type="date" v-model="form.birthdate" min="1970-01-01" :error-messages="registerErrors.birthdate"
                        :rules="formRules.birthdate" label="Date of Birth" variant="outlined"/>

<!--                    <v-select v-model="form.nationality" :items="nationalities" item-value="nationality" item-title="nationality" variant="outlined"-->
<!--                        label="Nationality" :error-messages="registerErrors.nationality" :rules="formRules.nationality"></v-select>-->

<!--                    <v-select v-model="form.gender" :items="genders" item-value="code" item-title="name" variant="outlined"-->
<!--                        label="Gender" :error-messages="registerErrors.gender" :rules="formRules.gender"></v-select>-->

                    <v-text-field v-model="form.password" label="Password" variant="outlined" type="password"
                                  :error-messages="registerErrors.password" :rules="formRules.password"></v-text-field>

                    <v-text-field v-model="form.password_confirmation" label="Confirm Password" variant="outlined" type="password"
                                  :error-messages="registerErrors.password_confirmation" :rules="formRules.password_confirmation"></v-text-field>

                    <v-checkbox v-model="acceptagreement" :rules="formRules.accept_agreement">
                      <template v-slot:label>
                        <p> I agree with user <NuxtLink to="/user-agreement" target="_blank"><span class="text-bold">User
                                          Agreement</span>
                        </NuxtLink> and <NuxtLink to="/privacy-policy" target="_blank"><span class="text-bold">Privacy Policy</span>
                        </NuxtLink>
                        </p>
                      </template>
                    </v-checkbox>

                    <v-btn height="56px" size="large" width="100%" class="bg__primary" @click="submit"
                        :loading="loading">register</v-btn>
                </v-form>
                <p class="mt-4 text-center">Already have an account? <NuxtLink class="text-bold" to="/login">Sign in here
                    </NuxtLink>
                </p>
            </div>
        </div>
    </v-container>
</template>

<script lang="ts" setup>
import User from 'models/user'
import { ref } from 'vue'
import nationalities from '~/assets/js/nationalities.json'
const acceptagreement = ref(false)
const form = reactive({} as User)
const phoneNumber = ref<any>(null)
const { register, loading, registerErrors } = useAuth()
const { required, max, email, booleanTrue, numeric } = useValidation()

const registerform: any = ref(null)

async function submit(){
    const {valid} = await registerform.value.validate()
    if(valid){
        register(form)
    }
}

const formRules = {
    fname: [
        (value: any) => required(value, 'first name'),
    ],
    lname: [
        (value: any) => required(value, 'last name'),
    ],
    email: [
        (value: any) => required(value),
        (value: any) => email(value)
    ],
    mobile_no: [
        (value: any) => required(value, 'phone number'),
        (value: any) => numeric(value, 'phone number'),
        (value: any) => max(value, 10, 'phone number'),
    ],
    birthdate: [
        (value: any) => required(value, 'birthdate'),
    ],
    nationality: [
        (value: any) => required(value, 'nationality'),
    ],
    gender: [
        (value: any) => required(value, 'gender'),
    ],
    password:[
      (value: any) => required(value, 'password'),
    ],
    password_confirmation:[
      (value: any) => required(value, 'password_confirmation'),
    ],
    accept_agreement: [
        (value: any) => booleanTrue(value, 'You must accept to user agreement and privacy policy'),
    ],
}

watch(phoneNumber, (item) => {
    form.country_code = item?.country_code
    form.mobile_no = item?.phone_number
})

const genders = [
    {
        name: 'Male',
        code: 'm'
    },
    {
        name: 'Female',
        code: 'f'
    },
]

onBeforeMount(() => {
    if (localStorage.getItem('token')) {
        navigateTo('/')
    }
})

useHead({
    title: `Register`
})
</script>

<style lang="scss">
.register-form-container {
    .register-form {
        width: 500px;
        padding-top: 50px;
        padding-bottom: 50px;

        a {
            text-decoration: none;
            color: $primary;
        }

        .v-input {
            margin-bottom: 2px;
        }
    }
}

@media screen and (max-width: 480px) {
    .v-selection-control {
        align-items: start !important;
    }
}

</style>