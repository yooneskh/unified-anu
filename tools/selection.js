

const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function isObject(obj) {
  return obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj);
}


export function useSelection(params) {

  const { items, multi = false, initialValue = undefined } = params;

  const _items = toRef(items);
  const _multi = toRef(multi);
  const _initialValue = toRef(initialValue);

  const _val = ref(_items.value.find(i => isEqual(_initialValue.value, i)))

  const select = (option) => {
    if (_multi.value) {
      if (!(Array.isArray(_val.value))) {
        _val.value = [option];
      }
      else {

        const index = _val.value.indexOf(option)

        if (index === -1)
          _val.value.push(option)
        else
          _val.value.splice(index, 1)

      }
    }
    else {
      _val.value = option
    }
  }

  watch(_multi, val => {
    _val.value = (val ? [] : undefined)
  })

  const _options = computed(() => _items.value.map(item => ({
    value: item,
    isSelected: _multi.value
      ? Array.isArray(_val.value) ? _val.value.includes(item) : false
      : isEqual(item, _val.value),
  })))

  watch(_initialValue, val => {
    select(val)
  })

  return {
    value: _val,
    select,
    options: _options,
  }

}

export function extractItemValueFromItemOption(item) {
  return isObject(item) && 'value' in item
    ? item.value
    : item
}

export function calculateSelectionItems(items) {
  return computed(() => {
    const _items = toRef(items)

    if (_items.value.length === 0)
      return []

    return _items.value.map(extractItemValueFromItemOption)
  })
}
