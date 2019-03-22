const linter = require('eslint/lib/eslint')
const path = require('path')
const {
  T, __, allPass, always, apply, cond, curry, has, invoker, match,
  nth, pipe, prepend, prop, propEq, reduce, replace
} = require('ramda')
const justifyDestr = require('./justify-destr')
const readFileStdin = require('read-file-stdin')

const ESLINT_OPTS = {
  rules: {
    'no-unused-vars': 1,
    'no-undef': 1
  },
  env: {
    es6: true
  },
  ecmaFeatures: {
    modules: true
  }
}

const deunderscore = curry((x, str) =>
  replace(`__${x}__`, x, str))


//    parseName :: String -> String
const parseName = pipe(
  match(/^"([^"]*?)"/),
  nth(1),
  deunderscore('toString')
)

//    ruleEq :: String -> Object -> Boolean
const ruleEq = propEq('ruleId')

//    handleEslintMessage :: Object -> String -> Message -> String
const handleEslintMessage = curry((sanctuary, code, message) => {
  //    containsRamdaProp :: Message -> Boolean
  const containsSanctuaryProp =
    pipe(prop('message'), parseName, has(__, sanctuary))

  return cond([
    [ allPass([
      ruleEq('no-unused-vars'),
      containsSanctuaryProp
    ]), (message) => {
      const name = parseName(message.message)
      return justifyDestr.remove(name, code)
    }],
    [ allPass([
      ruleEq('no-undef'),
      containsSanctuaryProp
    ]), (message) => {
      let name = parseName(message.message)
      return justifyDestr.add(name, code)
    } ],
    [ T, always(code) ]
  ])(message)
})

//    handleEslintOutput :: Object -> [Object] -> String
const handleEslintOutput =
  pipe(
    (sanctuary, messages, code) => reduce(handleEslintMessage(sanctuary), code, messages),
    replace(/\b__toString__\b/g, 'toString'))

//    fallback :: a -> (b -> a) -> b -> a
const fallback = curry((def, fn, val) => {
  try {
    return fn(val)
  } catch(e) {
    return def
  }
})

//    resolveSanctuary :: process -> Object
const resolveSanctuary =
  pipe(
    invoker(0, 'cwd'),
    prepend(__, [ 'node_modules', 'sanctuary' ]),
    apply(path.join),
    fallback(require('sanctuary'), require))

//    main :: Process -> ()
const main = (process) => {
  readFileStdin(process.argv[2], (err, buf) => {
    const localSanctuary = resolveSanctuary(process)
    const input = buf
      .toString()
      .replace(/toString\b/g, 'toString')
    const messages = linter.verify(input, ESLINT_OPTS)
    const output = handleEslintOutput(localSanctuary, messages, input)
    process.stdout.write(output)
  })
}

main(process)
