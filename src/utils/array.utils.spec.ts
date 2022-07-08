import { getRandomElementFromArray } from './array.utils'

const array = [1, 2, 3]

describe('Utils - array', () => {
  it('Should return random item from array', () => {
    const item = getRandomElementFromArray(array)

    expect(array).toContain(item)
  })
})
