interface Media {
    id: number
    path: string
    filename: string
    mime: string
    status: number
    expires_at: string | null
    created_at: string
}

class Media {

    /**
     * Get the full url of media
     */
    getFullUrl() {
        return this.path+'/'+this.filename
    }
}

export default Media