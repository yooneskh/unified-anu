

export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
  ],
  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/css/preset.css',
    '~/assets/css/styles.scss',
  ],
  vue: {
    defineModel: true,
  },
});
