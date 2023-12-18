<template>
    <div>
        <v-btn size="small" class="bg__primary" icon="mdi-delete">
    </v-btn>
    <v-dialog v-model="dialog" activator="parent" width="auto">
        <v-card>
            <v-card-text>
                {{ message }}
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" variant="text" @click="dialog = false">Cancel</v-btn>
                <v-btn color="error" variant="text" @click="executeAction" :loading="loading">Confirm</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps(['message', 'action', 'loading'])
const dialog = ref(false)
function executeAction(){
    props.action()
    dialog.value = false
}
</script>
