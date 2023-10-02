

export function useConfigurable(value) {
  return computed(() => {

    const _value = toValue(value);

    const [content, classes, attrs] = _value === undefined
      ? []
      : (typeof _value === 'string' || typeof _value === 'number')
        ? [_value]
        : _value

    return {
      content,
      classes,
      attrs,
    };

  });
}
