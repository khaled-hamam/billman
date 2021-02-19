import { getModelForClass, ReturnModelType } from '@typegoose/typegoose';
import { User } from '../models/user.model';

export class UserRepository {
  private _context: ReturnModelType<typeof User>;

  public constructor() {
    this._context = getModelForClass(User);
  }

  public async saveIfNotExists(user: User): Promise<User> {
    let foundUser = await this._context.findOne({ sub: user.sub, iss: user.iss });
    if (foundUser === null) {
      foundUser = await this._context.create(user);
    }

    return foundUser;
  }

  public async saveRefreshTokens(user: User) {
    await this._context.findOneAndUpdate({ sub: user.sub, iss: user.iss }, {
      refreshTokens: user.getRefreshTokens(),
    });
  }

  async getUserFromRefreshToken(refreshTokenId: string): Promise<User | null> {
    return this._context.findOne({ 'refreshTokens._id': refreshTokenId });
  }
}
