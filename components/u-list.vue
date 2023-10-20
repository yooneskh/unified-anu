<script setup>

/* constants */

const LIST_LIST_ITEM_SLOTS = {
  'item-prepend': (_) => null,
  'item-content': (_) => null,
  'item-append': (_) => null,
};


/* interface */

const props = defineProps({

  items: {
    type: Array,
    default: undefined,
  },

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

  multi: {
    type: Boolean,
    default: false,
  },
  emitObject: {
    type: Boolean,
    default: false,
  },

  modelValue: {

  },

  'onClick:item': {
    type: Function,
    default: undefined,
  },

});


const emit = defineEmits([
  'update:modelValue',
]);


defineOptions({
  name: 'UList',
});


/* selection */

import { useSelection, extractItemValueFromItemOption, calculateSelectionItems } from '../tools/selection';

const { options } = useSelection({
  items: calculateSelectionItems(toRef(() => props.items)),
  multi: toRef(() => props.multi),
  initialValue: toRef(() => props.modelValue),
});


function handleListItemClick(item) {

  const _val = props.emitObject ? item : extractItemValueFromItemOption(item)

  emit('update:modelValue', _val)

  props['onClick:item']?.(_val)

}


/* template */

import { filterUsedRenamedSlots } from '../tools/utils';

</script>


<template>
  <ul class="a-list grid">

    <li v-if="$slots.before">
      <slot name="before" />
    </li>

    <slot :handle-list-item-click="handleListItemClick">
      <u-list-item
        v-for="(item, index) in props.items"
        :key="index"
        :text="typeof item === 'string' || typeof item === 'number' ? item : undefined"
        v-bind="typeof item === 'string' ? {} : item"
        :color="typeof item === 'object' ? item.color : props.color"
        :variant="props.variant"
        :states="props.states"
        :is-active="options[index]?.isSelected"
        :value="props.modelValue !== undefined || (typeof item === 'object' ? item.value : undefined)"
        v-on="{
          click: props['onClick:item'] || (props.modelValue !== undefined)
            ? () => { handleListItemClick(item) }
            : null,
        }">

        <template
          v-for="{ originalKey: originalSlotName, prefixedKey: updatedSlotName } in filterUsedRenamedSlots(LIST_LIST_ITEM_SLOTS)"
          #[originalSlotName]="slotProps">
          <slot
            :name="updatedSlotName"
            v-bind="slotProps"
          />
        </template>

      </u-list-item>
    </slot>

    <li v-if="$slots.after">
      <slot name="after" />
    </li>

  </ul>
</template>
