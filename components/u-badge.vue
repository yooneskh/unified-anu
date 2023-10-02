<script setup>

/* constants */

const DEFAULT_OFFSET = 4;
const DEFAULT_OVERLAP_OFFSET = 12;


/* interface */

const props = defineProps({
  
  modelValue: {
    type: Boolean,
    default: true,
  },

  color: {
    type: String,
    default: 'primary',
  },
  dot: {
    type: Boolean,
    default: false,
  },
  bordered: {
    type: Boolean,
    default: true,
  },

  max: {
    type: Number,
    default: undefined,
  },

  content: {
    type: [Number, String],
    default: undefined,
  },

  anchor: {
    type: String,
    default: 'top right',
  },
  overlap: {
    type: Boolean,
    default: true,
  },
  offsetX: {
    type: [Number, String],
    default: DEFAULT_OFFSET,
  },
  offsetY: {
    type: [Number, String],
    default: DEFAULT_OFFSET,
  },

});


defineOptions({
  name: 'UBadge',
  inheritAttrs: false,
});


/* content */

function formatMaxContent(content) {

  if (isNaN(content) || props.max === undefined) {
    return content;
  }

  const numericContent = Number(content);

  if (numericContent > props.max) {
    return `${props.max}+`;
  }

  return numericContent;

}


/* positioning */

const anchorOffset = computed(() => {

  const newOffsetY = (props.overlap && DEFAULT_OFFSET === props.offsetY) ? DEFAULT_OVERLAP_OFFSET : props.offsetY;
  const newOffsetX = (props.overlap && DEFAULT_OFFSET === props.offsetX) ? DEFAULT_OVERLAP_OFFSET : props.offsetX;

  return {
    y: newOffsetY,
    x: newOffsetX,
  };

});

const positionStyles = computed(() => {

  const [anchorY, anchorX] = props.anchor.split(' ');

  return {
    top: anchorY === 'top' ? 'auto' : `calc(100% - ${anchorOffset.value.y}px)`,
    bottom: anchorY === 'bottom' ? 'auto' : `calc(100% - ${anchorOffset.value.y}px)`,
    left: anchorX === 'left' ? 'auto' : `calc(100% - ${anchorOffset.value.x}px)`,
    right: anchorX === 'right' ? 'auto' : `calc(100% - ${anchorOffset.value.x}px)`,
  };

});

</script>


<template>
  <div class="a-badge-wrapper relative">

    <slot />

    <transition name="dialog">
      <div
        v-show="props.modelValue"
        v-bind="$attrs"
        class="a-badge absolute"
        :class="[
          `bg-${props.color}`,
          {
            'a-badge-dot': props.dot,
            'a-badge-bordered': props.bordered,
          },
        ]"
        :style="positionStyles">
        <template v-if="!props.dot">
          <template v-if="$slots.content">
            {{ formatMaxContent($slots.content()[0]?.children) }}
          </template>
          <template v-else-if="props.content">
            {{ formatMaxContent(props.content) }}
          </template>
        </template>
      </div>
    </transition>

  </div>
</template>
