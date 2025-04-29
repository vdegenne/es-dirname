# es-dirname

(Meme update.)

!!! PLEASE, DO NOT USE THIS MODULE ANYMORE IN LTS NODEJS VERSIONS !!!

Instead use `import.meta.dirname` natively available in ES modules.

## Installation

```
npm i -D es-dirname
```

## Usage

```ts
import {__} from 'es-dirname';

console.log(__.dirname);
```

