
import { QuillEditor, Quill } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default defineNuxtPlugin(nuxtApp => {
    const sizeStyle = Quill.import('attributors/style/size')
    sizeStyle.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '30px', '32px', '36px']
    Quill.register(sizeStyle, true)
    nuxtApp.vueApp.component('QuillEditor', QuillEditor);
})