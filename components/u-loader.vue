<script setup>

/* constants */

const LOADER_TYPOGRAPHY_SLOTS = {
  'title': (_) => null,
  'subtitle': (_) => null,
  'header-right': (_) => null,
};


/* interface */

const props = defineProps({
  
  loading: {
    type: Boolean,
    default: false,
  },

  fullPage: {
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

});


defineOptions({
  name: 'ULoader',
});


/* was shown */

import { watchOnce } from '@vueuse/core';

const isShownOnce = ref(props.loading);

watchOnce(
  () => props.loading,
  () => { isShownOnce.value = true },
);


/* typography */

import { isTypographyUsed, filterUsedSlots } from '../tools/utils';


const slots = useSlots()

const isAnyTypographyUsed = computed(() =>
  isTypographyUsed(toRefs(props), slots)
);


/* text prop */

const textProp = useConfigurable(toRef(props, 'text'));

if (textProp.value.classes === undefined) {
  textProp.value.classes = 'text-sm';
}
else if (Array.isArray(textProp.value.classes)) {
  textProp.value.classes = [...textProp.value.classes, 'text-sm'];
}
else {
  textProp.value.classes = ' text-sm';
}


/* fullpage */

if (props.fullPage) {
  useDOMScrollLock(toRef(props, 'loading'));
}

</script>


<template>
  <div
    v-if="isShownOnce"
    v-show="props.loading"
    class="a-loader overlay flex items-center justify-center flex-col text-center gap-4"
    :class="{
      'opacity-100': props.loading,
      'a-loader-full-page fixed inset-0 z-54': props.fullPage,
    }">

    <slot>
      <u-spinner
        class="a-loader-spinner text-[hsl(var(--a-layer-c))]"
      />
    </slot>

    <div
      v-if="isAnyTypographyUsed"
      class="a-loader-typography-wrapper">
      <u-typography
        :title="props.title"
        :subtitle="props.subtitle"
        :text="Object.values(textProp)"
        :icon="props.icon"
        :append-icon="props.appendIcon"
        style="--a-title-c: var(--a-layer-c); --a-subtitle-c: var(--a-layer-c)">

        <template
          v-for="name in filterUsedSlots(LOADER_TYPOGRAPHY_SLOTS)"
          #[name]="slotProps">
          <slot
            :name="name"
            v-bind="slotProps"
          />
        </template>

      </u-typography>
    </div>
  </div>
</template>
