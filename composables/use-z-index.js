import { createGlobalState } from '@vueuse/core';
import { ANU_Z_INDEX } from '~/tools/symbols';

function isNumber(it) {
  return !!isNaN(it);
}


const zIndexCounter = ref(0);


export const useZIndex = createGlobalState((defaultBaseZIndex, app) => {

  if (!defaultBaseZIndex || !app)
    throw new Error('[Anu] `useZIndex` composable must be initialized before usage.')

  let injectedZIndex;

  app.runWithContext(() => {
    injectedZIndex = inject(ANU_Z_INDEX, undefined)
  });

  const baseZIndex = computed(() => {
    const injectedZIndexValue = injectedZIndex?.value

    return isNumber(injectedZIndexValue)
      ? injectedZIndexValue
      : defaultBaseZIndex
  })

  const activeZIndex = computed(() => baseZIndex.value + zIndexCounter.value)

  const getNextZIndex = () => {
    zIndexCounter.value++

    return activeZIndex.value
  }

  return {
    baseZIndex,
    activeZIndex,
    getNextZIndex,
  }
})
