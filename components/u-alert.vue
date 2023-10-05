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

  icon: {
    type: String,
    default: undefined,
  },
  appendIcon: {
    type: String,
    default: undefined,
  },
  dismissible: {
    type: Boolean,
    default: false,
  },

  title: {
    type: String,
    default: undefined,
  },
  text: {
    type: String,
    default: undefined,
  },

  modelValue: {
    type: Boolean,
    default: true,
  },

});


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
  name: 'UAlert',
});


const emit = defineEmits([
  'update:modelValue',
  'click:appendIcon',
]);


/* append icon */

const appendIcon = computed(() =>
  props.appendIcon || (props.dismissible ? 'i-heroicons-x-mark' : undefined)
);

function handleAppendIconClick() {
  modelValue.value = false;
  emit('click:appendIcon');
};


/* layer */

const { getLayerClasses } = useLayer()

const { styles, classes } = getLayerClasses(
  toRef(props, 'color'),
  toRef(props, 'variant'),
  toRef(props, 'states'),
);

</script>


<template>
  <div
    role="alert"
    class="a-alert items-start w-full"
    :class="[
      ...classes,
      modelValue ? 'flex' : 'hidden',
    ]"
    :style="styles">

    <div v-if="props.icon">
      <i :class="props.icon" />
    </div>

    <div
      class="flex-grow"
      data-no-reference>

      <p v-if="props.title" class="font-bold">
        {{ props.title }}
      </p>

      <p v-if="props.text">
        {{ props.text }}
      </p>

      <slot />
    </div>

    <div>
      <slot name="append">
        <u-icon
          v-if="appendIcon && props.dismissible"
          :icon="appendIcon"
          aria-label="close"
          class="align-text-top"
          @click="handleAppendIconClick"
        />
        <i
          v-else-if="appendIcon"
          class="align-text-top"
          :class="appendIcon"
          @click="handleAppendIconClick"
        />
      </slot>
    </div>

  </div>
</template>
