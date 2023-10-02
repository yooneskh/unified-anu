

export function isTypographyUsed(props, slots) {

  const { title, subtitle, text } = props;

  const validateProp = (prop) => {

    if (prop && prop.value) {

      if (typeof prop.value === 'string') {
        return !!prop.value
      }

      if (typeof prop.value === 'number') {
        return (prop.value ?? null) !== null;
      }

      return !!prop.value.length;

    }

    return false;

  }

  return (
    validateProp(title) ||
    validateProp(subtitle) ||
    validateProp(text) ||
    slots.title ||
    slots.subtitle ||
    slots['header-right']
  );

}

export const filterUsedSlots = computed(() => (slotsToUse)  => {

  const slots = useSlots();

  return Object.keys(slotsToUse).filter(key => slots[key]);

});


function objectMap(object, mapper) {
  return (
    Object.fromEntries(
      Object.entries(object)
        .map(it => mapper(it[0], it[1]))
        .filter(Boolean)
    )
  );
}

export const filterUsedRenamedSlots = computed(() => (slotsToUse) => {

  const slots = useSlots();

  return objectMap(slotsToUse, (originalSlotName, obj) => slots[obj.prefixedKey] ? [originalSlotName, obj] : undefined);

});
