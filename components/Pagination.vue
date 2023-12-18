<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      class="my-4"
      :length="getLength()">
    </v-pagination>
  </div>
</template>
<script lang="ts" setup>
const page = ref(1);
const props = defineProps(["paginationMeta"]);
const emits = defineEmits(["changePage"]);

watch(page, (value) => {
  emits("changePage", value);
});

function getLength(){
  let length = props.paginationMeta.total / props.paginationMeta.per_page;
  const fractionalPartAsWholeNumber = +String(length).split(".")[1];

  if(fractionalPartAsWholeNumber > 0){
    length++
  }

  return length;
}
</script>

<style lang="scss">
.v-pagination__item--is-active {
    background: $primary !important;
    color: $white;
    border-radius: 50%;
}
</style>