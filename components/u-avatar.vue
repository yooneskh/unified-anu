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

  content: {
    type: String,
    default: undefined,
  },

  src: {
    type: String,
    default: undefined,
  },
  alt: {
    type: String,
    default: undefined,
  },

});


defineOptions({
  name: 'UAvatar',
});


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
    class="a-avatar overflow-hidden inline-flex items-center justify-center flex-shrink-0"
    :class="classes"
    :style="styles">
    <slot>
      <img
        v-if="props.src"
        :src="props.src"
        :alt="props.alt"
      />
      <i
        v-else-if="props.icon"
        :class="props.icon"
      />
      <span v-else-if="props.content">
        {{ props.content }}
      </span>
    </slot>
  </div>
</template>
