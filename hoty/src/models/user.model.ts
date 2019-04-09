import {Entity, model, property} from '@loopback/repository';
import * as jwt from 'jsonwebtoken';

@model({settings: {strict: false}})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    required: false,
  })
  _id: number;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }

  generateAuthToken() {
    const token = jwt.sign(
      {
        _id: this._id,
        username: this.username,
        email: this.email,
      },
      'privateKey',
      {
        expiresIn: 604800, // 1 week in seconds
      },
    );
    return token;
  }
}
