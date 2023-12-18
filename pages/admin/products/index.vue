<template>
  <div class="mt-10">
    <div class="d-flex flex-column flex-md-row mb-9">
      <p class="text-bold" style="font-size: 25px">Products</p>
      <v-spacer></v-spacer>
    </div>
    <div class="d-flex flex-column flex-md-row mb-4">
      <v-text-field
        class="mr-md-2 mr-0 mb-4 mb-md-0"
        label="Search product"
        append-inner-icon="mdi-magnify"
        variant="solo"
        v-model="search"
      ></v-text-field>
      <v-btn height="56" class="bg__primary mr-md-2 mr-0 mb-4 mb-md-0"
      @click="paged({ search })"
        >Search</v-btn
      >
      <v-btn height="56" class="bg__primary mr-md-2 mr-0 mb-4 mb-md-0"
      @click="reset"
        >Reset</v-btn
      >
      <v-btn
        height="56"
        class="bg__primary mr-md-2 mr-0 mb-4 mb-md-0"
        to="/admin/products/add"
        >Add</v-btn
      >
      <v-btn height="56" class="bg__primary mr-md-2 mr-0 mb-4 mb-md-0"
      @click="exportData"
        >Export</v-btn
      >
    </div>
    <v-table>
      <thead class="bg__primary">
        <tr>
          <th class="text-left text-white" style="white-space: nowrap">
            Product Name
          </th>
          <th class="text-left text-white" style="white-space: nowrap">
            Product Description
          </th>
          <th class="text-left text-white" style="white-space: nowrap">
            Stock
          </th>
          <th class="text-left text-white" style="white-space: nowrap">
            Price
          </th>
          <th class="text-left text-white" style="white-space: nowrap">
            Category
          </th>
          <th class="text-left text-white" style="white-space: nowrap">
            Date Created
          </th>
          <th class="text-left text-white" style="white-space: nowrap">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, i) in pagedProducts" :key="i">
          <td style="white-space: nowrap">{{ product.name }}</td>
          <td style="white-space: nowrap">{{ product.description }}</td>
          <td style="white-space: nowrap">{{ product.stock }}</td>
          <td style="white-space: nowrap">{{ product.price }}</td>
          <td style="white-space: nowrap">
            {{ product.product_category?.name }}
          </td>
          <td style="white-space: nowrap">{{ product.createdAt() }}</td>
          <td>
            <div class="d-flex">
              <v-btn
                size="small"
                class="bg__primary mr-2"
                icon="mdi-magnify"
                :to="`/products/${product.slug}`"
              ></v-btn>
              <v-btn
                size="small"
                class="bg__primary mr-2"
                icon="mdi-pencil"
                @click="editProduct(product)"
              ></v-btn>
              <DeleteConfirmation
                message="Are you sure you want to delete this product?"
                :action="() => softDelete(product.id)"
                :loading="loading"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>

    <Pagination :paginationMeta="paginationMeta" @changePage="changePage"/>
  </div>
</template>

<script lang="ts" setup>
import Product from "@/models/product";

const { 
    paged, 
    pagedProducts, 
    softDelete, 
    productForm, 
    loading ,
    exportData,
    paginationMeta,
} = useAdminProducts();

const search = ref("");

function editProduct(product: Product) {
  productForm.value = product;
  navigateTo(`/admin/products/${product.id}`);
}

function reset(){
  search.value = ''
  paged()
}

function changePage(page:number){
  paged({page})
}

paged();
</script>