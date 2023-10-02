

export function isThemeColor(color) {
  return computed(() => {

    let activeThemeColors = [];

    const { activeTheme } = useAnu();
    activeThemeColors = Object.keys(activeTheme.value.theme.colors);

    return !!(color && activeThemeColors.includes(color));

  });
}


export function useColor(color, cssVarName, as = 'text') {

  const styles = computed(() => {

    const _color = unref(color)
    const cssVar = computed(() => `--a-${unref(cssVarName)}`)

    const property = as === 'bg' ? 'background-color' : 'color'
    const _isThemeColor = isThemeColor(_color)

    const _styles = {
      [cssVar.value]: _isThemeColor.value ? `var(--a-${_color})` : _color,
      [property]: `hsla(var(${cssVar.value}), var(${cssVar.value}-opacity, 1))`,
    }

    return _styles

  })

  return {
    styles,
  }

}
