<template>
    <div>
        <v-text-field @focus="showCalendar = true" :label="label" v-model="date" variant="outlined"
            :error-messages="errorMessages" :rules="rules">
        </v-text-field>
        <v-overlay v-model="showCalendar" scroll-strategy="close" class="d-flex align-center justify-center">
            <VCalendar v-if="showCalendar" class="calendar" @dayclick="setInputValue" />
        </v-overlay>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps([
    'modelValue',
    'errorMessages',
    'rules',
    'label',
])
const emits = defineEmits(['update:modelValue'])

const showCalendar = ref(false)
const date = ref(null)

function setInputValue(e: any) {
    showCalendar.value = false
    date.value = e.id
}

date.value = props.modelValue

watch(date, () => {
    emits('update:modelValue', date.value)
})
</script>

<style lang="scss">
.calendar {
    width: 350px;
}
</style>