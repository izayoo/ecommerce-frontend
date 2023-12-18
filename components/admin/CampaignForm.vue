<template>
  <v-form ref="campaignFormRef">
    <v-text-field v-model="campaignForm.name" variant="outlined" label="Name" class="mb-2" :rules="formRules.name"
      :error-messages="formErrors.name"></v-text-field>

    <v-text-field v-model="campaignForm.subtitle" variant="outlined" label="Subtitle" class="mb-2"
      :rules="formRules.subtitle"></v-text-field>

    <v-textarea v-model="campaignForm.description" rows="3" variant="outlined" label="description" class="mb-2"
      :rules="formRules.description"></v-textarea>

    <v-select v-model="campaignForm.product_id" :items="products" item-title="name" item-value="id" variant="outlined"
      label="Product" class="mb-2" :rules="formRules.product"></v-select>

    <v-text-field v-model="campaignForm.max_tickets" type="number" variant="outlined" label="Max Tickets" class="mb-2"
      :rules="formRules.max_tickets"></v-text-field>

    <v-select v-model="campaignForm.campaign_category_id" :items="campaignCategories" item-title="name" item-value="id"
      variant="outlined" label="Category" class="mb-2" :rules="formRules.category"></v-select>

    <inputCalendar v-model="campaignForm.start_date" label="Start Date" class="mb-2" :rules="formRules.start_date"
      mode="dateTime" />

    <inputCalendar v-model="campaignForm.end_date" label="End Date" class="mb-2" :rules="formRules.end_date"
      mode="dateTime" />

    <inputCalendar v-model="campaignForm.draw_date" label="Draw Date" class="mb-2" :rules="formRules.draw_date"
      mode="dateTime" />

    <label for="editor">Draw mechanics</label>
    <quill-editor toolbar="#my-toolbar" v-model:content="campaignForm.draw_mechanics" theme="snow" contentType="html"
      id="editor" style="height: 400px;">
      <template #toolbar>
        <div id="my-toolbar">
          <select class="ql-size">
            <option selected>Font size</option>
            <option value="10px">10px</option>
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
            <option value="22px">22px</option>
            <option value="24px">24px</option>
            <option value="25px">25px</option>
          </select>
          <select class="ql-header">
            <option selected>Heading</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
            <option value="4">Heading 4</option>
            <option value="5">heading 6</option>
          </select>
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
          <button class="ql-underline"></button>
          <button class="ql-list" value="ordered"></button>
          <button class="ql-list" value="bullet"></button>
        </div>
      </template>
    </quill-editor>
    <span v-if="formErrors.draw_mechanics">Draw mechanics field is required</span>

    <v-switch v-model="campaignForm.is_featured" variant="outlined" label="Is Featured?" class="mb-2" :true-value="1"
      :false-value="0" :rules="formRules.is_featured"></v-switch>

    <v-img v-if="campaignForm.media" :src="campaignForm.media.getFullUrl()" class="mb-2" />
    <v-file-input variant="outlined" :label="campaignForm.media ? 'Change Image' : 'Image'" class="mb-2"
      :rules="formRules.image" @change="uploadImage" :loading="uploading"></v-file-input>

    <v-img v-if="campaignForm.banner" :src="campaignForm.banner.getFullUrl()" class="mb-2" />
    <v-file-input variant="outlined" :label="campaignForm.media ? 'Change Banner' : 'Banner'" class="mb-2"
      :rules="formRules.banner" @change="uploadBanner" :loading="uploading"></v-file-input>

    <v-btn size="large" class="bg__primary" @click="submit" :loading="savingCampaign">Save</v-btn>
  </v-form>
</template>

<script lang="ts" setup>

const { list, products } = useAdminProducts();
const { campaignForm, create, savingCampaign, update, formErrors } = useAdminCampaigns();
const { getCampaignCategory, campaignCategories } = useAdminCampaignCategory();
const campaignFormRef: any = ref(null);
const { required } = useValidation();
const { uploading, uploadMedia, uploadedMedia } = useMedia()

const formRules: any = {
  name: [(value: any) => required(value, "name")],
  subtitle: [(value: any) => required(value, "name")],
  description: [(value: any) => required(value, "description")],
  product: [(value: any) => required(value, "Product")],
  max_tickets: [(value: any) => required(value, "Max Tickets")],
  category: [(value: any) => required(value, "Category")],
  start_date: [(value: any) => required(value, "Start Date")],
  end_date: [(value: any) => required(value, "End Date")],
  draw_date: [(value: any) => required(value, "Draw Date")],
  is_featured: [(value: any) => required(value, "Is Featured")],
};


onMounted(() => {
  if (!campaignForm.value.id) {
    formRules.image = [(value: any) => required(value, "image")]
    formRules.banner = [(value: any) => required(value, "image")]
  }
})

async function submit() {
  const { valid } = await campaignFormRef.value.validate();

  if (valid) {
    if (!campaignForm.value.id) {
      create();
    } else {
      update(campaignForm.value.id)
    }
  }
}

async function uploadImage(e: any) {
  await uploadMedia(e)
  campaignForm.value.media_id = uploadedMedia.id
}

async function uploadBanner(e: any) {
  await uploadMedia(e)
  campaignForm.value.banner_id = uploadedMedia.id
}


await list();
await getCampaignCategory();
</script>