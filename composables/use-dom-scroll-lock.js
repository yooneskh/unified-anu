import { useCssVar } from '@vueuse/core';


export function useDOMScrollLock(modelValue) {

  const refRoot = ref();

  const scrollbarWidth = useCssVar('--scrollbar-width', refRoot);
  const windowScrollTop = useCssVar('--window-scroll-top', refRoot);

  watch(modelValue, val => {

    if (!scrollbarWidth.value) {
      scrollbarWidth.value = `${window.innerWidth - document.body.clientWidth}px`;
    }

    const classes = document.documentElement.classList;

    if (val) {
      windowScrollTop.value = `-${window.scrollY}px`;
      classes.add('scroll-lock');
    }
    else {

      const scrollY = windowScrollTop.value;

      classes.remove('scroll-lock');
      window.scrollTo(0, Number.parseInt(scrollY || '0') * -1);

    }

  });

}
