<script setup>

/* constants */

const TEXT_INPUT_SLOTS = {
  'label': (_) => null,
  'prepend': (_) => null,
  'prepend-inner': (_) => null,
  'append-inner': (_) => null,
  'append': (_) => null,
  'bottom': (_) => null,
};


/* interface */

const props = defineProps({
  
  label: {
    type: String,
    default: undefined,
  },

  prependIcon: {
    type: String,
    default: undefined,
  },
  appendIcon: {
    type: String,
    default: undefined,
  },
  prependInnerIcon: {
    type: String,
    default: undefined,
  },
  appendInnerIcon: {
    type: String,
    default: undefined,
  },

  inputWrapperClasses: {
    type: String,
    default: undefined,
  },
  inputClasses: {
    type: String,
    default: undefined,
  },
  inputWrapperAttrs: {
    type: String,
    default: undefined,
  },

  hint: {
    type: String,
    default: undefined,
  },
  success: {
    type: String,
    default: undefined,
  },
  error: {
    type: String,
    default: undefined,
  },

  readonly: {
    type: String,
    default: undefined,
  },
  disabled: {
    type: String,
    default: undefined,
  },
  loading: {
    type: String,
    default: undefined,
  },

  modelValue: {
    type: String,
    default: undefined,
  },

});


defineOptions({
  name: 'UInput',
  inheritAttrs: false,
});


const emit = defineEmits([
  'update:modelValue',
]);


/* base input */

const baseInputProps = computed(() =>
  props
);


/* file input */

const attrs = useAttrs();

const isInputTypeFile = computed(() =>
  attrs.type === 'file'
);


/* wrapper */

const input = ref();

function handleInputWrapperClick() {
  input.value.focus();
}


/* template */

import { filterUsedSlots } from '../tools/utils';

</script>


<template>
  <u-base-input
    v-bind="baseInputProps"
    class="a-input"
    :class="[
      $attrs.class,
      {
        'a-input-type-file': isInputTypeFile,
      },
    ]"
    @click:inputWrapper="handleInputWrapperClick">

    <template
      v-for="name in filterUsedSlots(TEXT_INPUT_SLOTS)"
      #[name]="slotProps">
      <slot
        :name="name"
        v-bind="slotProps"
      />
    </template>

    <template #default="slotProps">
      <input
        v-bind="{ ...$attrs, ...slotProps }"
        ref="input"
        class="a-input-input"
        :value="props.modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </template>

  </u-base-input>
</template>
