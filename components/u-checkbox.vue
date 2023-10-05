<script setup>

/* interface */

const props = defineProps({
  
  color: {
    type: String,
    default: 'primary',
  },

  label: {
    type: String,
    default: undefined,
  },

  icon: {
    type: String,
    default: 'i-heroicons-check',
  },

  inputClasses: {

  },


  disabled: {
    type: Boolean,
    default: false,
  },

  checkedValue: {
    type: [Boolean, Number, String, Array],
    default: true,
  },

  uncheckedValue: {
    type: [Boolean, Number, String, Array],
    default: false,
  },

  indeterminateValue: {
    type: [Boolean, Number, String, Array],
    default: undefined,
  },

  cycleIndeterminate: {
    type: Boolean,
    default: false,
  },


  modelValue: {
    type: [Boolean, Number, String, Array],
    default: true,
  },

});


defineOptions({
  name: 'UCheckbox',
  inheritAttrs: false,
});

const emit = defineEmits([
  'update:modelValue',
]);


/* value */

const attrs = useAttrs();

const properCheckedValue = computed(() =>
  props.checkedValue || attrs.value || true
);


const { isChecked, isIndeterminate, onChange } = useCheckbox(
  toRef(props, 'modelValue'),
  emit,
  properCheckedValue,
  toRef(props, 'uncheckedValue'),
  toRef(props, 'indeterminateValue'),
  toRef(props, 'cycleIndeterminate')
);


const elementId = computed(() =>
  `a-checkbox-${attrs.id || attrs.value}-${Math.random().toString(36).slice(2, 7)}`
);

const currentIcon = computed(() => {
  if (isIndeterminate.value) {
    return 'i-heroicons-minus'
  }
  else if (isChecked.value) {
    return props.icon
  }
});

</script>


<template>
  <label
    :for="elementId"
    class="inline-flex items-center cursor-pointer"
    :class="[
      $attrs.class,
      {
        'a-checkbox-disabled pointer-events-none': props.disabled,
      }
    ]">

    <input
      v-bind="{
        ...$attrs,
        class: props.inputClasses,
      }"
      :id="elementId"
      :checked="isChecked"
      class="hidden"
      type="checkbox"
      :indeterminate="isIndeterminate"
      @change="onChange"
    />

    <div
      class="a-checkbox-box flex items-center justify-center shrink-0"
      :class="{
        [`bg-${props.color} border-${props.color} children:scale-full`]: isChecked || isIndeterminate
      }">
      <i
        class="a-checkbox-icon text-white"
        :class="currentIcon"
      />
    </div>

    <slot>
      {{ props.label }}
    </slot>

  </label>
</template>
