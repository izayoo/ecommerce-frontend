<template>
  <v-form ref="productFormRef">
    <v-text-field
      v-model="productForm.name"
      variant="outlined"
      label="Name"
      :rules="formRules.name"
      class="mb-2"
    ></v-text-field>
    <v-textarea
      v-model="productForm.description"
      rows="3"
      variant="outlined"
      label="Description"
      :rules="formRules.description"
      class="mb-2"
    ></v-textarea>
    <v-text-field
      v-model="productForm.stock"
      type="number"
      variant="outlined"
      label="Stock"
      :rules="formRules.stock"
      class="mb-2"
    ></v-text-field>
    <v-text-field
      v-model="productForm.price"
      type="number"
      variant="outlined"
      label="Price"
      :rules="formRules.price"
      class="mb-2"
      :error-messages="formErrors.price"
    ></v-text-field>
    <v-text-field
        v-model="productForm.dimensions"
        variant="outlined"
        label="Dimensions"
        :rules="formRules.dimensions"
        class="mb-2"
    ></v-text-field>
    <v-text-field
        v-model="productForm.weight_in_grams"
        type="number"
        variant="outlined"
        label="Weight (grams)"
        :rules="formRules.weight_in_grams"
        class="mb-2"
    ></v-text-field>
    <v-select
      v-model="productForm.product_category_id"
      :items="productCategories"
      variant="outlined"
      label="Caregory"
      item-title="name"
      item-value="id"
      :rules="formRules.category"
      class="mb-2"
    ></v-select>


    <v-img width="200" v-if="productForm.media" :src="productForm.media.getFullUrl()"/>
    <v-file-input
      variant="outlined"
      :label="productForm.media ? 'Change Image': 'Image'"
      @change="uploadImage"
      :rules="formRules.image"
      class="mb-2"
      :loading="uploading"
    ></v-file-input>
    <v-btn size="large" class="bg__primary" @click="submit" :loading="loading">Save</v-btn>
  </v-form>
</template>

<script lang="ts" setup>
const { required } = useValidation();
const productFormRef: any = ref(null);
const { create, productForm, formErrors, loading, update } = useAdminProducts();
const { getProductCategory, productCategories } = useAdminProductCategory();
const {uploading, uploadMedia, uploadedMedia} = useMedia()

const formRules: any = {
  name: [(value: any) => required(value, "name")],
  description: [(value: any) => required(value, "description")],
  stock: [(value: any) => required(value, "stock")],
  price: [(value: any) => required(value, "price")],
  category: [(value: any) => required(value, "category")],
};

onMounted(() => {
  if(!productForm.value.id){
    formRules.image = [(value: any) => required(value, "image")]
  }
})

async function submit() {
  const { valid } = await productFormRef.value.validate();
  if (valid) {
    if (!productForm.value.id) {
      create();
    } else {
      update(productForm.value.id);
    }
  }
}

async function uploadImage(e:any){
  await uploadMedia(e)
  productForm.value.media_id = uploadedMedia.id
  productForm.value.media = uploadedMedia
}

await getProductCategory();
</script>