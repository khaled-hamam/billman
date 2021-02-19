import express from 'express';
import createHttpError from 'http-errors';

import { config } from '../config';
import { UserRepository } from '../db/user.repository';
import { OAuthError } from '../errors';
import { FacebookOAuthProvider } from '../providers/facebook';
import { GoogleOAuthProvider } from '../providers/google';
import { OAuthProvider } from '../providers/oauth-provider';

const authRouter = express.Router();

const userRepository = new UserRepository();

const registerProvider = (provider: OAuthProvider) => {
  authRouter.get(`/${provider.name}`, (_request, response) => {
    response.redirect(provider.generateAuthUrl());
  });

  authRouter.get(`/${provider.name}/callback`, async (request, response) => {
    const { code } = request.query;

    if (typeof code !== 'string') {
      throw new OAuthError('code is not a string');
    }

    let user = await provider.getUser(code);
    user = await userRepository.saveIfNotExists(user);

    const useragent = request.header('User-Agent') || 'no-agent';

    const tokens = user.issueTokens(useragent, config.jwt);
    await userRepository.saveRefreshTokens(user);

    response.json(tokens);
  });
};

authRouter.post('/refresh', async (request, response) => {
  const refreshTokenId = request.body.refresh_token;
  const useragent = request.header('User-Agent') || 'no-agent';

  const user = await userRepository.getUserFromRefreshToken(refreshTokenId);
  if (user === null) {
    throw createHttpError(400, 'invalid refresh token');
  }

  const tokens = user.refreshAccessToken(refreshTokenId, useragent, config.jwt);
  await userRepository.saveRefreshTokens(user);

  response.cookie('refresh_token', tokens.refresh_token, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: true,
  });

  response.json(tokens);
});

const providers = [
  new FacebookOAuthProvider(config.providers.facebook),
  new GoogleOAuthProvider(config.providers.google),
];

providers.forEach(registerProvider);

export {
  authRouter,
};
