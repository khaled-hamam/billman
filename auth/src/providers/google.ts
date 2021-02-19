import * as google from 'googleapis';
import jwt from 'jsonwebtoken';

import { User } from '../models/user.model';
import { OAuthProvider, OAuthProviderConfig } from './oauth-provider';
import { OAuthError } from '../errors';

interface OpenIdTokenPayload {
  email: string;
  given_name: string;
  family_name: string;
  sub: string;
  iss: string;
}

export class GoogleOAuthProvider implements OAuthProvider {
  public readonly name;

  private readonly oauth2Client;

  public constructor(config: OAuthProviderConfig) {
    this.name = 'google';
    this.oauth2Client = new google.Auth.OAuth2Client(config);
  }

  public generateAuthUrl() {
    const scopes: string[] = [
      'openid',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ];

    return this.oauth2Client.generateAuthUrl({
      prompt: 'consent',
      scope: scopes,
    });
  }

  public async getUser(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);

    if (typeof tokens.id_token !== 'string') {
      throw new OAuthError('id_token is not valid');
    }

    const payload = jwt.decode(tokens.id_token) as OpenIdTokenPayload;

    return new User({
      ...payload,
      givenName: payload.given_name,
      familyName: payload.family_name,
    });
  }
}
