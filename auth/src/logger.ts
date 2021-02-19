import winston from 'winston';
import { config } from './config';

export const logger = winston.createLogger({
  level: config.logger.level,
  format: winston.format.json(),
  defaultMeta: { service: '@billman/auth' },
  transports: [
    new winston.transports.Console(),
  ],
});
