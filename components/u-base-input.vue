<script setup>

/* interface */

const props = defineProps({

  label: {
    type: String,
    default: undefined,
  },

  prependIcon: {
    type: String,
    default: undefined,
  },
  appendIcon: {
    type: String,
    default: undefined,
  },
  prependInnerIcon: {
    type: String,
    default: undefined,
  },
  appendInnerIcon: {
    type: String,
    default: undefined,
  },

  inputWrapperClasses: {
    type: String,
    default: undefined,
  },
  inputClasses: {
    type: String,
    default: undefined,
  },
  inputWrapperAttrs: {
    type: String,
    default: undefined,
  },

  hint: {
    type: String,
    default: undefined,
  },
  success: {
    type: String,
    default: undefined,
  },
  error: {
    type: String,
    default: undefined,
  },

  readonly: {
    type: String,
    default: undefined,
  },
  disabled: {
    type: String,
    default: undefined,
  },
  loading: {
    type: String,
    default: undefined,
  },

});


defineOptions({
  name: 'UBaseInput',
});


const emit = defineEmits([
  'click:inputWrapper',
]);


/* config */

const attrs = useAttrs();

const configurableLabel = useConfigurable(toRef(props, 'label'));
const iconTransition = 'transition duration-150 ease-in';

const _elementIdToken = attrs.id || props.label;
const elementId = _elementIdToken ? `a-input-${_elementIdToken}-${Math.random().toString(36).slice(2, 7)}` : undefined;

const refRoot = ref();
const refInputContainer = ref();
const refInputWrapper = ref();

defineExpose({
  refRoot,
  refInputContainer,
  refInputWrapper,
});


/* template */

import TransitionExpand from '../atoms/transition-expand.vue';

</script>


<template>
  <div
    ref="refRoot"
    class="a-base-input-root i:children:focus-within:text-primary flex flex-col flex-grow flex-shrink-0"
    :class="{
      'a-base-input-disabled': props.disabled,
      'pointer-events-none': (props.disabled || props.readonly),
      'a-base-input-interactive': !(props.disabled || props.readonly),
    }">

    <slot name="label">
      <label
        v-if="props.label"
        :for="elementId"
        class="a-base-input-label"
        v-bind="configurableLabel.attrs"
        :class="[
          {
            'text-danger': props.error,
            'text-success': props.success,
          },
          configurableLabel.classes
        ]">
        {{ configurableLabel.content }}
      </label>
    </slot>

    <div
      ref="refInputContainer"
      class="a-base-input-input-container flex items-center">

      <slot name="prepend">
        <i
          v-if="props.prependIcon"
          :class="[
            iconTransition,
            props.prependIcon,
          ]"
        />
      </slot>

      <div
        ref="refInputWrapper"
        v-bind="props.inputWrapperAttrs"
        :class="[
          props.inputWrapperClasses,
          props.error ? 'border-danger' : props.success ? 'border-success' : 'focus-within:border-primary'
        ]"
        class="a-base-input-input-wrapper cursor-text em:spacing:px-4 spacing:gap-x-2 relative i:focus-within:text-primary items-center border border-solid border-a-border w-full"
        @click="emit('click:inputWrapper')">

        <slot name="prepend-inner">
          <i
            v-if="props.prependInnerIcon"
            class="a-base-input-prepend-inner-icon"
            :class="[
              iconTransition,
              props.prependInnerIcon,
            ]"
          />
        </slot>

        <slot
          :id="elementId"
          :readonly="props.readonly"
          :disabled="props.disabled"
          :class="[
            'a-base-input-child w-full h-full inset-0 rounded-inherit bg-transparent',
            props.inputClasses,
            $slots['prepend-inner'] || props.prependInnerIcon
              ? 'a-base-input-w-prepend-inner'
              : 'a-base-input-wo-prepend-inner',
            $slots['append-inner'] || props.appendInnerIcon
              ? 'a-base-input-w-append-inner'
              : 'a-base-input-wo-append-inner',
          ]"
        />

        <slot name="append-inner">

          <!-- <u-loader v-if="props.loading" /> -->

          <!-- v-else-if="props.appendInnerIcon" -->
          <i
            class="a-base-input-append-inner-icon ms-auto"
            :class="[
              iconTransition,
              props.appendInnerIcon,
            ]"
          />

        </slot>

      </div>

      <slot name="append">
        <i
          v-if="props.appendIcon"
          :class="[
            iconTransition,
            props.appendIcon,
          ]"
        />
      </slot>

    </div>

    <slot name="bottom">
      <transition-expand>
        <div
          v-show="props.error || props.success || props.hint"
          class="h-8">
          <small
            class="inline-block"
            :class="[
              props.error ? 'text-danger' : props.success ? 'text-success' : 'text-light-emphasis'
            ]">
            {{ props.error || props.success || props.hint }}
          </small>
        </div>
      </transition-expand>
    </slot>

  </div>
</template>
