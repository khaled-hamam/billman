import express from 'express';

export const healthzRouter = express.Router();

healthzRouter.get('/healthz', (_request, response) => {
  response.status(200).end();
});
