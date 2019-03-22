/*eslint-disable quotes */

const justifyDestr = require('../lib/justify-destr')
const { curry, inc, init, last } = require('ramda')
const assert = require('chai').assert
const testFn = curry((fn, cases) =>
  cases.forEach((c, i) => {
    const args = init(c)
    const expected = last(c)
    it(`case ${inc(i)}`, () =>
      assert.equal(
        fn(...args),
        expected
      ))
  }))

describe('removeFromObjDstr', () => {
  testFn(justifyDestr.remove, [
    [ 'map',
      `const { filter, map } = require('sanctuary')`,
      `const {\n  filter\n} = require('sanctuary')` ],
    [ 'filter',
      `const { filter, map } = require('sanctuary')`,
      `const {\n  map\n} = require('sanctuary')` ],
    [ 'map',
      `const { map } = require('sanctuary')`,
      `const {\n} = require('sanctuary')` ],
    [ 'bar',
      `const { foo, bar, xyz } = require('sanctuary')`,
      `const {\n  foo, xyz\n} = require('sanctuary')` ],
    [ 'bar',
      `const { } = require('sanctuary')`,
      `const {\n} = require('sanctuary')` ],
    [ 'bar',
      `{}`,
      `{}` ],
    [ 'bar',
      `whatever`,
      `whatever` ],
    [ '',
      `{Q, b, c, C}`,
      `{Q, b, c, C}`
    ]
  ])
})

describe('removeFromObjDstrForClient', () => {
  testFn(justifyDestr.remove, [
    [ 'map',
      `const { filter, map } = S`,
      `const {\n  filter\n} = S` ],
    [ 'filter',
      `const { filter, map } = S`,
      `const {\n  map\n} = S` ],
    [ 'map',
      `const { map } = S`,
      `const {\n} = S` ],
    [ 'bar',
      `const { foo, bar, xyz } = S`,
      `const {\n  foo, xyz\n} = S` ],
    [ 'bar',
      `const { } = S`,
      `const {\n} = S` ],
    [ 'bar',
      `{}`,
      `{}` ],
    [ 'bar',
      `whatever`,
      `whatever` ],
    [ '',
      `{Q, b, c, C}`,
      `{Q, b, c, C}`
    ]
  ])
})

describe('addToObjDstr', () => {
  testFn(justifyDestr.add, [
    [ 'map',
      `const { filter, reduce } = require('sanctuary')`,
      `const {\n  filter, map, reduce\n} = require('sanctuary')` ],
    [ 'map',
      `const { } = require('sanctuary')`,
      `const {\n  map\n} = require('sanctuary')` ],
    [ 'map',
      `const {} = require('sanctuary')`,
      `const {\n  map\n} = require('sanctuary')` ],
    [ 'filter',
      `const {map} = require('sanctuary')`,
      `const {\n  filter, map\n} = require('sanctuary')` ],
    [ 'bar',
      `{}`,
      `{}` ],
    [ 'bar',
      `whatever`,
      `whatever` ]
  ])
})

describe('addToObjDstrForClient', () => {
  testFn(justifyDestr.add, [
    [ 'map',
      `const { filter, reduce } = S`,
      `const {\n  filter, map, reduce\n} = S` ],
    [ 'map',
      `const { } = S`,
      `const {\n  map\n} = S` ],
    [ 'map',
      `const {} = S`,
      `const {\n  map\n} = S` ],
    [ 'filter',
      `const {map} = S`,
      `const {\n  filter, map\n} = S` ],
    [ 'bar',
      `{}`,
      `{}` ],
    [ 'bar',
      `whatever`,
      `whatever` ]
  ])
})
