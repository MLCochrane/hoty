import {
  DefaultCrudRepository,
  juggler,
  HasManyRepositoryFactory,
  repository
} from '@loopback/repository';
import {User, UserRelations, Event} from '../models';
import {EventRepository} from './event.repository';
import {UserProfile} from '@loopback/authentication';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';

import * as _ from 'lodash';


export type Credentials = {
  email: string;
  password: string;
};

export type FormattedUser = {
  _id: string,
  username: string,
  firstName: string,
  lastName: string
}

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly events: HasManyRepositoryFactory<
    Event,
    typeof User.prototype.id
  >;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('EventRepository') getEventRepository: Getter<EventRepository>,
  ) {
    super(User, dataSource);
    this.events = this.createHasManyRepositoryFactoryFor(
      'events',
      getEventRepository,
    );
  }

  async fetchUser(user: UserProfile) {
    const curUser = await super.findById(user.id);
    const formatUser = _.pick(curUser, ['_id', 'username', 'firstName', 'lastName']);
    return formatUser;
  }
}
