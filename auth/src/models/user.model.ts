import { index, prop } from '@typegoose/typegoose';
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';
import { RefreshToken } from './refresh-token';

interface CreateUserParams {
  email: string;
  givenName: string;
  familyName: string;
  sub: string;
  iss: string;
}

interface JwtSignConfig {
  secret: string;
  options: {
    algorithm: jwt.Algorithm;
    expiresIn: string;
  };
}

interface TokensResponsePayload {
  access_token: string;
  token_type: string;
  refresh_token: string;
}

@index({ sub: 1, iss: 1 }, { unique: true })
@index({ 'refreshTokens._id': 1 }, { unique: true })
export class User {
  @prop()
  public readonly _id: string;

  @prop({ required: true })
  public readonly sub: string;

  @prop({ required: true })
  public readonly iss: string;

  public readonly email: string;

  public readonly givenName: string;

  public readonly familyName: string;

  @prop()
  public readonly createdAt: Date;

  @prop({ type: [RefreshToken], default: [] })
  private refreshTokens: RefreshToken[];

  public constructor(params: CreateUserParams) {
    this._id = uuid();
    this.createdAt = new Date();

    this.email = params.email;
    this.givenName = params.givenName;
    this.familyName = params.familyName;
    this.sub = params.sub;
    this.iss = params.iss;

    this.refreshTokens = [];
  }

  public issueTokens(useragent: string, jwtConfig: JwtSignConfig): TokensResponsePayload {
    const refreshToken = RefreshToken.generate(useragent);
    this.refreshTokens.push(refreshToken);

    return {
      access_token: jwt.sign(this.generateJwtPayload(), jwtConfig.secret, jwtConfig.options),
      token_type: 'bearer',
      refresh_token: refreshToken._id,
    };
  }

  public refreshAccessToken(
    refreshTokenId: string,
    useragent: string,
    jwtConfig: JwtSignConfig,
  ): TokensResponsePayload {
    // TODO: trigger event on different user agents
    this.refreshTokens = this.refreshTokens.filter((token) => token._id !== refreshTokenId);
    return this.issueTokens(useragent, jwtConfig);
  }

  public getRefreshTokens(): ReadonlyArray<RefreshToken> {
    return this.refreshTokens;
  }

  private generateJwtPayload() {
    return {
      sub: this._id,
      email: this.email,
      givenName: this.givenName,
      familyName: this.familyName,
    };
  }
}
