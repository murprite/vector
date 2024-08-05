// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-primevue", "@nuxt/icon", "@nuxt/image"],
  css: ["primevue/resources/themes/aura-light-green/theme.css"]
})