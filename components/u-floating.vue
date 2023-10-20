<script setup>

/* constants */

import { flip, shift } from '@floating-ui/vue';
import { sameWidth as sameWidthMiddleware } from '../tools/middlewares';


/* interface */

const props = defineProps({

  referenceEl: {
    type: Object,
    default: undefined,
  },

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
    default: (referenceEl, refFloating) => [
      sameWidthMiddleware(refFloating),
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


const emit = defineEmits([
  'update:modelValue',
  'show',
  'hide',
]);


import { onClickOutside, useVModel } from '@vueuse/core';

const modelValue = useVModel(
  props,
  'modelValue',
  emit,
  {
    defaultValue: false,
    passive: true,
  }
);


defineOptions({
  name: 'UFloating',
  inheritAttrs: false,
});


/* teleport */

import { useMounted, refDebounced } from '@vueuse/core';

const { teleportTarget } = useTeleport();
const isMounted = useMounted();


/* delay */

const currentDelay = computed(() =>
  props.modelValue ? props.hideDelay : props.delay
);

watch(modelValue, () => {
  if (modelValue.value) {
    emit('show');
  }
  else {
    emit('hide');
  }
});

const modelValueDebounced = refDebounced(modelValue, currentDelay);


/* positioning */

import { autoUpdate, useFloating } from '@floating-ui/vue';

const refFloating = ref();

const activeMiddleware = computed(() =>
  props.middleware(toRef(props, 'referenceEl'), refFloating)
);

const { x, y, strategy } = useFloating(toRef(props, 'referenceEl'), refFloating, {
  strategy: toRef(props, 'strategy'),
  placement: toRef(props, 'placement'),
  middleware: activeMiddleware,
  whileElementsMounted: autoUpdate,
});


/* styles */

const { getNextZIndex } = useZIndex();
const zIndex = getNextZIndex();

const contentStyle = computed(() => {
  return {
    top: `${unref(y) ?? 0}px`,
    left: `${unref(x) ?? 0}px`,
    zIndex,
  };
});


/* event listeners */

import { useEventListener } from '@vueuse/core';


if (props.modelValue === undefined) {
  if (props.trigger === 'hover') {

    useEventListener(toRef(props, 'referenceEl'), 'mouseenter', () => {
      modelValue.value = true;
    });

    useEventListener(toRef(props, 'referenceEl'), 'mouseleave', () => {
      modelValue.value = false;
    });

    useEventListener(refFloating, 'mouseenter', () => {
      modelValue.value = true;
    });

    useEventListener(refFloating, 'mouseleave', () => {
      modelValue.value = false;
    });

  }
  else {

    useEventListener(toRef(props, 'referenceEl'), 'click', () => {
      modelValue.value = !modelValue.value;
    });

    if (props.persist !== true) {
      onClickOutside(
        toRef(props, 'referenceEl'),
        () => {
          modelValue.value = false
        },
        {
          ignore: props.persist === 'content' ? [ refFloating ] : [],
        },
      );
    }

  }
}


/* expose */

defineExpose({
  refFloating,
});

</script>


<template>
  <teleport
    v-if="isMounted"
    :to="teleportTarget">

    <transition :name="props.transition || undefined">
      <div
        v-show="modelValueDebounced"
        v-bind="$attrs"
        ref="refFloating"
        class="a-floating transform"
        :style="contentStyle"
        :class="strategy">

        <slot />

      </div>
    </transition>

  </teleport>
</template>
