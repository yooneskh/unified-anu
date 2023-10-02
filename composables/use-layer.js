import { defu } from 'defu'
import { colord } from '~/tools/colord'


export function useProps(propOverrides) {

  let props = {
    color: {
      type: String,
      default: undefined,
    },
    variant: {
      type: String,
      default: 'text',
    },
    states: {
      type: Boolean,
      default: false,
    },
  };

  if (propOverrides) {
    props = defu(propOverrides, props);
  }

  return props;

}


export function useLayer() {

  const computeClassesStyles = (propColor, propVariant, propsStates, config = {}) => {

    const _config = defu(config, { statesClass: 'states' })

    const styles = [];
    const classes = [];

    if (propsStates) {
      classes.push(_config.statesClass);
    }


    const { typographyClasses, typographyStyles } = useTypographyColor(propColor, propVariant)

    classes.push(typographyClasses.value);
    styles.push(typographyStyles.value);


    const _isThemeColor = isThemeColor(propColor)

    /*
      ❗ Below code is intentionally not DRY.

      Frequently we are visiting useLayer composable while building new component. Hence, we made it:
        - Simple to understand
        - Easy to read
        - Quicker to update

      We also have colord as dependency for now. We might remove this in future once Anu is more popular and mature.
    */

    if (_isThemeColor.value) {
      styles.push({ '--a-layer-c': `var(--a-${propColor})` })

      if (propVariant === 'fill') {
        // Background
        styles.push({ background: 'hsla(var(--a-layer-c),var(--a-layer-opacity))' })
        styles.push({ '--a-layer-opacity': 1 })

        // Text
        if (propColor !== undefined && propColor !== null)
          classes.push('text-white')

      }

      else if (propVariant === 'light') {
        // Background
        styles.push({ background: 'hsla(var(--a-layer-c),var(--a-layer-opacity))' })
        styles.push({ '--a-layer-opacity': 0.15 })

        // text
        if (propColor !== undefined && propColor !== null)
          classes.push(`text-${propColor}`)
      }

      else if (propVariant === 'outline') {
        // Border
        classes.push('border-width-1', 'border-solid')
        styles.push({ borderColor: 'hsl(var(--a-layer-c))' })

        // Text
        if (propColor !== undefined && propColor !== null)
          classes.push('text-[hsl(var(--a-layer-c))]')
      }

      else if (propVariant === 'text') {
        // Text
        if (propColor !== undefined && propColor !== null)
          classes.push('text-[hsl(var(--a-layer-c))]')
      }
    }
    else if (propColor === 'inherit') {
      classes.push('text-inherit')

      if (propVariant === 'outline')
        classes.push('border-width-1 border-solid border-current')
    }
    else if (propColor) {
      const _colord = colord(propColor)

      styles.push({ '--a-layer-c': _colord.toHslValue() })

      if (propVariant === 'fill') {
        // Background
        styles.push({ background: 'hsla(var(--a-layer-c),var(--a-layer-opacity))' })
        styles.push({ '--a-layer-opacity': 1 })

        // Text
        if (propColor !== undefined && propColor !== null)
          styles.push({ color: _colord.contrasting().toHslString() })
      }
      else if (propVariant === 'light') {
        // Background
        styles.push({ background: 'hsla(var(--a-layer-c),var(--a-layer-opacity))' })
        styles.push({ '--a-layer-opacity': 0.15 })

        // Text
        if (propColor !== undefined && propColor !== null)
          styles.push({ color: 'hsl(var(--a-layer-c))' })
      }
      else if (propVariant === 'outline') {
        // Border
        classes.push('border-width-1', 'border-solid')
        styles.push({ borderColor: 'hsl(var(--a-layer-c))' })

        // Text
        if (propColor !== undefined && propColor !== null)
          styles.push({ color: 'hsl(var(--a-layer-c))' })
      }
      else if (propVariant === 'text') {
        // Text
        if (propColor !== undefined && propColor !== null)
          styles.push({ color: 'hsl(var(--a-layer-c))' })
      }
    }

    return {
      styles,
      classes,
    }
  };


  const getLayerClasses = (propColor, propVariant, propsStates, config) => {

    const classes = ref([]);
    const styles = ref([]);

    watch([propColor, propVariant, propsStates, () => unref(config)], () => {

      const { classes: _classes, styles: _styles } = computeClassesStyles(
        unref(propColor),
        unref(propVariant),
        unref(propsStates),
        unref(config)
      );

      classes.value = _classes;
      styles.value = _styles;

    }, { immediate: true });

    return {
      classes,
      styles,
    };

  }

  return {
    getLayerClasses,
  };

}
