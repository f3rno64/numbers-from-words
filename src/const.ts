import { Numbers, Magnitudes, Multiples, Teens } from './types'

export const NUMBER_WORDS = Object.keys(Numbers).filter(
  (key: string): boolean => !Number.isFinite(+key)
)

export const MAGNITUDE_WORDS = Object.keys(Magnitudes).filter(
  (key: string): boolean => !Number.isFinite(+key)
)

export const MULTIPLES_WORDS = Object.keys(Multiples).filter(
  (key: string): boolean => !Number.isFinite(+key)
)

export const TEENS_WORDS = Object.keys(Teens).filter(
  (key: string): boolean => !Number.isFinite(+key)
)
