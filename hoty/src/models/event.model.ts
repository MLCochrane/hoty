import {Entity, model, property, belongsTo } from '@loopback/repository';
import {User, UserWithRelations} from './user.model';

type Filter = {
  title: string,
  emoji: string
}

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

  @property({
    type: 'date',
    required: true,
  })
  startDate: string;

  @property({
    type: 'date',
    required: true,
  })
  endDate: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  filters?: Filter[];

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
