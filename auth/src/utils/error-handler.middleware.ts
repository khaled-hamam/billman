import express from 'express';
import { isHttpError } from 'http-errors';

import { logger } from '../logger';

export const errorHandler = (
  error: unknown,
  _request: express.Request,
  response: express.Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: express.NextFunction,
) => {
  logger.error('[ERROR]', error);

  if (isHttpError(error)) {
    response.status(error.status).json({ error: error.message });
  } else {
    response.status(500).json({ error: 'internal server error' });
  }
};
