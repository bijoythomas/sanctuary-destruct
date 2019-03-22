# sanctuary-destruct [![npm version](https://badge.fury.io/js/sanctuary-destruct.svg)](https://www.npmjs.com/package/sanctuary-destruct) [![Build Status](https://travis-ci.org/bijoythomas/sanctuary-destruct.svg?branch=master)](https://travis-ci.org/bijoythomas/sanctuary-destruct)

- Cleans up required or imported [Sanctuary](https://sanctuary.js.org/) functions when
  using destructing assignment.
- Reads functions from local Sanctuary instance based on the current working
  directory.

## install

```sh
npm install -g sanctuary-destruct
```

## usage

Prints the modified file contents to stdout.

#### file as argument

```sh
sanctuary-destruct path/to/file.js
```

#### stdin

```sh
cat path/to/file.js | sanctuary-destruct
```

#### vim

```
%!sanctuary-destruct
```

Or use [Preserve function](https://technotales.wordpress.com/2010/03/31/preserve-a-vim-function-that-keeps-your-state/)
that restores cursor position after:

```
:call Preserve("%!sanctuary-destruct")
```

#### emacs

https://gist.github.com/yrns/e9b0cf1c24a87812e1ecab9816823f4c

#### Sublime Text
Install the [FilterPipes plugin](https://packagecontrol.io/packages/FilterPipes) and add a key binding like
```
{ "keys": ["alt+shift+d"], "command": "filter_pipes_process", "args": {"command": "sanctuary-destruct"}}
```

## Acknowledgements

Big thanks to [Raine Virta](https://github.com/raine) whose [ramda-destruct](https://github.com/raine/ramda-destruct) package was the inspiration for this.
