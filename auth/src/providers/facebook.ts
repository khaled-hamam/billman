import querystring from 'querystring';
import axios from 'axios';

import { User } from '../models/user.model';
import { OAuthProvider, OAuthProviderConfig } from './oauth-provider';

interface MePayload {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export class FacebookOAuthProvider implements OAuthProvider {
  public readonly name;

  private readonly config;

  public constructor(config: OAuthProviderConfig) {
    this.name = 'facebook';
    this.config = config;
  }

  public generateAuthUrl() {
    const scopes: string[] = [
      'public_profile',
      'email',
    ];

    const params = querystring.stringify({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      scope: scopes,
    });

    return `https://www.facebook.com/v9.0/dialog/oauth?${params}`;
  }

  public async getUser(code: string) {
    const { data: { access_token } } = await axios.get(
      'https://graph.facebook.com/v9.0/oauth/access_token?',
      {
        params: {
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          redirect_uri: this.config.redirectUri,
          code,
        },
      },
    );

    const { data: payload } = await axios.get<MePayload>('https://graph.facebook.com/me?', {
      params: {
        fields: ['first_name', 'last_name', 'email'].join(','),
        access_token,
      },
    });

    return new User({
      sub: payload.id,
      iss: 'facebook',
      email: payload.email,
      givenName: payload.first_name,
      familyName: payload.last_name,
    });
  }
}
