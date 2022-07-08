import { LoggerService } from './logger.service'

console.log = jest.fn()
console.error = jest.fn()

const logger = new LoggerService()

describe('Service - logger', () => {
  it('Should log info', () => {
    logger.info('Info msg')

    expect(console.log).toBeCalledTimes(1)
  })

  it('Should log error', () => {
    logger.error('Error msg')

    expect(console.error).toBeCalledTimes(1)
  })
})
