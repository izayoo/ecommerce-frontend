<template>
    <v-btn class="bg__primary">
        {{ label }}
        <v-dialog activator="parent" width="auto">
            <v-card class="pa-8" width="600">
                <v-form ref="bannerFormRef">
                    <v-text-field v-model="bannerForm.url_redirect" variant="outlined" label="Redirect Url" class="mb-2"
                        :rules="formRules.url_redirect" width="100%"></v-text-field>

                    <v-img v-if="bannerForm.media" :src="bannerForm.media.getFullUrl()" class="mb-4"/>
                    <v-file-input variant="outlined" :label="bannerForm.media ? 'Change Image' : 'Image'" class="mb-2"
                        :rules="formRules.image" @change="uploadImage" :loading="uploading"></v-file-input>

                    <v-btn size="large" class="bg__primary" @click="submit" :loading="loading">Save</v-btn>
                </v-form>
            </v-card>
        </v-dialog>
    </v-btn>
</template>
  
<script lang="ts" setup>
defineProps(['label']);
const emits = defineEmits(['action']);
const { loading, bannerForm } = useAdminBanner();
const { required } = useValidation();
const { uploading, uploadMedia, uploadedMedia } = useMedia();
const bannerFormRef: any = ref(null);
const formRules: any = {
    url_redirect: [(value: any) => required(value, "redirect url")],
    image: [(value: any) => required(value, "iamge")],
};

async function uploadImage(e: any) {
    await uploadMedia(e);
    bannerForm.value.media_id = uploadedMedia.id;
    bannerForm.value.media = uploadedMedia
}

async function submit() {
    const { valid } = await bannerFormRef.value.validate();
    if (valid) {
        emits('action');
    }
}
</script>