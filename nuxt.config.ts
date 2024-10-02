// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    clientSecret: process.env.CLIENT_SECRET,
    public: {
      clientId: process.env.CLIENT_ID,
      redirectUri: process.env.REDIRECT_URI,
      authUrl: process.env.AUTH_URL,
      responseType: process.env.RESPONSE_TYPE,
      spaceDelimiter: process.env.SPACE_DELIMITER,
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@nuxt/eslint"],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
});
