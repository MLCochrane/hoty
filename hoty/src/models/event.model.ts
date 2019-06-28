import {Entity, model, property, belongsTo } from '@loopback/repository';
import {User, UserWithRelations} from './user.model';

@model({settings: {}})
export class Event extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  description?: string;

  // @property({
  //   type: 'date',
  //   required: true,
  // })
  // date: string;

  @belongsTo(() => User)
  userId: string;

  getId() {
    return this.id;
  }


  constructor(data?: Partial<Event>) {
    super(data);
  }
}

export interface EventRelations {
  user?: UserWithRelations;
  // describe navigational properties here
}

export type EventWithRelations = Event & EventRelations;
