<script setup>

/* constants */

const CARD_TYPOGRAPHY_SLOTS = {
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

});


defineOptions({
  name: 'UCard',
});


/* typography */

import { isTypographyUsed, filterUsedSlots } from '../tools/utils';

const slots = useSlots();

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


/* layer */

const { getLayerClasses } = useLayer();

const { styles, classes } = getLayerClasses(
  toRef(props, 'color'),
  toRef(props, 'variant'),
  toRef(props, 'states'),
);

</script>


<template>
  <div
    class="a-card relative overflow-hidden bg-[hsla(var(--a-surface-c),var(--un-bg-opacity,1))]"
    :class="classes"
    :style="styles">

    <!-- <ALoader
      v-if="typeof props.loading !== 'undefined'"
      v-bind="typeof props.loading === 'boolean' ? { loading: props.loading } : props.loading"
    /> -->

    <img
      v-if="props.img"
      :src="props.img"
      :alt="props.imgAlt"
    />

    <div
      v-if="isAnyTypographyUsed"
      class="a-card-typography-wrapper">
      <u-typography
        :title="props.title"
        :subtitle="props.subtitle"
        :text="Object.values(textProp)"
        :icon="props.icon"
        :append-icon="props.appendIcon">

        <template
          v-for="name in filterUsedSlots(CARD_TYPOGRAPHY_SLOTS)"
          #[name]="slotProps">
          <slot
            :name="name"
            v-bind="slotProps"
          />
        </template>

      </u-typography>
    </div>

    <slot />

  </div>
</template>
