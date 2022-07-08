import { plainToClass } from 'class-transformer'
import { IsInt, IsPositive, IsString, validate } from 'class-validator'
import { collectErrors } from './error.utils'

class User {
  @IsInt()
  @IsPositive()
  id: number

  @IsString()
  firstName: string

  @IsString()
  lastName: string
}

describe('Utils - error', () => {
  it('Should collect errors from class validator', async () => {
    const rawErrors = await validate(plainToClass(User, { id: '1', lastName: 'Doe' }))

    const errors = collectErrors(rawErrors)

    expect(errors).toEqual([
      {
        property: 'id',
        errors: [
          {
            constraint: 'isPositive',
            message: expect.any(String)
          },
          {
            constraint: 'isInt',
            message: expect.any(String)
          }
        ]
      },
      {
        property: 'firstName',
        errors: [
          {
            constraint: 'isString',
            message: expect.any(String)
          }
        ]
      }
    ])
  })
})
