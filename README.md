# es-dirname

Node.js / Gjs / Deno module that returns the current script dirname. Similar to `__dirname` but also works in CommonJs and ES modules.  

Contributions for more platforms are welcome.

## Installation

```yarn add es-dirname```

## Usage

### /path/to/the/script.mjs

```javascript
import dirname from 'es-dirname'

console.log(dirname()) // outputs "/path/to/the"
```

### CommonJs

```javascript
console.log(require('es-dirname')() === __dirname) // true
```

### Contributions

Contributions for more platforms are welcome :)

### Tests

This module has been tested on the following platforms:

| Runtime | Type   | Platform | State    |
|---------|--------|----------|----------|
| Node.js | CJS    | Linux    | ✔        |
| Node.js | CJS    | MacOS    | ✔        |
| Node.js | CJS    | Windows  | ✔        |
| Node.js | ESM    | Linux    | ✔        |
| Node.js | ESM    | MacOS    | ✔        |
| Node.js | ESM    | Windows  | ✔        |
| Deno    | ESM    | Linux    | ✔        |
| Deno    | ESM    | MacOS    | ✔        |
| Deno    | ESM    | Windows  | ✔        |
| Gjs     | ESM    | Linux    | ✔        |
| Gjs     | ESM    | MacOS    | UNTESTED |
| Gjs     | ESM    | Windows  | UNTESTED |
| Gjs     | NO-ESM | Linux    | TODO     |
| Gjs     | NO-ESM | MacOS    | TODO     |
| Gjs     | NO-ESM | Windows  | TODO     |

You can run all tests with:

```
npm run test
```

Or the tests for a special runtime:

```
npm run test:node
npm run test:deno
npm run test:gjs
```