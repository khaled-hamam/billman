import 'dotenv/config';
import jwt from 'jsonwebtoken';

import { getEnv } from './utils/get-env';

export const config = {
  server: {
    port: parseInt(getEnv('PORT', '80'), 10),
  },
  logger: {
    level: getEnv('LOG_LEVEL', 'debug'),
  },
  providers: {
    google: {
      clientId: getEnv('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: getEnv('GOOGLE_OAUTH_CLIENT_SECRET'),
      redirectUri: getEnv('GOOGLE_OAUTH_REDIRECT_URI'),
    },
    facebook: {
      clientId: getEnv('FACEBOOK_OAUTH_CLIENT_ID'),
      clientSecret: getEnv('FACEBOOK_OAUTH_CLIENT_SECRET'),
      redirectUri: getEnv('FACEBOOK_OAUTH_REDIRECT_URI'),
    },
  },
  jwt: {
    secret: getEnv('JWT_SECRET', 'billman_dev_jwt'),
    options: {
      algorithm: getEnv('JWT_ALGORITHM', 'HS256') as jwt.Algorithm,
      expiresIn: getEnv('JWT_EXPIRES_IN', '2d'),
    },
  },
  db: {
    uri: getEnv('MONGO_URI', 'mongodb://localhost/billman-auth'),
  },
};
