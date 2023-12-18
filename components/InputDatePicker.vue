<template>
    <div>
        <v-text-field @focus="showCalendar = true" :label="label" v-model="date" variant="outlined"
            :error-messages="errorMessages" :rules="rules">
        </v-text-field>
        <v-overlay v-model="showCalendar" scroll-strategy="close" class="d-flex align-center justify-center">
            <VDatePicker v-if="showCalendar" v-model.string="date" class="calendar" :mode="mode ? mode : 'date'" />
        </v-overlay>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { format, parseISO } from "date-fns";
const props = defineProps([
    'modelValue',
    'errorMessages',
    'rules',
    'label',
    'mode'
])

const emits = defineEmits(['update:modelValue'])

const showCalendar = ref(false)

const date:any = ref(null)

date.value = props.modelValue

watch(date, (e:any) => {
    // const dt = new Date(e)
    const formatted = format(parseISO(e), "yyyy-MM-dd")
    date.value = formatted
    emits('update:modelValue', formatted)
})


</script>

<style lang="scss">
.calendar {
    width: 350px;
}
</style>