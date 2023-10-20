<script setup>

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
    default: true,
  },

  title: {
    type: [String, Array],
    default: undefined,
  },
  subtitle: {
    type: [String, Array],
    default: undefined,
  },
  text: {
    type: [String, Array],
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

  disabled: {
    type: Boolean,
    default: false,
  },
  value: {

  },

  avatar: {
    type: Object,
    default: undefined,
  },
  appendAvatar: {
    type: Object,
    default: undefined,
  },

  isActive: {
    type: Boolean,
    default: false,
  },

});


const emit = defineEmits([
  'click:icon',
  'click:appendIcon',
  'click:avatar',
  'click:appendAvatar',
]);


defineOptions({
  name: 'UListItem',
});


/* title */

const titleProp = useConfigurable(props.title);

if (Array.isArray(titleProp.value.classes)) {
  titleProp.value.classes = [...titleProp.value.classes, 'text-base']
}
else {
  titleProp.value.classes += ' text-base';
}


/* layer */

const { getLayerClasses } = useLayer()

const { styles, classes } = getLayerClasses(
  computed(() => (props.color ?? props.isActive) ? (props.color || 'primary') : undefined),
  computed(() => props.isActive ? (props.variant || 'light') : 'text'),
  toRef(props, 'states'),
  {
    statesClass: 'states:10',
  },
);

</script>


<template>
  <li
    class="a-list-item flex items-center"
    :class="[
      {
        'opacity-50 pointer-events-none': props.disabled,
      },
      props.value !== undefined || $attrs.onClick ? [...classes, 'cursor-pointer'] : '',
    ]"
    :style="styles">

    <slot :item="props">

      <slot name="prepend" :item="props">
        <u-avatar
          v-if="props.avatar"
          v-bind="props.avatar"
          @click="$emit('click:avatar')"
        />
      </slot>

      <slot name="content" :item="props">
        <u-typography
          class="flex-grow"
          :subtitle="props.subtitle"
          :text="props.text"
          :title="props.title ? Object.values(titleProp) : undefined"
          :title-tag="props.titleTag"
          :subtitle-tag="props.subtitleTag"
          :text-tag="props.textTag"
          :icon="props.icon"
          :append-icon="props.appendIcon"
        />
      </slot>

      <slot name="append" :item="props">
        <u-avatar
          v-if="props.appendAvatar"
          v-bind="props.appendAvatar"
          @click="$emit('click:appendAvatar')"
        />
      </slot>

    </slot>
  </li>
</template>
