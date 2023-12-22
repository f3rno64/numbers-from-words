/* eslint-env mocha */

import { expect } from 'chai'

import parse from '../parse'
import { Numbers, Magnitudes, Multiples } from '../types'
import { NUMBER_WORDS, MAGNITUDE_WORDS, MULTIPLES_WORDS } from '../const'

describe('parse', () => {
  for (let i = 0; i < NUMBER_WORDS.length; i++) {
    const word = NUMBER_WORDS[i]
    const value = Numbers[word as keyof typeof Numbers]

    it(`parses "${word}" to ${value}`, () => {
      expect(parse(word)).to.equal(value)
    })

    it(`parses "${word.toLowerCase()}" to ${value}`, () => {
      expect(parse(word.toLowerCase())).to.equal(value)
    })
  }

  for (let i = 0; i < NUMBER_WORDS.length; i++) {
    const wordA = NUMBER_WORDS[i]
    const wordB = NUMBER_WORDS[Math.floor(Math.random() * NUMBER_WORDS.length)]
    const valueA = Numbers[wordA as keyof typeof Numbers]
    const valueB = Numbers[wordB as keyof typeof Numbers]

    const magnitude =
      MAGNITUDE_WORDS[Math.floor(Math.random() * MAGNITUDE_WORDS.length)]

    const magnitudeValue = Magnitudes[magnitude as keyof typeof Magnitudes]

    const inputA = `${wordA} and ${wordB} ${magnitude}`
    const inputB = `${wordA}, and ${wordB} ${magnitude}`
    const value = valueA + valueB * magnitudeValue

    it(`parses "${inputA}" to ${value}`, () => {
      expect(parse(inputA)).to.equal(value)
    })

    it(`parses "${inputA.toLowerCase()}" to ${value}`, () => {
      expect(parse(inputA.toLowerCase())).to.equal(value)
    })

    it(`parses "${inputB}" to ${value}`, () => {
      expect(parse(inputB)).to.equal(value)
    })

    it(`parses "${inputB.toLowerCase()}" to ${value}`, () => {
      expect(parse(inputB.toLowerCase())).to.equal(value)
    })
  }

  for (let i = 0; i < MULTIPLES_WORDS.length; i++) {
    const multiple = MULTIPLES_WORDS[i]
    const multipleValue = Multiples[multiple as keyof typeof Multiples]

    for (let j = 0; j < NUMBER_WORDS.length; j++) {
      const number = NUMBER_WORDS[j]
      const numberValue = Numbers[number as keyof typeof Numbers]
      const value = multipleValue + numberValue
      const input = `${multiple} ${number}`

      it(`parses "${input}" to ${value}`, () => {
        expect(parse(input)).to.equal(value)
      })

      it(`parses "${input.toLowerCase()}" to ${value}`, () => {
        expect(parse(input.toLowerCase())).to.equal(value)
      })
    }
  }

  for (let i = 0; i < NUMBER_WORDS.length; i++) {
    const number = NUMBER_WORDS[i]
    const numberValue = Numbers[number as keyof typeof Numbers]

    for (let j = 0; j < MAGNITUDE_WORDS.length; j++) {
      const magnitude = MAGNITUDE_WORDS[j]
      const magnitudeValue = Magnitudes[magnitude as keyof typeof Magnitudes]
      const value = numberValue * magnitudeValue
      const input = `${number} ${magnitude}`

      it(`parses "${input}" to ${value}`, () => {
        expect(parse(input)).to.equal(value)
      })

      it(`parses "${input.toLowerCase()}" to ${value}`, () => {
        expect(parse(input.toLowerCase())).to.equal(value)
      })
    }
  }
})
