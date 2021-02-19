import { User } from '../models/user.model';

export interface OAuthProvider {
  name: string;
  generateAuthUrl(): string;
  getUser(code: string): Promise<User>;
}

export interface OAuthProviderConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}
