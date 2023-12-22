/* eslint-env mocha */

import { expect } from 'chai'

import { capitalize } from '../../utils'

describe('utils:capitalzie', () => {
  it('capitalizes a word', () => {
    expect(capitalize('foo')).to.equal('Foo')
  })
})
