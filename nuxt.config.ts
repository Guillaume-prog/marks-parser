// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "@vueuse/nuxt",
    "nuxt-icon",
  ],
  css: ["~/assets/main.css"],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
});
