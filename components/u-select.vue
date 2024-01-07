<script setup>

/* constants */

const SELECT_BASE_INPUT_SLOTS = {
  'label': (_) => null,
  'prepend': (_) => null,
  'prepend-inner': (_) => null,
  'append-inner': (_) => null,
  'append': (_) => null,
  'bottom': (_) => null,
};

const SELECT_CARD_TYPOGRAPHY_SLOTS = {
  'title': (_) => null,
  'subtitle': (_) => null,
  'header-right': (_) => null,
};

const SELECT_LIST_SLOTS = {
  'options-before': (_) => null,
  'options-after': (_) => null,
  'options-item-prepend': (_) => null,
  'options-item-content': (_) => null,
  'options-item-append': (_) => null,
};


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

  options: {
    type: Array,
    default: undefined,
  },
  optionsWrapperClasses: {
    type: String,
    default: undefined,
  },
  listClasses: {
    type: String,
    default: undefined,
  },

  emitObject: {
    type: Boolean,
    default: undefined,
  },
  modelValue: {

  },

});


defineOptions({
  name: 'USelect',
  inheritAttrs: false,
});


const emit = defineEmits([
  'update:modelValue',
]);


/* base input */

const baseInputProps = computed(() =>
  props
);


/* options */

import { onClickOutside } from '@vueuse/core';

const refReference = ref();
const refFloating = ref();
const selectRef = ref();

const isOptionsVisible = ref(false);

onClickOutside(
  refFloating,
  () => {
    if (isOptionsVisible.value) {
      isOptionsVisible.value = false;
    }
  },
  {
    ignore: [
      refReference,
    ],
  },
);


/* handlers */

import { extractItemValueFromItemOption } from '../tools/selection';

function handleInputClick() {
  if (!( props.disabled || props.readonly )) {
    isOptionsVisible.value = !isOptionsVisible.value;
    selectRef.value?.focus();
  }
}

function handleOptionClick(item) {
  const valueToEmit = props.emitObject ? item : extractItemValueFromItemOption(item);
  emit('update:modelValue', valueToEmit);
}

function closeOptions(event) {
  if (event.target !== refFloating.value) {
    isOptionsVisible.value = false
  }
}


/* middlewares */

import { flip, offset, shift } from '@floating-ui/vue';
import { sameWidth } from '../tools/middlewares';

function middleware() {
  return [
    offset(6),
    sameWidth(refFloating),
    flip(),
    shift({
      padding: 10,
    }),
  ];
}


/* template */

import { filterUsedSlots, filterUsedRenamedSlots } from '../tools/utils';

</script>


<template>

  <u-base-input
    v-bind="{
      ...baseInputProps,
      inputWrapperClasses: [
        '!cursor-pointer',
        baseInputProps.inputWrapperClasses,
      ],
      class: $attrs.class,
    }"
    ref="refReference"
    append-inner-icon="i-bx-chevron-down"
    class="a-select"
    :input-wrapper-attrs="{
      onClick: handleInputClick,
    }">

    <template
      v-for="name in filterUsedSlots(SELECT_BASE_INPUT_SLOTS)"
      #[name]="slotProps">
      <slot
        :name="name"
        v-bind="slotProps"
      />
    </template>

    <template #default="slotProps">
      <input
        v-bind="{ ...$attrs, ...slotProps }"
        ref="selectRef"
        readonly
        class="a-select-input cursor-pointer"
        :value="props.modelValue ? props.modelValue.text ?? props.modelValue : undefined"
      />
    </template>

  </u-base-input>

  <!-- 👉 Select options -->
  <u-floating
    :reference-el="refReference && refReference.refInputContainer"
    :middleware="middleware"
    class="a-select-floating">
    <u-card
      v-show="isOptionsVisible"
      ref="refFloating"
      class="a-select-options-container bg-[hsl(var(--a-surface-c))]"
      :class="props.optionsWrapperClasses"
      @click="closeOptions">

      <template
        v-for="name in filterUsedSlots(SELECT_CARD_TYPOGRAPHY_SLOTS)"
        #[name]="slotProps">
        <slot
          :name="name"
          v-bind="slotProps"
        />
      </template>

      <u-list
        :items="props.options"
        :model-value="props.modelValue"
        :emit-object="props.emitObject"
        class="a-select-options-list"
        :class="props.listClasses"
        @click:item="(item) => handleOptionClick(item)">

        <template
          v-for="{ originalKey: originalSlotName, prefixedKey: updatedSlotName } in filterUsedRenamedSlots(SELECT_LIST_SLOTS)"
          #[originalSlotName]="slotProps">
          <slot
            :name="updatedSlotName"
            v-bind="{
              ...slotProps,
              handleOptionClick,
            }"
          />
        </template>
      </u-list>

    </u-card>
  </u-floating>
</template>
