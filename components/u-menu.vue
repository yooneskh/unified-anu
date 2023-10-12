<script setup>

/* interface */

const props = defineProps({
  
  trigger: {
    type: String,
    default: 'click',
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
    default: 'bottom-start',
  },
  strategy: {
    type: String,
    default: 'absolute',
  },
  middleware: {
    type: Function,
    default: undefined,
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
  name: 'UMenu',
});


/* parent */

const parentEl = useParent();

</script>


<template>
  <u-floating
    v-bind="props"
    :reference-el="parentEl">
    <u-card>
      <slot />
    </u-card>
  </u-floating>
</template>
