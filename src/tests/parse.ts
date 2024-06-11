/* eslint-env mocha */

import { expect } from 'chai'

import parse from '../parse'

enum Numbers {
  Zero = 0,
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Nine = 9
}

// enum Teens {
//   Ten = 10,
//   Eleven = 11,
//   Twelve = 12,
//   Thirteen = 13,
//   Fourteen = 14,
//   Fifteen = 15,
//   Sixteen = 16,
//   Seventeen = 17,
//   Eighteen = 18,
//   Nineteen = 19
// }

enum Multiples {
  Twenty = 20,
  Thirty = 30,
  Forty = 40,
  Fifty = 50,
  Sixty = 60,
  Seventy = 70,
  Eighty = 80,
  Ninety = 90
}

enum Magnitudes {
  Hundred = 100,
  Thousand = 1000,
  Million = 1000000,
  Billion = 1000000000,
  Trillion = 1000000000000,
  Quadrillion = 1000000000000000
}

const NUMBER_WORDS = Object.keys(Numbers).filter(
  (key: string): boolean => !Number.isFinite(+key)
)

const MAGNITUDE_WORDS = Object.keys(Magnitudes).filter(
  (key: string): boolean => !Number.isFinite(+key)
)

const MULTIPLES_WORDS = Object.keys(Multiples).filter(
  (key: string): boolean => !Number.isFinite(+key)
)

// const TEENS_WORDS = Object.keys(Teens).filter(
//   (key: string): boolean => !Number.isFinite(+key)
// )

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


  it('parses one two', () => {
    expect(parse('one two')).to.equal(12)
  })

  it('parses million', () => {
    expect(parse('million')).to.equal(1000000)
  })

  it('parses nine one', () => {
    expect(parse('nine one')).to.equal(91)
  })

  it('parses nine twenty one', () => {
    expect(parse('nine twenty one')).to.equal(921)
  })

  it('parses four hundred five', () => {
    expect(parse('four hundred five')).to.equal(405)
  })

  it('parses a number before a multiple like one twenty', () => {
    expect(parse('one twenty')).to.equal(120)
  })

  it('parses a number before a multiple like two ninety nine', () => {
    expect(parse('two ninety nine')).to.equal(299)
  })

  it('parses a number like two thousand', () => {
    expect(parse('two thousand')).to.equal(2000)
  })

  it('parses a number like two thousand ninety nine', () => {
    expect(parse('two thousand ninety nine')).to.equal(2099)
  })

  it('parses a number like thirty thirty', () => {
    expect(parse('thirty thirty')).to.equal(3030)
  })

  it('parses a single multiple', () => {
    expect(parse('thirty')).to.equal(30)
  })

  // below tests generated by chatgpt

  it('parses very large numbers like one million two hundred thousand', () => {
    expect(parse('one million two hundred thousand')).to.equal(1200000)
  })

  it('parses complex numbers like twelve hundred thirty four', () => {
    expect(parse('twelve hundred thirty four')).to.equal(1234)
  })

  it('parses numbers in the hundreds followed by a large scale like eight hundred thousand', () => {
    expect(parse('eight hundred thousand')).to.equal(800000)
  })

  it('parses large numbers without "and" like six thousand five hundred', () => {
    expect(parse('six thousand five hundred')).to.equal(6500)
  })

  it('parses numbers with "teen" and tens like seventeen fifty', () => {
    expect(parse('seventeen fifty')).to.equal(1750)
  })

  it('parses numbers with "and" like two thousand and sixty', () => {
    expect(parse('two thousand and sixty')).to.equal(2060)
  })

  it('parses numbers combining thousands and hundreds like three thousand four hundred', () => {
    expect(parse('three thousand four hundred')).to.equal(3400)
  })

  it('parses large mixed scale numbers like fifteen hundred sixty', () => {
    expect(parse('fifteen hundred sixty')).to.equal(1560)
  })

  it('parses sequential numbers like sixty seventy', () => {
    expect(parse('sixty seventy')).to.equal(6070)
  })

  it('parses a number like four hundred fifty', () => {
    expect(parse('four hundred fifty')).to.equal(450)
  })


})
