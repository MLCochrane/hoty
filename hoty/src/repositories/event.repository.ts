import {
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {Event, EventRelations} from '../models';
import {DbDataSource} from '../datasources';
import {
  inject,
} from '@loopback/core';

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
  ) {
    super(Event, dataSource);
  }

  async fetchAll() {
    const events = await super.find();
    return events;
  }
}
