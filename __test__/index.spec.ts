import { replaceLodash } from '../src/index.js'
import { describe, test, expect } from 'vitest'

describe('replace lodash plugin', () => {
  const { name, transform: _transform } = replaceLodash()
  let transform = _transform as (
    code: string,
    id: string,
  ) => null | { code: string; map?: string }
  test('Is correct name?', async () => {
    expect(name).toEqual('vite:replace-lodash')
  })
  test('When filename is svg', async () => {
    expect(transform('', 'a.svg')).toEqual(null)
  })
  test('import lodash use single quote', async () => {
    const code = `import { isArray } from 'lodash'`
    expect(transform(code, 'test.js')!.code).toEqual(
      `import { isArray } from 'lodash-es'`,
    )
  })

  test('import lodash use double quote', async () => {
    const code = `import { isArray } from "lodash"`
    expect(transform(code, 'test.js')!.code).toEqual(
      `import { isArray } from "lodash-es"`,
    )
  })
  test('multiple line import lodash', async () => {
    const code = `import { isArray } from 'lodash'
    import { debounce } from "lodash"`
    expect(transform(code, 'test.js')!.code)
      .toEqual(`import { isArray } from 'lodash-es'
    import { debounce } from "lodash-es"`)
  })
  test('import lodash full', async () => {
    const code = `import lodash from 'lodash'
    lodash.isArray([])`
    expect(transform(code, 'test.js')!.code)
      .toEqual(`import lodash from 'lodash-es'
    lodash.isArray([])`)
  })
  test('import lodash/debounce', async () => {
    const code = `import debounce from "lodash/debounce"`
    expect(transform(code, 'test.js')!.code).toEqual(code)
  })
})
