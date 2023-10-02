import { createGlobalState, useStyleTag } from '@vueuse/core';


function getThemeColorsCss(themes) {
  return Object.values(themes)
    .map(theme =>
      `${theme.class ? `.${theme.class}` : ':root'}{${Object.entries(theme.colors).concat(Object.entries(theme.cssVars)).concat([['primary-hue', (theme.colors.primary.split(',')[0])]]).map(([varName, val]) => `--a-${varName}:${val};`).join('')}}`,
    )
    .join('')
}


export const useAnu = createGlobalState((options) => {

  if (!options) {
    throw new Error('Anu: useAnu composable must be initialized with options first time!');
  }


  const themes = ref(options.themes);
  const activeThemeName = ref(options.initialTheme);

  const activeTheme = computed(() => ({
    name: activeThemeName.value,
    theme: themes.value[activeThemeName.value],
  }));

  const themeColorsCss = ref('');

  useStyleTag(themeColorsCss);

  /*
    ℹ️ `Object.values(themes.value).map(theme => [theme.colors, theme.cssVars]).flat()` will allow watching for colors & css vars of all themes 😮

    Object.values(themes.value) => [<lightThemeConfig>, <darkThemeConfig>] => Each theme's theme value/config
    Object.values(themes.value).map(theme => [theme.colors, theme.cssVars]) => [[<lightThemeColors>, <lightThemeCssVars>], [<darkThemeColors>, <darkThemeCssVars>]] => Will return nested array with colors & css variables
    Finally flat the array to get list of each theme's color & css var [<lightThemeColor>, <lightThemeCssVars>, <darkThemeColors>, <darkThemeCssVars>] ✨
  */
  watch(
    () => Object.values(themes.value).map(theme => [theme.colors, theme.cssVars]).flat(),
    () => {
      themeColorsCss.value = getThemeColorsCss(themes.value)
    },
    { deep: true, immediate: true },
  );

  watch(activeThemeName, (newThemeName, oldThemeName) => {
    const newTheme = themes.value[newThemeName]

    if (newTheme && newTheme.class && typeof document !== 'undefined')
      document.documentElement.classList.toggle(newTheme.class)

    if (oldThemeName) {
      const oldTheme = themes.value[oldThemeName]
      if (oldTheme && oldTheme.class)
        document.documentElement.classList.toggle(oldTheme.class)
    }

  }, { immediate: true })

  return {
    themes,
    activeThemeName,
    activeTheme,
  }

})
