<script setup>

/* interface */

const props = defineProps({
  
  icon: {
    type: String,
    default: undefined,
  },

  loading: {
    type: Boolean,
    default: false,
  },

});


defineOptions({
  name: 'ULoadingIcon',
  inheritAttrs: false,
});

</script>


<template>
  <u-spinner
    v-if="props.loading"
    class="transition-opacity"
    v-bind="$attrs"
  />
  <i
    v-else
    :class="props.icon"
  />
</template>
