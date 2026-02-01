// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: ["./app/assets/css/main.css"],
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },

  i18n: {
    // strategy: "prefix_except_default",
    defaultLocale: "en",
    // detectBrowserLanguage: false,
    locales: [
      { code: "ru", iso: "ru-RU", name: "Русский", file: "ru.json" },
      { code: "en", iso: "en-US", name: "English", file: "en.json" },
    ],
    langDir: "locales/",
  },
  modules: ["@nuxtjs/i18n", "nuxt-swiper", "@nuxt/ui", "nuxt-anchorscroll"],
});