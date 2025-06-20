import pino from 'pino'
const logger = pino ({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: "dd-mm-yy HH:MM:ss"
    }
  },
})

export default logger;