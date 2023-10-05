<script setup>

/* interface */

const props = defineProps({
  
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

});


defineOptions({
  name: 'UTypography',
});


/* typography */

const title = useConfigurable(toRef(props, 'title'));
const subtitle = useConfigurable(toRef(props, 'subtitle'));
const text = useConfigurable(toRef(props, 'text'));

</script>


<template>
  <div class="gap-4 flex flex-col">

    <div
      v-if="$slots.title || props.title || $slots.subtitle || props.subtitle || $slots['header-right']"
      class="flex justify-between">

      <slot name="header-left">
        <i
          v-if="props.icon"
          class="mt-2 me-3"
          :class="props.icon"
        />
      </slot>

      <div class="flex-grow">

        <Component
          :is="props.titleTag"
          v-if="(Array.isArray(props.title) ? props.title[0] : props.title) || $slots.title"
          v-bind="title.attrs"
          class="a-title"
          :class="[title.classes]">
          <slot name="title">
            {{ title.content }}
          </slot>
        </Component>

        <Component
          :is="props.subtitleTag"
          v-if="(Array.isArray(props.subtitle) ? props.subtitle[0] : props.subtitle) || $slots.subtitle"
          v-bind="subtitle.attrs"
          class="a-subtitle"
          :class="[subtitle.classes]">
          <slot name="subtitle">
            {{ subtitle.content }}
          </slot>
        </Component>

      </div>

      <slot name="header-right">
        <i
          v-if="props.appendIcon"
          class="mt-2 ms-3"
          :class="props.appendIcon"
        />
      </slot>

    </div>

    <Component
      :is="props.textTag"
      v-if="(Array.isArray(props.text) ? props.text[0] : props.text) || $slots.text"
      v-bind="text.attrs"
      class="a-text"
      :class="[text.classes]">
      <slot>
        {{ text.content }}
      </slot>
    </Component>

  </div>
</template>
