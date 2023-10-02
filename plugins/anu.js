import defu from 'defu';
import { ANU_CONFIG, ANU_PROPS_DEFAULTS } from '~/tools/symbols';


const configDefaults = {
  initialTheme: 'light',
  themes: {
    light: {
      class: '',
      colors: {
        primary: '265, 97.7%, 66.3%',
        success: '94.5, 100%, 39.6%',
        info: '200.1, 100%, 54.3%',
        warning: '42.4, 100%, 50%',
        danger: '358.3, 100%, 64.9%',
      },
      cssVars: {
        'body-color': 'hsla(var(--a-base-c), 0.68)',
        'body-bg-c': '0,4.8%,95.9%',

        // ℹ️ Used for background on body like select options, card, etc
        'surface-c': '0, 0%, 100%',
      },
    },
    dark: {
      class: 'dark',
      colors: {
        primary: '261, 73%, 66.3%',
        success: '94.5, 73%, 39.6%',
        info: '200.1, 73%, 54.3%',
        warning: '42.4, 73%, 50%',
        danger: '358.3, 73%, 64.9%',
      },
      cssVars: {
        'body-color': 'hsla(var(--a-base-c), 0.68)',
        'body-bg-c': 'var(--a-primary-hue), 15%, 5%',
        'surface-c': 'var(--a-primary-hue), 7%, 10%',
      },
    },
  },
  baseZIndex: 2000,
};


export default defineNuxtPlugin(nuxtApp => {

  const anu = {
    install(app, options = {}) {

      const config = defu(options, configDefaults);
  
      app.provide(ANU_CONFIG, config)
      app.provide(ANU_PROPS_DEFAULTS, config.propsDefaults)
  
      useAnu({
        initialTheme: config.initialTheme,
        themes: config.themes,
      });
  
      useZIndex(config.baseZIndex, app);

    },
  };


  const config = {};

  nuxtApp.vueApp.use(anu, config);

});
