import {Entity, model, property, hasMany} from '@loopback/repository';
import { Event, EventWithRelations } from './event.model';

@model({settings: {strict: false}})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    required: false,
  })
  _id: string;

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
    required: false,
  })
  firstName: string;

  @property({
    type: 'string',
    required: false,
  })
  lastName: string;

  @hasMany(() => Event)
  events: Event[];


  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  events?: EventWithRelations[];
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
