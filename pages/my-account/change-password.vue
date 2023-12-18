<template>
  <div>
    <p class="text-bold mt-10 mb-4 title" style="font-size: 25px">Change Password</p>
    <v-form ref="changePasswordFormRef">
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.old_password"
            label="Current password"
            :type="currentPasswordVisible ? 'text' : 'password'"
            :append-inner-icon="
              currentPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'
            "
            @click:append-inner="
              currentPasswordVisible = !currentPasswordVisible
            "
            :rules="formRules.old_password"
            :error-messages="changePasswordErrors.old_password"
            variant="outlined"
            class="mb-2"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.new_password"
            :type="newPasswordVisible ? 'text' : 'password'"
            :append-inner-icon="
              newPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'
            "
            @click:append-inner="
              newPasswordVisible = !newPasswordVisible
            "
            :rules="formRules.new_password"
            :error-messages="changePasswordErrors.new_password"
            label="New password"
            variant="outlined"
            class="mb-2"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.new_password_confirmation"
            :type="newPasswordConfirmationVisible ? 'text' : 'password'"
            :append-inner-icon="
              newPasswordConfirmationVisible ? 'mdi-eye-off' : 'mdi-eye'
            "
            @click:append-inner="
              newPasswordConfirmationVisible = !newPasswordConfirmationVisible
            "
            :rules="formRules.new_password_confirmation"
            :error-messages="changePasswordErrors.new_password_confirmation"
            label="Confirm password"
            variant="outlined"
            class="mb-2"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-hover v-slot:default="{ isHovering, props }">
        <v-btn
          v-bind="props"
          width="100"
          size="large"
          :class="{ bg__blue: isHovering, bg__primary: !isHovering }"
          :loading="loading"
          @click="submit"
          >Save</v-btn
        >
      </v-hover>
    </v-form>
  </div>
</template>

<script lang="ts" setup>
const { changePassword, changePasswordErrors, loading } = useAuth();
const {required, matches} = useValidation()
const form: any = ref({});
const changePasswordFormRef:any = ref(null);
const currentPasswordVisible = ref(false);
const newPasswordVisible = ref(false);
const newPasswordConfirmationVisible = ref(false);

const formRules:any = {
    old_password:[
        (value:any) => required(value, 'current password')
    ],
    new_password:[
        (value:any) => required(value, 'new password')
    ],
    new_password_confirmation:[
        (value:any) => required(value, 'confirm password'),
        (value:any) => matches(value, form.value.new_password, 'password')
    ]
}

async function submit(){
    const {valid} = await changePasswordFormRef.value.validate()
    if(valid){
        await changePassword(form.value)
    }
}

useHead({
    title: `Change Password`
})
</script>

<style lang="scss">
@media screen and (max-width:480px){
    .title{
        font-size: 24px !important;
    }
}
</style>
