import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import cors from 'cors';
import 'express-async-errors';

import { logger } from './logger';
import { config } from './config';

import { authRouter } from './controllers/auth.controller';
import { healthzRouter } from './controllers/healthz.controller';
import { errorHandler } from './utils/error-handler.middleware';

const app = express();

app.use(cors({
  origin: /(localhost:.*|.billman.tech)/,
  credentials: true,
}));
app.use(helmet());
app.use(express.json());

app.use(healthzRouter);
app.use(authRouter);

mongoose.connect(
  config.db.uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (error) => {
    if (error) {
      logger.error('mongodb failed to connect', error);
      process.exit(1);
    }

    logger.info('mongodb connected successfully');
  },
);

app.use(errorHandler);

app.listen(config.server.port, () => {
  logger.info(`@billman/auth is running on port: ${config.server.port}`);
});

process.on('uncaughtException', (error) => {
  logger.error('uncaught exception', error);
  process.exit(1);
});

process.on('unhandledRejection', (error, promise) => {
  logger.error('unhandled rejection', { error, promise });
  process.exit(1);
});
