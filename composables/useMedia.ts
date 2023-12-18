import Media from "@/models/media"

export function useMedia(){
    const {$axios} = useNuxtApp()
    const uploadedMedia = reactive(new Media as Media)
    const {showSnackBar} = useSnackBar()
    const uploading = ref(false)
    /**
     * Upload Media
     * @param {any} files 
     */
    async function uploadMedia(files:any) {
        const formData = new FormData()
        formData.append('image', files.target.files[0])
        try {
            uploading.value = true
            const response = await $axios.post('/admin/media/upload-image', formData)
            Object.assign(uploadedMedia, response.data.data)
            uploading.value = false
        } catch (error:any) {
            showSnackBar(error.response.data.message, 'error')
            uploading.value = false
        }
    }

    return {
        uploading,
        uploadedMedia,
        uploadMedia
    }
}