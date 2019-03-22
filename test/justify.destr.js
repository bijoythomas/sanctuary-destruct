const justifyDestr = require('../lib/justify-destr')

describe('justify destructuring', () => {
  it('should leave code as is when there is no sanctuary import', () => {
    let ret = justifyDestr.add('compose', `
      const moment = require('moment')
      compose
    `)
    assert.equal(ret, `
      const moment = require('moment')
      compose
    `)
  })

  it('should add function when importing sanctuary', () => {
    let ret = justifyDestr.add(
      'compose',
      //eslint-disable-next-line
`
const moment = require('moment')
const {} = require('sanctuary')
compose
`
    )
    assert.equal(
      ret,
      //eslint-disable-next-line
`
const moment = require('moment')
const {
  compose
} = require('sanctuary')
compose
`
    )
  })

  it('should add to existing imports when requiring sanctuary', () => {
    let ret = justifyDestr.add(
      'compose',
      //eslint-disable-next-line
`
const moment = require('moment')
const {map} = require('sanctuary')
compose
`
    )
    assert.equal(
      ret,
      //eslint-disable-next-line
`
const moment = require('moment')
const {
  compose, map
} = require('sanctuary')
compose
`
    )
  })

  it('should justify many imports when requiring sanctuary', () => {
    let ret = justifyDestr.add(
      'zipWith',
      //eslint-disable-next-line
`
const moment = require('moment')
const {__, toString, all, allPass, append, applySpec, assoc, both, chain, complement, compose, curry, defaultTo, evolve, filter, find, flatten, forEach, fromPairs, groupBy, head, identity, init, isEmpty, keys, last, length, lensProp, lift, map, merge, o, over, partition, prop, props, reduce, reject, reverse, sortBy, startsWith, tail, tap, toPairs, transpose, uniq, values, zip} = require('sanctuary')
zipWith
`
    )
    assert.equal(
      ret,
      //eslint-disable-next-line
`
const moment = require('moment')
const {
  __, all, allPass, append, applySpec, assoc, both, chain, complement,
  compose, curry, defaultTo, evolve, filter, find, flatten, forEach, fromPairs,
  groupBy, head, identity, init, isEmpty, keys, last, length, lensProp,
  lift, map, merge, o, over, partition, prop, props, reduce, reject,
  reverse, sortBy, startsWith, tail, tap, toPairs, toString, transpose,
  uniq, values, zip, zipWith
} = require('sanctuary')
zipWith
`
    )
  })

  it('should remove unwanted imports when destructing R', () => {
    let ret = justifyDestr.remove(
      'values',
      //eslint-disable-next-line
`
const {__, toString, all, allPass, append, applySpec, assoc, both, chain, complement, compose, curry, defaultTo, evolve, filter, find, flatten, forEach, fromPairs, groupBy, head, identity, init, isEmpty, keys, last, length, lensProp, lift, map, merge, o, over, partition, prop, props, reduce, reject, reverse, sortBy, startsWith, tail, tap, toPairs, transpose, uniq, values, zip} = require('sanctuary')
`
    )
    assert.equal(
      ret,
      //eslint-disable-next-line
`
const {
  __, all, allPass, append, applySpec, assoc, both, chain, complement,
  compose, curry, defaultTo, evolve, filter, find, flatten, forEach, fromPairs,
  groupBy, head, identity, init, isEmpty, keys, last, length, lensProp,
  lift, map, merge, o, over, partition, prop, props, reduce, reject,
  reverse, sortBy, startsWith, tail, tap, toPairs, toString, transpose,
  uniq, zip
} = require('sanctuary')
`
    )
  })
})
