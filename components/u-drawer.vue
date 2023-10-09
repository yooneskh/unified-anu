<script setup>

/* constants */

const DRAWER_TYPOGRAPHY_SLOTS = {
  'default': (_) => null,
  'title': (_) => null,
  'subtitle': (_) => null,
  'header-right': (_) => null,
};


/* interface */

const props = defineProps({
  
  variant: {
    type: String,
    default: 'text',
  },
  color: {
    type: String,
    default: undefined,
  },
  states: {
    type: Boolean,
    default: false,
  },

  title: {
    type: String,
    default: undefined,
  },
  subtitle: {
    type: String,
    default: undefined,
  },
  text: {
    type: String,
    default: undefined,
  },
  titleTag: {
    type: String,
    default: 'p',
  },
  subtitleTag: {
    type: String,
    default: 'p',
  },
  textTag: {
    type: String,
    default: 'p',
  },

  icon: {
    type: String,
    default: undefined,
  },
  appendIcon: {
    type: String,
    default: undefined,
  },

  img: {
    type: String,
    default: undefined,
  },
  imgAlt: {
    type: String,
    default: undefined,
  },

  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: [Boolean, Object],
    default: false,
  },
  
  persistent: {
    type: Boolean,
    default: false,
  },

  modelValue: {
    type: Boolean,
    default: false,
  },

  anchor: {
    type: String,
    default: 'left',
  },

});


defineOptions({
  name: 'UDrawer',
  inheritAttrs: false,
});


const emit = defineEmits([
  'update:modelValue',
]);


/* teleport target */

import { useMounted } from '@vueuse/core';

const { teleportTarget } = useTeleport();
const isMounted = useMounted();

const refMask = ref();


useClickSameTarget(refMask, () => {
  if (props.modelValue && !props.persistent) {
    emit('update:modelValue', false);
  }
});


/* transition */

const transitionName = computed(() => {

  if (props.anchor === 'bottom') {
    return 'slide-y'
  }
  else if (props.anchor === 'top') {
    return 'slide-y-reverse'
  }
  else if (props.anchor === 'right') {
    return 'slide-x-reverse'
  }

  return 'slide-x';

});

const transitionClasses = computed(() => {

  if (props.anchor === 'bottom') {
    return '[--slide-y-translateY:100%]'
  }
  else if (props.anchor === 'top') {
    return '[--slide-y-reverse-translateY:-100%]'
  }
  else if (props.anchor === 'right') {
    return '[--slide-x-reverse-translateX:100%]'
  }

  return '[--slide-x-translateX:-100%]';

});


/* scroll lock */

useDOMScrollLock(toRef(props, 'modelValue'));


/* template */

import { filterUsedSlots } from '../tools/utils';

</script>


<template>
  <teleport
    v-if="isMounted"
    :to="teleportTarget">

    <transition name="bg">
      <div
        v-show="props.modelValue"
        ref="refMask"
        class="a-drawer-wrapper flex fixed inset-0 bg-[hsla(var(--a-backdrop-c),var(--a-backdrop-opacity))]"
        :class="[
          `a-drawer-anchor-${props.anchor}`,
          {
            'flex-col': props.anchor === 'top' || props.anchor === 'bottom',
            'justify-end': props.anchor === 'right' || props.anchor === 'bottom',
          },
        ]">

        <transition
          :duration="30000"
          :name="transitionName">
          <u-card
            v-show="props.modelValue"
            :style="[
              `--${transitionName}-opacity: 1`,
              `--${transitionName}--transform-timing: ease-in-out`
            ]"
            class="a-drawer backface-hidden transform translate-z-0"
            :class="transitionClasses"
            v-bind="{
              ...$attrs,
              ...props,
            }">

            <template
              v-for="name in filterUsedSlots(DRAWER_TYPOGRAPHY_SLOTS)"
              #[name]="slotProps">
              <slot
                :name="name"
                v-bind="slotProps"
              />
            </template>

          </u-card>
        </transition>

      </div>
    </transition>

  </teleport>
</template>
