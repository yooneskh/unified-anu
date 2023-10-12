<script setup>

/* interface */

import { flip, offset, shift } from '@floating-ui/vue';


const props = defineProps({
  
  text: {
    type: String,
    default: undefined,
  },

  trigger: {
    type: String,
    default: 'hover',
  },
  delay: {
    type: Number,
    default: 0,
  },

  transition: {
    type: String,
    default: 'slide-y',
  },
  placement: {
    type: String,
    default: 'top',
  },
  strategy: {
    type: String,
    default: 'absolute',
  },
  middleware: {
    type: Function,
    default: () => [
      offset(4),
      flip(),
      shift({
        padding: 10,
      }),
    ],
  },

  persist: {
    type: [Boolean, String],
    default: false,
  },
  hideDelay: {
    type: Number,
    default: 0,
  },

  modelValue: {
    type: Boolean,
    default: undefined,
  },

});


defineOptions({
  name: 'UTooltip',
});


/* parent */

const parentEl = useParent();

</script>


<template>
  <u-floating
    v-bind="props"
    :reference-el="parentEl"
    class="a-tooltip-wrapper">

    <div class="a-tooltip">

      <span class="a-tooltip-text">
        <slot>
          {{ props.text }}
        </slot>
      </span>

      <!-- <div
        ref="arrowEl"
        class="a-tooltip-arrow absolute"
      /> -->

    </div>

  </u-floating>
</template>
