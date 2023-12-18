import { createVuetify } from 'vuetify'
import { mdi } from "vuetify/iconsets/mdi"
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { customSVGs } from '@/icons/icons'

export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({
        components,
        directives,
        theme: {
            themes: {
                light: {
                    colors: {
                        primary: "#13212d",
                        secondary: "#263642",
                        blue: "#3673da"
                    }
                },
                
            }
        },
        icons: {
            defaultSet: "mdi",
            sets: {
              mdi,
              custom: customSVGs,
            },
          },
    })

    nuxtApp.vueApp.use(vuetify)
})