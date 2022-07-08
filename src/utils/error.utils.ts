import { ValidationError } from 'class-validator'
import { ValidationErrorData } from '../exceptions/bad-request.exception'

export const collectErrors = (
  validationErrors: ValidationError[],
  errors: ValidationErrorData[] = []
): ValidationErrorData[] => {
  for (const validationError of validationErrors) {
    if (validationError.constraints) {
      errors.push({
        property: validationError.property,
        errors: Object.keys(validationError.constraints).map((constraint) => ({
          constraint,
          message: validationError.constraints?.[constraint] || 'Unknown error'
        }))
      })
    }

    if (validationError.children) {
      collectErrors(validationError.children, errors)
    }
  }

  return errors
}
