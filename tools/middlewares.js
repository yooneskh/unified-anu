import { unrefElement } from '@vueuse/core';


export function sameWidth(floatingEl) {
  return {
    name: 'sameWidth',
    fn: ({ rects, x, y }) => {

      const _floatingEL = unrefElement(floatingEl);

      if (_floatingEL) {
        _floatingEL.style.minWidth = `${rects.reference.width}px`;
      }

      return {
        x,
        y,
      };

    },
  };
}
