/* eslint-disable max-classes-per-file */

export class FatalError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'FatalError';
  }
}

export class OAuthError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'OAuthError';
  }
}
