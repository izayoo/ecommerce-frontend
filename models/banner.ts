import Media from "./media"

interface Banner {
    media_id: number | undefined
    url_redirect: string
    banner_type_id: number | undefined
}

class Banner {
    private _media: Media | undefined

    get media() : Media | undefined{
        return this._media
    }

    set media(media: Media){
        const mediaInstance = new Media
        Object.assign(mediaInstance, media)
        this._media = mediaInstance
        this.media_id = media.id
    }
}

export default Banner