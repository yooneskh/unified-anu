<script setup>

/* interface */

const props = defineProps({

  variant: {
    type: String,
    default: 'light',
  },
  color: {
    type: String,
    default: 'primary',
  },
  states: {
    type: Boolean,
    default: false,
  },

  label: {
    type: String,
    default: undefined,
  },

  icon: {
    type: String,
    default: undefined,
  },
  appendIcon: {
    type: String,
    default: undefined,
  },

  closable: {
    type: Boolean,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: undefined,
  },

  modelValue: {
    type: Boolean,
    default: true,
  },

});


const emit = defineEmits([
  'update:modelValue',
  'click:close',
  'click:appendIcon',
]);


import { useVModel } from '@vueuse/core';

const modelValue = useVModel(
  props,
  'modelValue',
  emit,
  {
    defaultValue: true,
    passive: true,
  }
);


defineOptions({
  name: 'UChip',
});


/* click */

const attrs = useAttrs();

const isClickable = computed(() =>
  attrs.onClick !== undefined
);


function closeChip() {
  modelValue.value = false;
  emit('click:close');
}


/* layer */

const { getLayerClasses } = useLayer()

const { styles, classes } = getLayerClasses(
  toRef(props, 'color'),
  toRef(props, 'variant'),
  isClickable,
);

</script>


<template>
  <div
    v-if="modelValue"
    class="a-chip"
    :class="[
      {
        'a-chip-disabled': props.disabled,
        'cursor-pointer': isClickable,
      },
      classes,
    ]"
    :style="styles">

    <i
      v-if="props.icon"
      :class="props.icon"
    />

    {{ props.label }}

    <slot />

    <i
      v-if="props.appendIcon"
      :class="props.appendIcon"
    />

    <i
      v-if="props.closable"
      class="i-heroicons-x-mark hover:cursor-pointer hover:opacity-70"
      @click="closeChip()"
    />

  </div>
</template>
