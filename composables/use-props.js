import { createDefu } from 'defu'


// export const color = {
//   type: [String, undefined],
// };

// export const disabled = { type: Boolean }

// export const readonly = { type: Boolean }

// export const configurable = {
//   type: [Array, String, Number, Object, undefined]
// }

// export const transition = {
//   type: [String, null],
// }

export const defuProps = createDefu((obj, key, value) => {

  if (key === 'type') {
    obj[key] = value
    return true
  }

  else if (key === 'required' && value) {
    delete obj.default
    obj[key] = value
    return true
  }

})
