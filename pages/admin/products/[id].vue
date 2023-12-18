<template>
    <div class="mt-10">
      <div class="d-flex flex-column flex-md-row mb-2">
        <p class="text-bold" style="font-size: 25px;">Edit Product</p>
      </div>
      <ProductForm/>
    </div>
  </template>
  
  <script lang="ts" setup>
  const { getProductById, productForm } = useAdminProducts();
  if(!productForm.value.id){
    const route = useRoute()
    getProductById(+route.params.id)
  }
  </script>