# es-dirname

Node.js / Gjs / Deno module that returns the current script dirname. Similar to `__dirname` but also works in CommonJs and ES modules.

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