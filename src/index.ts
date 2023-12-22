import parse from './parse'
import { InvalidInputError } from './errors'

/**
 * A tiny utility library _with no dependencies_ that parses words representing
 * numbers into their numeric values. Supports a wide variety of inputs.
 * such as:
 *   - "one hundred and twenty three"
 *   - "twenty"
 *   - "one thousand, and five hundred"
 *
 * @packageDocumentation
 */

export { parse, InvalidInputError }
