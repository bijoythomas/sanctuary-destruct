const {
  append, chain, compose, curry, defaultTo, equals, identity, init, isEmpty,
  join, last, map, reduce, reject, repeat, reverse, sortBy, split, trim,
  uniq
} = require('ramda')

const justify =
  curry((width, indent, arr) => reduce(
    (acc, f) => isEmpty(acc)
    ? acc.concat([[repeat(' ', indent).join('') + f]])
    : last(acc).concat([f]).join(', ').length > width
      ? init(acc).concat([last(acc).concat([f])]).concat([[]])
      : init(acc).concat([last(acc).concat([repeat(' ', indent).join('') + f])])
    , [], arr))

const ramdaregex = /([^]*?)(const {[^]*?} = require\(['"]sanctuary['"]\)|const {[^]*?} = S)([^]*)/

const serversideregex = /const {([^]*)} = require\(['"]sanctuary['"]\)/

const clientsideregex = /const {([^]*)} = S/

const adjustDestructuring =
  curry((operator, name, code) => {
    let [full, before, matched, after] = defaultTo([], code.match(ramdaregex))
    if (!matched) {
      return code
    }
    let isramdadestruct = matched.indexOf('sanctuary') > 0 // otherwise its sanctuary exposed as S
    let destructuredfnsregex = isramdadestruct ? serversideregex : clientsideregex
    let [dontcare, destructuredfns] = matched.match(destructuredfnsregex)
    let fnsarr = compose(
      sortBy(identity),
      uniq,
      operator(name),
      map(fn => fn.replace('\n', '')),
      reject(isEmpty),
      map(trim),
      chain(line => line.split(', ')),
      split(',\n')
    )(destructuredfns)

    let fnsstr = isEmpty(fnsarr)
      ? ''
      : compose(
        join(''),
        reverse,
        ([lastline, ...everythingbefore]) => [lastline + '\n'].concat(everythingbefore.map(str => str + ',\n')),
        reverse,
        map(([first, ...rest]) => [first].concat(rest.map(trim)).join(', ')),
        justify(80, 2)
      )(fnsarr)

    return before + 'const {\n'+fnsstr+'} = ' + (isramdadestruct ? 'require(\'sanctuary\')' : 'S') + after
  })

const without = compose(reject, equals)

module.exports.add = adjustDestructuring(append)
module.exports.remove = adjustDestructuring(without)
