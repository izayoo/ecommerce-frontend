import { ref } from 'vue';
import User from "~/models/user";
import { findIndex } from 'lodash'
import {useDownload} from "~/composables/useDownload";

export function useAdminUsers() {
    const { $axios } = useNuxtApp()
    const loading = ref(false)
    const users: Ref<User[]> = ref([]);
    const pagedUsers: Ref<User[]> = ref([]);
    const userForm = useState<User>('userForm', () => new User)
    const formErrors: any = ref({});
    const userDetails: any = ref({});
    const urlSegment = '/admin/user'
    const { showSnackBar } = useSnackBar()
    const { download } = useDownload()
    const paginationMeta:any = ref({})

    async function list() {
        try {
            const response = await $axios.get(urlSegment + '/list');

            users.value = response.data.data.map((user: User) => {
                let userInstance = new User()
                Object.assign(userInstance, user)
                return userInstance
            })
        } catch (error: any) {

        }
    }

    async function paged(params: Object = {}) {
        try {
            const response = await $axios.get(urlSegment, {params});
            pagedUsers.value = response.data.data.data.map((user: User) => {
                let userInstance = new User()
                Object.assign(userInstance, user)
                return userInstance
            })
            let pagintationMeta = response.data.data
            pagintationMeta.data.delete
            paginationMeta.value = pagintationMeta
        } catch (error: any) {

        }
    }

    async function exportData() {
        try {
            const response = await $axios.get(urlSegment + '/export', { responseType: "blob" });
            download(response);
        } catch (error: any) {

        }
    }

    /**
     * Get user by id
     * @param {number} userId
     */
    async function getUserById(userId: number) {
        try {
            const response = await $axios.get(urlSegment + '/' + userId);
            userDetails.value = response.data.data
            Object.assign(userForm.value, response.data.data)
        } catch (error: any) {

        }
    }

    async function softDelete(id: number) {
        try {
            loading.value = true
            const response = await $axios.delete(urlSegment + '/' + id);
            const i = findIndex(pagedUsers.value, { id: id })
            if (i > -1) {
                pagedUsers.value.splice(i, 1)
            }
            loading.value = false
            showSnackBar(`User successfully deleted.`)
        } catch (error: any) {
            loading.value = false
        }
    }

    return {
        loading,
        users,
        userDetails,
        pagedUsers,
        userForm,
        formErrors,
        list,
        paged,
        exportData,
        softDelete,
        getUserById,
        paginationMeta,
    }
}