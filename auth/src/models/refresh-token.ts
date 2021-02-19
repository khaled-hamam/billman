import { prop } from '@typegoose/typegoose';
import { v4 as uuid } from 'uuid';

export class RefreshToken {
  @prop()
  public readonly _id: string;

  @prop({ required: true })
  public readonly useragent: string;

  @prop()
  public readonly createdAt: Date;

  private constructor(id: string, useragent: string) {
    this._id = id;
    this.useragent = useragent;
    this.createdAt = new Date();
  }

  public static generate(useragent: string) {
    return new RefreshToken(uuid(), useragent);
  }
}
