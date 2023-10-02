<script setup>

/* interface */

const props = defineProps({

  variant: {
    type: String,
    default: 'fill',
  },
  color: {
    type: String,
    default: undefined,
  },
  states: {
    type: Boolean,
    default: true,
  },

  icon: {
    type: String,
    default: undefined,
  },
  appendIcon: {
    type: String,
    default: undefined,
  },
  iconOnly: {
    type: Boolean,
    default: false,
  },

  label: {
    type: String,
    default: undefined,
  },

  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },

});


defineOptions({
  name: 'UBtn',
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
  <button
    :tabindex="props.disabled ? -1 : 0"
    type="button"
    :disabled="props.disabled ? true : undefined"
    class="inline-flex whitespace-nowrap justify-center items-center relative"
    :class="[
      {
        'a-btn': !props.iconOnly,
        'a-btn-icon-only': props.iconOnly,
        'opacity-50 pointer-events-none': props.disabled,
      },
      classes,
    ]"
    :style="[
      styles,
    ]">

    <u-spinner
      v-if="props.loading === true"
      class="absolute"
    />

    <div
      class="a-btn-content"
      data-no-reference
      :class="{
        'opacity-0': props.loading,
      }">

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

    </div>

  </button>
</template>
