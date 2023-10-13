<script setup>

/* interface */

const props = defineProps({
  
  color: {
    type: String,
    default: 'warning',
  },

  length: {
    type: [Number, String],
    default: 5,
  },
  halve: {
    type: Boolean,
    default: false,
  },

  emptyIcon: {
    type: String,
    default: 'i-heroicons-star',
  },
  halfIcon: {
    type: String,
    default: 'i-heroicons-stop-circle-solid',
  },
  fullIcon: {
    type: String,
    default: 'i-heroicons-star-solid',
  },

  noHoverHint: {
    type: Boolean,
    default: false,
  },
  animate: {
    type: Boolean,
    default: false,
  },

  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Number,
    default: undefined,
  },

});


defineOptions({
  name: 'URating',
});


const emit = defineEmits([
  'update:modelValue',
]);


/* color */

const { styles } = useColor(toRef(props, 'color'), 'rating-color');


/* rating */

const rating = ref(0);
const isHovered = ref(false);

const visibleRating = computed(() => {

  if (!props.noHoverHint && !props.readonly && !props.disabled && isHovered.value) {
    return rating.value;
  }

  return props.modelValue ?? 0;

});

const items = computed(() =>
  Array.from({ length: Number(props.length) }, (_, i) => i + 1).map(item =>
    item <= visibleRating.value
      ? props.fullIcon
      : item - visibleRating.value === 0.5
        ? props.halfIcon
        : props.emptyIcon,
  )
);

function handleClick() {
  emit('update:modelValue', rating.value);
}

function onMouseEnter(e, index) {

  isHovered.value = true;
  const { offsetX, target } = e;

  if (!( target instanceof HTMLElement )) {
    return;
  }


  const widthPercentage = (offsetX * 100) / target.clientWidth;

  if (props.halve) {
    rating.value = widthPercentage < 50 ? index + 0.5 : index + 1;
  }
  else {
    rating.value = index + 1;
  }

}

function onMouseLeave() {
  isHovered.value = false;
}

</script>


<template>
  <div
    :style="styles"
    class="a-rating flex"
    :class="{
      'a-rating-animated': props.animate && !props.readonly && !props.disabled,
      'a-rating-readonly pointer-events-none': props.readonly,
      'a-rating-disabled pointer-events-none': props.disabled,
    }">
    <i
      v-for="(icon, index) in items"
      :key="index"
      class="cursor-pointer"
      :class="icon"
      @click="handleClick"
      @mouseenter="onMouseEnter($event, index)"
      @mouseleave="onMouseLeave"
    />
  </div>
</template>
