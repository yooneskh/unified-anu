import { useCycleList } from '@vueuse/core';


export function useCheckbox(modelValue, emit, checkedValue = true, uncheckedValue = false, indeterminateValue = null, cycleIndeterminate = false) {

  function handleModelValueChange() {

    const _cycleIndeterminate = toValue(cycleIndeterminate);
    const _modelValue = toValue(modelValue);

    const _checkedValue = toValue(checkedValue);
    const _uncheckedValue = toValue(uncheckedValue);
    const _indeterminateValue = toValue(indeterminateValue);

    const cycleInitialValue = (
      Array.isArray(_modelValue)
        ? (_modelValue.includes(_checkedValue) ? _checkedValue : _uncheckedValue)
        : _modelValue
    );

    const { next } = useCycleList(
      [ ...(_cycleIndeterminate ? [_indeterminateValue] : []), _checkedValue, _uncheckedValue ],
      {
        initialValue: cycleInitialValue,
      },
    );


    const newValue = next();

    if (Array.isArray(_modelValue)) {
      if (newValue === _checkedValue) {
        emit('update:modelValue', [..._modelValue, _checkedValue])
      }
      else {
        emit('update:modelValue', _modelValue.filter(item => item !== _checkedValue))
      }
    }
    else {
      emit('update:modelValue', newValue);
    }

  }

  function onChange() {
    handleModelValueChange();
  }

  const isChecked = computed({
    get: () => {

      const _modelValue = toValue(modelValue);
      const _checkedValue = toValue(checkedValue);

      if (Array.isArray(_modelValue)) {
        return _modelValue.includes(_checkedValue)
      }

      return _modelValue === _checkedValue;

    },
    set: handleModelValueChange,
  })

  const isIndeterminate = computed(() => {

    const _modelValue = toValue(modelValue);
    const _indeterminateValue = toValue(indeterminateValue);

    if (Array.isArray(_modelValue)) {
      return _modelValue.includes(_indeterminateValue)
    }

    return _modelValue === _indeterminateValue;

  });

  return {
    isChecked,
    isIndeterminate,
    onChange,
  };

}
