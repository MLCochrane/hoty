import {
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {Event, EventRelations} from '../models';
import {DbDataSource} from '../datasources';
import {
  inject,
  Getter,
} from '@loopback/core';
import {UserRepository} from '../repositories/user.repository';

import * as _ from 'lodash';

export type FormattedEvent = {
  id: number,
  title: string,
  description: string,
}

export class EventRepository extends DefaultCrudRepository<
  Event,
  typeof Event.prototype.id,
  EventRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('UserRepository') public getUserRepository: Getter<UserRepository>,
  ) {
    super(Event, dataSource);
  }

  async fetchAll() {
    // const userRepository = await this.getUserRepository();
    const events = await super.find();
    // const formattedEvents: Array<Object> = [];
    // events.forEach(el => {
    //   const updatedEl = _.pick(el, [
    //     'id',
    //     'userId',
    //     'title',
    //     'description',
    //     'startDate',
    //     'endDate',
    //   ]);
    //   formattedEvents.push(updatedEl);
    // })

    return events;
  }
}
