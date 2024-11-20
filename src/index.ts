import { Plugin } from 'vite'

export function replaceLodash(): Plugin {
  return {
    name: 'vite:replace-lodash',
    transform(code, id) {
      if (!/(\.vue|\.svelte|\.[jt]sx?|\.mjs)$/.test(id)) {
        return null
      }

      return {
        code: code.replace(/from\s*(['"])lodash\1/g, `from $1lodash-es$1`),
        map: null,
      }
    },
  }
}
