<template>
    <div class="mt-10">
        <p class="text-bold mb-4" style="font-size: 25px;">Change Password</p>
        <v-form>
            <v-row no-gutters>
                <v-col cols="12" md="6">
                    <v-text-field label="Current password" variant="outlined"></v-text-field>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12" md="6">
                    <v-text-field label="New password" variant="outlined"></v-text-field>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12" md="6">
                    <v-text-field label="Confirm password" variant="outlined"></v-text-field>
                </v-col>
            </v-row>
            <v-hover v-slot:default="{ isHovering, props }">
                <v-btn v-bind="props" width="100" size="large"
                    :class="{ 'bg__blue': isHovering, 'bg__primary': !isHovering }">Save</v-btn>
            </v-hover>
        </v-form>
    </div>
</template>