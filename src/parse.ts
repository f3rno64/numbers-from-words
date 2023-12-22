import * as U from './utils'
import { InvalidInputError } from './errors'
import { Numbers, Magnitudes, Multiples } from './types'
import { NUMBER_WORDS, MAGNITUDE_WORDS, MULTIPLES_WORDS } from './const'

/**
 * Parses a string defining a number with words into its numeric value.
 *
 * @throws {@link InvalidInputError}
 * This exception is thrown if the input is invalid.
 *
 * @param input - The string to parse.
 * @returns The numeric value of the input.
 *
 * @example
 * Here are some example invocations:
 * ```
 * const ... = parse('twenty')
 * const ... = parse('one hundred and twenty three')
 * const ... = parse('one thousand, two hundred and thirty four')
 * ```
 *
 * @example
 * Here are some example invocations that throw an exception:
 * ```
 * parse('in 2 hours and 3 minutes ago')
 * parse('a month in the past')
 * ```
 *
 * @public
 */
const parse = (input: string): number => {
  const words = input.replace(/-/g, ' ').split(' ')

  let result = 0
  let currentMultiple: number | null = null
  let currentQuantity: number | null = null

  for (let i = 0; i < words.length; i++) {
    const word = words[i].toLowerCase().replace(/\W/g, '')

    if (word === 'and') {
      if (currentQuantity !== null) {
        result += currentQuantity
        currentQuantity = null
      }

      continue
    }

    const capitalizedWord = U.capitalize(word)

    if (MULTIPLES_WORDS.includes(capitalizedWord)) {
      if (currentMultiple !== null) {
        throw new InvalidInputError(input, 'parsed two multiples in a row')
      } else if (currentQuantity !== null) {
        throw new InvalidInputError(input, 'parsed a number before a multiple')
      }

      currentMultiple = Multiples[capitalizedWord as keyof typeof Multiples]
    } else if (NUMBER_WORDS.includes(capitalizedWord)) {
      const value = Numbers[capitalizedWord as keyof typeof Numbers]

      if (currentQuantity !== null) {
        throw new InvalidInputError(input, 'parsed two numbers in a row')
      }

      if (currentMultiple !== null) {
        result += currentMultiple + value
        currentMultiple = null
      } else {
        currentQuantity = value
      }
    } else if (MAGNITUDE_WORDS.includes(capitalizedWord)) {
      const value = Magnitudes[capitalizedWord as keyof typeof Magnitudes]

      if (currentQuantity === null) {
        throw new InvalidInputError(input, 'parsed magnitude without number')
      }

      result += currentQuantity * value
      currentQuantity = null
      currentMultiple = null
    }
  }

  if (currentQuantity !== null) {
    result += currentQuantity
  } else if (currentMultiple !== null) {
    result += currentMultiple
  }

  return result
}

export default parse
