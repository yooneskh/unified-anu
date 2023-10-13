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

  inputClasses: {

  },


  disabled: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [Boolean, Number, String, Array],
    default: true,
  },

});


defineOptions({
  name: 'URadio',
  inheritAttrs: false,
});

const emit = defineEmits([
  'update:modelValue',
]);


/* value */

const attrs = useAttrs();

const isChecked = computed(() =>
  props.modelValue === attrs.value
);


const elementId = computed(() =>
  `a-radio-${attrs.id || attrs.value}-${Math.random().toString(36).slice(2, 7)}`
);

</script>


<template>
  <label
    :for="elementId"
    class="inline-flex items-center cursor-pointer"
    :class="[
      {
        'a-radio-disabled pointer-events-none': props.disabled,
      },
      $attrs.class,
    ]">

    <input
      v-bind="$attrs"
      :id="elementId"
      :checked="isChecked"
      class="hidden"
      :class="props.inputClasses"
      type="radio"
      @change="emit('update:modelValue', $event.target.value)"
    />

    <div
      class="a-radio-circle after:w-full after:h-full after:rounded-full after:block after:content-empty after:transform after:transition after:transition-transform"
      :class="[
        `after:bg-${props.color}`,
        isChecked ? `after:scale-full border-${props.color}` : 'after:scale-0 border-[hsla(var(--a-base-c),var(--a-border-opacity))]',
      ]"
    />

    <slot>
      {{ props.label }}
    </slot>

  </label>
</template>
