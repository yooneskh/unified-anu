<script setup>

/* constants */

const DIALOG_TYPOGRAPHY_SLOTS = {
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

});


defineOptions({
  name: 'UDialog',
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
        class="a-dialog-wrapper grid place-items-center fixed inset-0 bg-[hsla(var(--a-backdrop-c),var(--a-backdrop-opacity))]">
        <transition name="dialog">

          <u-card
            v-show="props.modelValue"
            class="a-dialog backface-hidden transform translate-z-0 max-w-[calc(100vw-2rem)]"
            v-bind="{
            ...$attrs,
            ...props,
            }">
            <template
              v-for="name in filterUsedSlots(DIALOG_TYPOGRAPHY_SLOTS)"
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
