// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [],
  ssr: false,
  build: {
    transpile: ['vuetify']
  },
  css: [
    '~/assets/scss/base.scss',
  ],
  components: [
    '~/components',
    '~/components/home',
    '~/components/prize',
    '~/components/cart',
    '~/components/products',
    '~/components/admin',
  ],
  imports: {
    dirs: [
      // Scan top-level modules
      'composables',
      // ... or scan modules nested one level deep with a specific name and file extension
      'composables/*/index.{ts,js,mjs,mts}',
      // ... or scan all modules within given directory
      'composables/**'
    ]
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_variables.scss" as *;',
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_URL,
      fbClientId: process.env.FB_CLIENT_ID,
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      baseUrl: process.env.BASE_URL,
    },
  },
  app: {
    head: {
      title: "Experience the joy of winning and giving",
      script: [
        
      ],
      noscript:[
      ]
    },
  },
})
