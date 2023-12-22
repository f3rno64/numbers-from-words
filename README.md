# numbers-from-words - A library for parsing words to numbers

[![NPM Version][npm-image]][npm-url]
[![Downloads Stats][npm-downloads]][npm-url]

A tiny utility library _with no dependencies_ that parses words representing
numbers into their numeric values. Supports a wide variety of inputs, such as:

- "one hundred and twenty three"
- "twenty"
- "one thousand, and five hundred"

## Installation

```bash
npm i --save numbers-from-words
```

## Usage

Import the `parse` function call it with the input string containing words
defining a number/quantity.

```js
import { parse } from 'numbers-from-words'

const numberA = parse('twenty two')
const numberB = parse('one thousand and twenty three')
const numberC = parse('zero')

console.log({
  numberA,  // 22
  numberB,  // 1023
  numberC   // 0
})
```

## Release History

See _[CHANGELOG.md](./CHANGELOG.md)_ for more information.

## License

Distributed under the **MIT** license. See [LICENSE.md](./LICENSE.md) for more
information.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

[npm-image]: https://img.shields.io/npm/v/@f3rno64/numbers-from-words.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@f3rno64/numbers-from-words
[npm-downloads]: https://img.shields.io/npm/dm/@f3rno64/numbers-from-words.svg?style=flat-square
