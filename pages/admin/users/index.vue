<template>
  <div class="mt-10">
    <div class="d-flex flex-column flex-md-row mb-9">
      <p class="text-bold" style="font-size: 25px">Users</p>
      <v-spacer></v-spacer>
    </div>
    <div class="d-flex flex-column flex-md-row mb-4">
      <v-text-field
        class="mr-md-2 mr-0 mb-4 mb-md-0"
        label="Search user"
        append-inner-icon="mdi-magnify"
        variant="solo"
        v-model="search">
      </v-text-field>
      <v-btn height="56" class="bg__primary mr-md-2 mr-0 mb-4 mb -md-0" @click="paged({ search })">
        Search
      </v-btn>
      <v-btn height="56" class="bg__primary mr-md-2 mr-0 mb-4 mb-md-0" @click="reset">
        Reset
      </v-btn>
      <v-btn height="56" class="bg__primary mr-md-2 mr-0 mb-4 mb-md-0" @click="exportData">
        Export
      </v-btn>
    </div>
    <v-table>
      <thead class="bg__primary">
        <tr>
          <th class="text-left text-white" style="white-space: nowrap">
            Email
          </th>
          <th class="text-left text-white" style="white-space: nowrap">
            First Name
          </th>
          <th class="text-left text-white" style="white-space: nowrap">
            Last Name
          </th>
          <th class="text-left text-white" style="white-space: nowrap">
            Mobile Number
          </th>
          <th class="text-left text-white" style="white-space: nowrap">
            Join Date
          </th>
          <th class="text-left text-white" style="white-space: nowrap">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in pagedUsers" :key="user.email">
          <td style="white-space: nowrap">{{ user.email }}</td>
          <td style="white-space: nowrap">{{ user.fname }}</td>
          <td style="white-space: nowrap">{{ user.lname }}</td>
          <td style="white-space: nowrap">
            {{ user.country_code }}{{ user.mobile_no }}
          </td>
          <td style="white-space: nowrap">{{ user.created_at }}</td>
          <td>
            <div class="d-flex">
              <div class="d-flex">
                <v-btn size="small" class="bg__primary mr-2" icon="mdi-magnify" :to="`/admin/users/details/${user.id}`">
                </v-btn>
                <DeleteConfirmation
                  message="Are you sure you want to delete this user?"
                  :action="() => softDelete(user.id)"
                  :loading="loading"/>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>

    <Pagination :paginationMeta="paginationMeta" @changePage="changePage" />
  </div>
</template>

<script lang="ts" setup>
import User from "@/models/user";

const {
  paged,
  pagedUsers,
  softDelete,
  userForm,
  loading,
  exportData,
  paginationMeta,
} = useAdminUsers();

const search = ref("");

function editUser(user: User) {
  userForm.value = user;
  navigateTo(`/admin/users/${user.id}`);
}

function reset() {
  search.value = "";
  paged();
}

function changePage(page: number) {
  paged({
    page,
  });
}

paged();
</script>
