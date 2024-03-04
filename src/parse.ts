const NUMBERS = {
  'zero': 0,
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9,
  'ten': 10,
  'eleven': 11,
  'twelve': 12,
  'thirteen': 13,
  'fourteen': 14,
  'fifteen': 15,
  'sixteen': 16,
  'seventeen': 17,
  'eighteen': 18,
  'nineteen': 19,
  'twenty': 20,
  'thirty': 30,
  'forty': 40,
  'fourty': 40,
  'fifty': 50,
  'sixty': 60,
  'seventy': 70,
  'eighty': 80,
  'ninety': 90,
  'hundred': 100,
  'thousand': 1000,
  'million': 1000000,
  'billion': 1000000000,
  'trillion': 1000000000000,
  'quadrillion': 1000000000000000
}


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
  const words = input.toLowerCase().replace(/[-\s]+/g, ' ').replace(/[^\w ]+/g, '').split(' ')
  const numbers: (number | true)[] = []

  // first convert all the words to numbers
  for (const word of words) {
    if (word === 'and') {
      numbers.push(true)
    } else if (word as keyof typeof NUMBERS in NUMBERS) {
      numbers.push(NUMBERS[word as keyof typeof NUMBERS])
    }
  }

  // then group the numbers by the rule that a smaller number means a new set
  // each set will be multiplied together
  const sets: Array<number[]> = []
  let currentSet: number[] = []
  let lastNumber: number | null = null
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i]
    if (number === true) {
      // this is a weird case where we have a number like "one hundred and twenty three"
      sets.push(currentSet)
      currentSet = []
      continue
    }
    if (lastNumber !== null && lastNumber > number) {
      // next number is smaller, so you've arrived at the end of a set
      sets.push(currentSet)
      currentSet = []
    }
    if (typeof number === 'number') {
      currentSet.push(number)
      lastNumber = number
    }
  }

  // make sure you clear the buffer
  if (currentSet.length > 0) {
    sets.push(currentSet)
  }

  // nine one -> 91
  for (let i = 0; i < sets.length - 1; i++) {
    const set = sets[i]
    const nextSet = sets[i + 1]
    if (set.length === 1 && nextSet.length === 1 && set[0] < 10 && nextSet[0] < 100) {
      // console.log('combining', set, nextSet)
      let str = ''
      for (const n of set) {
        str += n
      }
      for (const n of nextSet) {
        str += n
      }
      sets[i] = [parseInt(str)]
      sets[i + 1] = []
    }
  }

  // when the last entry of a set is zero, remove the zero
  // twenty zero -> 20
  for (const set of sets) {
    if (set.length > 1 && set[set.length - 1] === 0) {
      // console.log('removing zero', set)
      set.pop()
    }
  }

  // finally combine the result, following weird english rules when necessary
  let result = 0
  for (const set of sets) {
    if (set.length === 0) {
      // empty set means it was an and
      // don't reduce it with 1
      continue
    }
    if (set.length > 1 && set.every((n) => n < 100)) {
      // if all numbers are less than 19, combine them like a string
      // one two -> 12
      // one twenty -> 120
      let str = ''
      for (const n of set) {
        str += n
      }
      result += parseInt(str)
      continue
    }
    const product = set.reduce((a, b) => a * b, 1)
    result += product
  }

  return result
}

export default parse
